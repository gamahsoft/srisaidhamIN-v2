import Iframe from "react-iframe";

const AratiVideos = () => {
  return (
    <>
      <div className="bg-white text-slate-900 m-4 p-6 rounded-xl shadow-2xl relative py-8">
        <h3 className="md:text-2xl font-bold text-slate-900 -mt-6 text-center">
          Click below for arati Videos
        </h3>

        <div className="grid grid-cols-3 gap-4 mt-3">
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/fiC28Jcn8vI"
              frameborder="0"
              //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h3 className="text-center">Kakad Aarati</h3>
          </div>
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/gHm2ZBX9pSU"
              frameborder="0"
              allowFullScreen
            />
            <h3 className="text-center">Madhyan Aarati</h3>
          </div>
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/6b6XN7ZvicM"
              frameborder="0"
              allowFullScreen
            />
            <h3 className="text-center">Doop Aarati</h3>
          </div>
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/ecl9WKRpFnY"
              frameborder="0"
              allowFullScreen
            />
            <h3 className="text-center">Shej Aarati</h3>
          </div>
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/ki-4lTmHyfg"
              frameborder="0"
              allowFullScreen
            />
            <h3 className="text-center">Sai Loves Everybody</h3>
          </div>
          <div>
            <Iframe
              className="w-full aspect-ratio: auto;"
              src="https://www.youtube.com/embed/pxuhFeKm5l0"
              frameborder="0"
              allowFullScreen
            />
            <h3 className="text-center">Guru Paduka Stotram</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AratiVideos;
