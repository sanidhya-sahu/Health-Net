const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const { protect } = require('../middleware/authMiddleware');

// All symptom routes are protected
router.use(protect);

router.post('/', symptomController.logSymptoms);
router.get('/date/:date', symptomController.getSymptomsByDate);
router.get('/range', symptomController.getSymptomsByDateRange);
router.get('/common', symptomController.getMostCommonSymptoms);

module.exports = router;