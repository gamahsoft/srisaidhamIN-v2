import { useState, useEffect } from "react";

const Countdown = () => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const countDownEndDate = "August 5, 2024 09:00:00";
    const endDate = new Date(countDownEndDate).getTime();

    const interval = setInterval(() => {
      const timeNow = new Date().getTime();
      const timeLeft = endDate - timeNow;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({
          days: days < 10 ? `0${days}` : days.toString(),
          hours: hours < 10 ? `0${hours}` : hours.toString(),
          minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
          seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-left flex mb-10">
      <ul className="w-full flex place-content-center md:place-content-end gap-5 mx-auto text-gray-50">
        <li>
          <div
            className="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
            id="cdD"
          >
            {countdown.days}
          </div>
          <p className="text-center text-xs mt-2">Days</p>
        </li>
        <li>
          <div
            className="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
            id="cdH"
          >
            {countdown.hours}
          </div>
          <p className="text-center text-xs mt-2">Hours</p>
        </li>
        <li>
          <div
            className="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
            id="cdM"
          >
            {countdown.minutes}
          </div>
          <p className="text-center text-xs mt-2">Minutes</p>
        </li>
        <li>
          <div
            className="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
            id="cdS"
          >
            {countdown.seconds}
          </div>
          <p className="text-center text-xs mt-2">Seconds</p>
        </li>
      </ul>
    </div>
  );
};

const ComingSoon = () => {
  return (
    <header className="w-full bg-[url('https://i.imgur.com/2Xurax8.jpg')] bg-center bg-cover ">
      <div className="w-full min-h-screen md:w-1/2 bg-gradient-to-b from-gray-900/90 to-gray-900/95 p-10 flex">
        <div className="w-full text-center my-auto">
          <h1 className="font-bold text-5xl font-Comforter-Brush text-amber-500 mb-10 md:text-right">
            Launcher.
          </h1>
          <h6 className="font-Montserrat font-bold uppercase text-4xl md:text-5xl lg:text-6xl mb-14 md:-mr-20 text-white md:text-right">
            Coming <span className="text-white/70 md:-mr-20">soon</span>
          </h6>
          {/* Countdown Component */}
          <Countdown />
          {/* Content */}
          <p className="text-base mb-10 text-gray-200 md:text-right">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            reprehenderit delectus quasi eligendi maiores consectetur repellat
            necessitatibus libero deleniti quaerat debitis, odit earum modi.
            Magni porro iste dolores.
          </p>
          {/* Social media */}
          <div className="w-full text-left flex">
            <ul className="w-full flex place-content-center md:place-content-end gap-10 mx-auto text-gray-500">
              {/* Add your social media links here */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ComingSoon;
