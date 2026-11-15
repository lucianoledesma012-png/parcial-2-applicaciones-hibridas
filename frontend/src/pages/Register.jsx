import { useState } from 'react';
import authService from '../services/auth.service';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData.username, formData.email, formData.password);
            setMensaje('¡Usuario registrado con éxito!');
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al registrar el usuario');
        }
    };

    return (
            <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Register;