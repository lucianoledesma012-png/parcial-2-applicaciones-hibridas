import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const register = async (username, email, password) => {
    const response = await axios.post(API_URL + 'register', { username, email, password });
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const getUsers = async () => {
    const token = localStorage.getItem('token'); 
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    };
    const response = await axios.get('http://localhost:3000/api/auth/users', config);
    return response.data;
};

export default { register, login, getUsers };