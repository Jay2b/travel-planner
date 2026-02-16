import TripItem from "./TripItem"

export default function TripList({trips, onDelete, onEdit}){
    return (trips.map((trip) => (
        <div key={trip.id} className="trip-card">
         <TripItem 
            trip={trip} 
            onDelete = {onDelete}
            onEdit ={onEdit} />
        </div>
      )))
}