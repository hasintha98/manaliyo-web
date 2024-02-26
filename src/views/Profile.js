import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { CCard, CCol, CContainer, CImage, CRow } from "@coreui/react";
import AVATAR from "../assets/2.jpg";
import { UserService } from "../services/user.service";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { captalizeFirstChar, checkNullOrUndefinedAttributes } from "../common/common";
import ImageSlider from "../components/ImageSlider";

import "../App.css";
import { COLORS } from "../common/colors";
import NoDataArt from "../components/common/NoDataArt";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const { ref } = useParams();
  const getUserDetails = () => {
    UserService.getUserById(ref)
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (ref) getUserDetails(ref);
  }, [ref]);


  return (
    <div className="background-body">
      <NavBar />
      <CContainer className="mb-5">
        <CCard className="mt-2 mb-5 p-4">
          <CRow className="mt-3">
            <CCol md={5}>
              <div
                className="animate__animated animate__bounceIn "
                style={{ textAlign: "center" }}
              >
                <CImage src={AVATAR} style={{ width: "100%" }} thumbnail />
              </div>
            </CCol>
            <CCol
              md={7}
              className="mt-5 animate__animated animate__bounceIn"
              style={{ fontSize: "1em" }}
            >
              <CRow className="d-md-none swpier-web ">
                <ImageSlider height={"160px"} />
              </CRow>
              <CRow>
                <div style={{display: 'flex', gap: 10, justifyContent: 'space-between'}}>
                  <span style={{ color: COLORS.DARK, fontSize: "2.2em" }}>
                    {userDetails?.basic_information?.firstName}{" "}
                    {userDetails?.basic_information?.lastName}
                  </span>
                  <span className="material-symbols-outlined pt-3" style={{color: 'red', cursor: 'pointer'}}>favorite</span>
                </div>

                <span style={{ color: "gray", fontSize: "0.8em" }}>
                  {userDetails?.referenceNo}
                </span>
              </CRow>
              <div style={{ color: "black", fontSize: "0.9em" }}>
                <CRow className="mt-4">
                  <CCol className="mt-1" xs={6} sm={3}>Age / Height:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.age || "-"} /{" "}
                    {userDetails?.personal_information?.height?  userDetails?.personal_information?.height + `${"'"}` :
                      "-"}
                  </CCol >
                  <CCol className="mt-1" xs={6} sm={3}>Religion / Community:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>{userDetails?.basic_information?.religion || "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>Marital Status:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.maritalStatus || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>Location:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.basic_information?.location &&
                                userDetails?.location_information?.city
                                  ? captalizeFirstChar(userDetails?.basic_information?.location) +
                                    " / " +
                                    captalizeFirstChar(userDetails?.location_information?.city)
                                  : captalizeFirstChar(userDetails?.basic_information?.location) ||
                                  captalizeFirstChar(userDetails?.location_information?.city) ||
                                    "-"}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>Posted by:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {captalizeFirstChar(userDetails?.profileType) || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>Gender:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>{captalizeFirstChar(userDetails?.gender) || "-"}</CCol>
                </CRow>
              </div>
              <CRow className="d-none d-md-flex swpier-web mt-5">
                <ImageSlider height={"250px"} />
              </CRow>
            </CCol>
          </CRow>
          <CRow className="mt-5">
              <div
                style={{
                  backgroundColor: COLORS.MID_DARK,
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <h5 className="p-1 mt-1" style={{ fontWeight: "bolder" }}>
                  About {userDetails?.basic_information?.firstName} 
                </h5>
              </div>
            </CRow>
          <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Personality, Family Details, Career, Partner Expectations etc.
                </h6>
           
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol>
                <p>
                  {userDetails?.basic_information?.description || (
                    <NoDataArt
                      icon={"lenjvibx"}
                      size={70}
                      width="50%"
                      visible={true}
                      description={`${userDetails?.basic_information?.firstName} hasn't updated the decription yet!!`}

                    />
                  )}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Education Information
                </h6>
             
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
            {userDetails?.education && !checkNullOrUndefinedAttributes(userDetails?.education) ?
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>Highest Qualification:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>{userDetails?.education?.highestQualification}</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>Other Details:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>{userDetails?.education?.details}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>College(s) Attended:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.education?.college}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>University(s) Attended:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.education?.university}
                  </CCol>
                </CRow>
              </CCol>
              : (
                <NoDataArt
                  icon={"eeouelif"}
                  size={70}
                  width="60%"
                  visible={true}
                  description={`${userDetails?.basic_information?.firstName} hasn't updated the education details yet!!`}

                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Career Information
                </h6>
        
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
            {userDetails?.occupation_and_finance && !checkNullOrUndefinedAttributes(userDetails?.occupation_and_finance) ?
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>Occupation:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>{userDetails?.occupation_and_finance?.occupation}</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>Other Details:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.occupation_and_finance?.occupationDetails}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>Annual Income:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.occupation_and_finance?.salary}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>Employer Name:</CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.occupation_and_finance?.employerName}
                  </CCol>
                </CRow>
              </CCol>
              : (
                <NoDataArt
                  icon={"rdfmytjv"}
                  size={70}
                  width="60%"
                  visible={true}
                  description={`${userDetails?.basic_information?.firstName} hasn't updated the career information yet!!`}
          
                />
              )}
            </CRow>
        </CCard>
      </CContainer>
    </div>
  );
}

export default Profile;
