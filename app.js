/**
 * Treino ABC — App Principal
 * 
 * Funcionalidades:
 * - Treinos A/B/C com tabs
 * - Timer configurável com presets e som
 * - Histórico de cargas por exercício
 * - Sistema de streak (sequência de dias)
 * - Barra de progresso por treino
 * - Auto-reset de checks por dia
 * - Modais nativos (<dialog>)
 * - Editor de treinos (catálogo + exercícios customizados)
 */

// ============================================
// MÓDULO: Storage (centralizado)
// ============================================

const Storage = {
    get(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// ============================================
// MÓDULO: Estado do App
// ============================================

// --- Validadores de Schema do localStorage ---
// Garantem que dados corrompidos ou manipulados manualmente
// não causem erros em runtime. Retornam o dado se válido,
// ou o fallback seguro caso contrário.

function isValidStatsData(data) {
    return data !== null &&
        typeof data === 'object' &&
        typeof data.streak === 'number' &&
        typeof data.totalDays === 'number' &&
        (data.lastDate === null || typeof data.lastDate === 'string');
}

function isValidSavedData(data) {
    if (typeof data !== 'object' || data === null) return false;
    return Object.values(data).every(function(v) {
        return typeof v === 'object' && v !== null &&
            (v.carga === undefined || typeof v.carga === 'number') &&
            (v.checked === undefined || typeof v.checked === 'boolean');
    });
}

function isValidHistoryData(data) {
    if (typeof data !== 'object' || data === null) return false;
    return Object.values(data).every(function(arr) {
        return Array.isArray(arr) && arr.every(function(e) {
            return typeof e.date === 'string' && typeof e.carga === 'number';
        });
    });
}

function isValidCustomTreinos(data) {
    if (data === null) return true; // null é válido (usa padrão)
    if (typeof data !== 'object') return false;
    return ['A', 'B', 'C'].every(function(tab) {
        return !data[tab] || Array.isArray(data[tab]);
    });
}

// --- Inicialização com validação de schema ---
const _rawSavedData = Storage.get('treino_data', {});
let savedData = isValidSavedData(_rawSavedData) ? _rawSavedData : {};

const _rawStatsData = Storage.get('treino_stats', null);
let statsData = isValidStatsData(_rawStatsData)
    ? _rawStatsData
    : { lastDate: null, totalDays: 0, streak: 0 };

const _rawHistoryData = Storage.get('treino_history', {});
let historyData = isValidHistoryData(_rawHistoryData) ? _rawHistoryData : {};

const _rawCustomTreinos = Storage.get('custom_treinos', null);
let customTreinos = isValidCustomTreinos(_rawCustomTreinos) ? _rawCustomTreinos : null;

let currentTab = 'A';

// Timer state
let timerInterval = null;
let timerPreset = 60;
let timeLeft = 60;
let stopwatchTime = 0;
let timerMode = 'timer'; // 'timer' ou 'stopwatch'
let isRunning = false;

// Video player state
let activePlayer = null;

// Editor state
let editorWorkout = []; // working copy during editing
let editingYtExerciseIndex = -1; // which exercise is having its YT link edited
let catalogSelectedGroup = 'Todos';

/**
 * Retorna os treinos ativos (customizados ou padrão).
 * Se o usuário customizou, usa os salvos; senão, usa TREINOS.
 */
function getActiveWorkouts() {
    return customTreinos || TREINOS;
}

/**
 * Gera um ID único para exercícios customizados.
 */
function generateExerciseId() {
    return 'custom_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 4);
}

// ============================================
// MÓDULO: Utilidades
// ============================================

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}

function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// MÓDULO: Dialog (substitui alert())
// ============================================

function showDialog(icon, title, message) {
    const dialog = document.getElementById('app-dialog');
    document.getElementById('dialog-icon').textContent = icon;
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-message').textContent = message;
    dialog.showModal();
}

function closeDialog() {
    document.getElementById('app-dialog').close();
}

function showHistoryDialog(exerciseId, exerciseName) {
    const dialog = document.getElementById('history-dialog');
    const list = document.getElementById('history-list');
    document.getElementById('history-title').textContent = exerciseName;

    const entries = historyData[exerciseId] || [];
    
    // Limpa lista anterior de forma segura
    list.innerHTML = '';
    
    if (entries.length === 0) {
        // FIX SEGURANÇA: usa createElement em vez de innerHTML para evitar XSS
        const li = document.createElement('li');
        li.className = 'history-empty';
        li.textContent = 'Nenhum registro ainda. Salve sua carga para começar!';
        list.appendChild(li);
    } else {
        // FIX SEGURANÇA: usa createElement para cada entrada (e.date e e.carga não
        // são sanitizados com innerHTML — agora usamos textContent para ambos)
        entries
            .slice()
            .reverse()
            .forEach(function(e) {
                const li = document.createElement('li');
                
                const dateSpan = document.createElement('span');
                dateSpan.className = 'history-date';
                dateSpan.textContent = formatDate(String(e.date)); // textContent = sem XSS
                
                const valueSpan = document.createElement('span');
                valueSpan.className = 'history-value';
                valueSpan.textContent = parseFloat(e.carga).toFixed(1) + ' kg';
                
                li.appendChild(dateSpan);
                li.appendChild(valueSpan);
                list.appendChild(li);
            });
    }
    
    dialog.showModal();
}

function closeHistoryDialog() {
    document.getElementById('history-dialog').close();
}

// ============================================
// MÓDULO: Som do Timer (Web Audio API)
// ============================================

function playTimerSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Toca 3 beeps curtos
        [0, 0.25, 0.5].forEach(delay => {
            const oscillator = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            oscillator.connect(gain);
            gain.connect(audioCtx.destination);
            
            oscillator.frequency.value = 880;
            oscillator.type = 'sine';
            gain.gain.value = 0.3;
            
            oscillator.start(audioCtx.currentTime + delay);
            oscillator.stop(audioCtx.currentTime + delay + 0.15);
        });
    } catch {
        // Fallback silencioso se Audio API não disponível
    }
}

