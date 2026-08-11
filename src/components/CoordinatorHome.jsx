import { useState } from 'react';

const roles = [
  { value: 'tecnico', label: 'Técnico' },
  { value: 'solicitante', label: 'Solicitante' },
];

const createInitialForm = {
  name: '',
  email: '',
  password: '',
  role: 'tecnico',
  sector: '',
  location: '',
};

const CoordinatorHome = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [createForm, setCreateForm] = useState(createInitialForm);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [manageForm, setManageForm] = useState(createInitialForm);

  const handleCreateChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleManageChange = (field, value) => {
    setManageForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
    const newUser = {
      id: Number(Date.now().toString().slice(-5)),
      ...createForm,
    };
    onAddUser(newUser);
    setCreateForm(createInitialForm);
    setShowCreateModal(false);
  };

  const handleSelectUser = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    const user = users.find((item) => item.id === Number(userId));
    if (user) {
      setManageForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        sector: user.sector,
        location: user.location,
      });
    } else {
      setManageForm(createInitialForm);
    }
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    onUpdateUser({
      id: Number(selectedUserId),
      ...manageForm,
    });
    setSelectedUserId('');
    setManageForm(createInitialForm);
    setShowManageModal(false);
  };

  const handleDeleteUser = () => {
    onDeleteUser(Number(selectedUserId));
    setSelectedUserId('');
    setManageForm(createInitialForm);
    setShowManageModal(false);
  };

  const availableUsers = users.filter((user) => user.role === 'tecnico' || user.role === 'solicitante');

  return (
    <div className="coordinator-home">
      <div className="coordinator-actions">
        <button className="primary-button" onClick={() => setShowCreateModal(true)}>
          Cadastrar técnico/solicitante
        </button>
        <button className="secondary-button" onClick={() => setShowManageModal(true)}>
          Editar / excluir usuário
        </button>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h4>Cadastrar novo usuário</h4>
              <button className="close-button" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleCreateUser}>
              <label>Nome completo</label>
              <input
                value={createForm.name}
                onChange={(event) => handleCreateChange('name', event.target.value)}
                required
              />
              <label>E-mail institucional</label>
              <input
                type="email"
                value={createForm.email}
                onChange={(event) => handleCreateChange('email', event.target.value)}
                required
              />
              <label>Senha</label>
              <input
                type="password"
                value={createForm.password}
                onChange={(event) => handleCreateChange('password', event.target.value)}
                required
              />
              <label>Perfil</label>
              <select
                value={createForm.role}
                onChange={(event) => handleCreateChange('role', event.target.value)}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <label>Secretaria / setor</label>
              <input
                value={createForm.sector}
                onChange={(event) => handleCreateChange('sector', event.target.value)}
                placeholder="Ex: Secretaria de Saúde"
                required
              />
              <label>Local físico</label>
              <input
                value={createForm.location}
                onChange={(event) => handleCreateChange('location', event.target.value)}
                placeholder="Ex: Prédio A, Sala 102"
                required
              />
              <div className="form-actions">
                <button type="submit" className="primary-button">
                  Salvar usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showManageModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h4>Editar ou excluir usuário</h4>
              <button className="close-button" onClick={() => setShowManageModal(false)}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleUpdateUser}>
              <label>Selecione um usuário</label>
              <select value={selectedUserId} onChange={handleSelectUser} required>
                <option value="">Selecione</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>

              <label>Nome completo</label>
              <input
                value={manageForm.name}
                onChange={(event) => handleManageChange('name', event.target.value)}
                required
              />
              <label>E-mail institucional</label>
              <input
                type="email"
                value={manageForm.email}
                onChange={(event) => handleManageChange('email', event.target.value)}
                required
              />
              <label>Senha</label>
              <input
                type="password"
                value={manageForm.password}
                onChange={(event) => handleManageChange('password', event.target.value)}
                placeholder="Deixe em branco para manter"
              />
              <label>Perfil</label>
              <select
                value={manageForm.role}
                onChange={(event) => handleManageChange('role', event.target.value)}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <label>Secretaria / setor</label>
              <input
                value={manageForm.sector}
                onChange={(event) => handleManageChange('sector', event.target.value)}
                required
              />
              <label>Local físico</label>
              <input
                value={manageForm.location}
                onChange={(event) => handleManageChange('location', event.target.value)}
                required
              />
              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={!selectedUserId}>
                  Atualizar usuário
                </button>
                <button
                  type="button"
                  className="danger-button"
                  disabled={!selectedUserId}
                  onClick={handleDeleteUser}
                >
                  Excluir usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorHome;
