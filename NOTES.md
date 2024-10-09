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