// ============================================
// MÓDULO: Auto-reset por dia
// ============================================

function checkDayReset() {
    const today = getTodayDate();
    const lastCheckDate = Storage.get('treino_check_date', null);
    
    if (lastCheckDate !== today) {
        // Novo dia: limpa todos os checks mas mantém as cargas
        Object.keys(savedData).forEach(key => {
            if (savedData[key]) {
                savedData[key].checked = false;
            }
        });
        Storage.set('treino_data', savedData);
        Storage.set('treino_check_date', today);
    }
}

// ============================================
// MÓDULO: Stats (streak e total)
// ============================================

function updateStatsUI() {
    document.getElementById('streak-days').textContent = statsData.streak;
    document.getElementById('total-days').textContent = statsData.totalDays;
}

function finishWorkout() {
    const today = getTodayDate();
    
    if (statsData.lastDate === today) {
        showDialog('💪', 'Já registrado!', 'Você já registrou um treino hoje. Volte amanhã para aumentar sua sequência!');
        return;
    }
    
    if (statsData.lastDate) {
        const last = new Date(statsData.lastDate);
        const current = new Date(today);
        const diffTime = Math.abs(current - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            statsData.streak += 1;
        } else {
            statsData.streak = 1;
        }
    } else {
        statsData.streak = 1;
    }
    
    statsData.totalDays += 1;
    statsData.lastDate = today;
    
    Storage.set('treino_stats', statsData);
    updateStatsUI();
    
    showDialog('🎉', 'Treino concluído!', `Parabéns! Você treinou ${statsData.totalDays} dias no total. Sequência atual: ${statsData.streak} dias!`);
}

// ============================================
// MÓDULO: Progresso
// ============================================

function updateProgress() {
    const workouts = getActiveWorkouts();
    const exercises = workouts[currentTab] || [];
    const total = exercises.length;
    const done = exercises.filter(ex => savedData[ex.id] && savedData[ex.id].checked).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    
    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = `${done}/${total} exercícios — ${percent}%`;

    // Dispara celebração se atingir 100%
    if (percent === 100 && total > 0) {
        // Pequeno delay para a barra completar visualmente primeiro
        setTimeout(showCelebration, 500);
    }
}

// ============================================
// MÓDULO: Renderização dos exercícios
// ============================================

