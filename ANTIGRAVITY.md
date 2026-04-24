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

## Versão Atual: v39 (Sharing Pro Fix)
- [x] **AI Coach Pro**: Suporte a prompts complexos, técnicas avançadas (Drop-set, Rest-pause) e dicas estruturadas.
- [x] **Dicas do Coach**: Card colapsável no topo dos treinos para orientações gerais.
- [x] **Data Schema Update**: Exercícios agora suportam o campo `obs` (string) para observações técnicas.
- [x] **Compartilhamento Pro v2**: 
    - ~~Link Base64~~: Removido conforme solicitado para focar em métodos offline.
    - **Arquivo .aura**: Exportação com instruções embutidas e fluxo de importação simplificado.
    - **QR Code Fix**: Aprimoramento da densidade de dados e validação de tamanho para garantir leitura.
- [x] **Fix Encoding**: Normalização de codificação UTF-8 para evitar caracteres corrompidos na interface.

## Funcionalidades
- [x] **AI Coach**: Geração de treinos via IA.
- [x] **Divisões Dinâmicas**: Suporta A, AB, ABC, ABCD, ABCDE e CUSTOM.
- [x] **Compartilhamento Offline**: Envio via QR Code ou Arquivo .aura (com suporte a vídeos).
