function Announcements() {
  const announcement = [
    {
      id: 1,
      announcement: "Merry Christmas and Happy New Year 2024",
    },

    {
      id: 2,
      announcement: "Sankranthi Celebrations starting Jan 12th",
    },
    {
      id: 3,
      announcement: "Happy Happy New Year and a New Month and a new day",
    },
    {
      id: 4,
      announcement: "It seems to be working as expected",
    },
  ];
  const announcement1 = "Merry Christmas and Happy New Year 2024";
  const announcement2 = "Sankranthi Celebrations starting Jan 12th";
  const announcement3 = "Happy Happy New Year and a New Month and a new day";
  const announcement4 = "It seems to be working as expected";
  return (
    <>
      <section className="mt-3">
        <div className="full-line-top -mt-2 overflow-hidden" />

        <div className="position-relative marquee-container d-none d-sm-block bg-animation">
          <h3 className="uppercase text-xl text-stroke-black">
            <div className="marquee-wrapper text_scroll">
              {/* first div occurance */}
              <div className="float-left mr-2 text-animate">
                <span className="pl-2 pr-2">🎗️</span>
                <span>{announcement1}</span>

                {announcement2 && (
                  <>
                    <span className="pl-2 pr-2">🎗️</span>
                    <span> {announcement2} </span>
                  </>
                )}
                {announcement3 && (
                  <>
                    <span className="pl-2 pr-2">🎗️</span>
                    <span> {announcement3} </span>
                  </>
                )}
                {announcement4 && (
                  <>
                    <span className="pl-2 pr-2">🎗️</span>
                    <span> {announcement4} </span>
                  </>
                )}
              </div>
            </div>
          </h3>
        </div>

        <div className="full-line-bottom -mt-2 " />
      </section>
    </>
  );
}

export default Announcements;
