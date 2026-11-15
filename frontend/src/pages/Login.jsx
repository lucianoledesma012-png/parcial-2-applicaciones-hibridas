import { useState } from 'react';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [mensaje, setMensaje] = useState('');
    
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(formData.email, formData.password);
            setToken(localStorage.getItem('token'));
            
            navigate('/juegos'); 
            
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit">Entrar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Login;