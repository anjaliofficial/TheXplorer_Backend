const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');

exports.createCustomer = async (req, res) => {
    const { name, username, email, contactNumber, password, gender } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({ name, username, email, contactNumber, password: hashedPassword, gender });
 res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};