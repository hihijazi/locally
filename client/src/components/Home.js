import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import './Home.css'; // Import the CSS file for styling


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
      <h1>Welcome to Locally</h1>
      <p>Check out different state's attractions, restaurants, and plenty more things to do! Search the state you are planning on visiting and check out the tremendous places you can see.</p>
      <h2>Browse All States</h2>
      {/* Render the SearchBar component */}
      <SearchBar options={states} onSelect={handleSearch} /> {/* Pass handleSearch as onSelect */}
      <ul>
        {filteredStates.map((state) => (
          <li key={state.id}>
            <Link to={`/states/${state.id}`}>{state.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