function renderExercises(tab) {
    const container = document.getElementById('content');
    container.innerHTML = '';
    
    // Atualiza label do treino
    const label = document.getElementById('treino-label');
    if (label) label.textContent = TREINO_LABELS[tab] || '';

    const workouts = getActiveWorkouts();
    const exercises = workouts[tab] || [];

    exercises.forEach(ex => {
        const data = savedData[ex.id] || { carga: '', checked: false };
        const card = document.createElement('div');
        card.className = 'exercise-card' + (data.checked ? ' completed' : '');
        card.id = 'card-' + ex.id;

        // Header com nome e check
        const header = document.createElement('div');
        header.className = 'ex-header';

        const info = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'ex-title';
        title.textContent = ex.name;
        const series = document.createElement('div');
        series.className = 'ex-series';
        // Suporta formato novo (sets/reps) ou legado (series)
        if (ex.sets !== undefined && ex.reps !== undefined) {
            series.textContent = `${ex.sets} Séries • ${ex.reps} Reps`;
        } else {
            series.textContent = ex.series || '';
        }
        info.appendChild(title);
        info.appendChild(series);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn' + (data.checked ? ' checked' : '');
        checkBtn.setAttribute('aria-label', 'Marcar ' + ex.name + ' como feito');
        checkBtn.addEventListener('click', function() {
            toggleCheck(ex.id, this);
        });

        header.appendChild(info);
        header.appendChild(checkBtn);

        // Actions: vídeo + carga
        const actions = document.createElement('div');
        actions.className = 'ex-actions';

        const videoButtons = document.createElement('div');
        videoButtons.className = 'video-buttons';

        // Só mostra botões de vídeo se o exercício tem yt_id
        if (ex.yt_id) {
            const btnVideo = document.createElement('button');
            btnVideo.className = 'btn-video';
            btnVideo.textContent = '▶ Ver Vídeo';
            btnVideo.addEventListener('click', function() {
                toggleVideo(ex.id, ex.yt_id);
            });

            const btnYt = document.createElement('a');
            btnYt.className = 'btn-yt-external';
            btnYt.href = 'https://www.youtube.com/watch?v=' + ex.yt_id;
            btnYt.target = '_blank';
            btnYt.rel = 'noopener noreferrer';
            btnYt.textContent = '▶ YouTube';

            videoButtons.appendChild(btnVideo);
            videoButtons.appendChild(btnYt);
        } else {
            const noVideo = document.createElement('span');
            noVideo.style.cssText = 'font-size:0.8rem;color:var(--text-muted);font-style:italic';
            noVideo.textContent = 'Sem vídeo';
            videoButtons.appendChild(noVideo);
        }

        const inputsGroup = document.createElement('div');
        inputsGroup.className = 'inputs-group';

        const inputCarga = document.createElement('input');
        inputCarga.type = 'number';
        inputCarga.className = 'input-carga';
        inputCarga.placeholder = 'Kg';
        inputCarga.min = '0';
        inputCarga.max = '500';
        inputCarga.step = '0.5';
        inputCarga.value = data.carga;
        inputCarga.id = 'input-' + ex.id;
        inputCarga.setAttribute('aria-label', 'Carga para ' + ex.name);
        inputCarga.addEventListener('change', function() {
            saveCarga(ex.id, this.value);
        });

        const btnHistory = document.createElement('button');
        btnHistory.className = 'btn-history';
        btnHistory.textContent = '📊';
        btnHistory.title = 'Ver histórico de cargas';
        btnHistory.setAttribute('aria-label', 'Histórico de ' + ex.name);
        btnHistory.addEventListener('click', function() {
            showHistoryDialog(ex.id, ex.name);
        });

        inputsGroup.appendChild(inputCarga);
        inputsGroup.appendChild(btnHistory);

        actions.appendChild(videoButtons);
        actions.appendChild(inputsGroup);

        // Video container
        const videoBox = document.createElement('div');
        videoBox.className = 'video-container';
        videoBox.id = 'video-box-' + ex.id;

        card.appendChild(header);
        card.appendChild(actions);
        card.appendChild(videoBox);
        container.appendChild(card);
    });

    // Botão concluir
    const finishBtn = document.createElement('button');
    finishBtn.className = 'btn-finish';
    finishBtn.id = 'btn-finish';
    finishBtn.textContent = 'Concluir Treino de Hoje 🎉';
    finishBtn.addEventListener('click', finishWorkout);
    container.appendChild(finishBtn);

    updateProgress();
}

// ============================================
// MÓDULO: Vídeo (Plyr + YouTube)
// ============================================

function toggleVideo(exId, ytId) {
    const videoBox = document.getElementById('video-box-' + exId);

    if (videoBox.classList.contains('active')) {
        videoBox.classList.remove('active');
        if (activePlayer) {
            activePlayer.destroy();
            activePlayer = null;
        }
        videoBox.innerHTML = '';
    } else {
        // Fecha vídeos abertos
        document.querySelectorAll('.video-container.active').forEach(box => {
            box.classList.remove('active');
            box.innerHTML = '';
        });
        if (activePlayer) {
            activePlayer.destroy();
            activePlayer = null;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'plyr__video-embed';
        wrapper.id = 'player-' + exId;

        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId + '?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1';
        iframe.allowFullscreen = true;
        iframe.allow = 'autoplay';

        wrapper.appendChild(iframe);
        videoBox.appendChild(wrapper);
        videoBox.classList.add('active');

        activePlayer = new Plyr('#player-' + exId, {
            youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
        });
    }
}

// ============================================
// MÓDULO: Tabs
// ============================================

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Encontrar o botão correto pelo data attribute
    const activeBtn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (activeBtn) activeBtn.classList.add('active');
    renderExercises(tab);
}

// ============================================
// MÓDULO: Carga + Histórico
// ============================================

function saveCarga(id, value) {
    const numValue = parseFloat(value);
    // FIX SEGURANÇA: valida range no JS (não apenas no atributo max="500" do HTML,
    // que pode ser contornado via DevTools ou console)
    if (isNaN(numValue) || numValue < 0 || numValue > 500) return;

    if (!savedData[id]) savedData[id] = {};
    // FIX SEGURANÇA: salva o número validado (numValue), não a string bruta do input
    savedData[id].carga = numValue;
    Storage.set('treino_data', savedData);

    // Salva no histórico (máximo 1 registro por dia por exercício)
    const today = getTodayDate();
    if (!historyData[id]) historyData[id] = [];
    
    const todayEntry = historyData[id].find(e => e.date === today);
    if (todayEntry) {
        todayEntry.carga = numValue;
    } else {
        historyData[id].push({ date: today, carga: numValue });
    }
    
    // Limita histórico a 90 dias
    if (historyData[id].length > 90) {
        historyData[id] = historyData[id].slice(-90);
    }
    
    Storage.set('treino_history', historyData);
}

