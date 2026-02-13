import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  function fetchTrips() {
    fetch(`http://localhost:3000/trips`)
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  //Add the trip
  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      updateTrip(editingId);
    } else {
      fetch(`http://localhost:3000/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setName("");
          setDescription("");
          fetchTrips();
        })
        .catch((err) => console.log(err));
    }
  }

  //Delete The trip
  function deleteTrip(id) {
    fetch(`http://localhost:3000/trips/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTrips((values) => {
        return values.filter((trip) => trip.id !== id);
      });
    });
  }

  //Edit Trip
  function updateTrip(id) {
    fetch(`http://localhost:3000/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingId(null);
        setName("");
        setDescription("");
        fetchTrips();
      })
      .catch((err) => console.log(err));
  }
  function startEdit(trip) {
    setEditingId(trip.id);
    setName(trip.name);
    setDescription(trip.description);
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
        <button type='submit'>{editingId ? "Update Trip" : "Add Trip"}</button>
      </form>
      {trips.map((trip) => (
        <div key={trip.id}>
          <h3>{trip.name}</h3>
          <p>{trip.description}</p>
          <button onClick={() => deleteTrip(trip.id)}>Delete</button>
          <button onClick={() => startEdit(trip)}>Edit</button>
        </div>
      ))}
    </>
  );
}

export default App;
