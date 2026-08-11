const TicketList = ({ tickets, users }) => {
  const statusClass = (status) => {
    if (status.includes('Resolvido')) return 'badge resolved';
    if (status.includes('Em análise')) return 'badge analysis';
    if (status.includes('Em atendimento')) return 'badge attendance';
    if (status.includes('Aguardando')) return 'badge waiting';
    if (status.includes('Aberto')) return 'badge open';
    return 'badge neutral';
  };

  const getTechnicianName = (assignedTo) => {
    const technician = users.find((item) => item.id === assignedTo);
    return technician ? technician.name : 'Sem técnico definido';
  };

  return (
    <section className="ticket-list-panel">
      <h3>Meus chamados</h3>
      {tickets.length === 0 ? (
        <p>Você ainda não tem chamados registrados.</p>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket) => (
            <article key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <span className={statusClass(ticket.status)}>{ticket.status}</span>
                <strong>{ticket.protocol}</strong>
              </div>
              <h4>{ticket.title}</h4>
              <p>{ticket.description}</p>
              <div className="ticket-meta">
                <span>{ticket.category}</span>
                <span>{ticket.urgency}</span>
                <span>{ticket.createdAt}</span>
              </div>
              <div className="ticket-meta">
                <strong>Técnico:</strong> {getTechnicianName(ticket.assignedTo)}
              </div>
              <div className="ticket-timeline">
                <strong>Linha do tempo:</strong>
                <p>{ticket.timeline.filter(Boolean).join(' → ')}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TicketList;
