const express = require('express');
const router = express.Router();
const remedyController = require('../controllers/remedyController');

// Define routes
router.get('/remedies/:symptom', remedyController.getRemediesBySymptom);

module.exports = router;