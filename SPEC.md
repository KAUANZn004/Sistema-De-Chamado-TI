# Especificação do Sistema de Chamados de TI

## Contexto

Sistema de Chamados de TI para uma prefeitura, usado pela sede e por todas as secretarias municipais (Educação, Saúde, Obras, Fazenda, Assistência Social, etc.). O sistema deve ser simples para servidores com pouca familiaridade com tecnologia e eficiente para os técnicos de TI.

---

## 1. Perfis de usuário

1. **Solicitante (servidor comum)**
   - Abre chamados.
   - Acompanha status.
   - Avalia o atendimento.

2. **Técnico de TI**
   - Recebe chamados atribuídos.
   - Atualiza status.
   - Registra solução.

3. **Coordenador/Gestor de TI**
   - Veja todos os chamados de todas as secretarias.
   - Distribui/reatribui técnicos.
   - Gera relatórios e indicadores.

4. **Administrador do sistema**
   - Gerencia usuários, secretarias, categorias de problema e permissões.

---

## 2. Estrutura organizacional

- Cada usuário pertence a uma **Secretaria/Setor** (ex.: Secretaria de Saúde, Secretaria de Educação, Gabinete do Prefeito).
- Cada secretaria pode ter um ou mais técnicos responsáveis.
- O coordenador pode reatribuir qualquer chamado a qualquer técnico disponível.
- Cadastro de secretarias, unidades/prédios e ramais configuráveis.

---

## 3. Abertura de chamado (foco em facilidade de uso)

- Formulário curto e guiado.
- Campo: **Nome do solicitante** (auto-preenchido pelo login).
- Campo: **Secretaria/setor e local físico** (auto-preenchido, editável).
- Categoria do problema em botões grandes com ícones:
  - 🖥️ Computador não liga / lento
  - 🖨️ Impressora
  - 🌐 Internet / rede
  - 📧 E-mail
  - 💾 Sistema/software (com campo para escolher qual sistema)
  - 📞 Telefonia
  - 🔧 Outros
- Campo de descrição livre com placeholder de exemplo.
- Opção de anexar foto/print do problema com upload simples e arrastar e soltar.
- Nível de urgência com 3 opções: Normal / Urgente / Crítico (parou o setor).
- Botão único e destacado: **Abrir chamado**.
- Confirmação imediata com número do protocolo e prazo estimado de atendimento.

---

## 4. Painel do solicitante

- Lista dos meus chamados: abertos, em andamento, resolvidos.
- Status visual com cores/badges.
- Linha do tempo do chamado: aberto → atribuído ao técnico → em atendimento → resolvido.
- Chat/comentários simples entre solicitante e técnico.
- Avaliação por estrelas + comentário ao final do atendimento.
- Botão **Reabrir chamado** se o problema voltar.

---

## 5. Painel do técnico

- Fila de chamados atribuídos a mim, ordenada por urgência e tempo de espera.
- Filtros por secretaria, categoria e status.
- Ação rápida de mudar status:
  - Em análise
  - Em atendimento
  - Aguardando peça/terceiros
  - Resolvido
- Campo obrigatório de **solução aplicada** ao encerrar o chamado.
- Possibilidade de transferir o chamado a outro técnico ou escalar para o coordenador.
- Registro de tempo gasto no atendimento (opcional).

---

## 6. Painel do coordenador/gestor

- Visão geral de todos os chamados: kanban por status e/ou lista.
- Distribuição de chamados por técnico e por secretaria.
- Indicadores:
  - tempo médio de atendimento
  - chamados por categoria
  - chamados por secretaria
  - SLA cumprido/estourado
  - ranking de técnicos
- Exportar relatórios em PDF/Excel por período.
- Cadastro de SLA por urgência:
  - crítico = 2h
  - urgente = 8h
  - normal = 48h
- Alerta visual quando o prazo estiver próximo de estourar ou já estourou.

---

## 7. Notificações

- E-mail e/ou notificação no sistema quando:
  - chamado aberto
  - chamado atribuído
  - chamado atualizado
  - chamado resolvido
  - chamado prestes a estourar SLA
- Opcional: integração com WhatsApp/Telegram.

---

## 8. Requisitos de UX/UI

- Interface limpa e fácil de usar.
- Poucos cliques para abrir um chamado (ideal: 3 passos).
- Responsivo para uso em celular.
- Textos simples para o solicitante.
- Modo escuro opcional.
- Acessibilidade: fontes legíveis, bom contraste, suporte a leitores de tela.
- Login integrado com Active Directory/LDAP ou e-mail institucional + senha.

---

## 9. Requisitos técnicos sugeridos

- Backend:
  - Node.js + Express
  - Python + Django
  - PHP + Laravel
- Banco de dados:
  - PostgreSQL
  - MySQL
- Frontend:
  - React
  - HTML/CSS/JS simples (se equipe pequena)
- Autenticação:
  - login institucional (@prefeitura)
  - opção de SSO/LDAP
- Hospedagem:
  - servidor local da prefeitura
  - ou nuvem conforme política de dados
- Backup automático diário do banco de dados.

---

## 10. Entregáveis esperados

- Modelo de dados:
  - usuários
  - secretarias
  - chamados
  - categorias
  - comentários
  - SLA
  - avaliações
- Telas:
  - login
  - abertura de chamado
  - painel do solicitante
  - painel do técnico
  - painel do coordenador
  - administração
- Regras de permissão por perfil.
- Sistema de notificações.
- Relatórios/dashboard com gráficos.

---

## Dica de uso

Se usar uma ferramenta de geração de sistemas, peça primeiro pelas telas:

1. Abertura de chamado
2. Painel do solicitante

Depois revise e peça as telas do técnico e coordenador.

---

## Proposta de prioridades para desenvolvimento

1. Login e autenticação.
2. Abertura de chamado.
3. Painel do solicitante.
4. Fluxo de técnico e atualização de status.
5. Painel do coordenador e relatórios.
6. Notificações e SLA.
7. Administração de secretarias, categorias e usuários.
