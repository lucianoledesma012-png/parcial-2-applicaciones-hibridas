import { useState, useEffect } from 'react';
import authService from '../services/auth.service';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await authService.getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error al cargar los usuarios.');
            }
        };
        fetchUsers();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Usuarios Registrados (Panel Admin)</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            
            {users.length === 0 && !error ? (
                <p>No hay usuarios cargados todavía.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {users.map((user) => (
                        <li key={user._id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #555', backgroundColor: '#1e1e1e', borderRadius: '5px' }}>
                            <strong>ID:</strong> {user._id} <br/>
                            <strong>Usuario:</strong> {user.email || user.username} 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;