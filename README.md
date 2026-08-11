# Sistema de Chamados de TI

Este projeto é uma aplicação web em React/Vite para gerenciar chamados de TI em um ambiente institucional, com foco em uma interface simples e funcional para solicitantes, técnicos e coordenadores.

## O que a aplicação faz

A versão atual do sistema já inclui:

- Tela de login com autenticação simulada.
- Página inicial personalizada conforme o perfil do usuário.
- Formulário para abertura de novos chamados.
- Visualização dos chamados próprios para o solicitante.
- Painel para técnicos com fila de chamados e atualização de status.
- Painel para coordenadores com visão geral, estatísticas e atribuição de técnicos.
- Seções de relatórios e configurações.

## Perfis disponíveis

- **Solicitante**: cria chamados e acompanha o andamento.
- **Técnico**: recebe chamados atribuídos e altera o status do atendimento.
- **Coordenador**: acompanha os chamados, distribui demandas e visualiza métricas.

## Usuários de exemplo

- **Ana Silva** — solicitante
- **Kauan Felipe** — técnico
- **Mariana Costa** — coordenadora

Todos os usuários de exemplo utilizam a senha: **Senha123**.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS moderno para a interface

## Estrutura principal do projeto

- **src/components**: componentes reutilizáveis da interface.
- **src/pages**: páginas principais do sistema.
- **src/layouts**: layouts de autenticação e dashboard.
- **src/routes**: configuração das rotas da aplicação.

## Observação

Este projeto atualmente utiliza dados simulados em memória, sendo uma versão demonstrativa do fluxo de atendimento de TI.
