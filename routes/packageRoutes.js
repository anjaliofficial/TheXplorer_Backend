const express = require('express');
const {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} = require('../controller/packageController');

const router = express.Router();

// Define routes
router.post('/', createPackage); // Create a new package
router.get('/', getPackages); // Get all packages
router.get('/:id', getPackageById); // Get a package by ID
router.put('/:id', updatePackage); // Update a package
router.delete('/:id', deletePackage); // Delete a package

module.exports = router;