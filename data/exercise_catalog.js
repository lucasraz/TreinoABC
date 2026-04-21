/**
 * Catálogo extenso de exercícios de musculação.
 * Organizados por grupo muscular.
 * 
 * Cada exercício tem:
 *   - name: Nome do exercício em português
 *   - group: Grupo muscular
 *   - met: Equivalente metabólico aproximado
 * 
 * Nota: YouTube IDs NÃO são incluídos no catálogo.
 * O usuário adiciona o link ao montar seu treino.
 */

const EXERCISE_CATALOG = [
    // ============================
    // PEITO
    // ============================
    { name: 'Supino Reto (Barra)', group: 'Peito', met: 6.0 },
    { name: 'Supino Reto (Halteres)', group: 'Peito', met: 6.0 },
    { name: 'Supino Inclinado (Barra)', group: 'Peito', met: 6.0 },
    { name: 'Supino Inclinado (Halteres)', group: 'Peito', met: 6.0 },
    { name: 'Supino Declinado (Barra)', group: 'Peito', met: 5.5 },
    { name: 'Supino Declinado (Halteres)', group: 'Peito', met: 5.5 },
    { name: 'Crucifixo Reto', group: 'Peito', met: 3.5 },
    { name: 'Crucifixo Inclinado', group: 'Peito', met: 3.5 },
    { name: 'Crucifixo Declinado', group: 'Peito', met: 3.5 },
    { name: 'Peck Deck (Voador)', group: 'Peito', met: 3.5 },
    { name: 'Crossover (Polia Alta)', group: 'Peito', met: 4.0 },
    { name: 'Crossover (Polia Baixa)', group: 'Peito', met: 4.0 },
    { name: 'Flexão de Braço', group: 'Peito', met: 5.0 },
    { name: 'Flexão Diamante', group: 'Peito', met: 5.0 },
    { name: 'Pullover', group: 'Peito', met: 4.0 },
    { name: 'Chest Press (Máquina)', group: 'Peito', met: 4.5 },
    { name: 'Supino na Smith', group: 'Peito', met: 5.5 },

    // ============================
    // COSTAS
    // ============================
    { name: 'Puxada Alta Frontal (Aberta)', group: 'Costas', met: 4.5 },
    { name: 'Puxada Alta (Pegada Fechada)', group: 'Costas', met: 4.5 },
    { name: 'Puxada Alta (Triângulo)', group: 'Costas', met: 4.5 },
    { name: 'Remada Curvada (Barra)', group: 'Costas', met: 6.0 },
    { name: 'Remada Curvada (Haltere)', group: 'Costas', met: 6.0 },
    { name: 'Remada Baixa (Polia)', group: 'Costas', met: 4.5 },
    { name: 'Remada Cavalinho', group: 'Costas', met: 5.5 },
    { name: 'Remada Unilateral (Haltere)', group: 'Costas', met: 5.0 },
    { name: 'Remada Pronada Aberta', group: 'Costas', met: 5.0 },
    { name: 'Remada na Smith', group: 'Costas', met: 5.0 },
    { name: 'Remada T', group: 'Costas', met: 5.5 },
    { name: 'Barra Fixa (Pull-up)', group: 'Costas', met: 7.0 },
    { name: 'Barra Fixa Supinada (Chin-up)', group: 'Costas', met: 7.0 },
    { name: 'Pulldown (Máquina)', group: 'Costas', met: 4.0 },
    { name: 'Pullover na Polia', group: 'Costas', met: 4.0 },
    { name: 'Levantamento Terra', group: 'Costas', met: 7.5 },
    { name: 'Hiperextensão Lombar', group: 'Costas', met: 3.5 },

    // ============================
    // OMBROS
    // ============================
    { name: 'Desenvolvimento Militar (Barra)', group: 'Ombros', met: 6.0 },
    { name: 'Desenvolvimento (Halteres)', group: 'Ombros', met: 6.0 },
    { name: 'Desenvolvimento na Smith', group: 'Ombros', met: 5.5 },
    { name: 'Desenvolvimento Arnold', group: 'Ombros', met: 5.5 },
    { name: 'Elevação Lateral (Halteres)', group: 'Ombros', met: 3.5 },
    { name: 'Elevação Lateral na Polia', group: 'Ombros', met: 3.5 },
    { name: 'Elevação Lateral (Máquina)', group: 'Ombros', met: 3.5 },
    { name: 'Elevação Frontal (Halteres)', group: 'Ombros', met: 3.5 },
    { name: 'Elevação Frontal (Barra)', group: 'Ombros', met: 3.5 },
    { name: 'Crucifixo Inverso (Peck Deck)', group: 'Ombros', met: 3.5 },
    { name: 'Crucifixo Inverso (Halteres)', group: 'Ombros', met: 3.5 },
    { name: 'Face Pull', group: 'Ombros', met: 3.5 },
    { name: 'Encolhimento de Ombros (Halteres)', group: 'Ombros', met: 3.5 },
    { name: 'Encolhimento de Ombros (Barra)', group: 'Ombros', met: 3.5 },
    { name: 'Remada Alta (Barra)', group: 'Ombros', met: 4.5 },

    // ============================
    // BÍCEPS
    // ============================
    { name: 'Rosca Direta (Barra Reta)', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Direta (Barra W)', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Alternada (Halteres)', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Martelo', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Scott (Barra W)', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Scott (Haltere)', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Concentrada', group: 'Bíceps', met: 3.0 },
    { name: 'Rosca no Cabo (Polia Baixa)', group: 'Bíceps', met: 3.0 },
    { name: 'Rosca Inversa', group: 'Bíceps', met: 3.0 },
    { name: 'Rosca 21', group: 'Bíceps', met: 4.0 },
    { name: 'Rosca Spider', group: 'Bíceps', met: 3.5 },
    { name: 'Rosca Inclinada', group: 'Bíceps', met: 3.5 },

    // ============================
    // TRÍCEPS
    // ============================
    { name: 'Tríceps Pulley (Barra Reta)', group: 'Tríceps', met: 3.5 },
    { name: 'Tríceps Pulley (Corda)', group: 'Tríceps', met: 3.5 },
    { name: 'Tríceps Testa (Barra W)', group: 'Tríceps', met: 4.0 },
    { name: 'Tríceps Testa (Halteres)', group: 'Tríceps', met: 4.0 },
    { name: 'Tríceps Francês', group: 'Tríceps', met: 3.5 },
    { name: 'Tríceps Coice (Kickback)', group: 'Tríceps', met: 3.0 },
    { name: 'Tríceps Mergulho (Paralelas)', group: 'Tríceps', met: 6.0 },
    { name: 'Tríceps Banco', group: 'Tríceps', met: 4.5 },
    { name: 'Supino Fechado', group: 'Tríceps', met: 5.5 },
    { name: 'Tríceps na Máquina', group: 'Tríceps', met: 3.5 },

    // ============================
    // QUADRÍCEPS
    // ============================
    { name: 'Agachamento Livre (Barra)', group: 'Quadríceps', met: 7.0 },
    { name: 'Agachamento Frontal', group: 'Quadríceps', met: 7.0 },
    { name: 'Agachamento Hack', group: 'Quadríceps', met: 6.0 },
    { name: 'Agachamento Smith', group: 'Quadríceps', met: 6.0 },
    { name: 'Agachamento Búlgaro', group: 'Quadríceps', met: 6.5 },
    { name: 'Agachamento Goblet', group: 'Quadríceps', met: 5.5 },
    { name: 'Leg Press 45°', group: 'Quadríceps', met: 5.5 },
    { name: 'Leg Press Horizontal', group: 'Quadríceps', met: 4.5 },
    { name: 'Cadeira Extensora', group: 'Quadríceps', met: 3.5 },
    { name: 'Avanço (Passada)', group: 'Quadríceps', met: 6.0 },
    { name: 'Avanço no Smith', group: 'Quadríceps', met: 5.5 },
    { name: 'Afundo', group: 'Quadríceps', met: 6.0 },

    // ============================
    // POSTERIOR / GLÚTEOS
    // ============================
    { name: 'Stiff (Barra)', group: 'Posterior', met: 6.0 },
    { name: 'Stiff (Halteres)', group: 'Posterior', met: 6.0 },
    { name: 'Cadeira Flexora', group: 'Posterior', met: 3.5 },
    { name: 'Mesa Flexora', group: 'Posterior', met: 3.5 },
    { name: 'Levantamento Terra Romeno', group: 'Posterior', met: 6.5 },
    { name: 'Elevação Pélvica (Hip Thrust)', group: 'Posterior', met: 5.5 },
    { name: 'Abdução de Quadril (Máquina)', group: 'Posterior', met: 3.0 },
    { name: 'Adução de Quadril (Máquina)', group: 'Posterior', met: 3.0 },
    { name: 'Bom Dia (Good Morning)', group: 'Posterior', met: 5.0 },
    { name: 'Glúteo na Polia', group: 'Posterior', met: 3.5 },
    { name: 'Coice no Cabo', group: 'Posterior', met: 3.5 },

    // ============================
    // PANTURRILHA
    // ============================
    { name: 'Panturrilha em Pé (Máquina)', group: 'Panturrilha', met: 3.5 },
    { name: 'Panturrilha Sentado (Máquina)', group: 'Panturrilha', met: 3.0 },
    { name: 'Panturrilha no Leg Press', group: 'Panturrilha', met: 4.0 },
    { name: 'Panturrilha no Smith', group: 'Panturrilha', met: 4.0 },
    { name: 'Panturrilha Unilateral', group: 'Panturrilha', met: 3.5 },

    // ============================
    // ABDÔMEN / CORE
    // ============================
    { name: 'Abdominal Crunch', group: 'Abdômen', met: 3.0 },
    { name: 'Abdominal Infra', group: 'Abdômen', met: 3.0 },
    { name: 'Prancha Frontal', group: 'Abdômen', met: 3.5 },
    { name: 'Prancha Lateral', group: 'Abdômen', met: 3.5 },
    { name: 'Abdominal na Máquina', group: 'Abdômen', met: 3.0 },
    { name: 'Abdominal no Cabo (Polia)', group: 'Abdômen', met: 3.5 },
    { name: 'Elevação de Pernas (Barra)', group: 'Abdômen', met: 4.5 },
    { name: 'Elevação de Pernas (Solo)', group: 'Abdômen', met: 3.5 },
    { name: 'Russian Twist', group: 'Abdômen', met: 4.0 },
    { name: 'Bicicleta (Abdominal)', group: 'Abdômen', met: 4.0 },
    { name: 'Roda Abdominal (Ab Wheel)', group: 'Abdômen', met: 4.5 },
    { name: 'Abdominal Oblíquo', group: 'Abdômen', met: 3.0 },

    // ============================
    // ANTEBRAÇO
    // ============================
    { name: 'Rosca de Punho (Flexão)', group: 'Antebraço', met: 2.5 },
    { name: 'Rosca de Punho (Extensão)', group: 'Antebraço', met: 2.5 },
    { name: 'Roller de Punho', group: 'Antebraço', met: 3.0 },
    { name: 'Farmer Walk', group: 'Antebraço', met: 6.0 },

    // ============================
    // CARDIO / FUNCIONAL
    // ============================
    { name: 'Burpee', group: 'Cardio', met: 10.0 },
    { name: 'Mountain Climber', group: 'Cardio', met: 8.0 },
    { name: 'Jumping Jack', group: 'Cardio', met: 8.0 },
    { name: 'Box Jump', group: 'Cardio', met: 9.0 },
    { name: 'Corrida (Esteira)', group: 'Cardio', met: 9.0 },
    { name: 'Bicicleta Ergométrica', group: 'Cardio', met: 7.0 },
    { name: 'Elíptico', group: 'Cardio', met: 6.0 },
    { name: 'Remo Ergométrico', group: 'Cardio', met: 8.0 },
    { name: 'Corda Naval (Battle Rope)', group: 'Cardio', met: 10.0 },
    { name: 'Kettlebell Swing', group: 'Cardio', met: 9.0 },
    { name: 'Pular Corda', group: 'Cardio', met: 11.0 }
];

/** Todos os grupos musculares disponíveis no catálogo */
const CATALOG_GROUPS = [
    'Todos', 'Peito', 'Costas', 'Ombros', 'Bíceps', 'Tríceps',
    'Quadríceps', 'Posterior', 'Panturrilha', 'Abdômen', 'Antebraço', 'Cardio'
];
