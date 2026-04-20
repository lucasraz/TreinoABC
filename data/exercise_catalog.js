/**
 * Catálogo extenso de exercícios de musculação.
 * Organizados por grupo muscular.
 * 
 * Cada exercício tem:
 *   - name: Nome do exercício em português
 *   - group: Grupo muscular
 * 
 * Nota: YouTube IDs NÃO são incluídos no catálogo.
 * O usuário adiciona o link ao montar seu treino.
 */

const EXERCISE_CATALOG = [
    // ============================
    // PEITO
    // ============================
    { name: 'Supino Reto (Barra)', group: 'Peito' },
    { name: 'Supino Reto (Halteres)', group: 'Peito' },
    { name: 'Supino Inclinado (Barra)', group: 'Peito' },
    { name: 'Supino Inclinado (Halteres)', group: 'Peito' },
    { name: 'Supino Declinado (Barra)', group: 'Peito' },
    { name: 'Supino Declinado (Halteres)', group: 'Peito' },
    { name: 'Crucifixo Reto', group: 'Peito' },
    { name: 'Crucifixo Inclinado', group: 'Peito' },
    { name: 'Crucifixo Declinado', group: 'Peito' },
    { name: 'Peck Deck (Voador)', group: 'Peito' },
    { name: 'Crossover (Polia Alta)', group: 'Peito' },
    { name: 'Crossover (Polia Baixa)', group: 'Peito' },
    { name: 'Flexão de Braço', group: 'Peito' },
    { name: 'Flexão Diamante', group: 'Peito' },
    { name: 'Pullover', group: 'Peito' },
    { name: 'Chest Press (Máquina)', group: 'Peito' },
    { name: 'Supino na Smith', group: 'Peito' },

    // ============================
    // COSTAS
    // ============================
    { name: 'Puxada Alta Frontal (Aberta)', group: 'Costas' },
    { name: 'Puxada Alta (Pegada Fechada)', group: 'Costas' },
    { name: 'Puxada Alta (Triângulo)', group: 'Costas' },
    { name: 'Remada Curvada (Barra)', group: 'Costas' },
    { name: 'Remada Curvada (Haltere)', group: 'Costas' },
    { name: 'Remada Baixa (Polia)', group: 'Costas' },
    { name: 'Remada Cavalinho', group: 'Costas' },
    { name: 'Remada Unilateral (Haltere)', group: 'Costas' },
    { name: 'Remada Pronada Aberta', group: 'Costas' },
    { name: 'Remada na Smith', group: 'Costas' },
    { name: 'Remada T', group: 'Costas' },
    { name: 'Barra Fixa (Pull-up)', group: 'Costas' },
    { name: 'Barra Fixa Supinada (Chin-up)', group: 'Costas' },
    { name: 'Pulldown (Máquina)', group: 'Costas' },
    { name: 'Pullover na Polia', group: 'Costas' },
    { name: 'Levantamento Terra', group: 'Costas' },
    { name: 'Hiperextensão Lombar', group: 'Costas' },

    // ============================
    // OMBROS
    // ============================
    { name: 'Desenvolvimento Militar (Barra)', group: 'Ombros' },
    { name: 'Desenvolvimento (Halteres)', group: 'Ombros' },
    { name: 'Desenvolvimento na Smith', group: 'Ombros' },
    { name: 'Desenvolvimento Arnold', group: 'Ombros' },
    { name: 'Elevação Lateral (Halteres)', group: 'Ombros' },
    { name: 'Elevação Lateral na Polia', group: 'Ombros' },
    { name: 'Elevação Lateral (Máquina)', group: 'Ombros' },
    { name: 'Elevação Frontal (Halteres)', group: 'Ombros' },
    { name: 'Elevação Frontal (Barra)', group: 'Ombros' },
    { name: 'Crucifixo Inverso (Peck Deck)', group: 'Ombros' },
    { name: 'Crucifixo Inverso (Halteres)', group: 'Ombros' },
    { name: 'Face Pull', group: 'Ombros' },
    { name: 'Encolhimento de Ombros (Halteres)', group: 'Ombros' },
    { name: 'Encolhimento de Ombros (Barra)', group: 'Ombros' },
    { name: 'Remada Alta (Barra)', group: 'Ombros' },

    // ============================
    // BÍCEPS
    // ============================
    { name: 'Rosca Direta (Barra Reta)', group: 'Bíceps' },
    { name: 'Rosca Direta (Barra W)', group: 'Bíceps' },
    { name: 'Rosca Alternada (Halteres)', group: 'Bíceps' },
    { name: 'Rosca Martelo', group: 'Bíceps' },
    { name: 'Rosca Scott (Barra W)', group: 'Bíceps' },
    { name: 'Rosca Scott (Haltere)', group: 'Bíceps' },
    { name: 'Rosca Concentrada', group: 'Bíceps' },
    { name: 'Rosca no Cabo (Polia Baixa)', group: 'Bíceps' },
    { name: 'Rosca Inversa', group: 'Bíceps' },
    { name: 'Rosca 21', group: 'Bíceps' },
    { name: 'Rosca Spider', group: 'Bíceps' },
    { name: 'Rosca Inclinada', group: 'Bíceps' },

    // ============================
    // TRÍCEPS
    // ============================
    { name: 'Tríceps Pulley (Barra Reta)', group: 'Tríceps' },
    { name: 'Tríceps Pulley (Corda)', group: 'Tríceps' },
    { name: 'Tríceps Testa (Barra W)', group: 'Tríceps' },
    { name: 'Tríceps Testa (Halteres)', group: 'Tríceps' },
    { name: 'Tríceps Francês', group: 'Tríceps' },
    { name: 'Tríceps Coice (Kickback)', group: 'Tríceps' },
    { name: 'Tríceps Mergulho (Paralelas)', group: 'Tríceps' },
    { name: 'Tríceps Banco', group: 'Tríceps' },
    { name: 'Supino Fechado', group: 'Tríceps' },
    { name: 'Tríceps na Máquina', group: 'Tríceps' },

    // ============================
    // QUADRÍCEPS
    // ============================
    { name: 'Agachamento Livre (Barra)', group: 'Quadríceps' },
    { name: 'Agachamento Frontal', group: 'Quadríceps' },
    { name: 'Agachamento Hack', group: 'Quadríceps' },
    { name: 'Agachamento Smith', group: 'Quadríceps' },
    { name: 'Agachamento Búlgaro', group: 'Quadríceps' },
    { name: 'Agachamento Goblet', group: 'Quadríceps' },
    { name: 'Leg Press 45°', group: 'Quadríceps' },
    { name: 'Leg Press Horizontal', group: 'Quadríceps' },
    { name: 'Cadeira Extensora', group: 'Quadríceps' },
    { name: 'Avanço (Passada)', group: 'Quadríceps' },
    { name: 'Avanço no Smith', group: 'Quadríceps' },
    { name: 'Afundo', group: 'Quadríceps' },

    // ============================
    // POSTERIOR / GLÚTEOS
    // ============================
    { name: 'Stiff (Barra)', group: 'Posterior' },
    { name: 'Stiff (Halteres)', group: 'Posterior' },
    { name: 'Cadeira Flexora', group: 'Posterior' },
    { name: 'Mesa Flexora', group: 'Posterior' },
    { name: 'Levantamento Terra Romeno', group: 'Posterior' },
    { name: 'Elevação Pélvica (Hip Thrust)', group: 'Posterior' },
    { name: 'Abdução de Quadril (Máquina)', group: 'Posterior' },
    { name: 'Adução de Quadril (Máquina)', group: 'Posterior' },
    { name: 'Bom Dia (Good Morning)', group: 'Posterior' },
    { name: 'Glúteo na Polia', group: 'Posterior' },
    { name: 'Coice no Cabo', group: 'Posterior' },

    // ============================
    // PANTURRILHA
    // ============================
    { name: 'Panturrilha em Pé (Máquina)', group: 'Panturrilha' },
    { name: 'Panturrilha Sentado (Máquina)', group: 'Panturrilha' },
    { name: 'Panturrilha no Leg Press', group: 'Panturrilha' },
    { name: 'Panturrilha no Smith', group: 'Panturrilha' },
    { name: 'Panturrilha Unilateral', group: 'Panturrilha' },

    // ============================
    // ABDÔMEN / CORE
    // ============================
    { name: 'Abdominal Crunch', group: 'Abdômen' },
    { name: 'Abdominal Infra', group: 'Abdômen' },
    { name: 'Prancha Frontal', group: 'Abdômen' },
    { name: 'Prancha Lateral', group: 'Abdômen' },
    { name: 'Abdominal na Máquina', group: 'Abdômen' },
    { name: 'Abdominal no Cabo (Polia)', group: 'Abdômen' },
    { name: 'Elevação de Pernas (Barra)', group: 'Abdômen' },
    { name: 'Elevação de Pernas (Solo)', group: 'Abdômen' },
    { name: 'Russian Twist', group: 'Abdômen' },
    { name: 'Bicicleta (Abdominal)', group: 'Abdômen' },
    { name: 'Roda Abdominal (Ab Wheel)', group: 'Abdômen' },
    { name: 'Abdominal Oblíquo', group: 'Abdômen' },

    // ============================
    // ANTEBRAÇO
    // ============================
    { name: 'Rosca de Punho (Flexão)', group: 'Antebraço' },
    { name: 'Rosca de Punho (Extensão)', group: 'Antebraço' },
    { name: 'Roller de Punho', group: 'Antebraço' },
    { name: 'Farmer Walk', group: 'Antebraço' },

    // ============================
    // CARDIO / FUNCIONAL
    // ============================
    { name: 'Burpee', group: 'Cardio' },
    { name: 'Mountain Climber', group: 'Cardio' },
    { name: 'Jumping Jack', group: 'Cardio' },
    { name: 'Box Jump', group: 'Cardio' },
    { name: 'Corrida (Esteira)', group: 'Cardio' },
    { name: 'Bicicleta Ergométrica', group: 'Cardio' },
    { name: 'Elíptico', group: 'Cardio' },
    { name: 'Remo Ergométrico', group: 'Cardio' },
    { name: 'Corda Naval (Battle Rope)', group: 'Cardio' },
    { name: 'Kettlebell Swing', group: 'Cardio' },
    { name: 'Pular Corda', group: 'Cardio' }
];

/** Todos os grupos musculares disponíveis no catálogo */
const CATALOG_GROUPS = [
    'Todos', 'Peito', 'Costas', 'Ombros', 'Bíceps', 'Tríceps',
    'Quadríceps', 'Posterior', 'Panturrilha', 'Abdômen', 'Antebraço', 'Cardio'
];
