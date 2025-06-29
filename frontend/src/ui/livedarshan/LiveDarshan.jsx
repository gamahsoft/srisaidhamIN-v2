import Iframe from "react-iframe";
// import Donate from "../../ui/buttons/DonateButton";

import Donate from "../buttons/DonateButton";

const streamURL =
  "https://c.streamhoster.com/embed/media/Wbs3hQ/iRcENIQsc0v/iHd90Vs084F_5";

const LiveDarshan = () => {
  return (
    <>
      <div className="bg-white text-slate-900 m-4 p-6 rounded-xl shadow-2xl relative py-8">
        <h3 className="text-2xl font-bold text-slate-900 -mt-6 text-center">
          Click below for live darshan
        </h3>
        <Iframe
          url={streamURL}
          id="myId"
          className="absolute w-full h-full"
          display="initial"
          position="relative"
          allow="allowFullScreen"
        />
        <p className="md:mx-10 grid justify-items-center mb-40">
          <Donate />
        </p>
      </div>
    </>
  );
};

export default LiveDarshan;
