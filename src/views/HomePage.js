import React, { useState } from "react";
import NavBar from "../components/NavBar";
import CarouselHome from "../components/Carousel";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CImage,
  CRow,
} from "@coreui/react";
import FooterBar from "../components/FooterBar";
import { HOMEPAGE } from "../common/typography";
import CultureImage from "../assets/culture-couple.jpg";
import ProtectionImage from "../assets/protection.png";
import WorldImage from "../assets/world-kindness-day.png";
import LoginModal from "../components/modals/LoginModal";
import { COLORS } from "../common/colors";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

import image1 from "../assets/3.jpg";
import image2 from "../assets/4.jpg";
import image3 from "../assets/5.jpg";
import image4 from "../assets/6.jpg";
import image5 from "../assets/7.jpg";
import { useInView } from "react-intersection-observer";

import "../App.css";
import LoadingFullscreen from "../components/LoadingFullscreen";
import TimeoutAuthModal from "../components/modals/TimeoutAuthModal";

const iconStyle = {
  backgroundColor: COLORS.FULL_LIGHT,
  fontSize: "100px",
  borderRadius: "50%",
};

function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [refWhy, inViewWhy] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [refCulture, inViewCulture] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [refPrivacy, inViewPrivacy] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  const [refConnect, inViewConnect] = useInView({
    triggerOnce: true, // Only trigger the animation once
  });

  return (
    <>
      <NavBar />
      <CarouselHome />
      <CContainer className="my-5 px-5">
        <div style={{ marginTop: "100px" }}>
          <p style={{ fontSize: "1.1em", textAlign: "justify" }}>
            {HOMEPAGE.ABOUT.PARA_1}
          </p>
          <p style={{ fontSize: "1.1em", textAlign: "justify" }}>
            {HOMEPAGE.ABOUT.PARA_2}
          </p>
          <p style={{ fontSize: "1.1em", textAlign: "justify" }}>
            {HOMEPAGE.ABOUT.PARA_3}
          </p>
          <p style={{ fontSize: "1.1em", textAlign: "justify" }}>
            {HOMEPAGE.ABOUT.PARA_4}
          </p>
        </div>
        <div
          style={{ marginTop: "100px", textAlign: "center" }}
          ref={refWhy}
          className={`mt-5 ${
            inViewWhy ? "animate__animated animate__zoomIn" : ""
          }`}
        >
          <h1>{HOMEPAGE.WHY_CHOOSE.HEADING.toUpperCase()}</h1>
          <div>
            <CRow xs={{ gutterX: 5 }} className="mt-5">
              <CCol>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={iconStyle}
                    className="material-symbols-outlined p-4 "
                  >
                    vpn_lock
                  </span>
                  <div className="px-3 mt-4" style={{ fontSize: "1.8em" }}>
                    {HOMEPAGE.WHY_CHOOSE.HEADING_1}
                  </div>
                  <div className="px-3 mb-4">{HOMEPAGE.WHY_CHOOSE.PARA_1}</div>
                </div>
              </CCol>
              <CCol>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={iconStyle}
                    className="material-symbols-outlined p-4 "
                  >
                    join_inner
                  </span>
                  <div className="px-3 mt-4" style={{ fontSize: "1.8em" }}>
                    {HOMEPAGE.WHY_CHOOSE.HEADING_2}
                  </div>
                  <div className="px-3 mb-4">{HOMEPAGE.WHY_CHOOSE.PARA_2}</div>
                </div>
              </CCol>
              <CCol>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={iconStyle}
                    className="material-symbols-outlined p-4 "
                  >
                    all_match
                  </span>
                  <div className="px-3 mt-4" style={{ fontSize: "1.8em" }}>
                    {HOMEPAGE.WHY_CHOOSE.HEADING_3}
                  </div>
                  <div className="px-3 mb-4">{HOMEPAGE.WHY_CHOOSE.PARA_3}</div>
                </div>
              </CCol>
            </CRow>
          </div>
        </div>
        <CContainer
          fluid
          ref={ref}
          className={`mt-5 ${
            inView ? "animate__animated animate__zoomInLeft" : ""
          }`}
        >
          <div style={{ textAlign: "center", marginTop: "150px" }}>
            <h1>
              Matrimony Service with{" "}
              <span style={{ color: COLORS.PRIMARY }}>SUCCESS STORIES</span>
            </h1>
            <p>
              Join the growing list of happy couples who found love on Manaliyo.
              Read their inspiring stories and embark on your own journey to
              matrimonial bliss.
            </p>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={false}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{
                width: "100%",
                paddingTop: "50px",
                paddingBottom: "50px",
                height: 600,
              }}
            >
              <SwiperSlide
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 300,
                  height: 300,
                }}
              >
                <CCard style={{ width: "100%", display: "block" }}>
                  <CCardImage
                    orientation="top"
                    height={300}
                    src={image1}
                    style={{ objectFit: "cover" }}
                  />
                  <CCardBody>
                    <CCardTitle>Vinod & Aishwarya</CCardTitle>
                    <CCardText>
                      I found my match in Shaadi.com an I'm not even king, I
                      wouldn't have found my husband otherwise He was all that I
                      was reaming of an he's the right match for me :)
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 300,
                  height: 300,
                }}
              >
                <CCard style={{ width: "100%", display: "block" }}>
                  <CCardImage
                    orientation="top"
                    height={300}
                    src={image5}
                    style={{ objectFit: "cover" }}
                  />
                  <CCardBody>
                    <CCardTitle>Tanya & Praveen</CCardTitle>
                    <CCardText>
                      I made my daughter's profile in Shaadi.com and within a
                      couple of weeks. I found my future son in law Mr. Praveen
                      Pandey. I am very happy and thankful to Shaadi.com to
                      provide this platform.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 300,
                  height: 300,
                }}
              >
                <CCard style={{ width: "100%", display: "block" }}>
                  <CCardImage
                    orientation="top"
                    height={300}
                    src={image3}
                    style={{ objectFit: "cover" }}
                  />
                  <CCardBody>
                    <CCardTitle>Rajat & Bhawana</CCardTitle>
                    <CCardText>
                      I met bhawna Motwani my soul mate through Shaadi.com we
                      had a great conversation she is from Nagpur and we are
                      currently rokafied and will get married on February 23rd
                      2024. I'm thankful to Shaadi.com by this platform I was
                      able to find such a beautiful soul to get married too.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 300,
                  height: 300,
                }}
              >
                <CCard style={{ width: "100%", display: "block" }}>
                  <CCardImage
                    orientation="top"
                    height={300}
                    src={image4}
                    style={{ objectFit: "cover" }}
                  />
                  <CCardBody>
                    <CCardTitle>Supriya & Sarjeet</CCardTitle>
                    <CCardText>
                      I mate my soul mate on Shaadi.com. in the beginning. I am
                      not sure about him.but after 2 meetings we decide to tell
                      our parents and now I am going to married him. Thank u
                      Shaadi.com to find my partner so happy.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 300,
                  height: 300,
                }}
              >
                <CCard style={{ width: "100%", display: "block" }}>
                  <CCardImage
                    orientation="top"
                    height={300}
                    src={image2}
                    style={{ objectFit: "cover" }}
                  />

                  <CCardBody>
                    <CCardTitle>Divyesh & Amee</CCardTitle>
                    <CCardText>
                      I am very glad that i found a perfect match for me on your
                      website. I am very grateful for your services. Thank you
                      so much.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide>
              {/* <SwiperSlide>
                <CCard style={{ width: "18rem" }}>
                  <CCardImage
                    orientation="top"
                    src={"https://swiperjs.com/demos/images/nature-1.jpg"}
                  />
                  <CCardBody>
                    <CCardTitle>Card title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </SwiperSlide> */}
            </Swiper>
          </div>
        </CContainer>
        <div
          ref={refCulture}
          className={`mt-5 ${
            inViewCulture ? "animate__animated animate__zoomInRight" : ""
          }`}
          style={{ marginTop: "180px" }}
        >
          <CRow xs={{ gutterX: 5 }} className="mt-5">
            <CCol xs="12" sm="6">
              <div className="clearfix">
                <CImage
                  fluid
                  align="center"
                  style={{
                    borderRadius: "5%",
                    WebkitBoxShadow: "10px 10px 5px gray",
                  }}
                  className="mb-4"
                  src={CultureImage}
                  height={400}
                />
              </div>
            </CCol>
            <CCol style={{ display: "flex" }} xs="12" sm="6">
              <div style={{ margin: "auto" }} className="p-4">
                <h1>
                  {" "}
                  <span style={{ color: COLORS.PRIMARY }}>CULTURAL</span>{" "}
                  INCLUSIVITY
                </h1>
                <p style={{ fontSize: "1.1em" }}>{HOMEPAGE.CULTURE.PARA}</p>
              </div>
            </CCol>
          </CRow>
        </div>

        <div
          ref={refPrivacy}
          className={`mt-5 ${
            inViewPrivacy ? "animate__animated animate__zoomInLeft" : ""
          }`}
          style={{ marginTop: "100px" }}
        >
          <CRow xs={{ gutterX: 5 }} className="mt-5">
            <CCol style={{ display: "flex" }} xs="12" sm="6">
              <div style={{ margin: "auto" }} className="p-4">
                <h1>
                  YOUR <span style={{ color: COLORS.PRIMARY }}>PRIVACY</span>{" "}
                  MATTERS:
                </h1>
                <p style={{ fontSize: "1.1em" }}>{HOMEPAGE.CULTURE.PARA_1}</p>
              </div>
            </CCol>
            <CCol xs="12" sm="6">
              <div className="clearfix">
                <CImage
                  fluid
                  align="center"
                  className="mb-4"
                  src={ProtectionImage}
                  height={400}
                />
              </div>
            </CCol>
          </CRow>
        </div>

        <div
          ref={refConnect}
          className={`mt-5 ${
            inViewConnect ? "animate__animated animate__zoomInRight" : ""
          }`}
          style={{ marginTop: "100px" }}
        >
          <CRow xs={{ gutterX: 5 }} className="mt-5">
            <CCol xs="12" sm="6">
              <div className="clearfix">
                <CImage
                  align="center"
                  rounded
                  fluid
                  className="mb-4"
                  src={WorldImage}
                  height={400}
                />
              </div>
            </CCol>
            <CCol style={{ display: "flex" }} xs="12" sm="6">
              <div style={{ margin: "auto" }} className="p-4">
                <h1>
                  <span style={{ color: COLORS.PRIMARY }}>CONNECT </span>
                  ANYTIME, ANYWHERE:
                </h1>
                <p style={{ fontSize: "1.1em" }}>{HOMEPAGE.CULTURE.PARA_2}</p>
              </div>
            </CCol>
          </CRow>
        </div>
      </CContainer>
      <FooterBar />
    </>
  );
}

export default HomePage;
