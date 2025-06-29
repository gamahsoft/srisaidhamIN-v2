import styled from "styled-components";
import { useRef, useEffect, useCallback } from "react";
import "./maps.css";

import { MdClose } from "react-icons/md";

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const LocationInfoBox = ({ info, locationInfo, setLocationInfo }) => {
  const locationRef = useRef();

  //when you click outside of modal to close
  const closeLocationInfo = (e) => {
    if (locationRef.current === e.target) {
      setLocationInfo(false);
    }
  };

  //close modal on key press
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && locationInfo) {
        setLocationInfo(false);
      }
    },
    [setLocationInfo, locationInfo]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <div
      className="location-info"
      ref={locationRef}
      onClick={closeLocationInfo}
    >
      <h2>Location Details</h2>
      <ul>
        <li>
          <strong>{info.title}</strong>
        </li>
        <li>
          <strong>Address: </strong>
          {info.address}
        </li>
        <li>
          <strong>Phone: </strong>
          {info.phone}
        </li>
        <li>
          <strong>Timings: </strong>
          {info.timings}
        </li>
      </ul>
      <CloseModalButton onClick={() => setLocationInfo((prev) => !prev)} />
    </div>
  );
};

export default LocationInfoBox;
