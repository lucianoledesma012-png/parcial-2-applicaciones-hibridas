import { useState, useEffect } from 'react';
import studioService from '../services/studio.service';

const Studios = () => {
    const [studios, setStudios] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const data = await studioService.getStudios();
                setStudios(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar los estudios.');
            }
        };
        fetchStudios();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Borrar este estudio?')) {
            try {
                await studioService.deleteStudio(id);
                setStudios(studios.filter(studio => studio._id !== id));
                setMensaje('Estudio eliminado.');
            } catch (err) {
                setMensaje(err.response?.data?.message || 'Error al borrar.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Directorio de Estudios</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {mensaje && <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>{mensaje}</p>}

            {studios.length === 0 && !error ? (
                <p>No hay estudios cargados todavía.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {studios.map((studio) => (
                        <li key={studio._id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #555', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span><strong>{studio.nombre}</strong> - {studio.pais}</span>
                            <button onClick={() => handleDelete(studio._id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#d32f2f', border: 'none', borderRadius: '4px', color: 'white' }}>
                                Borrar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Studios;