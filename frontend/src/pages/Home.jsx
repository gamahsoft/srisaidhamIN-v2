import MainCarousel from "../ui/carousel/MainCarousel";
import { TempleTimings } from "../ui/templeTimings/TempleTimings";
import AratiVideos from "../ui/videos/AratiVideos";
import Panchang from "../ui/panchang/panchang";
import { TestimonialCarousel } from "../ui/carouselTestimonial/TestimonialCarousel";

function Home() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto py-2 max-w-screen-2xl px-3 sm:px-10">
          <div className="flex w-full">
            <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5 hidden">
              <MainCarousel />
            </div>
            <div className="w-full lg:flex">
              <TempleTimings />
            </div>
          </div>

          <div className="custom-colors px-10 py-6 rounded-lg mt-6 hidden lg:block">
            <h1 className="flex flex-col justify-center items-center">
              I love this text color
            </h1>
          </div>

          <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 lg:block">
            <div className="grid md:grid-cols-2">
              <AratiVideos />
              <Panchang />
            </div>
          </div>
          <div className="hidden favourite-color px-10 py-6 rounded-lg mt-4 lg:block">
            <TestimonialCarousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
