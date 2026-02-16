import { useState, useEffect } from "react";
import "./App.css";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";


function App() {
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://travel-planner-6toc.onrender.com";

  function fetchTrips() {
    fetch(`${API_URL}/trips`)
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
      fetch(`${API_URL}/trips`, {
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
    fetch(`${API_URL}/trips/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTrips((values) => {
        return values.filter((trip) => trip.id !== id);
      });
    });
  }

  //Edit Trip
  function updateTrip(id) {
    fetch(`${API_URL}/trips/${id}`, {
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
    <div className="container">
      <h1>Trips</h1>
    {/* Render Form */}
      <TripForm 
      name = {name} 
      description={description}
      setName={setName}
      setDescription={setDescription}
      onSubmit={handleSubmit}
      editingId={editingId}/>  
  {/* Render List */}
    <TripList 
      trips={trips}
      onDelete ={deleteTrip}
      onEdit ={startEdit}/>
    </div>
  );
}

export default App;
