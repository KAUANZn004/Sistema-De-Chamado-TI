# Sistema de Chamados de TI — Prefeitura e Secretarias

Este repositório contém a especificação para um sistema de chamados de TI voltado para uso em uma prefeitura e suas secretarias municipais.

## Objetivo

Construir um sistema simples e acessível para servidores com pouca familiaridade com tecnologia e eficiente para técnicos de TI.

## Perfis de usuário

- **Solicitante**: abre chamados, acompanha status e avalia o atendimento.
- **Técnico de TI**: recebe chamados, atualiza status e registra solução.
- **Coordenador/Gestor de TI**: gerencia distribuição, visualiza todos os chamados e gera relatórios.
- **Administrador do sistema**: gerencia usuários, secretarias, categorias e permissões.

## Requisitos principais

- Cadastro de secretarias, unidades/prédios e ramais configurável.
- Formulário de abertura de chamado amigável e guiado.
- Painel do solicitante com status visual, histórico e avaliação.
- Painel do técnico com fila de chamados por urgência e filtros.
- Painel do coordenador com visão geral, indicadores e relatórios.
- Notificações por e-mail ou no sistema, com alertas de SLA.
- Login institucional com opção de LDAP/SSO.
- UI limpa, responsiva e acessível.

## Tecnologias sugeridas

- Backend: Node.js/Express, Python/Django ou PHP/Laravel.
- Banco de dados: PostgreSQL ou MySQL.
- Frontend: React ou HTML/CSS/JS simples.
- Autenticação: login institucional (@prefeitura) com LDAP/SSO opcional.
- Hospedagem: servidor local da prefeitura ou nuvem conforme política de dados.

## Arquivos

- `SPEC.md` — especificação completa usada para desenvolvimento.

## Como usar

Copie e cole o conteúdo de `SPEC.md` em uma ferramenta de geração de sistemas ou use como briefing para o desenvolvedor.
