import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import AVATAR from "../assets/no_profile.webp";
import { CImage } from "@coreui/react";
function ImageSlider({ height, imageObject }) {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
      style={{ height: height }}
    >
      <SwiperSlide>
        {" "}
        <CImage
          src={imageObject?.image2 || AVATAR}
          style={{ borderRadius: "15px" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CImage
          src={imageObject?.image3 || AVATAR}
          style={{ borderRadius: "15px" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <CImage
          src={imageObject?.image4 || AVATAR}
          style={{ borderRadius: "15px" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default ImageSlider;
