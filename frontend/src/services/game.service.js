import axios from 'axios';

const API_URL = 'http://localhost:3000/api/games/'; 

const getGames = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const createGame = async (gameData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, gameData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const deleteGame = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const updateGame = async (id, gameData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(API_URL + id, gameData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export default { getGames, createGame, deleteGame, updateGame };