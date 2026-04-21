# 🏋️ AURA FIT — Documento Vivo

## Visão Geral
App web para acompanhamento de treinos de musculação no formato personalizável (A, AB, ABC, ABCD, ABCDE). Foco em simplicidade, privacidade e acompanhamento de cargas.

## Tech Stack
| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 (Vanilla) | Estilização com variáveis CSS, glassmorphism e animações |
| JavaScript (Vanilla ES6+) | Lógica do app e gerenciamento de estado |
| Plyr.js 3.7.8 | Player de vídeo YouTube embutido |
| localStorage | Persistência de dados (carga, streaks, histórico, treinos customizados, chaves de IA) |
| PWA (Service Worker) | Instalação v28 e uso offline robusto |
| OpenRouter / OpenAI | Integração com AI Coach para geração de treinos |

## Estrutura do Projeto
```
/AURA-FIT
├── index.html              ← Estrutura HTML e metadados PWA
├── styles.css              ← Design system (glassmorphism) e responsividade
├── app.js                  ← Lógica principal, PWA e IA
├── data/
│   ├── exercises.js        ← Dados dos treinos padrão
│   └── exercise_catalog.js ← Catálogo de 126 exercícios base
├── tests/
│   └── app.test.html       ← Suite de testes automatizados
├── manifest.json           ← Manifesto PWA v28 (AURA FIT)
├── sw.js                   ← Service Worker v28 (Cache-first + Offline fallback)
└── ANTIGRAVITY.md          ← Documentação viva (Tech Stack e Patterns)
```

## Design Patterns
- **Separação de responsabilidades**: Arquivos distintos para estrutura, estilo e lógica.
- **Dados desacoplados**: Exercícios e catálogos em arquivos `data/` separados.
- **Módulo de Storage**: Wrapper para `localStorage` com tratamento de erros.
- **Validação de Schema**: Dados do `localStorage` são validados antes do uso para evitar crashes.
- **Dialog nativo**: Uso extensivo da API `<dialog>` para uma experiência de sistema.
- **Rebranding v24-v28**: Transição completa de A-FIT para AURA FIT, com logotipo transparente e identidade visual premium.

## Versão Atual: v36
- [x] **UX (High Priority Play Icon)**: Reforço dos estilos do player de vídeo com `!important` para garantir que o triângulo de play seja visível (preto) sobre a bolinha amarela.
- [x] **UX (Player Contrast)**: Ajuste do contraste do botão de play no player de vídeo.
- [x] **Inicialização**: Consolidação do fluxo de boot do app em `initApp` para evitar conflitos de eventos.
- [x] **Bug Fix**: Correção de erro de referência (`nameInput`) na criação de exercícios customizados.
- [x] **Estabilidade**: Verificação de existência de elementos DOM antes de adicionar listeners.

## Funcionalidades
- [x] **AI Coach**: Geração de treinos via IA (OpenRouter/OpenAI).
- [x] **Divisões Dinâmicas**: Suporta A, AB, ABC, ABCD, ABCDE e CUSTOM.
- [x] **Métricas de Sessão**: Cálculo de Tonelagem e Kcal estimadas.
- [x] **Timer Integrado**: Cronômetro e Timer com sons e presets.
- [x] **Evolução de Cargas**: Histórico visual e persistente.
- [x] **Instalação PWA**: Funciona offline e instalável em Android/iOS.
- [x] **Backup/Restauração**: Exportação e importação de dados em JSON.

## Segurança
- **CSP (Content Security Policy)**: Rigorosa para prevenir XSS e injeção de scripts.
- **Privacidade**: Sem backend. Dados salvos 100% no dispositivo do usuário.
- **AI Keys**: Chaves de API salvas apenas localmente (nunca transitam por servidores do app).

## Decisões Arquiteturais Recentes
1. **PWA v28**: Uso de caminhos absolutos (`/`) para garantir que o manifesto seja aceito por todos os navegadores móveis.
2. **Branding**: O nome AURA FIT reflete a nova identidade visual dourada/prata com logo transparente.
3. **Robustez Offline**: O Service Worker v28 possui um fallback de navegação que redireciona para a home em caso de falha de rede.
