import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import './css/main.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from './components/Context/Context';
import Profile from './components/Profile/Profile';
import NavbarAdmin from './components/NavbarAdmin/NavbarAdmin';
import AdminPanel from './components/Admin/AdminPanel';
import ProductById from './components/Product/ProductById';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import ProfileOrders from './components/Profile/ProfileOrders';
import Chat from './components/Chat/Chat';

function App() {
  const { setLimit, productsCart, user, setProductId } = useContext(Context);
  const location = useLocation();
  useEffect(() => {
    setLimit(10);
    setProductId(undefined);
  }, [location.pathname]);

  if (
    user?.role.includes('admin') &&
    location.pathname.includes('adminDashboard')
  ) {
    return <AdminPanel />;
  } else {
    return (
      <div className="App">
        <header className="navbar_wrapper">
          {user?.role.includes('admin') ? <NavbarAdmin /> : null}

          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductById />} />
            <Route path="/cart" element={<Cart />} />
            {productsCart.size > 0 ? (
              <>
                <Route path="/cart/order" element={<Order />} />
              </>
            ) : null}
            {user ? (
              <>
                {user.role.includes('admin') ? (
                  <>
                    <Route path="/adminDashboard" element={<AdminPanel />} />
                  </>
                ) : (
                  <></>
                )}
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/myorders" element={<ProfileOrders />} />
                <Route path="/chat" element={<Chat />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
