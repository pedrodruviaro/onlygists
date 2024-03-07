# 4

- Conceito de block modules (não nuxt modules) no código -> regras de negócio e módulos desacoplados. A maior parte do código fica em módulos, o restante são coisas respectivas à aplicação. Assim, podemos reutilizar os módulos de forma fácil

- Componentes e screens
  - componentes -> receber props e emitir eventos (dummy components)
    - a menos que seja algo muito específico do componente
  - screens -> comunicar com os composables
    - as regras estão dentro dos composables
    - quem controla toda a dinâmica é a screen, que passa as props para os componentes, que emitem para a screen
