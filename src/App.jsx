import { useEffect, useMemo, useState } from 'react';
import LoginPage from './pages/Login/LoginPage.jsx';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import './styles.css';

const initialUsers = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@prefeitura.vzp.ti',
    password: 'Senha123',
    role: 'solicitante',
    sector: 'Secretaria de Saúde',
    location: 'Prédio A, Sala 102',
  },
  {
    id: 2,
    name: 'Kauan Felipe',
    email: 'kauan.felipe@prefeitura.vzp.ti',
    password: 'Senha123',
    role: 'tecnico',
    sector: 'Departamento de TI',
    location: 'Secretaria de Desenvolvimento Social - 2º andar',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    email: 'mariana.costa@prefeitura.vzp.ti',
    password: 'Senha123',
    role: 'coordenador',
    sector: 'Departamento de TI',
    location: 'Prefeitura Municipal - Sala de TI',
  },
];

const initialTickets = [
  {
    id: 101,
    protocol: '2026-0001',
    requesterId: 1,
    category: 'Internet / rede',
    urgency: 'Urgente',
    status: 'Em aberto',
    title: 'Rede lenta na sala 102',
    description: 'A internet está muito lenta e não consigo enviar o relatório.',
    createdAt: '2026-08-05 08:32',
    assignedTo: 2,
    timeline: ['Aberto', 'Atribuído ao técnico', 'Em atendimento'],
  },
  {
    id: 102,
    protocol: '2026-0002',
    requesterId: 1,
    category: 'Computador não liga / lento',
    urgency: 'Normal',
    status: 'Resolvido',
    title: 'Computador travando',
    description: 'O computador da sala 103 reinicia sozinho.',
    createdAt: '2026-08-03 09:10',
    assignedTo: 2,
    timeline: ['Aberto', 'Atribuído ao técnico', 'Em atendimento', 'Resolvido'],
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState(initialTickets);
  const [users, setUsers] = useState(initialUsers);

  const userTickets = useMemo(
    () => tickets.filter((ticket) => ticket.requesterId === user?.id),
    [tickets, user]
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
      const found = initialUsers.find(
        (item) => item.email === storedEmail && item.password === storedPassword
      );
      if (found) {
        setUser(found);
      }
    }
  }, []);

  const handleLogin = (email, password, remember) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = initialUsers.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
    );
    if (found) {
      setUser(found);
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      return true;
    }

    return false;
  };

  const handleAddTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpdateTicket = (updated) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === updated.id ? updated : ticket)));
  };

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) => prev.map((userItem) => (userItem.id === updatedUser.id ? { ...userItem, ...updatedUser } : userItem)));
    if (user?.id === updatedUser.id) {
      setUser((prev) => ({ ...prev, ...updatedUser }));
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((userItem) => userItem.id !== userId));
    if (user?.id === userId) {
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
  };

  return (
    <div className="app-shell">
      <div className="watermark-label" aria-hidden="true">
        Feito por Kauan Felipe
      </div>
      <div className="app-content">
        {user ? (
          <DashboardPage
            user={user}
            tickets={tickets}
            userTickets={userTickets}
            users={users}
            onAddTicket={handleAddTicket}
            onUpdateTicket={handleUpdateTicket}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
