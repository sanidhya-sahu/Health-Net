const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  symptoms: [{
    type: {
      type: String,
      enum: ['cramps', 'headache', 'bloating', 'fatigue', 'moodSwings', 'breastTenderness', 'acne', 'backache', 'nausea', 'other'],
      required: true
    },
    intensity: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: String
  }],
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'irritable', 'sensitive', 'energetic', 'calm', 'tired', 'other']
  },
  notes: {
    type: String
  }
}, { timestamps: true });

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;