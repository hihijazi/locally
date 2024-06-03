import React, { useState } from "react";

const SearchBar = ({ options = [], onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectOption = (option) => {
    onSelect(option);
    setSearchTerm(""); 
  };

  console.log("options:", options); // Log the value of options
  console.log("searchTerm:", searchTerm); // Log the value of searchTerm

  // Check if options array is null or undefined before filtering
  const filteredOptions = options ? options.filter((option) =>
    option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase()) // Check if option.label is defined
  ) : [];

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a state..."
      />
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
