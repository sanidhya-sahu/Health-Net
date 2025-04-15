import React, { useState } from 'react';

function CycleForm({ onAddCycle }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');

  // Predefined symptom options
  const symptomOptions = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'headache', label: 'Headache' },
    { id: 'bloating', label: 'Bloating' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'mood_changes', label: 'Mood Changes' },
    { id: 'breast_tenderness', label: 'Breast Tenderness' },
    { id: 'acne', label: 'Acne' },
    { id: 'backache', label: 'Backache' },
    { id: 'nausea', label: 'Nausea' },
    { id: 'spotting', label: 'Spotting' }
  ];

  const handleToggleSymptom = (symptomId) => {
    if (symptoms.includes(symptomId)) {
      setSymptoms(symptoms.filter(id => id !== symptomId));
    } else {
      setSymptoms([...symptoms, symptomId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert symptom IDs to labels for better readability when displayed
    const symptomLabels = symptoms.map(id => 
      symptomOptions.find(option => option.id === id).label
    );
    
    onAddCycle({
      startDate,
      endDate,
      symptoms: symptomLabels,
      notes
    });
    
    // Reset form
    setStartDate('');
    setEndDate('');
    setSymptoms([]);
    setNotes('');
  };

  return (
    <div className="cycle-form">
      <h2>Add New Period</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Symptoms:</label>
          <div className="symptom-options">
            {symptomOptions.map(option => (
              <div key={option.id} className="symptom-checkbox">
                <input
                  type="checkbox"
                  id={`symptom-${option.id}`}
                  checked={symptoms.includes(option.id)}
                  onChange={() => handleToggleSymptom(option.id)}
                />
                <label htmlFor={`symptom-${option.id}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
          />
        </div>
        
        <button type="submit" className="submit-btn">Save Period</button>
      </form>
    </div>
  );
}

export default CycleForm;