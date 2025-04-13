const Cycle = require('../models/Cycle');
const User = require('../models/User');

// Calculate next predicted cycle based on average cycle length
const calculateNextCycle = async (userId, startDate) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const startDateObj = new Date(startDate);
    const predictedDate = new Date(startDateObj);
    predictedDate.setDate(startDateObj.getDate() + user.averageCycleLength);
    
    return predictedDate;
  } catch (error) {
    console.error('Error calculating next cycle:', error);
    return null;
  }
};

// Update user's average cycle length based on historical data
const updateAverageCycleLength = async (userId) => {
  try {
    const cycles = await Cycle.find({ user: userId }).sort({ startDate: 1 });
    
    if (cycles.length < 2) return;
    
    // Calculate the average cycle length based on the last few cycles
    let totalDays = 0;
    let count = 0;

    for (let i = 1; i < cycles.length; i++) {
      const current = new Date(cycles[i].startDate);
      const previous = new Date(cycles[i-1].startDate);
      const difference = Math.round((current - previous) / (1000 * 60 * 60 * 24));
      
      // Only count reasonable cycle lengths (e.g., between 21 and 45 days)
      if (difference >= 21 && difference <= 45) {
        totalDays += difference;
        count++;
      }
    }

    if (count > 0) {
      const averageCycleLength = Math.round(totalDays / count);
      await User.findByIdAndUpdate(userId, { averageCycleLength });
    }
  } catch (error) {
    console.error('Error updating average cycle length:', error);
  }
};

// Create new cycle
exports.createCycle = async (req, res) => {
  try {
    const { startDate, flowIntensity, notes } = req.body;
    
    // Calculate predicted next cycle date
    const predictedNextCycle = await calculateNextCycle(req.user._id, startDate);

    const newCycle = await Cycle.create({
      user: req.user._id,
      startDate: new Date(startDate),
      flowIntensity: flowIntensity || [],
      notes,
      predictedNextCycle
    });

    // Update user's average cycle length if there's enough data
    await updateAverageCycleLength(req.user._id);

    res.status(201).json(newCycle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// End current cycle
exports.endCycle = async (req, res) => {
  try {
    const { cycleId, endDate } = req.body;

    const cycle = await Cycle.findOne({
      _id: cycleId,
      user: req.user._id
    });

    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found' });
    }

    cycle.endDate = new Date(endDate);
    
    // Calculate period length and update user's average
    const periodLength = Math.round((new Date(endDate) - new Date(cycle.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    
    // Update user's average period length
    if (periodLength > 0 && periodLength <= 14) {
      const user = await User.findById(req.user._id);
      // Simple moving average calculation
      const newAverage = Math.round((user.averagePeriodLength + periodLength) / 2);
      user.averagePeriodLength = newAverage;
      await user.save();
    }

    const updatedCycle = await cycle.save();
    res.json(updatedCycle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update flow intensity for a specific date
exports.updateFlowIntensity = async (req, res) => {
  try {
    const { cycleId, date, level } = req.body;

    const cycle = await Cycle.findOne({
      _id: cycleId,
      user: req.user._id
    });

    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found' });
    }

    // Check if there's already a flow intensity entry for this date
    const existingIndex = cycle.flowIntensity.findIndex(
      entry => new Date(entry.date).toDateString() === new Date(date).toDateString()
    );

    if (existingIndex !== -1) {
      // Update existing entry
      cycle.flowIntensity[existingIndex].level = level;
    } else {
      // Add new entry
      cycle.flowIntensity.push({ date: new Date(date), level });
    }

    const updatedCycle = await cycle.save();
    res.json(updatedCycle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cycles for a user
exports.getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id }).sort({ startDate: -1 });
    res.json(cycles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cycle by ID
exports.getCycleById = async (req, res) => {
  try {
    const cycle = await Cycle.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (cycle) {
      res.json(cycle);
    } else {
      res.status(404).json({ message: 'Cycle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current or upcoming cycle
exports.getCurrentCycle = async (req, res) => {
  try {
    const today = new Date();
    
    // Find a cycle where today is between startDate and endDate (or endDate is null)
    const currentCycle = await Cycle.findOne({
      user: req.user._id,
      startDate: { $lte: today },
      $or: [
        { endDate: { $gte: today } },
        { endDate: null }
      ]
    });

    if (currentCycle) {
      return res.json({ type: 'current', cycle: currentCycle });
    }

    // If no current cycle, find the next predicted cycle
    const upcomingCycle = await Cycle.findOne({
      user: req.user._id,
      startDate: { $gt: today }
    }).sort({ startDate: 1 });

    if (upcomingCycle) {
      return res.json({ type: 'upcoming', cycle: upcomingCycle });
    }

    // If no upcoming cycle, predict one based on the last cycle
    const lastCycle = await Cycle.findOne({
      user: req.user._id
    }).sort({ startDate: -1 });

    if (lastCycle && lastCycle.predictedNextCycle) {
      return res.json({ 
        type: 'predicted', 
        predictedDate: lastCycle.predictedNextCycle,
        basedOn: lastCycle._id
      });
    }

    // If no data at all
    res.json({ type: 'none' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};