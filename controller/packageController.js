const Package = require('../models/Package');

// Create a new package
exports.createPackage = async (req, res) => {
    const { name, description, price, duration} = req.body;

    try {
        const newPackage = await Package.create({ name, description, price, duration});
        res.status(201).json({ message: 'Package created successfully!', package: newPackage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all packages
exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a package by ID
exports.getPackageById = async (req, res) => {
    const { id } = req.params;

    try {
        const pkg = await Package.findByPk(id);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(pkg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;

    try {
        const pkg = await Package.findByPk(id);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Update the package fields
        pkg.name = name;
        pkg.description = description;
        pkg.price = price;
        pkg.duration = duration;

        await pkg.save(); // Save the updated package
        res.json({ message: 'Package updated successfully!', package: pkg });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a package
exports.deletePackage = async (req, res) => {
    const { id } = req.params;

    try {
        const pkg = await Package.findByPk(id);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }

        await pkg.destroy();
        res.json({ message: 'Package deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};