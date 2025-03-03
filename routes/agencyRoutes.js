const express = require('express');
const { createAgency, getAgencies } = require('../controller/agencyController');
const router = express.Router();

router.post('/', createAgency);
router.get('/', getAgencies);

module.exports = router;