function toggleCheck(id, btnElement) {
    if (!savedData[id]) savedData[id] = {};
    savedData[id].checked = !savedData[id].checked;
    Storage.set('treino_data', savedData);

    btnElement.classList.toggle('checked');
    btnElement.closest('.exercise-card').classList.toggle('completed');
    
    // Risca/desrisca o título
    const titleEl = btnElement.closest('.exercise-card').querySelector('.ex-title');
    if (titleEl) {
        // O CSS cuida disso via .completed .ex-title
    }
    
    updateProgress();
}

// ============================================
// MÓDULO: Timer / Cronômetro
// ============================================

function switchTimerMode(mode) {
    if (isRunning) resetTimer();
    
    timerMode = mode;
    
    // Atualiza botões de modo
    document.getElementById('mode-timer').classList.toggle('active', mode === 'timer');
    document.getElementById('mode-stopwatch').classList.toggle('active', mode === 'stopwatch');
    
    // Esconde presets se for cronômetro
    const presets = document.getElementById('timer-presets');
    if (presets) {
        presets.style.display = (mode === 'timer') ? 'flex' : 'none';
    }
    
    resetTimer();
}

function updateTimerDisplay() {
    const timeToDisplay = (timerMode === 'timer') ? timeLeft : stopwatchTime;
    const m = Math.floor(timeToDisplay / 60).toString().padStart(2, '0');
    const s = (timeToDisplay % 60).toString().padStart(2, '0');
    const display = document.getElementById('timer');
    
    if (display) {
        display.textContent = m + ':' + s;
        
        // Warning visual nos últimos 5 segundos (apenas para Timer)
        if (timerMode === 'timer' && timeLeft <= 5 && timeLeft > 0 && isRunning) {
            display.classList.add('warning');
        } else {
            display.classList.remove('warning');
        }
    }
}

function setTimerPreset(seconds) {
    if (isRunning || timerMode !== 'timer') return;
    timerPreset = seconds;
    timeLeft = seconds;
    updateTimerDisplay();
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.seconds) === seconds);
    });
}

function toggleTimer() {
    const btn = document.getElementById('btn-start');
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        btn.textContent = 'Retomar';
        btn.classList.remove('stop');
    } else {
        isRunning = true;
        btn.textContent = 'Pausar';
        btn.classList.add('stop');
        
        timerInterval = setInterval(function() {
            if (timerMode === 'timer') {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    btn.textContent = 'Iniciar';
                    btn.classList.remove('stop');
                    playTimerSound();
                }
            } else {
                // Modo Cronômetro: conta para cima
                stopwatchTime++;
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    
    if (timerMode === 'timer') {
        timeLeft = timerPreset;
    } else {
        stopwatchTime = 0;
    }
    
    const btn = document.getElementById('btn-start');
    if (btn) {
        btn.textContent = 'Iniciar';
        btn.classList.remove('stop');
    }
    updateTimerDisplay();
}

// ============================================
// MÓDULO: Editor de Treinos
// ============================================

/**
 * Extrai o YouTube Video ID de uma URL ou ID direto.
 * Aceita: URLs completas, URLs curtas (youtu.be), ou IDs diretos.
 */
function extractYouTubeId(input) {
    if (!input) return '';
    input = input.trim();
    
    // Já é um ID de 11 caracteres?
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    
    // URL do YouTube
    try {
        const url = new URL(input);
        if (url.hostname.includes('youtube.com')) {
            return url.searchParams.get('v') || '';
        }
        if (url.hostname.includes('youtu.be')) {
            return url.pathname.slice(1).split('/')[0] || '';
        }
    } catch {
        // não é URL válida
    }
    return '';
}

function openEditor() {
    const workouts = getActiveWorkouts();
    // Deep copy do treino atual para edição
    editorWorkout = (workouts[currentTab] || []).map(ex => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        series: ex.series,
        yt_id: ex.yt_id || ''
    }));
    
    document.getElementById('editor-title').textContent = 'Editar Treino ' + currentTab;
    renderEditorList();
    document.getElementById('editor-dialog').showModal();
}

function closeEditor() {
    document.getElementById('editor-dialog').close();
}

