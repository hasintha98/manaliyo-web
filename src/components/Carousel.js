import {
  CButton,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CImage,
  CRow,
} from "@coreui/react";
import React from "react";
import BG from "../assets/5.jpg";
import { HOMEPAGE } from "../common/typography";
import { COLORS } from "../common/colors";

function CarouselHome() {
  const carouselStyle = {
    height: "800px", // Set the desired height here
    zIndex: 99,
  };

  const imageStyle = {
    objectFit: "cover",
    height: "100%", // Ensure the image takes the full height of the carousel item
  };

  return (
    <>
      <CCarousel controls indicators style={carouselStyle}>
        <CCarouselItem className="caro-item" style={carouselStyle}>
          <CImage
            className="caro-image d-block w-100"
            src={BG}
            alt="slide 1"
            style={imageStyle}
          />
          <CCarouselCaption
            style={{ backdropFilter: "blur(3px)", borderRadius: "100px" }}
            className="d-none d-md-block"
          >
            <h1>{HOMEPAGE.CAROUSEL.HEADING}</h1>
            <p>{HOMEPAGE.CAROUSEL.PARA}</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem style={carouselStyle}>
          <CImage
            className="d-block w-100"
            src={BG}
            alt="slide 2"
            style={imageStyle}
          />
          <CCarouselCaption
            style={{ backdropFilter: "blur(3px)", borderRadius: "100px" }}
            className="d-none d-md-block"
          >
            <h1>{HOMEPAGE.CAROUSEL.HEADING}</h1>
            <p>{HOMEPAGE.CAROUSEL.PARA}</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem style={carouselStyle}>
          <CImage
            className="d-block w-100"
            src={BG}
            alt="slide 3"
            style={imageStyle}
          />
          <CCarouselCaption
            style={{ backdropFilter: "blur(3px)", borderRadius: "100px" }}
            className="d-none d-md-block"
          >
            <h1>{HOMEPAGE.CAROUSEL.HEADING}</h1>
            <p>{HOMEPAGE.CAROUSEL.PARA}</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
      <CContainer
        style={{ zIndex: -1 }}
        className="animate__animated animate__fadeInDown"
      >
        <div
          style={{
            backgroundColor: COLORS.MID_DARK,
            width: "100%",
            borderRadius: "0 0 20px 20px",
            paddingInline: 30,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <CRow>
            <CCol xs={12} sm={2}>
              <CFormLabel
                style={{ color: "white" }}
                htmlFor="exampleInputPassword1"
              >
                I'm looking for a
              </CFormLabel>
              <CFormSelect
                options={[
                  { label: "Woman", value: "woman" },
                  { label: "Man", value: "Man" },
                ]}
              />
            </CCol>
            <CCol xs={12} sm={3}>
              <CRow  className="mt-2">
                <CCol sm={6} xs={4}>
                  <CFormLabel
                    style={{ color: "white" }}
                    htmlFor="exampleInputPassword1"
                  >
                    aged
                  </CFormLabel>
                  <CFormSelect
                    options={[
                      { label: "22", value: "22" },
                      { label: "23", value: "23" },
                      { label: "24", value: "24" },
                    ]}
                  />
                </CCol>
                <CCol
                  sm={1}
                  xs={4}
                  style={{
                    color: "white",
                    marginTop: "35px",
                    textAlign: "center",
                  }}
                >
                  to
                </CCol>
                <CCol >
                  <CFormLabel
                    style={{ color: "white" }}
                    htmlFor="exampleInputPassword1"
                  >
                    *
                  </CFormLabel>
                  <CFormSelect
                    options={[
                      { label: "22", value: "22" },
                      { label: "23", value: "23" },
                      { label: "24", value: "24" },
                    ]}
                  />
                </CCol>
              </CRow>
            </CCol>

            <CCol  className="mt-2">
              <CFormLabel
                style={{ color: "white" }}
                htmlFor="exampleInputPassword1"
              >
                of religion
              </CFormLabel>
              <CFormSelect
                options={[
                  "Select",
                  { label: "One", value: "1" },
                  { label: "Two", value: "2" },
                  { label: "Three", value: "3", disabled: true },
                ]}
              />
            </CCol>
            <CCol  className="mt-2">
              <CFormLabel
                style={{ color: "white" }}
                htmlFor="exampleInputPassword1"
              >
                and living in
              </CFormLabel>
              <CFormSelect
                options={[
                  "Select",
                  { label: "One", value: "1" },
                  { label: "Two", value: "2" },
                  { label: "Three", value: "3", disabled: true },
                ]}
              />
            </CCol>
            <CCol sm={2} xs={12} className="container-centered" style={{marginBottom: '70px'}}>
              <CButton
                shape="rounded-pill"
                className="lets-begin-btn centered-element mt-5"
              >
                {" "}
                Let's Begin
              </CButton>
            </CCol>
          </CRow>
        </div>
      </CContainer>
    </>
  );
}

export default CarouselHome;
