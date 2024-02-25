import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  CBadge,
  CCard,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CImage,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import AVATAR from "../assets/2.jpg";
import UserNavBar from "../components/UserNavBar";
import FooterBar from "../components/FooterBar";
import { COLORS } from "../common/colors";
import EditUserSectionModal from "../components/modals/EditUserSectionModal";
import { UserService } from "../services/user.service";
import NoDataArt from "../components/common/NoDataArt";
import {
  checkNullOrUndefinedAttributes,
  getNullOrUndefinedAttributes,
} from "../common/common";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedEditSection, setSelectedEditSection] = useState("personality");

  const handleEdit = (section) => {
    setSelectedEditSection(section);
    setIsEdit(!isEdit);
  };

  const getCurrentUserDetails = () => {
    UserService.getUserCurrentUser()
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCurrentUserDetails();
  }, []);

  return (
    <div className="background-body">
      <EditUserSectionModal
        visible={isEdit}
        setVisible={(status) => setIsEdit(status)}
        section={selectedEditSection}
        userDetails={userDetails}
        reload={(status) => (status ? getCurrentUserDetails() : null)}
      />
      <NavBar />
      <UserNavBar />
      <CContainer className="mb-5">
        <CCard className="mt-2 mb-5 p-4">
          <CRow className="mt-3">
            <CCol md={3}>
              <div
                className="animate__animated animate__bounceIn animate__slower"
                style={{ textAlign: "center" }}
              >
                <CImage
                  src={AVATAR}
                  width={160}
                  height={160}
                  thumbnail
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </CCol>
            <CCol
              className="text-gray mt-5 animate__animated animate__bounceIn"
              style={{ fontSize: "0.9em" }}
            >
              <CRow>
                <CCol className="mt-1" xs={6} sm={3}>
                  Age / Height:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.basic_information?.age} /{" "}
                  {userDetails?.personal_information?.height + `${"'"}` || "-"}
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  Religion / Community:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.basic_information?.religion}
                </CCol>
              </CRow>
              <CRow>
                <CCol className="mt-1" xs={6} sm={3}>
                  Marital Status:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.basic_information?.maritalStatus}
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  Location:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.location_information?.city}
                </CCol>
              </CRow>
              <CRow>
                <CCol className="mt-1" xs={6} sm={3}>
                  Posted by:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.profileType}
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  Occupation:
                </CCol>
                <CCol className="mt-1" xs={6} sm={3}>
                  {userDetails?.occupation_and_finance?.occupation}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <div className="animate__animated animate__zoomInLeft">
            <CRow className="mt-5">
              <h4>
                {userDetails?.basic_information?.firstName}{" "}
                {userDetails?.basic_information?.lastName}
              </h4>
            </CRow>
            <p className="mt-2">
              Your personalized sanctuary within Manaliyo, where your unique
              story unfolds. Customize your profile, showcase your
              individuality, and embark on a journey to discover meaningful
              connections. Your perfect match awaits in the details – curate
              your narrative, share your passions, and let your profile be the
              canvas for love to blossom.
            </p>
          </div>
          <div
            className="animate__animated animate__zoomInLeft"
            style={{ color: "GrayText" }}
          >
            <CRow className="mt-3">
              <div
                style={{
                  backgroundColor: COLORS.MID_DARK,
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <h5 className="p-1 mt-1" style={{ fontWeight: "bolder" }}>
                  About Myself
                </h5>
              </div>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Basics & Lifestyle
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("basicl")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>

            <CRow>
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>
                    First Name:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.firstName || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Last Name:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.lastName || "-"}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Age:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.age || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Date of Birth:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.birthDate || "-"}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Marital Status:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.maritalStatus || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Gender:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.gender || "-"}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Religion:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.religion || "-"}
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    Region:
                  </CCol>
                  <CCol className="mt-1" xs={6} sm={3}>
                    {userDetails?.basic_information?.location || "-"}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Personality, Family Details, Career, Partner Expectations etc.
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("personality")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
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
                      description="Tell your story! Add a summary about yourself to attract potential matches. Your uniqueness is your strength."
                      button="Get Started"
                      buttonClicked={(status) => handleEdit("personality")}
                    />
                  )}
                </p>
              </CCol>
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Personal Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("personal")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>

            <CRow>
              {userDetails?.personal_information &&
              !checkNullOrUndefinedAttributes(
                userDetails?.personal_information
              ) ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Height (Ft):
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.personal_information?.height}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Weight (Kg):
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.personal_information?.weight}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Body Type:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.personal_information?.bodyType}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}></CCol>
                    <CCol className="mt-1" xs={6} sm={3}></CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"vistbkts"}
                  size={70}
                  width="50%"
                  visible={true}
                  description="Let's get personal! Add details about yourself to enhance your profile and find meaningful connections."
                  button="Get Started"
                  buttonClicked={(status) => handleEdit("personal")}
                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Family Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("family")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.family_background &&
              !checkNullOrUndefinedAttributes(
                userDetails?.family_background
              ) ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Father's Name:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.fatherName}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Mother's Name:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.motherName}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      No. of Brothers:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.brothersCount}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      No. of Sisters:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.noOfSisters}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Parents Information:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.parentsInformation}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Sibiling Details:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.family_background?.siblingsDetails}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Native Place:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails.nativePlace}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Family Values:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails.familyValues}
                    </CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"laqlvddb"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Family matters! Add your family information to enrich your profile and find compatible matches. Your family values are an essential part of your story. "
                  button="Let's share them together!"
                  buttonClicked={(status) => handleEdit("family")}
                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Education Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("education")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.education &&
              !checkNullOrUndefinedAttributes(userDetails?.education) ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Highest Qualification:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.education?.highestQualification}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Other Details:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.education?.details}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      College(s) Attended:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.education?.college}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      University(s) Attended:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.education?.university}
                    </CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"eeouelif"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Let's talk education! Add your educational background to your profile to connect with like-minded individuals. Your academic journey is a part of who you are."
                  button="Let's highlight it together!"
                  buttonClicked={(status) => handleEdit("education")}
                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Career Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("career")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.occupation_and_finance &&
              !checkNullOrUndefinedAttributes(
                userDetails?.occupation_and_finance
              ) ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Occupation:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.occupation_and_finance?.occupation}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Other Details:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.occupation_and_finance?.occupationDetails}
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Annual Income:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.occupation_and_finance?.salary}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Employer Name:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.occupation_and_finance?.employerName}
                    </CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"rdfmytjv"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Career matters! Share your career information to find matches who align with your professional aspirations. Your career path is an integral part of your story. "
                  button="Let's showcase it together!"
                  buttonClicked={(status) => handleEdit("career")}
                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Location Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("location")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.location_information &&
              !checkNullOrUndefinedAttributes(
                userDetails?.location_information
              ) ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Street Address:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.location_information?.streetAddress}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Country:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.location_information?.country}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      City:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.location_information?.city}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Zip / Pin code:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.location_information?.zipCode}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Residency Status:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.location_information?.residencyStatus}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}></CCol>
                    <CCol className="mt-1" xs={6} sm={3}></CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"surcxhka"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Let's pinpoint your place! Add your location information to connect with matches nearby. Your proximity could spark something special!"
                  button="Let's find your perfect match close to home!"
                  buttonClicked={(status) => handleEdit("location")}
                />
              )}
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Hobbies and Interests
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("hobby")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol>
                <p>
                  {userDetails?.interests_and_hobbie?.hobbies || (
                    <NoDataArt
                      icon={"rmjnvgsm"}
                      size={70}
                      width="60%"
                      visible={true}
                      description="Share your hobbies and interests to connect with like-minded individuals. Your passions could spark something special. Let's find your perfect match together!"
                      button="Add Hobbies Now.."
                      buttonClicked={(status) => handleEdit("hobby")}
                    />
                  )}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Lifestyle Habbits
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("lifestyle")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.lifestyle_habit ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Drinking:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.lifestyle_habit?.drinking}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Smoking:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.lifestyle_habit?.smoking}
                    </CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"ozmbktct"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Let's talk lifestyle! Add your habits and preferences to your profile for better matches. Your lifestyle choices reflect who you are!"
                  button="Get Started"
                  buttonClicked={(status) => handleEdit("lifestyle")}
                />
              )}
            </CRow>
            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Contact Information
                </h6>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleEdit("contact")}
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              {userDetails?.contact_information ? (
                <CCol style={{ fontSize: "0.9em" }}>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Email Address:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.contact_information?.email}
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Username:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.username}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Contact Number:
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      {userDetails?.contact_information?.mobile}
                    </CCol>
                    <CCol></CCol>
                    <CCol></CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-1" xs={6} sm={3}>
                      Password
                    </CCol>
                    <CCol className="mt-1" xs={6} sm={3}>
                      <span>*********</span>{" "}
                      <span
                        style={{
                          color: COLORS.PRIMARY,
                          fontSize: "0.8em",
                          cursor: "pointer",
                          fontStyle: "italic",
                        }}
                        onClick={() => handleEdit("password")}
                      >
                        Change Password
                      </span>
                    </CCol>
                    <CCol></CCol>
                    <CCol></CCol>
                  </CRow>
                </CCol>
              ) : (
                <NoDataArt
                  icon={"ghhwiltn"}
                  size={70}
                  width="60%"
                  visible={true}
                  description="Stay connected! Add your contact information to make it easier for potential matches to reach out. Your communication is the first step towards building meaningful connections"
                  button="Get Started"
                  buttonClicked={(status) => handleEdit("contact")}
                />
              )}
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
                  Partner Preferences
                </h5>
              </div>
            </CRow>

            <CRow className="mt-4">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Basic Info
                </h6>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol>Age:</CCol>
                  <CCol>{userDetails?.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails?.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails?.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails?.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails?.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails?.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails?.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails?.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails?.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails?.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails?.disability}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Location Details
                </h6>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol>Age:</CCol>
                  <CCol>{userDetails?.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails?.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails?.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails?.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails?.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails?.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails?.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails?.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails?.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails?.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails?.disability}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Education & Career
                </h6>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol>Age:</CCol>
                  <CCol>{userDetails?.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails?.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails?.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails?.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails?.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails?.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails?.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails?.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails?.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails?.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails?.disability}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Other Details
                </h6>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "1.1em",
                    color: COLORS.PRIMARY,
                    cursor: "pointer",
                  }}
                >
                  edit_square
                </span>
              </CCol>
              <hr></hr>
            </CRow>
            <CRow>
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol>Age:</CCol>
                  <CCol>{userDetails?.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails?.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails?.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails?.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails?.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails?.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails?.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails?.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails?.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails?.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails?.disability}</CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        </CCard>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default UserProfile;
