/**
 * Dados dos treinos ABC.
 * Cada exercício tem: id único, nome, séries, repetições, e ID do vídeo YouTube.
 */
const TREINOS = {
    'A': [
        { id: 'a1', name: 'Supino Reto', sets: 4, reps: '8-12', yt_id: 'sqOw2Y6uDWQ' },
        { id: 'a2', name: 'Supino Inclinado com halteres', sets: 3, reps: '8-12', yt_id: 'Fa-X2ByLHaY' },
        { id: 'a3', name: 'Peck Deck (Voador)', sets: 3, reps: '10-15', yt_id: 'vpHr5eIvEUE' },
        { id: 'a4', name: 'Desenvolvimento Halteres', sets: 3, reps: '8-12', yt_id: 'DFXtzdXN_iY' },
        { id: 'a5', name: 'Elevação Lateral', sets: 4, reps: '12-15', yt_id: '3VcKaXpzqRo' },
        { id: 'a6', name: 'Tríceps Pulley', sets: 3, reps: '10-12', yt_id: '5PPKThQuR3M' },
        { id: 'a7', name: 'Tríceps Testa', sets: 3, reps: '10-12', yt_id: '0jMF0o0DdbA' }
    ],
    'B': [
        { id: 'b1', name: 'Puxada Alta na Polia', sets: 4, reps: '8-12', yt_id: 'YywSCu4Y360' },
        { id: 'b2', name: 'Remada Baixa', sets: 3, reps: '8-12', yt_id: '3kqjkP7kqVM' },
        { id: 'b3', name: 'Remada Pronada Aberta', sets: 3, reps: '10-12', yt_id: 'mPocPp1cTRI' },
        { id: 'b4', name: 'Crucifixo Inverso', sets: 3, reps: '12-15', yt_id: 'xbvVqbKvUBc' },
        { id: 'b5', name: 'Rosca Direta', sets: 4, reps: '8-12', yt_id: '0T7V5o9ypUw' },
        { id: 'b6', name: 'Rosca Scott', sets: 3, reps: '10-12', yt_id: 'faBk2akE0mQ' },
        { id: 'b7', name: 'Encolhimento de Ombros', sets: 4, reps: '12-15', yt_id: 'xYk3w0V3GWM' }
    ],
    'C': [
        { id: 'c1', name: 'Agachamento Livre', sets: 4, reps: '8-12', yt_id: 'b82pQ7Ndfr8' },
        { id: 'c2', name: 'Leg Press 45º', sets: 3, reps: '10-12', yt_id: 'DQ4-HXFlKXI' },
        { id: 'c3', name: 'Cadeira Extensora', sets: 3, reps: '12-15', yt_id: 'jZdRin-YZVM' },
        { id: 'c4', name: 'Cadeira Flexora', sets: 4, reps: '10-12', yt_id: 'c3cng1WqREQ' },
        { id: 'c5', name: 'Stiff', sets: 3, reps: '10-12', yt_id: 'Vjtn6n_-sXo' },
        { id: 'c6', name: 'Panturrilha em Pé', sets: 4, reps: '15-20', yt_id: 'EILF4iyBxSQ' },
        { id: 'c7', name: 'Panturrilha Sentado', sets: 4, reps: '15-20', yt_id: 'ciTzpPbR2WY' }
    ]
};

const TREINO_LABELS = {
    'A': 'Peito / Ombro / Tríceps',
    'B': 'Costas / Bíceps / Trapézio',
    'C': 'Pernas / Panturrilha'
};
