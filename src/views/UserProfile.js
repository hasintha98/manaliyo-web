import React, { useState } from "react";
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

function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    id: "21674891264786",
    firstName: "Hasintha",
    lastName: "Doluweera",
    age: 25,
    height: "5.6",
    religion: "Buddhist, Buddhist",
    maritalStatus: "Single",
    location: "Colombo",
    postedBy: "Self",
    language: "sinhala",
    dob: "1998-10-12",
    country: "Sri Lanka",
    SunSign: "Libra",
    diet: "non-veg",
    personalValues: "-",
    bloodGroup: "B-",
    healthInformation: "-",
    disability: "-",
    community: "Buddhist",
    SubCommunity: "-",
    fatherStatus: "",
    motherStatus: "",
    noOfBrothers: "",
    noOfSisters: "",
    familyLocation: "",
    familyType: "",
    nativePlace: "",
    familyValues: "",
    familyAffluence: "",
    higherQualification: "",
    workingWith: "",
    collegeAttended: "",
    workingAs: "",
    annualIncome: "",
    employerName: "",
    currentResidance: "",
    residencyStatus: "",
    stateOfResidence: "",
    zipCode: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [selectedEditSection, setSelectedEditSection] = useState("personality")

  const handleEdit = (section) => {
    setSelectedEditSection(section)
    setIsEdit(!isEdit)
  }
  return (
    <div className="background-body">
      <EditUserSectionModal
        visible={isEdit}
        setVisible={(status) => setIsEdit(status)}
        section={selectedEditSection}
        userDetails={userDetails}
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
                <CCol>Age / Height:</CCol>
                <CCol>
                  {userDetails.age} / {userDetails.height}
                </CCol>
                <CCol>Religion / Community:</CCol>
                <CCol>{userDetails.religion}</CCol>
              </CRow>
              <CRow>
                <CCol className="mt-1">Marital Status:</CCol>
                <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                <CCol className="mt-1">Location:</CCol>
                <CCol className="mt-1">{userDetails.location}</CCol>
              </CRow>
              <CRow>
                <CCol className="mt-1">Posted by:</CCol>
                <CCol className="mt-1">{userDetails.postedBy}</CCol>
                <CCol className="mt-1">Mother Tongue:</CCol>
                <CCol className="mt-1">{userDetails.language}</CCol>
              </CRow>
            </CCol>
          </CRow>
          <div className="animate__animated animate__zoomInLeft">
            <CRow className="mt-5">
              <h4>
                {userDetails.firstName} {userDetails.lastName} ({userDetails.id}
                )
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
                  Glad you chose my profile and here's a quick introduction. In
                  my personal life, I believe in 'simple living and high
                  thinking'. A considerate life partner who will support me
                  through all walks of life will be my ideal match. Thank you
                  very much for your time!
                </p>
              </CCol>
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
                  <CCol>Age:</CCol>
                  <CCol>{userDetails.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails.disability}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Religious Background & Astro Details
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
                  <CCol>Mother Tongue:</CCol>
                  <CCol>{userDetails.language}</CCol>
                  <CCol>Community:</CCol>
                  <CCol>{userDetails.language}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Religion:</CCol>
                  <CCol className="mt-1">{userDetails.religion}</CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Family details
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
                  <CCol>Father's Status:</CCol>
                  <CCol>{userDetails.fatherStatus}</CCol>
                  <CCol>No. of Brothers:</CCol>
                  <CCol>{userDetails.noOfBrothers}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Mother's Status:</CCol>
                  <CCol className="mt-1">{userDetails.motherStatus}</CCol>
                  <CCol className="mt-1">No. of Sisters:</CCol>
                  <CCol className="mt-1">{userDetails.noOfSisters}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Family Location:</CCol>
                  <CCol className="mt-1">{userDetails.familyLocation}</CCol>
                  <CCol className="mt-1">Family Type:</CCol>
                  <CCol className="mt-1">{userDetails.familyType}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Native Place:</CCol>
                  <CCol className="mt-1">{userDetails.nativePlace}</CCol>
                  <CCol className="mt-1">Family Values:</CCol>
                  <CCol className="mt-1">{userDetails.familyValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Family Affluence:</CCol>
                  <CCol className="mt-1">{userDetails.familyAffluence}</CCol>
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
                  <CCol>Highest Qualification:</CCol>
                  <CCol>{userDetails.higherQualification}</CCol>
                  <CCol>Working With:</CCol>
                  <CCol>{userDetails.workingWith}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">College(s) Attended:</CCol>
                  <CCol className="mt-1">{userDetails.collegeAttended}</CCol>
                  <CCol className="mt-1">Working As:</CCol>
                  <CCol className="mt-1">{userDetails.workingAs}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Annual Income:</CCol>
                  <CCol className="mt-1">{userDetails.annualIncome}</CCol>
                  <CCol className="mt-1">Employer Name:</CCol>
                  <CCol className="mt-1">{userDetails.employerName}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Location of Groom
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
                  <CCol>Current Residence:</CCol>
                  <CCol>{userDetails.currentResidance}</CCol>
                  <CCol>Residency Status:</CCol>
                  <CCol>{userDetails.residencyStatus}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">State Of Residence:</CCol>
                  <CCol className="mt-1">{userDetails.stateOfResidence}</CCol>
                  <CCol className="mt-1">Zip / Pin code:</CCol>
                  <CCol className="mt-1">{userDetails.zipCode}</CCol>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-5">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Hobbies and Interests
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
              <CCol>
                <p>
                  Glad you chose my profile and here's a quick introduction. In
                  my personal life, I believe in 'simple living and high
                  thinking'. A considerate life partner who will support me
                  through all walks of life will be my ideal match. Thank you
                  very much for your time!
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-3">
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
                  <CCol>{userDetails.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails.disability}</CCol>
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
                  <CCol>{userDetails.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails.disability}</CCol>
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
                  <CCol>{userDetails.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails.disability}</CCol>
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
                  <CCol>{userDetails.age}</CCol>
                  <CCol>Diet:</CCol>
                  <CCol>{userDetails.diet}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Date of Birth:</CCol>
                  <CCol className="mt-1">{userDetails.dob}</CCol>
                  <CCol className="mt-1">Personal Values:</CCol>
                  <CCol className="mt-1">{userDetails.personalValues}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Marital Status:</CCol>
                  <CCol className="mt-1">{userDetails.maritalStatus}</CCol>
                  <CCol className="mt-1">Sun Sign:</CCol>
                  <CCol className="mt-1">{userDetails.SunSign}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Height:</CCol>
                  <CCol className="mt-1">{userDetails.height}</CCol>
                  <CCol className="mt-1">Blood Group:</CCol>
                  <CCol className="mt-1">{userDetails.bloodGroup}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1">Grew up in:</CCol>
                  <CCol className="mt-1">{userDetails.country}</CCol>
                  <CCol className="mt-1">Health Information:</CCol>
                  <CCol className="mt-1">{userDetails.healthInformation}</CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1"></CCol>
                  <CCol className="mt-1">Disability:</CCol>
                  <CCol className="mt-1">{userDetails.disability}</CCol>
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
