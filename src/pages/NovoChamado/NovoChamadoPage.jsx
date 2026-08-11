import TicketForm from '../../components/TicketForm.jsx';

const NovoChamadoPage = ({ user, users, onAddTicket }) => (
  <section className="info-panel">
    <h2>Novo chamado</h2>
    <p>Registre um novo chamado para a equipe de TI.</p>
    <TicketForm user={user} users={users} onAddTicket={onAddTicket} />
  </section>
);

export default NovoChamadoPage;
