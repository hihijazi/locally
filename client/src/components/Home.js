import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function Home() {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    fetch("/states")
      .then((r) => r.json())
      .then((data) => {
        setStates(data);
        setFilteredStates(data); // Initialize filteredStates with all states
      });
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter states based on search term
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  return (
    <section>
      <h2>Browse All States</h2>
      {/* Render the SearchBar component */}
      <SearchBar options={states} onSelect={handleSearch} /> {/* Pass handleSearch as onSelect */}
      <ul>
      </ul>
    </section>
  );
}

export default Home;