function renderEditorList() {
    const body = document.getElementById('editor-body');
    body.innerHTML = '';
    
    // Seção: exercícios atuais
    const titleCurrent = document.createElement('div');
    titleCurrent.className = 'editor-section-title';
    titleCurrent.textContent = 'Exercícios do Treino ' + currentTab + ' (' + editorWorkout.length + ')';
    body.appendChild(titleCurrent);
    
    if (editorWorkout.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'history-empty';
        empty.textContent = 'Nenhum exercício. Adicione do catálogo ou crie um novo!';
        body.appendChild(empty);
    } else {
        const list = document.createElement('ul');
        list.className = 'editor-exercise-list';
        
        editorWorkout.forEach(function(ex, index) {
            const item = document.createElement('li');
            item.className = 'editor-exercise-item';
            item.draggable = true;
            item.dataset.index = index;

            // Drag handle
            const handle = document.createElement('div');
            handle.className = 'drag-handle';
            handle.innerHTML = '≡';
            item.appendChild(handle);
            
            // Eventos Drag & Drop
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('drop', handleDrop);
            item.addEventListener('dragend', handleDragEnd);
            
            // Info
            const info = document.createElement('div');
            info.className = 'editor-ex-info';
            
            const name = document.createElement('div');
            name.className = 'editor-ex-name';
            name.textContent = ex.name;
            
            const ytInfo = document.createElement('div');
            if (ex.yt_id) {
                ytInfo.className = 'editor-ex-yt';
                ytInfo.textContent = '🎥 ' + ex.yt_id;
            } else {
                ytInfo.className = 'editor-ex-yt no-video';
                ytInfo.textContent = 'Sem vídeo';
            }
            
            info.appendChild(name);
            info.appendChild(ytInfo);
            
            // Sets & Reps inputs (Container)
            const inputsWrap = document.createElement('div');
            inputsWrap.className = 'editor-inputs-wrap';

            const setsInput = document.createElement('input');
            setsInput.type = 'number';
            setsInput.className = 'editor-sets-input';
            setsInput.value = ex.sets || '';
            setsInput.placeholder = 'Sets';
            setsInput.title = 'Séries';
            setsInput.addEventListener('change', function() {
                editorWorkout[index].sets = parseInt(this.value) || 0;
            });

            const repsInput = document.createElement('input');
            repsInput.type = 'text';
            repsInput.className = 'editor-reps-input';
            repsInput.value = ex.reps || '';
            repsInput.placeholder = 'Reps';
            repsInput.title = 'Repetições';
            repsInput.addEventListener('change', function() {
                editorWorkout[index].reps = this.value;
            });

            inputsWrap.appendChild(setsInput);
            inputsWrap.appendChild(repsInput);
            
            // Edit YT button
            const btnEditYt = document.createElement('button');
            btnEditYt.type = 'button';
            btnEditYt.className = 'btn-edit-yt';
            btnEditYt.textContent = '🎥';
            btnEditYt.title = 'Editar link YouTube';
            btnEditYt.addEventListener('click', function(e) {
                e.preventDefault();
                openYtEditor(index);
            });
            
            // Remove button
            const btnRemove = document.createElement('button');
            btnRemove.type = 'button';
            btnRemove.className = 'btn-remove-ex';
            btnRemove.textContent = '✕';
            btnRemove.title = 'Remover exercício';
            btnRemove.addEventListener('click', function(e) {
                e.preventDefault();
                editorWorkout.splice(index, 1);
                renderEditorList();
            });
            
            item.appendChild(info);
            item.appendChild(inputsWrap);
            item.appendChild(btnEditYt);
            item.appendChild(btnRemove);
            list.appendChild(item);
        });
        
        body.appendChild(list);
    }
    
    // Botão: Adicionar do catálogo
    const btnCatalog = document.createElement('button');
    btnCatalog.type = 'button';
    btnCatalog.className = 'btn-add-from-catalog';
    btnCatalog.textContent = '📋 Adicionar do Catálogo';
    btnCatalog.addEventListener('click', function(e) {
        e.preventDefault();
        openCatalog();
    });
    body.appendChild(btnCatalog);
    
    // Seção: Criar exercício custom
    const titleCustom = document.createElement('div');
    titleCustom.className = 'editor-section-title';
    titleCustom.textContent = 'Criar Exercício';
    body.appendChild(titleCustom);
    
    const form = document.createElement('div');
    form.className = 'custom-exercise-form';
    
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.className = 'custom-input';
    inputName.id = 'custom-ex-name';
    inputName.placeholder = 'Nome do exercício';
    inputName.maxLength = 60;
    
    const inputsRow = document.createElement('div');
    inputsRow.className = 'editor-row';

    const inputSets = document.createElement('input');
    inputSets.type = 'number';
    inputSets.className = 'custom-input';
    inputSets.id = 'custom-ex-sets';
    inputSets.placeholder = 'Séries';
    
    const inputReps = document.createElement('input');
    inputReps.type = 'text';
    inputReps.className = 'custom-input';
    inputReps.id = 'custom-ex-reps';
    inputReps.placeholder = 'Reps (ex: 12)';
    
    inputsRow.appendChild(inputSets);
    inputsRow.appendChild(inputReps);
    
    const inputYt = document.createElement('input');
    inputYt.type = 'text';
    inputYt.className = 'custom-input';
    inputYt.id = 'custom-ex-yt';
    inputYt.placeholder = 'Link YouTube (opcional)';
    
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.className = 'btn-add-custom';
    btnAdd.textContent = '+ Adicionar Exercício';
    btnAdd.addEventListener('click', function(e) {
        e.preventDefault();
        addCustomExercise();
    });
    
    form.appendChild(inputName);
    form.appendChild(inputsRow);
    form.appendChild(inputYt);
    form.appendChild(btnAdd);
    body.appendChild(form);
    
    // Botão: Restaurar padrão
    const btnReset = document.createElement('button');
    btnReset.type = 'button';
    btnReset.className = 'btn-reset-defaults';
    btnReset.textContent = '↩ Restaurar treino padrão';
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        editorWorkout = TREINOS[currentTab].map(ex => ({
            id: ex.id, 
            name: ex.name, 
            sets: ex.sets, 
            reps: ex.reps, 
            yt_id: ex.yt_id || ''
        }));
        renderEditorList();
    });
    body.appendChild(btnReset);
}

