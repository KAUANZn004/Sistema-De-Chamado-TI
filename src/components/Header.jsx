const Header = ({ user, activeView, onChangeView, onLogout }) => {
  const menuOptions = [{ key: 'home', label: 'Início' }];

  if (user.role === 'coordenador') {
    menuOptions.push({ key: 'todos-chamados', label: 'Todos os chamados' });
    menuOptions.push({ key: 'usuarios', label: 'Usuários' });
    menuOptions.push({ key: 'relatorios', label: 'Relatórios' });
    menuOptions.push({ key: 'configuracoes', label: 'Configurações' });
    menuOptions.push({ key: 'sobre', label: 'Sobre' });
  } else if (user.role === 'tecnico') {
    menuOptions.push({ key: 'meus-chamados', label: 'Meus chamados' });
    menuOptions.push({ key: 'sobre', label: 'Sobre' });
  } else {
    menuOptions.push({ key: 'novo-chamado', label: 'Novo chamado' });
    menuOptions.push({ key: 'sobre', label: 'Sobre' });
  }

  return (
    <header className="app-header">
      <div className="brand">Chamados TI</div>
      <nav className="nav-bar">
        {menuOptions.map((item) => (
          <button
            key={item.key}
            className={activeView === item.key ? 'nav-button active' : 'nav-button'}
            onClick={() => onChangeView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="user-box">
        <span>{user.name}</span>
        <span className="role-badge">{user.role}</span>
        <button className="logout-button" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
