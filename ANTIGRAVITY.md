# 🏋️ Treino ABC — Documento Vivo

## Visão Geral
App web para acompanhamento de treinos de musculação no formato ABC (Peito/Ombro/Tríceps, Costas/Bíceps/Trapézio, Pernas/Panturrilha).

## Tech Stack
| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 (Vanilla) | Estilização com variáveis CSS e animações |
| JavaScript (Vanilla ES6+) | Lógica do app |
| Plyr.js 3.7.8 | Player de vídeo YouTube embutido |
| localStorage | Persistência de dados (carga, streaks, histórico, treinos customizados) |
| PWA (Service Worker) | Instalação e uso offline |

## Estrutura do Projeto
```
/Treino ABC
├── index.html              ← Estrutura HTML
├── styles.css              ← Estilos e animações
├── app.js                  ← Lógica principal
├── data/
│   ├── exercises.js        ← Dados dos treinos padrão
│   └── exercise_catalog.js ← Catálogo de 126 exercícios
├── tests/
│   └── app.test.html       ← 59 testes automatizados
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline)
└── ANTIGRAVITY.md          ← Este documento
```

## Design Patterns
- **Separação de responsabilidades**: HTML, CSS e JS em arquivos distintos
- **Dados desacoplados**: Exercícios em arquivo separado (`data/exercises.js`)
- **Catálogo extenso**: 126 exercícios em 11 grupos (`data/exercise_catalog.js`)
- **Módulo de Storage**: Funções centralizadas para ler/salvar localStorage
- **Dialog nativo**: `<dialog>` em vez de `alert()` para notificações
- **Default + Override**: Treinos padrão no código, customizações salvas no localStorage

## Variáveis de Ambiente
Nenhuma — app 100% client-side com localStorage.

## Chaves de localStorage
| Chave | Tipo | Descrição |
|---|---|---|
| `treino_data` | Object | Carga e check de cada exercício |
| `treino_stats` | Object | Streak, total de dias, última data |
| `treino_history` | Object | Histórico de cargas (90 dias max) |
| `treino_check_date` | String | Data do último reset de checks |
| `custom_treinos` | Object/null | Treinos customizados (null = usar padrão) |

## Funcionalidades
- [x] Treinos A/B/C com tabs
- [x] Timer de descanso configurável (presets 30/60/90/120s)
- [x] Feedback sonoro no timer (Web Audio API)
- [x] Salvar carga por exercício (input numérico validado)
- [x] Histórico de evolução de cargas
- [x] Sistema de streak (sequência de dias)
- [x] Barra de progresso por treino
- [x] Auto-reset de checks por dia
- [x] Vídeos YouTube com Plyr
- [x] Modais nativos (`<dialog>`)
- [x] PWA instalável + offline
- [x] Design premium (Inter font, glassmorphism, micro-animações)
- [x] **Editor de treinos** (adicionar/remover exercícios)
- [x] **Catálogo de 126 exercícios** organizados por grupo muscular
- [x] **Exercícios customizados** (criar exercícios que não existem no catálogo)
- [x] **Links YouTube editáveis** (colar link completo ou ID)
- [x] **Restaurar treino padrão** (botão de reset no editor)

## Decisões Arquiteturais
1. **Single-page sem framework**: App simples, sem necessidade de React/Vue
2. **localStorage**: Dados ficam no dispositivo, sem backend
3. **PWA**: Permite instalar como app nativo no celular
4. **Plyr.js via CDN**: Player leve, sem build step
5. **Default + Override para treinos**: TREINOS no código é o padrão; customizações ficam em `custom_treinos` no localStorage. Se o usuário nunca editou, usa o padrão.
6. **extractYouTubeId()**: Aceita URL completa, URL curta (youtu.be) ou ID direto — flexível para qualquer formato de input

## Segurança
- Input de carga com `type="number"` e validação
- Uso de `textContent` para dados dinâmicos (prevenção XSS)
- Input de texto com `maxLength` para evitar abuse
- Dados sensíveis: nenhum (apenas treinos pessoais)
