import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from "swiper/modules";
import AVATAR from "../assets/2.jpg";
import { CImage } from '@coreui/react';
function ImageSlider({height}) {
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
      <CImage src={AVATAR} style={{ borderRadius: "15px" }} />
    </SwiperSlide>
    <SwiperSlide>
      {" "}
      <CImage src={AVATAR} style={{ borderRadius: "15px" }} />
    </SwiperSlide>
    <SwiperSlide>
      {" "}
      <CImage src={AVATAR} style={{ borderRadius: "15px" }} />
    </SwiperSlide>
    <SwiperSlide>
      {" "}
      <CImage src={AVATAR} style={{ borderRadius: "15px" }} />
    </SwiperSlide>
  </Swiper>
  )
}

export default ImageSlider