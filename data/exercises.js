/**
 * Dados dos treinos ABC.
 * Cada exercício tem: id único, nome, séries/repetições, e ID do vídeo YouTube.
 * 
 * Para adicionar um exercício, basta inserir um novo objeto no array do treino correspondente.
 */
const TREINOS = {
    'A': [
        { id: 'a1', name: 'Supino Reto', series: '4x 8-12 rep', yt_id: 'sqOw2Y6uDWQ' },
        { id: 'a2', name: 'Supino Inclinado com halteres', series: '3x 8-12 rep', yt_id: 'Fa-X2ByLHaY' },
        { id: 'a3', name: 'Peck Deck (Voador)', series: '3x 10-15 rep', yt_id: 'vpHr5eIvEUE' },
        { id: 'a4', name: 'Desenvolvimento Halteres', series: '3x 8-12 rep', yt_id: 'DFXtzdXN_iY' },
        { id: 'a5', name: 'Elevação Lateral', series: '4x 12-15 rep', yt_id: '3VcKaXpzqRo' },
        { id: 'a6', name: 'Tríceps Pulley', series: '3x 10-12 rep', yt_id: '5PPKThQuR3M' },
        { id: 'a7', name: 'Tríceps Testa', series: '3x 10-12 rep', yt_id: '0jMF0o0DdbA' }
    ],
    'B': [
        { id: 'b1', name: 'Puxada Alta na Polia', series: '4x 8-12 rep', yt_id: 'YywSCu4Y360' },
        { id: 'b2', name: 'Remada Baixa', series: '3x 8-12 rep', yt_id: '3kqjkP7kqVM' },
        { id: 'b3', name: 'Remada Pronada Aberta', series: '3x 10-12 rep', yt_id: 'mPocPp1cTRI' },
        { id: 'b4', name: 'Crucifixo Inverso', series: '3x 12-15 rep', yt_id: 'xbvVqbKvUBc' },
        { id: 'b5', name: 'Rosca Direta', series: '4x 8-12 rep', yt_id: '0T7V5o9ypUw' },
        { id: 'b6', name: 'Rosca Scott', series: '3x 10-12 rep', yt_id: 'faBk2akE0mQ' },
        { id: 'b7', name: 'Encolhimento de Ombros', series: '4x 12-15 rep', yt_id: 'xYk3w0V3GWM' }
    ],
    'C': [
        { id: 'c1', name: 'Agachamento Livre', series: '4x 8-12 rep', yt_id: 'b82pQ7Ndfr8' },
        { id: 'c2', name: 'Leg Press 45º', series: '3x 10-12 rep', yt_id: 'DQ4-HXFlKXI' },
        { id: 'c3', name: 'Cadeira Extensora', series: '3x 12-15 rep', yt_id: 'jZdRin-YZVM' },
        { id: 'c4', name: 'Cadeira Flexora', series: '4x 10-12 rep', yt_id: 'c3cng1WqREQ' },
        { id: 'c5', name: 'Stiff', series: '3x 10-12 rep', yt_id: 'Vjtn6n_-sXo' },
        { id: 'c6', name: 'Panturrilha em Pé', series: '4x 15-20 rep', yt_id: 'EILF4iyBxSQ' },
        { id: 'c7', name: 'Panturrilha Sentado', series: '4x 15-20 rep', yt_id: 'ciTzpPbR2WY' }
    ]
};

/** Labels amigáveis para cada treino */
const TREINO_LABELS = {
    'A': 'Peito / Ombro / Tríceps',
    'B': 'Costas / Bíceps / Trapézio',
    'C': 'Pernas / Panturrilha'
};
