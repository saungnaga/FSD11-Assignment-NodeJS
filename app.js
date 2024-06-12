const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});

module.exports = app;