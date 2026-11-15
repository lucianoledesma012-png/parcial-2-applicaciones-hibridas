import { useState, useEffect } from 'react';
import gameService from '../services/game.service';
import studioService from '../services/studio.service';

const Games = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ nombre: '', genero: '', año: '', studioId: '' });
    const [editingId, setEditingId] = useState(null);

    const [studios, setStudios] = useState([]);
    const [newStudio, setNewStudio] = useState({ nombre: '', pais: '' });

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gamesData = await gameService.getGames();
                setGames(gamesData);

                const studiosData = await studioService.getStudios();
                setStudios(studiosData);
            } catch (err) {
                console.error('Error al cargar datos');
            }
        };
        fetchData();
    }, []);

    const handleGameChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleGameSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updatedGame = await gameService.updateGame(editingId, newGame);
                setGames(games.map(game => game._id === editingId ? updatedGame : game));
                setMensaje('Juego actualizado correctamente.');
                setEditingId(null);
            } else {
                const createdGame = await gameService.createGame(newGame);
                setGames([...games, createdGame]);
                setMensaje('Juego guardado con éxito.');
            }
            setNewGame({ nombre: '', genero: '', año: '', studioId: '' });
        } catch (err) {
            setMensaje(err.response?.data?.error || 'Error al guardar el juego.');
        }
    };

    const handleEditGame = (game) => {
        setNewGame({ nombre: game.nombre, genero: game.genero, año: game.año, studioId: game.studioId || '' });
        setEditingId(game._id);
        setMensaje('');
    };

    const handleDeleteGame = async (id) => {
        if (window.confirm('¿Borrar este juego?')) {
            try {
                await gameService.deleteGame(id);
                setGames(games.filter(game => game._id !== id));
                setMensaje('Juego eliminado.');
            } catch (err) {
                setMensaje(err.response?.data?.error || 'Error al borrar el juego.');
            }
        }
    };

    const cancelEditGame = () => {
        setNewGame({ nombre: '', genero: '', año: '', studioId: '' });
        setEditingId(null);
    };

    const handleStudioChange = (e) => {
        setNewStudio({ ...newStudio, [e.target.name]: e.target.value });
    };

    const handleStudioSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdStudio = await studioService.createStudio(newStudio);
            setStudios([...studios, createdStudio]);
            setMensaje(`Estudio ${createdStudio.nombre} agregado al catálogo.`);
            setNewStudio({ nombre: '', pais: '' });
        } catch (err) {
            setMensaje(err.response?.data?.error || 'Error al crear el estudio.');
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Panel de Control</h2>

            {mensaje && <p style={{ color: '#4caf50', fontWeight: 'bold', textAlign: 'center' }}>{mensaje}</p>}

            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '8px', borderLeft: '4px solid #9c27b0' }}>
                <h3 style={{ marginTop: 0, color: '#ce93d8' }}>1. Registrar un Estudio</h3>
                <form onSubmit={handleStudioSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="text" name="nombre" placeholder="Nombre del estudio" value={newStudio.nombre} onChange={handleStudioChange} required />
                    <input type="text" name="pais" placeholder="País" value={newStudio.pais} onChange={handleStudioChange} required />
                    <button type="submit" style={{ backgroundColor: '#9c27b0' }}>Crear Estudio</button>
                </form>
                <small style={{ color: '#aaa', display: 'block', marginTop: '5px' }}>Los estudios creados aparecerán en la pestaña "Mis Estudios" y en el selector de juegos.</small>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#242424', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
                <h3 style={{ marginTop: 0 }}>{editingId ? 'Editando Juego' : '2. Agregar Juego'}</h3>
                <form onSubmit={handleGameSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" name="nombre" placeholder="Nombre" value={newGame.nombre} onChange={handleGameChange} required style={{ flex: 1 }} />
                        <select name="genero" value={newGame.genero} onChange={handleGameChange} required style={{ flex: 1, padding: '8px' }}>
                            <option value="">-- Seleccionar Género --</option>
                            <option value="Acción">Acción</option>
                            <option value="Aventura">Aventura</option>
                            <option value="RPG">RPG</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Estrategia">Estrategia</option>
                        </select>
                        <input type="number" name="año" placeholder="Año" value={newGame.año} onChange={handleGameChange} required style={{ width: '80px' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select name="studioId" value={newGame.studioId} onChange={handleGameChange} required style={{ flex: 1, padding: '8px' }}>
                            <option value="">-- Seleccionar el Estudio Desarrollador --</option>
                            {studios.map(studio => (
                                <option key={studio._id} value={studio._id}>{studio.nombre} ({studio.pais})</option>
                            ))}
                        </select>

                        <button type="submit" style={{ backgroundColor: editingId ? '#1976d2' : '#4caf50', width: '120px' }}>
                            {editingId ? 'Actualizar' : 'Guardar'}
                        </button>

                        {editingId && (
                            <button type="button" onClick={cancelEditGame} style={{ backgroundColor: '#757575' }}>Cancelar</button>
                        )}
                    </div>
                </form>
            </div>

            <h3>Mis Juegos</h3>
            {games.length === 0 ? (
                <p>No hay juegos cargados todavía.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {games.map((game) => {
                        const studioAsociado = studios.find(s => s._id === game.studioId);

                        return (
                            <li key={game._id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #555', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{game.nombre}</strong> - {game.genero} ({game.año})
                                    <br />
                                    <small style={{ color: '#bbb' }}>
                                        Desarrollador: {studioAsociado ? studioAsociado.nombre : 'Desconocido'}
                                    </small>
                                </div>

                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <button onClick={() => handleEditGame(game)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#ffa000', border: 'none', borderRadius: '4px', color: 'white' }}>Editar</button>
                                    <button onClick={() => handleDeleteGame(game._id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#d32f2f', border: 'none', borderRadius: '4px', color: 'white' }}>Borrar</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default Games;