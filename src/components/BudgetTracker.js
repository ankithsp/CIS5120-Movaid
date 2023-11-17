import React, { useState, useEffect } from 'react';
import './BudgetTracker.css'; // Create a CSS file for styling

const BudgetTracker = ({ budget, currentSpend }) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    // Set the fill percentage when the component mounts
    setFillPercentage((currentSpend / budget) * 100);
  }, [budget, currentSpend]);

  return (
    <div className="budget-tracker">
      <div className="progress-bar" style={{ width: `${fillPercentage}%` }}>
        <div className="marker" style={{ left: `${fillPercentage}%` }}>
            {`$${currentSpend} / $${budget}`}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;