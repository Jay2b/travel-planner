export default function TripItem({trip, onDelete, onEdit}){
    return(
    <>
    <h3>{trip.name}</h3>
          <p>{trip.description}</p>
          <div className="trip-actions">
            <button className="btn-delete" onClick={() => onDelete(trip.id)}>
                Delete
            </button>
            <button className="btn-edit" onClick={() => onEdit(trip)}>
                Edit
            </button>
          </div>
          </>)
          
}