const CoordinatorPanel = ({ tickets, users, onUpdateTicket }) => {
  const getStatusClass = (status) => {
    if (status.includes('Resolvido')) return 'badge resolved';
    if (status.includes('Em análise')) return 'badge analysis';
    if (status.includes('Em atendimento')) return 'badge attendance';
    if (status.includes('Em aberto')) return 'badge in-progress';
    if (status.includes('Aguardando')) return 'badge waiting';
    if (status.includes('Aberto')) return 'badge open';
    return 'badge neutral';
  };

  const openTickets = tickets.filter((ticket) => ticket.status !== 'Resolvido');
  const stats = {
    total: tickets.length,
    open: openTickets.length,
    resolved: tickets.filter((ticket) => ticket.status === 'Resolvido').length,
    byCategory: tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {}),
  };

  const handleAssign = (ticketId, technicianId) => {
    const ticket = tickets.find((item) => item.id === ticketId);
    if (ticket) {
      onUpdateTicket({ ...ticket, assignedTo: technicianId, status: 'Em análise', timeline: [...ticket.timeline, 'Atribuído ao técnico'] });
    }
  };

  return (
    <section className="coordinator-panel">
      <h3>Painel do coordenador</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <strong>{stats.total}</strong>
          <span>Total de chamados</span>
        </div>
        <div className="stat-card">
          <strong>{stats.open}</strong>
          <span>Chamados em aberto</span>
        </div>
        <div className="stat-card">
          <strong>{stats.resolved}</strong>
          <span>Chamados resolvidos</span>
        </div>
      </div>

      <div className="report-panel">
        <h4>Chamados por categoria</h4>
        <ul>
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <li key={category}>
              {category}: <strong>{count}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <article key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
              <strong>{ticket.protocol}</strong>
            </div>
            <h4>{ticket.title}</h4>
            <p>{ticket.description}</p>
            <div className="ticket-meta">
              <span>{ticket.category}</span>
              <span>{ticket.urgency}</span>
              <span>{ticket.createdAt}</span>
            </div>
            <div className="assign-row">
              <label>Transferir / atribuir técnico</label>
              <select
                value={ticket.assignedTo || ''}
                onChange={(event) => handleAssign(ticket.id, Number(event.target.value))}
              >
                <option value="">Selecione</option>
                {users
                  .filter((user) => user.role === 'tecnico')
                  .map((technician) => (
                    <option key={technician.id} value={technician.id}>
                      {technician.name} - {technician.sector}
                    </option>
                  ))}
              </select>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CoordinatorPanel;
