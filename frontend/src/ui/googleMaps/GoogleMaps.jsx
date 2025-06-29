import { useState, useEffect } from "react";
import Loader from "../preloader/Loading";
import Maps from "./Maps";
import { LocationDetails } from "./LocationData";
import "./maps.css";

export const GoogleMaps = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      //destructure events from the json file in response
      // const { events } = await res.json()
      // setEventData(events)
      setLocationData(LocationDetails);
      setLoading(false);
    };
    fetchEvents();

    // console.log('events: ', eventData)
  }, []);

  return (
    <div className="map">
      {!loading ? <Maps locationData={locationData} /> : <Loader />}
    </div>
  );
};
