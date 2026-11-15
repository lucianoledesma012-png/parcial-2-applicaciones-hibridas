import axios from 'axios';

const API_URL = 'http://localhost:3000/api/studios/';

const getStudios = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const createStudio = async (studioData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, studioData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const deleteStudio = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const updateStudio = async (id, studioData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(API_URL + id, studioData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export default { getStudios, createStudio, deleteStudio, updateStudio };