import {
  Parallax,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

// import /carousel/home-slider-2.jpg
import swiperImage from "/carousel/home-slider-8.jpg";
const backgroundImageStyle = {
  backgroundImage: `url("${swiperImage}")`,
  backgroundSize: "cover",
};

export const TestimonialCarousel = () => {
  return (
    <div>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        parallax={true}
        speed={2600}
        spaceBetween={50}
        centeredSlides={true}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        loopfillgroupwithblank={true}
        // navigation={true}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Parallax, Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        className="mySwiper"
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <div
          slot="container-start"
          className="parallax-bg rounded-xl"
          style={backgroundImageStyle}
          data-swiper-parallax="-23%"
        >
          <h2 className="text-white text-xl md:text-3xl text-center">
            Devotee Testimonials
          </h2>
        </div>

        <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  This is Shirdi in America for me. Come and get Baba blessings.
                  what more can I say ….
                </p>
              </blockquote>
              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide>

        {/* <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  This is Shirdi in America for me. Come and get Baba blessings.
                  what more can I say ….
                </p>
              </blockquote>
              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide> */}

        <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  The moment I walk into the mandhir I forget all my worries.
                  Come and join us everyday.
                </p>
              </blockquote>
              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide>

        <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              {/* <FaQuoteRight /> */}
              <blockquote>
                <p>
                  Thank you so much for giving us the opportunity to be part of
                  Sai Seva program.
                </p>
              </blockquote>
              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide>

        <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              {/* <FaQuoteRight /> */}
              <blockquote>
                <p>
                  By the grace of Sai Baba everything is excellent, Saidham is
                  the most peaceful place on earth.
                </p>
              </blockquote>
              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide>

        <SwiperSlide>
          <figure className="snip1533">
            <figcaption>
              {/* <FaQuoteRight /> */}
              <blockquote>
                <p>
                  I get the opportunity to participate in all Baba Sevas...can't
                  ask for anything more than this.
                </p>
              </blockquote>

              <h4>--Devotee</h4>
            </figcaption>
          </figure>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
