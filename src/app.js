const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();


// Middlewares
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

module.exports = app;