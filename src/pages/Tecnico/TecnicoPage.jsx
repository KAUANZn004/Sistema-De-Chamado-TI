import TechnicianPanel from '../../components/TechnicianPanel.jsx';

const TecnicoPage = ({ tickets, onUpdateTicket }) => (
  <section className="info-panel">
    <h2>Painel do técnico</h2>
    <TechnicianPanel tickets={tickets} onUpdateTicket={onUpdateTicket} />
  </section>
);

export default TecnicoPage;
