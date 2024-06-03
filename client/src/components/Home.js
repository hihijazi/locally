import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("/states")
      .then((r) => r.json())
      .then(setStates);
  }, []);

  return (
    <section>
      <h2>All States</h2>
      <ul>
        {states.map((state) => (
          <li key={state.id}>
            <Link to={`/states/${state.id}`}>{state.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
