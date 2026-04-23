# ðŸ�‹ï¸� AURA FIT â€” Documento Vivo

## VisÃ£o Geral
App web para acompanhamento de treinos de musculaÃ§Ã£o no formato personalizÃ¡vel (A, AB, ABC, ABCD, ABCDE). Foco em simplicidade, privacidade e acompanhamento de cargas.

## Tech Stack
| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semÃ¢ntica |
| CSS3 (Vanilla) | EstilizaÃ§Ã£o com variÃ¡veis CSS, glassmorphism e animaÃ§Ãµes |
| JavaScript (Vanilla ES6+) | LÃ³gica do app e gerenciamento de estado |
| Plyr.js 3.7.8 | Player de vÃ­deo YouTube embutido |
| localStorage | PersistÃªncia de dados (carga, streaks, histÃ³rico, treinos customizados, chaves de IA) |
| PWA (Service Worker) | InstalaÃ§Ã£o v28 e uso offline robusto |
| OpenRouter / OpenAI | IntegraÃ§Ã£o com AI Coach para geraÃ§Ã£o de treinos |

## Estrutura do Projeto
```
/AURA-FIT
â”œâ”€â”€ index.html              â†� Estrutura HTML e metadados PWA
â”œâ”€â”€ styles.css              â†� Design system (glassmorphism) e responsividade
â”œâ”€â”€ app.js                  â†� LÃ³gica principal, PWA e IA
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ exercises.js        â†� Dados dos treinos padrÃ£o
â”‚   â””â”€â”€ exercise_catalog.js â†� CatÃ¡logo de 126 exercÃ­cios base
â”œâ”€â”€ tests/
â”‚   â””â”€â”€ app.test.html       â†� Suite de testes automatizados
â”œâ”€â”€ manifest.json           â†� Manifesto PWA v28 (AURA FIT)
â”œâ”€â”€ sw.js                   â†� Service Worker v28 (Cache-first + Offline fallback)
â””â”€â”€ ANTIGRAVITY.md          â†� DocumentaÃ§Ã£o viva (Tech Stack e Patterns)
```

## Design Patterns
- **SeparaÃ§Ã£o de responsabilidades**: Arquivos distintos para estrutura, estilo e lÃ³gica.
- **Dados desacoplados**: ExercÃ­cios e catÃ¡logos em arquivos `data/` separados.
- **MÃ³dulo de Storage**: Wrapper para `localStorage` com tratamento de erros.
- **ValidaÃ§Ã£o de Schema**: Dados do `localStorage` sÃ£o validados antes do uso para evitar crashes.
- **Dialog nativo**: Uso extensivo da API `<dialog>` para uma experiÃªncia de sistema.
- **Rebranding v24-v28**: TransiÃ§Ã£o completa de A-FIT para AURA FIT, com logotipo transparente e identidade visual premium.

## VersÃ£o Atual: v38
- [x] **AI Coach Pro**: Suporte a prompts detalhados com inclusÃ£o automÃ¡tica de tÃ©cnicas avanÃ§adas (Drop-sets, Rest-pause) no campo `obs`.
- [x] **Dicas do Coach**: Novo sistema de dicas gerais (frequÃªncia, volume) exibidas no topo dos treinos.
- [x] **Data Schema Update**: ExercÃ­cios agora suportam o campo `obs` (string) para observaÃ§Ãµes tÃ©cnicas.
- [x] **UI/UX**: Novo componente `.coach-tips-card` e renderizaÃ§Ã£o de `.ex-obs` nos cards de exercÃ­cios.

## HistÃ³rico de VersÃµes
### v37
- [x] **UI (Dark Play Button)**: Nova abordagem para o botÃ£o de play: fundo escuro semi-transparente com Ã­cone e borda em dourado. Isso resolve o problema de visibilidade do Ã­cone e mantÃ©m a elegÃ¢ncia do design.
- [x] **UX (High Priority Play Icon)**: ReforÃ§o dos estilos do player de vÃ­deo.
- [x] **InicializaÃ§Ã£o**: ConsolidaÃ§Ã£o do fluxo de boot do app em `initApp` para evitar conflitos de eventos.
- [x] **Bug Fix**: CorreÃ§Ã£o de erro de referÃªncia (`nameInput`) na criaÃ§Ã£o de exercÃ­cios customizados.
- [x] **Estabilidade**: VerificaÃ§Ã£o de existÃªncia de elementos DOM antes de adicionar listeners.

## Funcionalidades
- [x] **AI Coach**: GeraÃ§Ã£o de treinos via IA (OpenRouter/OpenAI).
- [x] **DivisÃµes DinÃ¢micas**: Suporta A, AB, ABC, ABCD, ABCDE e CUSTOM.
- [x] **MÃ©tricas de SessÃ£o**: CÃ¡lculo de Tonelagem e Kcal estimadas.
- [x] **Timer Integrado**: CronÃ´metro e Timer com sons e presets.
- [x] **EvoluÃ§Ã£o de Cargas**: HistÃ³rico visual e persistente.
- [x] **InstalaÃ§Ã£o PWA**: Funciona offline e instalÃ¡vel em Android/iOS.
- [x] **Backup/RestauraÃ§Ã£o**: ExportaÃ§Ã£o e importaÃ§Ã£o de dados em JSON.

## SeguranÃ§a
- **CSP (Content Security Policy)**: Rigorosa para prevenir XSS e injeÃ§Ã£o de scripts.
- **Privacidade**: Sem backend. Dados salvos 100% no dispositivo do usuÃ¡rio.
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
4. **AI Coach Upgrade (v38)**: Transição de um esquema JSON rígido para um flexível que aceita observações técnicas (obs) e dicas de treinamento (geral), melhorando drasticamente a qualidade dos treinos gerados para usuários avançados.
