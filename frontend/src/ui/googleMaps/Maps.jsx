import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Maps = ({ locationData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = locationData.map((ev, index) => {
    if (ev.type === "Mandhir" || ev.type === "Restaurant") {
      return (
        <LocationMarker
          key={index}
          lat={ev.lat}
          lng={ev.lng}
          type={ev.type}
          onClick={() =>
            setLocationInfo({
              title: ev.title,
              address: ev.address,
              phone: ev.phone,
              timings: ev.timings,
            })
          }
        />
      );
    }
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB6yoP0kzzC8GLT3JAFJ_MI1HcTjJ3aQmI" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
        {/* <LocationMarker lat={center.lat} lng={center.lng} /> */}
      </GoogleMapReact>
      {locationInfo && (
        <LocationInfoBox
          info={locationInfo}
          locationInfo={locationInfo}
          setLocationInfo={setLocationInfo}
        />
      )}
    </div>
  );
};

Maps.defaultProps = {
  center: {
    lat: 37.98971,
    lng: -87.36489,
  },
  zoom: 12,
};
export default Maps;
