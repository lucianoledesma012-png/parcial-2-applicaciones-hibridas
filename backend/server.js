require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes.js');
const gamesRoutes = require('./routes/games.routes.js');
const studiosRoutes = require('./routes/studios.routes.js');
const userRoutes = require('./routes/user.routes.js');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/studios', studiosRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado exitosamente a MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error conectando a MongoDB:', error);
    });