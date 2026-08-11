import { useMemo, useState } from 'react';

const categories = [
  { value: 'Computador não liga / lento', icon: '🖥️' },
  { value: 'Impressora', icon: '🖨️' },
  { value: 'Internet / rede', icon: '🌐' },
  { value: 'E-mail', icon: '📧' },
  { value: 'Sistema/software', icon: '💾' },
  { value: 'Telefonia', icon: '📞' },
  { value: 'Outros', icon: '🔧' },
];

const urgencies = ['Normal', 'Urgente', 'Crítico'];

const TicketForm = ({ user, users, onAddTicket }) => {
  const [category, setCategory] = useState(categories[0].value);
  const [system, setSystem] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [description, setDescription] = useState('');
  const [assignedTechnician, setAssignedTechnician] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState('');

  const selectedCategory = useMemo(
    () => categories.find((item) => item.value === category),
    [category]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const ticketId = Number(Date.now().toString().slice(-6));
    const newTicket = {
      id: ticketId,
      protocol: `2026-${ticketId}`,
      requesterId: user.id,
      category,
      urgency,
      status: 'Aberto',
      title: description.substring(0, 50) || selectedCategory.value,
      description,
      createdAt: new Date().toLocaleString('pt-BR'),
      assignedTo: assignedTechnician ? Number(assignedTechnician) : null,
      timeline: assignedTechnician ? ['Aberto', 'Atribuído ao técnico'] : ['Aberto'],
      attachment,
      system: category === 'Sistema/software' ? system : null,
    };

    onAddTicket(newTicket);
    setMessage(`Chamado aberto com sucesso! Protocolo: ${newTicket.protocol}`);
    setDescription('');
    setAttachment(null);
  };

  const handleAttachment = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  return (
    <section className="ticket-form-panel">
      <h3>Abrir novo chamado</h3>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-row">
          <label>Solicitante</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div className="form-row">
          <label>Selecione a Secretária</label>
            <input type="text" value={user.sector} readOnly />
        </div>
        <div className="form-row">
          <label>Selecione o técnico</label>
          <select
            value={assignedTechnician}
            onChange={(event) => setAssignedTechnician(event.target.value)}
          >
            <option value="">Escolha um técnico (opcional)</option>
            {users
              .filter((item) => item.role === 'tecnico')
              .map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name} - {tech.sector}
                </option>
              ))}
          </select>
        </div>
        <div className="form-row">
          <label>Digite a Sala</label>
          <input type="text" value={user.location} readOnly />
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <button
              type="button"
              key={item.value}
              className={category === item.value ? 'category-card selected' : 'category-card'}
              onClick={() => setCategory(item.value)}
            >
              <span className="category-icon">{item.icon}</span>
              <span>{item.value}</span>
            </button>
          ))}
        </div>

        {category === 'Sistema/software' && (
          <div className="form-row">
            <label>Qual sistema?</label>
            <input
              type="text"
              value={system}
              onChange={(event) => setSystem(event.target.value)}
              placeholder="Ex: Siga, Folha, SIGA"
            />
          </div>
        )}

        <div className="form-row">
          <label>Descrição do problema</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreva o problema com palavras simples..."
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <label>Anexar foto/print</label>
          <input type="file" onChange={handleAttachment} />
          {attachment && <small>{attachment}</small>}
        </div>

        <div className="form-row urgency-row">
          <label>Nível de urgência</label>
          <div className="urgency-options">
            {urgencies.map((level) => (
              <button
                type="button"
                key={level}
                className={urgency === level ? 'urgency-chip selected' : 'urgency-chip'}
                onClick={() => setUrgency(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="primary-button">
          Abrir chamado
        </button>

        {message && <p className="success-message">{message}</p>}
      </form>
    </section>
  );
};

export default TicketForm;
