import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import './css/main.css';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './components/Context/Context';

function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <>
              <Route path="/profile" />
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

export default App;
