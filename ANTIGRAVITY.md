# 🚀 AURA FIT — Documento Vivo

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
| OpenRouter / OpenAI / Gemini | Integração com AI Coach para geração de treinos |

## Estrutura do Projeto
- `index.html`: Estrutura HTML e metadados PWA
- `styles.css`: Design system (glassmorphism) e responsividade
- `app.js`: Lógica principal, PWA e IA
- `data/exercises.js`: Dados dos treinos padrão
- `data/exercise_catalog.js`: Catálogo de 126 exercícios base
- `manifest.json`: Manifesto PWA v28 (AURA FIT)
- `sw.js`: Service Worker v28 (Cache-first + Offline fallback)
- `ANTIGRAVITY.md`: Documentação viva (Tech Stack e Patterns)

## Design Patterns
- **Separação de responsabilidades**: Arquivos distintos para estrutura, estilo e lógica.
- **Dados desacoplados**: Exercícios e catálogos em arquivos `data/` separados.
- **Módulo de Storage**: Wrapper para `localStorage` com tratamento de erros.
- **Validação de Schema**: Dados do `localStorage` são validados antes do uso para evitar crashes.
- **Dialog nativo**: Uso extensivo da API `<dialog>` para uma experiência de sistema.

## Versão Atual: v41
- [x] **Extreme QR Minification** - v40: Otimização extrema de minificação de dados para QR Code e exportação de arquivos.
- [x] **v41**: Correção de cache (SW v30), robustez na construção de URLs de compartilhamento e logs de debug para diagnóstico.
- [x] **File Share Compatibility**: Alterado MIME type para `text/plain` e melhorado o fallback de download para casos onde `navigator.share` falha.
- [x] **Import IDs**: Geração de novos IDs únicos na importação para evitar colisões com treinos existentes.

## Funcionalidades
- [x] **AI Coach**: Geração de treinos via IA.
- [x] **Divisões Dinâmicas**: Suporta A, AB, ABC, ABCD, ABCDE e CUSTOM.
- [x] **Compartilhamento Offline v2**: QR Code ultra-otimizado e Arquivo .aura com instruções claras.
