import { Link, useLocation } from 'react-router-dom';
import { AdminElements } from '../Admin/AdminPanel';

interface PropsNavbarAdmin {
  handleElementToView?: (value: AdminElements) => void;
}

function NavbarAdmin({ handleElementToView }: PropsNavbarAdmin) {
  const location = useLocation();

  if (location.pathname.includes('adminDashboard')) {
    return (
      <nav className="navbar_admin-dashboard">
        <div>
          <Link to="/">
            <h2>Volver</h2>
          </Link>
        </div>
        <div>
          <h2
            onClick={() => {
              handleElementToView!('dashboard');
            }}
          >
            Dashboard
          </h2>
        </div>
        <div>
          <h2
            onClick={() => {
              handleElementToView!('products');
            }}
          >
            Productos
          </h2>
        </div>
        <div>
          <h2
            onClick={() => {
              handleElementToView!('carts');
            }}
          >
            Pedidos
          </h2>
        </div>
        <div>
          <h2
            onClick={() => {
              handleElementToView!('users');
            }}
          >
            Usuarios
          </h2>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar_admin">
      <Link to="/adminDashboard">Admin Dashboard</Link>
    </nav>
  );
}

export default NavbarAdmin;