function addCustomExercise() {
    const setsInput = document.getElementById('custom-ex-sets');
    const repsInput = document.getElementById('custom-ex-reps');
    const ytInput = document.getElementById('custom-ex-yt');
    
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.focus();
        return;
    }
    
    const sets = parseInt(setsInput.value) || 3;
    const reps = repsInput.value.trim() || '12';
    const ytId = extractYouTubeId(ytInput.value);
    
    editorWorkout.push({
        id: generateExerciseId(),
        name: name,
        sets: sets,
        reps: reps,
        yt_id: ytId
    });
    
    renderEditorList();
    
    // Scroll para o final
    const body = document.getElementById('editor-body');
    body.scrollTop = body.scrollHeight;
}

function saveEditor() {
    // Inicializa customTreinos se não existe
    if (!customTreinos) {
        customTreinos = {
            'A': TREINOS.A.map(ex => ({ id: ex.id, name: ex.name, sets: ex.sets, reps: ex.reps, yt_id: ex.yt_id || '' })),
            'B': TREINOS.B.map(ex => ({ id: ex.id, name: ex.name, sets: ex.sets, reps: ex.reps, yt_id: ex.yt_id || '' })),
            'C': TREINOS.C.map(ex => ({ id: ex.id, name: ex.name, sets: ex.sets, reps: ex.reps, yt_id: ex.yt_id || '' }))
        };
    }
    
    customTreinos[currentTab] = editorWorkout.map(ex => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        series: ex.series,
        yt_id: ex.yt_id || ''
    }));
    
    Storage.set('custom_treinos', customTreinos);
    closeEditor();
    renderExercises(currentTab);
    showDialog('✅', 'Treino salvo!', 'Seu Treino ' + currentTab + ' foi atualizado com ' + editorWorkout.length + ' exercícios.');
}

// ============================================
// MÓDULO: Editor de YouTube Link
// ============================================

function openYtEditor(index) {
    editingYtExerciseIndex = index;
    const ex = editorWorkout[index];
    document.getElementById('yt-dialog-title').textContent = ex.name;
    const input = document.getElementById('yt-link-input');
    input.value = ex.yt_id ? 'https://www.youtube.com/watch?v=' + ex.yt_id : '';
    document.getElementById('yt-dialog').showModal();
    input.focus();
}

function saveYtLink() {
    const input = document.getElementById('yt-link-input');
    const ytId = extractYouTubeId(input.value);
    
    if (editingYtExerciseIndex >= 0 && editingYtExerciseIndex < editorWorkout.length) {
        editorWorkout[editingYtExerciseIndex].yt_id = ytId;
    }
    
    document.getElementById('yt-dialog').close();
    renderEditorList();
}

function closeYtDialog() {
    document.getElementById('yt-dialog').close();
}

// ============================================
// MÓDULO: Catálogo de Exercícios
// ============================================

function openCatalog() {
    catalogSelectedGroup = 'Todos';
    document.getElementById('catalog-search').value = '';
    renderCatalogGroups();
    renderCatalogList();
    document.getElementById('catalog-dialog').showModal();
    document.getElementById('catalog-search').focus();
}

function closeCatalog() {
    document.getElementById('catalog-dialog').close();
}

function renderCatalogGroups() {
    const container = document.getElementById('catalog-groups');
    container.innerHTML = '';
    
    CATALOG_GROUPS.forEach(function(group) {
        const pill = document.createElement('button');
        pill.className = 'group-pill' + (group === catalogSelectedGroup ? ' active' : '');
        pill.textContent = group;
        pill.addEventListener('click', function() {
            catalogSelectedGroup = group;
            renderCatalogGroups();
            renderCatalogList();
        });
        container.appendChild(pill);
    });
}

