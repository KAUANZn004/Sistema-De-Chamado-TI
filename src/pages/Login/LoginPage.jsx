import AuthLayout from '../../layouts/AuthLayout.jsx';
import LoginForm from '../../components/LoginForm.jsx';

const LoginPage = ({ onLogin }) => (
  <AuthLayout>
    <LoginForm onLogin={onLogin} />
  </AuthLayout>
);

export default LoginPage;
