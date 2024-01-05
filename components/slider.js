"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "./card";
import { useEffect, useState } from "react";
// import "swiper/css";

const Slider = ({ data, completed }) => {
  console.log("slider: ", data);
  const [campaignStat, setCampaignStat] = useState(null);
  const [collPercentage, setcollPercentage] = useState(0);
 console.log("collPercentage: ", collPercentage);
  const fetchData = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/${data[0]?.code}`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data2) => {
        console.log("fetch stat: ", data2);
        setCampaignStat(data2?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (!!campaignStat) {
      console.log("campaignStat: ", campaignStat);
      console.log("data: ", data);
      // console.log();
      let perc =
        (campaignStat.totalColl * 100) / data[0]?.targetAmount;
      setcollPercentage(perc);
      // console.log("percperc: ", perc);
    }
  }, [campaignStat]);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2}
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
            <Card data={item} completed={completed} collPercentage={collPercentage}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
