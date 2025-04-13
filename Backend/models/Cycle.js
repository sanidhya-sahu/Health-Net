const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  flowIntensity: [{
    date: Date,
    level: {
      type: String,
      enum: ['light', 'medium', 'heavy', 'spotting'],
      required: true
    }
  }],
  notes: {
    type: String
  },
  predictedNextCycle: {
    type: Date
  }
}, { timestamps: true });

const Cycle = mongoose.model('Cycle', cycleSchema);

module.exports = Cycle;