function renderCatalogList() {
    const container = document.getElementById('catalog-list');
    const searchQuery = document.getElementById('catalog-search').value.toLowerCase().trim();
    container.innerHTML = '';
    
    // Nomes dos exercícios já no editor
    const addedNames = new Set(editorWorkout.map(ex => ex.name.toLowerCase()));
    
    let filtered = EXERCISE_CATALOG;
    
    // Filtrar por grupo
    if (catalogSelectedGroup !== 'Todos') {
        filtered = filtered.filter(ex => ex.group === catalogSelectedGroup);
    }
    
    // Filtrar por busca
    if (searchQuery) {
        filtered = filtered.filter(ex => ex.name.toLowerCase().includes(searchQuery));
    }
    
    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'catalog-empty';
        empty.textContent = 'Nenhum exercício encontrado.';
        container.appendChild(empty);
        return;
    }
    
    filtered.forEach(function(catalogEx) {
        const isAdded = addedNames.has(catalogEx.name.toLowerCase());
        const item = document.createElement('div');
        item.className = 'catalog-item' + (isAdded ? ' already-added' : '');
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'catalog-item-name';
        nameSpan.textContent = catalogEx.name;
        
        const groupSpan = document.createElement('span');
        groupSpan.className = 'catalog-item-group';
        groupSpan.textContent = catalogEx.group;
        
        item.appendChild(nameSpan);
        item.appendChild(groupSpan);
        
        if (!isAdded) {
            item.addEventListener('click', function() {
                addFromCatalog(catalogEx);
            });
        }
        
        container.appendChild(item);
    });
}

function addFromCatalog(catalogEx) {
    editorWorkout.push({
        id: generateExerciseId(),
        name: catalogEx.name,
        sets: 3,
        reps: '12',
        yt_id: ''
    });
    
    // Re-renderiza catálogo para marcar como adicionado
    renderCatalogList();
    // Re-renderiza editor em background
    renderEditorList();
    // Fecha o catálogo automaticamente para o usuário ver o exercício no editor e poder editar
    closeCatalog();
}

// ============================================
// MÓDULO: Inicialização
// ============================================

function initApp() {
    checkDayReset();
    updateStatsUI();
    // Timer events
    document.getElementById('btn-start').addEventListener('click', toggleTimer);
    document.getElementById('btn-reset').addEventListener('click', resetTimer);
    document.getElementById('mode-timer').addEventListener('click', () => switchTimerMode('timer'));
    document.getElementById('mode-stopwatch').addEventListener('click', () => switchTimerMode('stopwatch'));
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimerPreset(parseInt(this.dataset.seconds));
        });
    });
    
    renderExercises('A');
    
    // Marca preset padrão
    setTimerPreset(60);
    
    // Event listeners dos presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimerPreset(parseInt(this.dataset.seconds));
        });
    });
    
    // Event listeners dos tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Event listener do timer
    document.getElementById('btn-start').addEventListener('click', toggleTimer);
    document.getElementById('btn-reset').addEventListener('click', resetTimer);
    
    // Dialog close buttons
    document.getElementById('dialog-close-btn').addEventListener('click', closeDialog);
    document.getElementById('history-close-btn').addEventListener('click', closeHistoryDialog);
    
    // Fecha dialog ao clicar no backdrop
    document.getElementById('app-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeDialog();
    });
    document.getElementById('history-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeHistoryDialog();
    });
    
    // Editor events
    document.getElementById('btn-edit-workout').addEventListener('click', function(e) { e.preventDefault(); openEditor(); });
    document.getElementById('btn-close-editor').addEventListener('click', function(e) { e.preventDefault(); closeEditor(); });
    document.getElementById('editor-cancel-btn').addEventListener('click', function(e) { e.preventDefault(); closeEditor(); });
    document.getElementById('editor-save-btn').addEventListener('click', function(e) { e.preventDefault(); saveEditor(); });
    document.getElementById('editor-dialog').addEventListener('click', function(e) {
        if (e.target === this) { e.preventDefault(); closeEditor(); }
    });
    
    // Catalog events
    document.getElementById('catalog-close-btn').addEventListener('click', function(e) { e.preventDefault(); closeCatalog(); });
    document.getElementById('catalog-search').addEventListener('input', renderCatalogList);
    document.getElementById('catalog-dialog').addEventListener('click', function(e) {
        if (e.target === this) { e.preventDefault(); closeCatalog(); }
    });
    
    // YouTube link editor events
    document.getElementById('yt-save-btn').addEventListener('click', function(e) { e.preventDefault(); saveYtLink(); });
    document.getElementById('yt-cancel-btn').addEventListener('click', function(e) { e.preventDefault(); closeYtDialog(); });
    document.getElementById('yt-dialog').addEventListener('click', function(e) {
        if (e.target === this) { e.preventDefault(); closeYtDialog(); }
    });

    // Settings / Backup events
    const settingsBtn = document.getElementById('btn-settings');
    if(settingsBtn) settingsBtn.addEventListener('click', openSettings);
    
    document.getElementById('btn-close-settings').addEventListener('click', closeSettings);
    document.getElementById('settings-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeSettings();
    });

    document.getElementById('btn-export-backup').addEventListener('click', exportBackup);
    document.getElementById('input-import-backup').addEventListener('change', importBackup);

    // Celebration events
    document.getElementById('celeb-close-btn').addEventListener('click', closeCelebration);
    document.getElementById('celebration-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeCelebration();
    });
}

