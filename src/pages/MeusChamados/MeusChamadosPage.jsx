import TicketList from '../../components/TicketList.jsx';

const MeusChamadosPage = ({ tickets, users }) => (
  <section className="info-panel">
    <h2>Meus chamados</h2>
    <TicketList tickets={tickets} users={users} />
  </section>
);

export default MeusChamadosPage;
