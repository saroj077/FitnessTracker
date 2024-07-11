const express = require('express');
const router = express.Router();
const { food, getCal } = require('../controllers/userController');

// POST /api/food
router.post("/food", food);
router.get('/food/calories', getCal)

module.exports = router;