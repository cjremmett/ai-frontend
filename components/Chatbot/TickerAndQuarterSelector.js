import React from 'react';
import './TickerAndQuarterSelector.css';

function TickerAndQuarterSelector({ currentTicker, setCurrentTicker, currentQuarter, setCurrentQuarter, selectorsEnabled }) {
    // Generate dropdown options
    const generateDropdownOptions = () => {
        const options = [];
        const currentYear = new Date().getFullYear();

        for (let year = currentYear; year >= currentYear - 25; year--) {
            for (let quarter = 4; quarter >= 1; quarter--) {
                options.push(`Q${quarter} ${year}`);
            }
        }

        return options;
    };

    const dropdownOptions = generateDropdownOptions();
    
    return (
      <div className="chat-input-pane">
        <input
          type="text"
          placeholder="Enter Stock Ticker (e.g., AMZN)"
          value={currentTicker}
          onChange={(e) => setCurrentTicker(e.target.value.toUpperCase())}
          disabled={ !selectorsEnabled }
        />
        <select
          value={currentQuarter}
          onChange={(e) => setCurrentQuarter(e.target.value)}
          disabled={ !selectorsEnabled }
        >
          <option value="">Select Year & Quarter</option>
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
}

export default TickerAndQuarterSelector;