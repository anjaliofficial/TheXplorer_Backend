const express = require('express');
const { createAdmin, getAdmins } = require('../controller/adminController');
const router = express.Router();

router.post('/', createAdmin);
router.get('/', getAdmins);

module.exports = router;