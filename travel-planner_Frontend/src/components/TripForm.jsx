export default function TripForm({name, description, setName, setDescription, onSubmit, editingId}) {
    return (
      <form onSubmit={onSubmit}>
        <p>Name</p>
        <input
          type='text'
          value={name}
          required
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
     
)}