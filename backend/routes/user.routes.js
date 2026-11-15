const express = require('express');
const router = express.Router();

const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware.js');

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;