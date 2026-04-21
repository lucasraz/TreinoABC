/**
 * Dados dos treinos ABC — AURA FIT
 * Cada exercício tem: id único, nome, grupo muscular, séries, repetições, e ID do vídeo YouTube.
 */
const TREINOS = {
    'A': [
        { id: 'a1', name: 'Supino Reto', group: 'Peito', sets: 4, reps: '8-12', yt_id: 'sqOw2Y6uDWQ' },
        { id: 'a2', name: 'Supino Inclinado com halteres', group: 'Peito', sets: 3, reps: '8-12', yt_id: 'Fa-X2ByLHaY' },
        { id: 'a3', name: 'Peck Deck (Voador)', group: 'Peito', sets: 3, reps: '10-15', yt_id: 'vpHr5eIvEUE' },
        { id: 'a4', name: 'Desenvolvimento Halteres', group: 'Ombros', sets: 3, reps: '8-12', yt_id: 'DFXtzdXN_iY' },
        { id: 'a5', name: 'Elevação Lateral', group: 'Ombros', sets: 4, reps: '12-15', yt_id: '3VcKaXpzqRo' },
        { id: 'a6', name: 'Tríceps Pulley', group: 'Tríceps', sets: 3, reps: '10-12', yt_id: '5PPKThQuR3M' },
        { id: 'a7', name: 'Tríceps Testa', group: 'Tríceps', sets: 3, reps: '10-12', yt_id: '0jMF0o0DdbA' }
    ],
    'B': [
        { id: 'b1', name: 'Puxada Alta na Polia', group: 'Costas', sets: 4, reps: '8-12', yt_id: 'YywSCu4Y360' },
        { id: 'b2', name: 'Remada Baixa', group: 'Costas', sets: 3, reps: '8-12', yt_id: '3kqjkP7kqVM' },
        { id: 'b3', name: 'Remada Pronada Aberta', group: 'Costas', sets: 3, reps: '10-12', yt_id: 'mPocPp1cTRI' },
        { id: 'b4', name: 'Crucifixo Inverso', group: 'Ombros', sets: 3, reps: '12-15', yt_id: 'xbvVqbKvUBc' },
        { id: 'b5', name: 'Rosca Direta', group: 'Bíceps', sets: 4, reps: '8-12', yt_id: '0T7V5o9ypUw' },
        { id: 'b6', name: 'Rosca Scott', group: 'Bíceps', sets: 3, reps: '10-12', yt_id: 'faBk2akE0mQ' },
        { id: 'b7', name: 'Encolhimento de Ombros', group: 'Trapézio', sets: 4, reps: '12-15', yt_id: 'xYk3w0V3GWM' }
    ],
    'C': [
        { id: 'c1', name: 'Agachamento Livre', group: 'Pernas', sets: 4, reps: '8-12', yt_id: 'b82pQ7Ndfr8' },
        { id: 'c2', name: 'Leg Press 45º', group: 'Pernas', sets: 3, reps: '10-12', yt_id: 'DQ4-HXFlKXI' },
        { id: 'c3', name: 'Cadeira Extensora', group: 'Pernas', sets: 3, reps: '12-15', yt_id: 'jZdRin-YZVM' },
        { id: 'c4', name: 'Cadeira Flexora', group: 'Pernas', sets: 4, reps: '10-12', yt_id: 'c3cng1WqREQ' },
        { id: 'c5', name: 'Stiff', group: 'Pernas', sets: 3, reps: '10-12', yt_id: 'Vjtn6n_-sXo' },
        { id: 'c6', name: 'Panturrilha em Pé', group: 'Panturrilhas', sets: 4, reps: '15-20', yt_id: 'EILF4iyBxSQ' },
        { id: 'c7', name: 'Panturrilha Sentado', group: 'Panturrilhas', sets: 4, reps: '15-20', yt_id: 'ciTzpPbR2WY' }
    ]
};

const TREINO_LABELS = {
    'A': 'Peito / Ombros / Tríceps',
    'B': 'Costas / Bíceps / Trapézio',
    'C': 'Pernas / Panturrilhas'
};
