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
  CPopover,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import BG from "../assets/c1.jpg";
import MG from "../assets/5.jpg";
import { HOMEPAGE } from "../common/typography";
import { COLORS } from "../common/colors";
import { regions, religions } from "../common/const";
import RegisterModal from "./modals/RegisterModal";

function CarouselHome() {
  const carouselStyle = {
    height: "800px", // Set the desired height here
    zIndex: 99,
  };

  const imageStyle = {
    objectFit: "cover",
    height: "100%", // Ensure the image takes the full height of the carousel item
  };

  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [partnerData, setPartnerData] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(true);

  const [ppGender, setppGender] = useState("female");
  const [ppLocation, setppLocation] = useState("");
  const [ppReligion, setppReligion] = useState("");
  const [ppAge, setppAge] = useState([18, 100]);
  const ages = [];
  for (let i = 18; i <= 100; i++) {
    ages.push({ label: i.toString(), value: i });
  }

  const registerPartnerData = () => {
    setPartnerData({
      ppGender,
      ppAge,
      ppLocation,
      ppReligion
    })
    setRegisterModalVisible(true)

  };

  useEffect(() => {
    if (!ppReligion || ppReligion == "Select") {
      setPopoverVisible(true);
      return;
    } else if (!ppLocation || ppLocation == "Select") {
      setPopoverVisible(true);
      return;
    }  else {
      setPopoverVisible(false);
    }
  
  }, [ppLocation, ppReligion])
  

  return (
    <>
      <CCarousel
        className="d-none d-md-flex"
        controls
        indicators
        style={carouselStyle}
      >
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
      <CCarousel
        className="d-md-none"
        controls
        indicators
        style={carouselStyle}
      >
        <CCarouselItem className="caro-item" style={carouselStyle}>
          <CImage
            className="caro-image d-block w-100"
            src={MG}
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
            src={MG}
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
            src={MG}
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
                value={ppGender}
                onChange={(e) => setppGender(e.target.value)}
                options={[
                  { label: "Woman", value: "female" },
                  { label: "Man", value: "male" },
                ]}
              />
            </CCol>
            <CCol xs={12} sm={3}>
              <CRow className="mt-2">
                <CCol sm={6} xs={4}>
                  <CFormLabel
                    style={{ color: "white" }}
                    htmlFor="exampleInputPassword1"
                  >
                    aged
                  </CFormLabel>
                  <CFormSelect
                    value={ppAge[0]}
                    onChange={(e) => setppAge([e.target.value, ppAge[1]])}
                    options={ages}
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
                <CCol>
                  <CFormLabel
                    style={{ color: "white" }}
                    htmlFor="exampleInputPassword1"
                  >
                    *
                  </CFormLabel>
                  <CFormSelect
                    value={ppAge[1]}
                    onChange={(e) => setppAge([ppAge[0], e.target.value])}
                    options={ages}
                  />
                </CCol>
              </CRow>
            </CCol>

            <CCol className="mt-2">
              <CFormLabel
                style={{ color: "white" }}
                htmlFor="exampleInputPassword1"
              >
                of religion
              </CFormLabel>
              <CFormSelect
                value={ppReligion}
                onChange={(e) => setppReligion(e.target.value)}
                options={["Select", ...religions]}
              />
            </CCol>
            <CCol className="mt-2">
              <CFormLabel
                style={{ color: "white" }}
                htmlFor="exampleInputPassword1"
              >
                and living in
              </CFormLabel>
              <CFormSelect
                value={ppLocation}
                onChange={(e) => setppLocation(e.target.value)}
                options={["Select", ...regions]}
              />
            </CCol>
            <CCol
              sm={2}
              xs={12}
              className="container-centered"
              style={{ marginBottom: "70px" }}
            >
              {popoverVisible ? (
                <CPopover
                  content="Please Select All the Required Details!"
                  placement="top"
                  title={<div>Action Required</div>}
                  trigger="click"
                >
                  <CButton
                    shape="rounded-pill"
                    className="lets-begin-btn centered-element mt-5"
                  >
                    {" "}
                    Let's Begin
                  </CButton>
                </CPopover>
              ) : (
                <CButton
                  shape="rounded-pill"
                  className="lets-begin-btn centered-element mt-5"
                  onClick={() => registerPartnerData()}
                >
                  {" "}
                  Let's Begin
                </CButton>
              )}
            </CCol>
          </CRow>
        </div>
        <RegisterModal
          visible={registerModalVisible}
          setVisible={(status) => setRegisterModalVisible(status)}
          partnerData={partnerData}
        />
      </CContainer>
    </>
  );
}

export default CarouselHome;
