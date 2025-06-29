import { Icon } from "@iconify/react";
import locationTemple from "@iconify/icons-mdi/hinduism";
import locationRestaurant from "@iconify/icons-mdi/local-restaurant";
// import locationGrocery from '@iconify/icons-mdi/local-grocery-store'
// import locationGrocery from '@iconify/icons-mdi/local-restaurant'
import "./maps.css";

const LocationMarker = ({ lat, lng, type, onClick }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      {type === "Mandhir" ? (
        <Icon className="location-icon" icon={locationTemple} />
      ) : (
        <Icon className="location-icon" icon={locationRestaurant} />
      )}
    </div>
  );
};

export default LocationMarker;
