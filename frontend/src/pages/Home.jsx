import MainCarousel from "../ui/carousel/MainCarousel";
import { TempleTimings } from "../ui/templeTimings/TempleTimings";
import AratiVideos from "../ui/videos/AratiVideos";
import Panchang from "../ui/panchang/Panchang";
import { TestimonialCarousel } from "../ui/carouselTestimonial/TestimonialCarousel";

function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-10 py-1 sm:py-1">
        {/* <div className="mx-auto max-w-screen-2xl px-3 sm:px-2 lg:px-8 py-1 sm:py-1"> */}
        {/* Hero section: Carousel + Temple timings */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-3/5">
            <MainCarousel />
          </div>

          <div className="w-full lg:w-2/5">
            <TempleTimings />
          </div>
        </div>

        {/* <div className="custom-colors px-10 py-6 rounded-lg mt-6 hidden lg:block">
            <h1 className="flex flex-col justify-center items-center">
              I love this text color
            </h1>
          </div> */}

        {/* Arati videos + Panchang */}
        <div className="bg-orange-100 px-3 sm:px-6 lg:px-10 py-6 rounded-lg mt-2">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <AratiVideos />
            <Panchang />
          </div>
        </div>

        {/* Testimonials section (visible on all devices; add 'hidden lg:block' if you want desktop-only) */}
        <div className="favourite-color px-3 sm:px-6 lg:px-10 py-6 rounded-lg mt-4">
          <TestimonialCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
