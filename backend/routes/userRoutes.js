const express = require('express');
const router = express.Router();
const { food } = require('../controllers/userController');

// POST /api/food
router.post("/food", food);

module.exports = router;