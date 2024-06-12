const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getAllUsers);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;