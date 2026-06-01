import { useUser } from '../../context/UserContext';
import Dashboard from '../dashboard/Dashboard';
import BuyerDashboard from '../buyer/BuyerDashboard';

export default function DashboardRoute() {
  const { userType } = useUser();

  if (userType === 'buyer') {
    return <BuyerDashboard />;
  }

  return <Dashboard />;
}
