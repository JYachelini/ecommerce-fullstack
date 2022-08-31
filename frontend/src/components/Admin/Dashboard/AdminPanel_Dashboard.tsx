import { useContext } from 'react';
import { Context } from '../../Context/Context';

function AdminPanel_Dashboard() {
  const { user } = useContext(Context);
  return <div>Hola {user?.name}</div>;
}

export default AdminPanel_Dashboard;
