"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "./card";
// import "swiper/css";

const Slider = ({ data, completed }) => (
  <div>
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1.5}
      breakpoints={{
        // when window width is >= 640px

        480: {
          width: 480,
          slidesPerView: 2.2,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 3.2,
        },
      }}
      //   navigation
      //   pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {data?.map((item, idx) => (
        <SwiperSlide className="relative" key={idx}>
          <Card data={item} completed={completed} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Slider;
