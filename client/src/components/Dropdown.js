import React, { useEffect, useState } from 'react';

const Dropdown = ({ onSelectState }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => setStates(data));
  }, []);

  return (
    <select onChange={(e) => onSelectState(e.target.value)}>
      <option value="">Select a state</option>
      {states.map((state) => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
