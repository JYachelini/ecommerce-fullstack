import AdminPanel_Carts from './Orders/AdminPanel_Orders';
import AdminPanel_Dashboard from './Dashboard/AdminPanel_Dashboard';
import AdminPanel_Products from './Products/AdminPanel_Products';
import AdminPanel_Users from './Users/AdminPanel_Users';
interface PropsElementToView {
  element: string;
}

function ElementToView({ element }: PropsElementToView) {
  if (element === 'dashboard') return <AdminPanel_Dashboard />;
  if (element === 'products') return <AdminPanel_Products />;
  if (element === 'carts') return <AdminPanel_Carts />;
  if (element === 'users') return <AdminPanel_Users />;
  return <span>Error inesperado</span>;
}

export default ElementToView;
