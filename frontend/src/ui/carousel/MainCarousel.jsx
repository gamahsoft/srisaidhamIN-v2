//import required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//import swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/styles.css";

//internal import
import sliderData from "../../utils/data";

export default function MainCarousel() {
  const perView = 3; // your desired desktop value
  const perGroup = 1;

  // Simple rule: only loop when you have more than you show
  const canLoop = sliderData.length > perView;

  return (
    <>
      <div className="bg-white hidden md:block">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={30}
          centeredSlides={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            enabled: true,
          }}
          navigation={true}
          // loop={true}
          className="mySwiper"
          key={`swiper-${sliderData.length}-${perView}-${perGroup}`} // forces re-init when data changes
          loop={canLoop}
          rewind={!canLoop}
          watchOverflow={true}
          // slidesPerView={Math.min(perView, Math.max(1, sliderData.length))}
          // slidesPerGroup={Math.min(perGroup, Math.max(1, sliderData.length))}
          slidesPerView={1}
          slidesPerGroup={1}
          autoplay={canLoop ? { delay: 3500 } : false}
          breakpoints={{
            0: {
              slidesPerView: Math.min(1, sliderData.length),
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: Math.min(1, sliderData.length),
              slidesPerGroup: 1,
            },
            1024: {
              slidesPerView: Math.min(1, sliderData.length),
              slidesPerGroup: 1,
            },
          }}
        >
          {sliderData.map((item, i) => (
            <SwiperSlide
              className="h-full relative rounded-lg overflow-hidden"
              key={i + 1}
            >
              <div className="text-sm text-gray-600 hover:text-emerald-dark">
                <img
                  style={{ width: 850, height: 400 }}
                  // width={650}
                  // height={200}
                  src={item.image}
                  alt={item.title}
                  // className="h-400 w-950 object-contain md:object-scale-down"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
                {/* <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12"> */}
                {/* <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                    {item.title}
                  </h1> */}
                <p className="text-3xl m-20 text-white font-sans line-clamp-1 md:line-clamp-none lg:line-clamp-none">
                  {item.info}
                </p>
                {/* <Link href={item.url}>
                  <a className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-emerald-500 text-center rounded-md text-white hover:bg-emerald-600">
                    Shop Now
                  </a>
                </Link> */}
                {/* </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
