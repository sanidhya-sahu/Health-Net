import React, { useState } from 'react';

function CycleList({ cycles, onUpdateCycle, onDeleteCycle }) {
  const [expandedCycle, setExpandedCycle] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({
    endDate: '',
    symptoms: [],
    notes: ''
  });

  // Predefined symptom options for editing
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

  const toggleExpand = (id) => {
    setExpandedCycle(expandedCycle === id ? null : id);
    setEditMode(null);
  };

  const startEdit = (cycle) => {
    setEditMode(cycle.id);
    
    // Convert symptom labels back to IDs for the checkboxes
    const symptomIds = cycle.symptoms.map(symptomLabel => {
      const option = symptomOptions.find(opt => opt.label === symptomLabel);
      return option ? option.id : null;
    }).filter(id => id !== null);
    
    setEditData({
      endDate: cycle.endDate || '',
      symptoms: symptomIds,
      notes: cycle.notes
    });
  };

  const cancelEdit = () => {
    setEditMode(null);
  };

  const saveEdit = (id) => {
    // Convert symptom IDs back to labels for storage
    const symptomLabels = editData.symptoms.map(id => 
      symptomOptions.find(option => option.id === id).label
    );
    
    onUpdateCycle(id, {
      endDate: editData.endDate,
      symptoms: symptomLabels,
      notes: editData.notes
    });
    setEditMode(null);
  };

  const handleToggleSymptom = (symptomId) => {
    if (editData.symptoms.includes(symptomId)) {
      setEditData({
        ...editData,
        symptoms: editData.symptoms.filter(id => id !== symptomId)
      });
    } else {
      setEditData({
        ...editData,
        symptoms: [...editData.symptoms, symptomId]
      });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'In progress';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!endDate) return 'In progress';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  // Sort cycles by start date (newest first)
  const sortedCycles = [...cycles].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  );

  return (
    <div className="cycle-list">
      <h2>Period History</h2>
      
      {sortedCycles.length === 0 ? (
        <p className="empty-state">No periods recorded yet. Add your first period!</p>
      ) : (
        <ul>
          {sortedCycles.map(cycle => (
            <li key={cycle.id} className="cycle-item">
              <div className="cycle-header" onClick={() => toggleExpand(cycle.id)}>
                <div className="cycle-dates">
                  <span className="cycle-start">{formatDate(cycle.startDate)}</span>
                  {cycle.endDate && (
                    <>
                      <span className="cycle-separator">→</span>
                      <span className="cycle-end">{formatDate(cycle.endDate)}</span>
                    </>
                  )}
                </div>
                <div className="cycle-duration">
                  {calculateDuration(cycle.startDate, cycle.endDate)}
                </div>
                <div className="expand-icon">{expandedCycle === cycle.id ? '▼' : '▶'}</div>
              </div>
              
              {expandedCycle === cycle.id && (
                <div className="cycle-details">
                  {editMode === cycle.id ? (
                    <div className="cycle-edit">
                      <div className="form-group">
                        <label>End Date:</label>
                        <input 
                          type="date" 
                          value={editData.endDate} 
                          onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Symptoms:</label>
                        <div className="symptom-options">
                          {symptomOptions.map(option => (
                            <div key={option.id} className="symptom-checkbox">
                              <input
                                type="checkbox"
                                id={`edit-symptom-${option.id}`}
                                checked={editData.symptoms.includes(option.id)}
                                onChange={() => handleToggleSymptom(option.id)}
                              />
                              <label htmlFor={`edit-symptom-${option.id}`}>{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Notes:</label>
                        <textarea 
                          value={editData.notes} 
                          onChange={(e) => setEditData({...editData, notes: e.target.value})}
                          rows="3"
                        />
                      </div>
                      
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(cycle.id)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {cycle.symptoms.length > 0 && (
                        <div className="cycle-symptoms">
                          <h4>Symptoms:</h4>
                          <div className="symptom-tags">
                            {cycle.symptoms.map((symptom, index) => (
                              <span key={index} className="symptom-tag">{symptom}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {cycle.notes && (
                        <div className="cycle-notes">
                          <h4>Notes:</h4>
                          <p>{cycle.notes}</p>
                        </div>
                      )}
                      
                      <div className="cycle-actions">
                        <button onClick={() => startEdit(cycle)}>Edit</button>
                        <button onClick={() => onDeleteCycle(cycle.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CycleList;