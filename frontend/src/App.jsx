import { useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Games from './pages/Games';
import Studios from './pages/Studios';
import Users from './pages/Users'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#242424', borderBottom: '1px solid #444', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Listado de videojuegos y estudios</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {!token ? (
            <>
              <Link to="/login" style={{ color: '#646cff', textDecoration: 'none' }}>Iniciar Sesión</Link>
              <Link to="/registro" style={{ color: '#646cff', textDecoration: 'none' }}>Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/juegos" style={{ color: '#646cff', textDecoration: 'none' }}>Juegos</Link>
              <Link to="/estudios" style={{ color: '#646cff', textDecoration: 'none' }}>Estudios</Link>
              <Link to="/usuarios" style={{ color: '#ffa000', textDecoration: 'none', fontWeight: 'bold' }}>Usuarios</Link>
              
              <button onClick={handleLogout} style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      <div style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/juegos" /> : <Navigate to="/login" />} />
          
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/juegos" />} />
          <Route path="/registro" element={!token ? <Register /> : <Navigate to="/juegos" />} />
          
          <Route path="/juegos" element={token ? <Games /> : <Navigate to="/login" />} />
          <Route path="/estudios" element={token ? <Studios /> : <Navigate to="/login" />} />
          
          <Route path="/usuarios" element={token ? <Users /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;