// ============================================
// MÓDULO: Celebração (Feedback de Sucesso)
// ============================================

function showCelebration() {
    const dialog = document.getElementById('celebration-dialog');
    if (!dialog || dialog.open) return;

    // Atualiza streak no modal
    const streakVal = document.getElementById('celeb-streak');
    if (streakVal) streakVal.textContent = statsData.streak || 0;

    dialog.showModal();
    startConfetti();
}

function closeCelebration() {
    const dialog = document.getElementById('celebration-dialog');
    if (dialog) dialog.close();
}

function startConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    
    const colors = ['#facc15', '#4facfe', '#ffffff', '#ff4b2b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posição e estilo aleatórios
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 4) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        // Animação aleatória
        const duration = Math.random() * 2 + 2; // 2s a 4s
        const delay = Math.random() * 0.5;
        confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;
        
        container.appendChild(confetti);
    }
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// ============================================
// MÓDULO: Instalação PWA Customizada
// ============================================
let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const btnInstall = document.getElementById('btn-install');
const btnInstallCancel = document.getElementById('btn-install-cancel');

// Intercepta o evento de instalação padrão
window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o mini-infobar padrão de aparecer no mobile
    e.preventDefault();
    // Salva o evento para acioná-lo depois
    deferredPrompt = e;
    
    // Mostra nosso banner customizado bonitão após 2 segundos
    setTimeout(() => {
        installBanner.classList.add('show');
    }, 2000);
});

// Ação de instalar
btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Esconde o banner
        installBanner.classList.remove('show');
        // Aciona o prompt nativo
        deferredPrompt.prompt();
        // Espera pela resposta do usuário
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do PWA');
        } else {
            console.log('Usuário recusou a instalação do PWA');
        }
        deferredPrompt = null;
    }
});

// Ação de cancelar
btnInstallCancel.addEventListener('click', () => {
    installBanner.classList.remove('show');
});

// Oculta se o app foi instalado com sucesso
window.addEventListener('appinstalled', () => {
    installBanner.classList.remove('show');
    deferredPrompt = null;
    console.log('PWA instalado');
});

// ============================================
// MÓDULO: Drag & Drop (Reordenação)
// ============================================

let draggedItemIndex = null;

function handleDragStart(e) {
    draggedItemIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    // Firefox precisa de setData para o drag funcionar
    e.dataTransfer.setData('text/plain', draggedItemIndex);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const targetIndex = parseInt(this.dataset.index);
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;
    
    // Reordena o array editorWorkout
    const itemToMove = editorWorkout.splice(draggedItemIndex, 1)[0];
    editorWorkout.splice(targetIndex, 0, itemToMove);
    
    renderEditorList();
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItemIndex = null;
    
    // Remove qualquer classe drag-over que tenha sobrado
    document.querySelectorAll('.editor-exercise-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

// ============================================
// MÓDULO: Configurações e Backup
// ============================================

function openSettings() {
    document.getElementById('settings-dialog').showModal();
}

function closeSettings() {
    document.getElementById('settings-dialog').close();
}

function exportBackup() {
    const backupData = {
        treino_data: Storage.get('treino_data', {}),
        treino_stats: Storage.get('treino_stats', { lastDate: null, totalDays: 0, streak: 0 }),
        treino_history: Storage.get('treino_history', {}),
        treino_check_date: Storage.get('treino_check_date', null),
        custom_treinos: Storage.get('custom_treinos', null),
        exportDate: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    
    // Nome do arquivo com data
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchorNode.setAttribute("download", `treino-abc-backup-${dateStr}.json`);
    
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validação básica do arquivo de backup
            if (data && typeof data === 'object') {
                if (data.treino_data) Storage.set('treino_data', data.treino_data);
                if (data.treino_stats) Storage.set('treino_stats', data.treino_stats);
                if (data.treino_history) Storage.set('treino_history', data.treino_history);
                if (data.treino_check_date) Storage.set('treino_check_date', data.treino_check_date);
                if (data.custom_treinos !== undefined) Storage.set('custom_treinos', data.custom_treinos);
                
                alert("✅ Backup restaurado com sucesso! O aplicativo será recarregado.");
                window.location.reload();
            } else {
                throw new Error("Formato inválido");
            }
        } catch (error) {
            alert("❌ Erro ao ler o arquivo de backup. Verifique se é um arquivo .json válido do Treino ABC.");
            console.error("Erro no importBackup:", error);
        }
        
        // Limpa o input para permitir importar o mesmo arquivo novamente se necessário
        event.target.value = '';
    };
    reader.readAsText(file);
}
