import BannerImage from "../../assets/sai-banner.png";
function Banner() {
  return (
    <>
      {/* <div className="bg-emerald-500 sticky top-0 z-20"> */}
      <div className="hidden md:block bg-custom -mb-5">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          {/* <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center"> */}
          {/* <div className="bg-slate-900">
              <div className="max-w-screen-2xl mx-auto px-3 sm:px-10"> */}
          <span className="flex items-center">
            <img
              style={{ width: 1800, height: 150 }}
              // className="w-screen"
              src={BannerImage}
              alt="logo"
            />
          </span>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Banner;
//py-3 is padding on top (y is for y-axis and x is for x-axis)
