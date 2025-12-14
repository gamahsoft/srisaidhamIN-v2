import BannerImage from "../../assets/sai-banner.png";

function Banner() {
  return (
    <div className="bg-custom -mb-6">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <img
          src={BannerImage}
          alt="Sri Saidham Newburgh Banner"
          className="
            w-full
            h-24 sm:h-32 md:h-40 lg:h-48
            object-cover
            rounded-md
          "
        />
      </div>
    </div>
  );
}

export default Banner;
