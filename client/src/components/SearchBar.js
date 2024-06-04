import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = ({ options = [], onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectOption = (option) => {
    onSelect(option);
    setSearchTerm(""); 
  };

  const handleSearch = () => {
    // Trigger search based on searchTerm
    const filtered = options.filter((option) =>
      option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      handleSelectOption(filtered[0]);
    }
  };

  const filteredOptions = options ? options.filter((option) =>
    option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a state..."
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <ul>
        {filteredOptions.map((option) => (
          <li key={option.value} onClick={() => handleSelectOption(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
