import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function fetchTrips() {
    fetch(`http://localhost:3000/trips`)
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then((res) => res.json())
      .then((newTrip) => {
        setName("");
        setDescription("");
        fetchTrips();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>Trips</h1>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Description</p>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
      {trips.map((trip) => (
        <div key={trip.id}>
          <h3>{trip.name}</h3>
          <p>{trip.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
