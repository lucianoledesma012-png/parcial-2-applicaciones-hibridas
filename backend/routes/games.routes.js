const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller');
const { validateGame } = require('../middlewares/game.validator'); 

const { verifyToken } = require('../middlewares/auth.middleware.js');

router.get('/test-auth', verifyToken, (req, res) => {
    res.status(200).json({ message: 'El middleware y el token funcionan perfectamente' });
});

router.get('/', verifyToken, gamesController.getGames);
router.get('/:id', verifyToken, gamesController.getGameById);

router.post('/', verifyToken, validateGame, gamesController.createGame); 
router.put('/:id', verifyToken, validateGame, gamesController.updateGame);

router.delete('/:id', verifyToken, gamesController.deleteGame);

module.exports = router;