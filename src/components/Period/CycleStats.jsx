import React from 'react';

function CycleStats({ cycles }) {
  if (cycles.length < 2) {
    return (
      <div className="cycle-stats">
        <h2>Cycle Statistics</h2>
        <p>Need at least 2 completed cycles to show statistics.</p>
      </div>
    );
  }

  // Get completed cycles (with start and end dates)
  const completedCycles = cycles.filter(cycle => cycle.startDate && cycle.endDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Calculate cycle lengths
  const cycleLengths = [];
  for (let i = 0; i < completedCycles.length - 1; i++) {
    const currentStart = new Date(completedCycles[i].startDate);
    const nextStart = new Date(completedCycles[i + 1].startDate);
    const diffDays = Math.round((nextStart - currentStart) / (1000 * 60 * 60 * 24));
    cycleLengths.push(diffDays);
  }

  // Calculate period lengths
  const periodLengths = completedCycles.map(cycle => {
    const start = new Date(cycle.startDate);
    const end = new Date(cycle.endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  });

  // Calculate averages
  const avgCycleLength = cycleLengths.length 
    ? Math.round(cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length) 
    : 0;
  
  const avgPeriodLength = periodLengths.length 
    ? Math.round(periodLengths.reduce((sum, length) => sum + length, 0) / periodLengths.length) 
    : 0;

  // Predict next period
  const lastPeriod = completedCycles[completedCycles.length - 1];
  const lastStart = new Date(lastPeriod.startDate);
  const predictedNextDate = new Date(lastStart);
  predictedNextDate.setDate(lastStart.getDate() + avgCycleLength);

  // Most common symptoms
  const symptomCounts = {};
  cycles.forEach(cycle => {
    cycle.symptoms.forEach(symptom => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });

  const sortedSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="cycle-stats">
      <h2>Cycle Statistics</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Cycle Length</h3>
          <div className="stat-value">{avgCycleLength} days</div>
          <div className="stat-desc">Average cycle length</div>
        </div>
        
        <div className="stat-card">
          <h3>Period Length</h3>
          <div className="stat-value">{avgPeriodLength} days</div>
          <div className="stat-desc">Average period duration</div>
        </div>
        
        <div className="stat-card">
          <h3>Next Period</h3>
          <div className="stat-value">
            {predictedNextDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="stat-desc">Estimated start date</div>
        </div>
      </div>
      
      {sortedSymptoms.length > 0 && (
        <div className="common-symptoms">
          <h3>Most Common Symptoms</h3>
          <ul>
            {sortedSymptoms.map(([symptom, count]) => (
              <li key={symptom}>
                <span className="symptom-name">{symptom}</span>
                <span className="symptom-count">({count} {count === 1 ? 'time' : 'times'})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CycleStats;