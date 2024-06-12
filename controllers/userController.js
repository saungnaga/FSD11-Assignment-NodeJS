const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update({ name, email, password: hashedPassword }, { where: { id } });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};