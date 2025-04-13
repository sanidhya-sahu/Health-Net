const Symptom = require('../models/Symptom');

// Log symptoms for a specific date
exports.logSymptoms = async (req, res) => {
  try {
    const { date, symptoms, mood, notes } = req.body;

    // Check if there's already a symptom entry for this date
    let symptomEntry = await Symptom.findOne({
      user: req.user._id,
      date: new Date(date).toDateString()
    });

    if (symptomEntry) {
      // Update existing entry
      symptomEntry.symptoms = symptoms;
      symptomEntry.mood = mood;
      symptomEntry.notes = notes;
    } else {
      // Create new entry
      symptomEntry = new Symptom({
        user: req.user._id,
        date: new Date(date),
        symptoms,
        mood,
        notes
      });
    }

    const savedSymptom = await symptomEntry.save();
    res.status(201).json(savedSymptom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get symptoms for a specific date
exports.getSymptomsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    const symptomEntry = await Symptom.findOne({
      user: req.user._id,
      date: new Date(date).toDateString()
    });

    if (symptomEntry) {
      res.json(symptomEntry);
    } else {
      res.status(404).json({ message: 'No symptoms found for this date' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get symptoms within a date range
exports.getSymptomsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const symptoms = await Symptom.find({
      user: req.user._id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: 1 });

    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get most common symptoms
exports.getMostCommonSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user._id });
    
    // Analyze symptoms frequency
    const symptomFrequency = {};
    
    symptoms.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        if (symptomFrequency[symptom.type]) {
          symptomFrequency[symptom.type]++;
        } else {
          symptomFrequency[symptom.type] = 1;
        }
      });
    });
    
    // Sort by frequency
    const sortedSymptoms = Object.entries(symptomFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));
    
    res.json(sortedSymptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};