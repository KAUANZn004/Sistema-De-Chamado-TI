import { useMemo, useState } from 'react';
import Header from './Header.jsx';
import TicketForm from './TicketForm.jsx';
import TicketList from './TicketList.jsx';
import TechnicianPanel from './TechnicianPanel.jsx';
import CoordinatorPanel from './CoordinatorPanel.jsx';
import CoordinatorHome from './CoordinatorHome.jsx';
import NovoChamadoPage from '../pages/NovoChamado/NovoChamadoPage.jsx';
import MeusChamadosPage from '../pages/MeusChamados/MeusChamadosPage.jsx';
import TecnicoPage from '../pages/Tecnico/TecnicoPage.jsx';
import CoordenadorPage from '../pages/Coordenador/CoordenadorPage.jsx';
import RelatoriosPage from '../pages/Relatorios/RelatoriosPage.jsx';
import ConfiguracoesPage from '../pages/Configuracoes/ConfiguracoesPage.jsx';
import ChamadoPage from '../pages/Chamado/ChamadoPage.jsx';

const Dashboard = ({ user, tickets, userTickets, users, onAddTicket, onUpdateTicket, onAddUser, onUpdateUser, onDeleteUser, onLogout }) => {
  const [activeView, setActiveView] = useState('home');

  const assignedTickets = useMemo(
    () => tickets.filter((ticket) => ticket.assignedTo === user.id),
    [tickets, user.id]
  );

  const allTickets = tickets;

  const renderContent = () => {
    if (activeView === 'home') {
      return (
        <section className="welcome-panel">
          <div>
            <h2>Bem-vindo, {user.name}</h2>
            <p>Você está logado como <strong>{user.role}</strong> na {user.sector}.</p>
          </div>
          {user.role === 'solicitante' ? (
            <TicketForm user={user} users={users} onAddTicket={onAddTicket} />
          ) : user.role === 'tecnico' ? (
            <TecnicoPage tickets={assignedTickets} onUpdateTicket={onUpdateTicket} />
          ) : (
            <div className="coordinator-welcome-card">
              <p>Use o menu para acessar todos os chamados ou gerenciar usuários.</p>
            </div>
          )}
        </section>
      );
    }

    if (activeView === 'novo-chamado') {
      return <NovoChamadoPage user={user} users={users} onAddTicket={onAddTicket} />;
    }

    if (activeView === 'meus-chamados') {
      if (user.role === 'solicitante') {
        return <MeusChamadosPage tickets={userTickets} users={users} />;
      }
      if (user.role === 'tecnico') {
        return <TecnicoPage tickets={assignedTickets} onUpdateTicket={onUpdateTicket} />;
      }
      return <CoordenadorPage view="todos-chamados" users={users} tickets={allTickets} onUpdateTicket={onUpdateTicket} />;
    }

    if (activeView === 'usuarios') {
      return (
        <CoordenadorPage
          view="usuarios"
          users={users}
          tickets={allTickets}
          onAddUser={onAddUser}
          onUpdateUser={onUpdateUser}
          onDeleteUser={onDeleteUser}
          onUpdateTicket={onUpdateTicket}
        />
      );
    }

    if (activeView === 'todos-chamados') {
      return <CoordinatorPanel tickets={allTickets} users={users} onUpdateTicket={onUpdateTicket} />;
    }

    if (activeView === 'relatorios') {
      return <RelatoriosPage />;
    }

    if (activeView === 'configuracoes') {
      return <ConfiguracoesPage />;
    }

    if (activeView === 'chamado') {
      return <ChamadoPage />;
    }

    return (
      <section className="info-panel">
        <h2>Sobre o sistema</h2>
        <p>Use este sistema para abrir e acompanhar chamados de TI de forma simples e clara.</p>
      </section>
    );
  };

  return (
    <div className="dashboard-page">
      <Header user={user} activeView={activeView} onChangeView={setActiveView} onLogout={onLogout} />
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
