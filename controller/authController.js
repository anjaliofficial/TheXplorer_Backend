const Admin = require('../models/Admin');
const Agency = require('../models/Agency');
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check Admin
    const admin = await Admin.findOne({ where: { email } });
    if (admin && await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ id: admin.id, type: 'admin' }, process.env.JWT_SECRET);
        return res.json({ token, userType: 'admin' });
    }

    // Check Agency
    const agency = await Agency.findOne({ where: { email } });
    if (agency && await bcrypt.compare(password, agency.password)) {
        const token = jwt.sign({ id: agency.id, type: 'agency' }, process.env.JWT_SECRET);
        return res.json({ token, userType: 'agency' });
    }

 // Check Customer
    const customer = await Customer.findOne({ where: { email } });
    if (customer && await bcrypt.compare(password, customer.password)) {
        const token = jwt.sign({ id: customer.id, type: 'customer' }, process.env.JWT_SECRET);
        return res.json({ token, userType: 'customer' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};