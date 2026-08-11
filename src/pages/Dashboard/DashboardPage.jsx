import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import Dashboard from '../../components/Dashboard.jsx';

const DashboardPage = (props) => (
  <DashboardLayout>
    <Dashboard {...props} />
  </DashboardLayout>
);

export default DashboardPage;
