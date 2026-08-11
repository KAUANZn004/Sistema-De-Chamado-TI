import CoordinatorHome from '../../components/CoordinatorHome.jsx';
import CoordinatorPanel from '../../components/CoordinatorPanel.jsx';

const CoordenadorPage = ({ view, users, tickets, onAddUser, onUpdateUser, onDeleteUser, onUpdateTicket }) => {
  if (view === 'usuarios') {
    return (
      <CoordinatorHome
        users={users}
        onAddUser={onAddUser}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    );
  }

  return (
    <CoordinatorPanel tickets={tickets} users={users} onUpdateTicket={onUpdateTicket} />
  );
};

export default CoordenadorPage;
