const express = require('express');
const router = express.Router();
const cycleController = require('../controllers/cycleController');
const { protect } = require('../middleware/authMiddleware');

// All cycle routes are protected
router.use(protect);

router.post('/', cycleController.createCycle);
router.put('/end', cycleController.endCycle);
router.put('/flow', cycleController.updateFlowIntensity);
router.get('/', cycleController.getCycles);
router.get('/current', cycleController.getCurrentCycle);
router.get('/:id', cycleController.getCycleById);

module.exports = router;