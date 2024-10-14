# Notas sobre as aulas

- Primeiras dependências de produção:

  - `yarn add primevue primeicons @nuxtjs/tailwindcss @nuxtjs/google-fonts nuxt-primevue`

- Primeiras dependências de dev

  - `yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier typescript @typescript-eslint/parser @nuxtjs/eslint-config-typescript`

- Layout -> encapsulamento de lógica
- HOC -> encapsulamentode loading

- CodeSnippet => duplo loading (interno e externo)

### Instalando Supabase CLI e Docker

- Instalar CLI com scoop (windows): https://supabase.com/docs/guides/local-development/cli/getting-started
- Cuidar configurações do docker

- $ yarn add @supabase/supabase-js @nuxtjs/supabase
- $ npx supabase login
- $ npx supabase init

- $ npx supabase migration new ...

Rodando as migrations

- $ npx supabase start

Para rodar novas adições de migrations

- $ npx supabase db reset

### Configurando OAuth

- trocar [auth] site_url para -> http://localhost:3000/auth/github
- configurar [auth.external.github] com os dados corretos
- redirect_uri = "http://localhost:54321/auth/v1/callback" (mesma colocada no github)

### Geração de tipos do banco

- tipos do banco !== tipos da aplicação (entidades)
- "db:generate-types": "npx supabase gen types typescript --local > ./libs/supabase/schema.ts"
- sempre que houver mudança ou adição de migration, rodar o comando para baixar os tipos novamente

### Arquitetura dos layouts -> default, checkout e admin

- _default_ -> renderiza apenas o conteúdo interno
- _admin_ -> só para rodas autenticadas
- _checkout_ -> usuário pode ou não estar logado (componentes dinâmicos)

### Adapters

- função que recebe um tipo e retorna outro tipo

### User provide/inject

- provido no composable
- todo mundo abaixo de onde o composable é instanciado recebe o inject

### Arquitetura modular

- estrutura flexível
- escalável

![alt text](/public/notes/image-1.png)

- um composable por ação

  - pode ser mais de uma ação por composable

- composables são mais fáceis de testar

- camada de serviço separada e um adapter

  - desacopla o client
  - trocar o adapter fica simples
  - projeto fica desacoplado da entidade do banco
  - separação de entidades

- useServices => faz a injeção de dependência via parâmetro de função
  - aumenta a coesão, baixa o acoplamento

#### Atividade

- tela de listagem de todos os creators

  ![alt text](/public/notes/image.png)
