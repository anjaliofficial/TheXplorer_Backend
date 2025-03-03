const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes'); // Import package routes
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

connectDB();

// Synchronize the models with the database
sequelize.sync({ force: false }) // Set force: true to drop existing tables and recreate them
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

// Define your routes
app.use('/api/admins', adminRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes); // Add package routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});