import { useMemo, useState } from 'react';

const statusOptions = ['Em análise', 'Em atendimento', 'Aguardando peça/terceiros', 'Resolvido'];

const TechnicianPanel = ({ tickets, onUpdateTicket }) => {
  const [filter, setFilter] = useState('Todos');

  const statusClass = (status) => {
    if (status.includes('Resolvido')) return 'badge resolved';
    if (status.includes('Em análise')) return 'badge analysis';
    if (status.includes('Em atendimento')) return 'badge attendance';
    if (status.includes('Aguardando')) return 'badge waiting';
    if (status.includes('Aberto')) return 'badge open';
    return 'badge neutral';
  };

  const getButtonClass = (status, currentStatus) => {
    const base = status === currentStatus ? 'small-button active' : 'small-button';
    const slug = status.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${base} ${slug}`;
  };

  const filteredTickets = useMemo(() => {
    if (filter === 'Todos') return tickets;
    return tickets.filter((ticket) => ticket.status === filter);
  }, [tickets, filter]);

  const handleStatusChange = (ticket, newStatus) => {
    onUpdateTicket({ ...ticket, status: newStatus, timeline: [...ticket.timeline, newStatus] });
  };

  return (
    <section className="technician-panel">
      <h3>Fila de chamados atribuídos a mim</h3>
      <div className="filter-row">
        <label>Filtrar por status</label>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>Todos</option>
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      {filteredTickets.length === 0 ? (
        <p>Não há chamados atribuídos atualmente.</p>
      ) : (
        <div className="ticket-grid">
          {filteredTickets.map((ticket) => (
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
              <div className="status-actions">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    className={getButtonClass(status, ticket.status)}
                    onClick={() => handleStatusChange(ticket, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TechnicianPanel;
