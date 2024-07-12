const express = require('express');
const router = express.Router();
const { food, getCal, getdata } = require('../controllers/userController');

// POST /api/food
router.post("/food", food);
router.get('/food/calories', getCal)
router.get('/profile/data', getdata)

module.exports = router;