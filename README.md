# Rede Solidária

Plataforma web colaborativa voltada à conexão entre voluntários, doadores e projetos sociais de impacto comunitário no terceiro setor.

---

## 🎯 Objetivo

Facilitar o engajamento cívico e a participação social, centralizando oportunidades de voluntariado e iniciativas de apoio a causas de educação, inclusão e assistência comunitária em uma interface acessível, responsiva e performática.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível com uso criterioso de tags (`header`, `main`, `section`, `article`, `nav`, `aside`, `footer`).
- **CSS3 Moderno**: Layout fluido utilizando Flexbox, CSS Grid, variáveis customizadas (design tokens) e media queries para total responsividade.
- **JavaScript Moderno (ES6+)**: Organização em módulos ES6 (`import` / `export`), manipulação de DOM e ausência de dependências externas.
- **History API**: Roteamento dinâmico no modelo Single Page Application (SPA).
- **Web Storage API**: Armazenamento local de dados via `localStorage`.

---

## 🚀 Principais Funcionalidades

1. **Navegação SPA (Single Page Application)**: Transição fluida entre seções (Início, Seja voluntário e Projetos) sem recarregamento de página.
2. **Menu Responsivo**:
   - Menu hambúrguer adaptável para dispositivos móveis.
   - Submenu dropdown com suporte a clique e expansão acessível.
3. **Modal Acessível ("Como apoiar")**:
   - Abertura controlada com retenção e retorno de foco ao elemento acionador.
   - Fechamento por botão, clique no overlay ou tecla `Escape`.
   - Bloqueio de rolagem do plano de fundo enquanto aberto.
4. **Formulário de Cadastro de Voluntários**:
   - Validações nativas do navegador (`required`, `pattern`, `email`).
   - Máscara e validação dinâmica para telefone/celular com DDD.
   - Notificações de feedback via componente Toast e alertas acessíveis.
5. **Persistência de Dados**: Armazenamento dos cadastros em `localStorage` no formato JSON.

---

## 📁 Estrutura de Pastas

```text
projeto_rede_solidaria/
├── css/
│   └── style.css            # Folha de estilos unificada e responsiva
├── html/
│   ├── index.html           # Página principal da aplicação (SPA entrypoint)
│   └── cadastro.html        # Página de cadastro estática alternativa
├── imagens/
│   ├── logo.png             # Logotipo em formato PNG
│   └── logo.webp            # Logotipo otimizado em WebP
├── js/
│   ├── script.js            # Ponto de entrada (inicialização dos módulos)
│   ├── menu.js              # Controle do menu hambúrguer e dropdown
│   ├── modal.js             # Gerenciamento de abertura, foco e tecla Escape
│   ├── storage.js           # Camada de persistência (localStorage)
│   └── spa.js               # Templates, renderização SPA, formulário e máscaras
└── README.md                # Documentação técnica do projeto
```

---

## 💻 Como Executar o Projeto

Como o JavaScript utiliza **ES6 Modules** (`type="module"`), os navegadores exigem que a aplicação seja servida por meio de um servidor HTTP (não abra diretamente como `file://`):

### Opção 1: Via VS Code (Live Server)
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito no arquivo `html/index.html` e selecione **"Open with Live Server"**.

### Opção 2: Via Node.js (npx serve / http-server)
```bash
# Na raiz do projeto:
npx serve .
```

### Opção 3: Via Python
```bash
# Python 3
python -m http.server 5500
```
Em seguida, acesse no navegador: `http://localhost:5500/html/index.html`.

---

## ⚙️ JavaScript, SPA e Armazenamento Local

- **Módulos ES6**: Cada aspecto da lógica foi decomposto sob o princípio da responsabilidade única:
  - `script.js`: orquestra a inicialização através de escutadores de `DOMContentLoaded`.
  - `menu.js`, `modal.js`, `storage.js` e `spa.js`: expõem somente as funções necessárias via `export`.
- **Roteamento SPA**: O módulo `spa.js` intercepta links com atributo `data-rota`, gerencia o histórico de navegação com `history.pushState` e trata eventos de retorno e avanço com `popstate`.
- **Persistência com LocalStorage**: No arquivo `storage.js`, os dados preenchidos no formulário são convertidos para objetos com timestamp ISO e gravados na chave `redeSolidariaCadastros`.

---

## ♿ Acessibilidade (a11y)

O projeto segue boas práticas de acessibilidade digital:
- **Atributos ARIA**: Emprego de `aria-expanded`, `aria-controls`, `aria-haspopup`, `aria-label` e `aria-live`.
- **Navegação por Teclado**: Ordem de tabulação lógica e suporte à tecla `Escape` para encerramento de janelas modais.
- **Gerenciamento de Foco**: Foco direcionado ao primeiro elemento interativo ao abrir modais e retornado ao elemento acionador ao fechar.
- **Tipografia e Contraste**: Relação de contraste adequada para garantir legibilidade a pessoas com baixa visão.

---

## 🌿 Estratégia de Versionamento (GitFlow)

O repositório adota um fluxo de trabalho estruturado baseado em **GitFlow**:

```text
main
  └── develop
        └── feature/*
```

- **`main`**: Branch de produção contendo versões estáveis, testadas e prontas para entrega.
- **`develop`**: Branch de integração onde as novas funcionalidades são unificadas antes do lançamento.
- **`feature/*`**: Branches efêmeras criadas a partir de `develop` para desenvolvimento de requisitos ou melhorias específicas (exemplo: `feature/versionamento`).

### Padrão de Commits (Conventional Commits)
As mensagens de commit seguem a convenção semântica:
- `feat:` adição de nova funcionalidade.
- `fix:` correção de bug ou comportamento inesperado.
- `docs:` alterações na documentação do projeto.
- `refactor:` refatoração de código sem alterar regra de negócio.
- `style:` ajustes visuais de formatação de código.
- `chore:` tarefas de manutenção, configuração e ferramentas.
