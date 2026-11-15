const express = require('express');
const router = express.Router();
const studiosController = require('../controllers/studios.controller');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const { validateStudio } = require('../middlewares/studio.validator.js');

router.get('/', verifyToken, studiosController.getStudios);
router.get('/:id', verifyToken, studiosController.getStudioById); 

router.post('/', verifyToken, validateStudio, studiosController.createStudio);
router.put('/:id', verifyToken, validateStudio, studiosController.updateStudio);

router.delete('/:id', verifyToken, studiosController.deleteStudio);

module.exports = router;