import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    if (!cleanedEmail.includes('@prefeitura.vzp.ti')) {
      setError('Use seu e-mail institucional @prefeitura.vzp.ti');
      return;
    }
    if (!cleanedPassword) {
      setError('Digite sua senha.');
      return;
    }

    const success = onLogin(cleanedEmail, cleanedPassword, remember);
    if (!success) {
      setError('E-mail ou senha incorretos.');
      return;
    }

    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sistema de Chamados de TI</h1>
        <p>Use seu e-mail institucional e senha para acessar.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">E-mail institucional</label>
          <input
            id="email"
            type="email"
            placeholder="seu.nome@prefeitura.vzp.ti"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <div className="password-row">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5Z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5Z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              )}
            </button>
          </div>
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Manter conectado
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
