const Agency = require('../models/Agency');
const bcrypt = require('bcryptjs');

exports.createAgency = async (req, res) => {
    const { agencyName, email, contactNumber, agencyAddress, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const agency = await Agency.create({ agencyName, email, contactNumber, agencyAddress, password: hashedPassword });
        res.status(201).json(agency);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAgencies = async (req, res) => {
    try {
        const agencies = await Agency.findAll();
        res.json(agencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};