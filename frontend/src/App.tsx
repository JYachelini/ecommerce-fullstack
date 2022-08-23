import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import './css/main.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from './components/Context/Context';
import Profile from './components/Profile/Profile';
import { useJwt } from 'react-jwt';
import { DecodedToken } from './components/Interfaces/token.interface';
import NavbarAdmin from './components/NavbarAdmin/NavbarAdmin';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  const { access_token, setLimit } = useContext(Context);
  const { decodedToken } = useJwt<DecodedToken>(access_token);
  let user = decodedToken?.user;

  useEffect(() => {
    setLimit(10);
  }, []);
  const location = useLocation();

  if (user?.role === 'admin' && location.pathname.includes('adminDashboard')) {
    return <AdminPanel />;
  } else {
    return (
      <div className="App">
        <div className="navbar_wrapper">
          {user?.role === 'admin' ? <NavbarAdmin /> : null}

          <Navbar />
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Route path="/adminDashboard" element={<AdminPanel />} />
                  </>
                ) : (
                  <></>
                )}
                <Route path="/profile" element={<Profile user={user} />} />
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
