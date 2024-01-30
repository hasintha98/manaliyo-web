import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCloseButton,
  CCol,
  CCollapse,
  CContainer,
  CFormInput,
  CFormLabel,
  CImage,
  CNavGroup,
  CNavItem,
  CNavTitle,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
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
import FilterOptions from "../components/FilterOptions";

function NewMatches() {
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

  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <div className="background-body">
      <NavBar />
      {/* <UserNavBar /> */}
      <CContainer className="mb-5 mt-4">
        <COffcanvas
          backdrop={false}
          placement="start"
          visible={filterVisible}
          onHide={() => setFilterVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>Filters</COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setFilterVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <FilterOptions />
          </COffcanvasBody>
        </COffcanvas>
        <CRow>
          <CCol className="filter-section" sm={3}>
            <CCard style={{ minHeight: "500px" }}>
              <FilterOptions />
            </CCard>
          </CCol>
          <CCol   className="filter-btn" sm={3}>
            <CButton
          
              variant="ghost"
              style={{ color: COLORS.PRIMARY }}
              onClick={() => setFilterVisible(true)}
            >
              {"Filters >>"}
            </CButton>
          </CCol>
          <CCol>
            <CCard style={{ padding: 20, paddingInline: "50px" }}>
              <h5>Members who match most of your Preferences</h5>
              <CCard
                className="mt-4 animate__animated animate__bounceInUp"
                style={{
                  backgroundColor: COLORS.FULL_LIGHT_2,
                  border: "none",
                  boxShadow:
                    "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <CRow>
                  <CCol md={4} style={{ textAlign: "center", padding: 20 }}>
                    <CImage
                      src={AVATAR}
                      width={160}
                      height={160}
                      thumbnail
                      style={{
                        borderRadius: "50%",
                        border: `solid 5px ${COLORS.LIGHT}`,
                      }}
                    />
                  </CCol>
                  <CCol style={{ padding: 20 }}>
                    <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                      Hasintha Doluweera
                    </span>
                    <br />
                    <span style={{ color: "GrayText", fontSize: "0.9em" }}>
                      24Yrs
                    </span>
                    <br />
                    <br />
                    <span>
                      Nam et bibendum nibh, suscipit convallis quam. Etiam vitae
                      velit a ante ultrices posuere ut id leo. Nulla facilisi.
                      Sed egestas fringilla ex id mollis.{" "}
                    </span>
                    <br />
                    <div
                      className="mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                      }}
                    >
                      <div>
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </div>
                      <div>
                        <span className="material-symbols-outlined">
                          thumb_up
                        </span>
                      </div>
                      <div>
                        <span
                          onClick={() => setVisible(!visible)}
                          className="material-symbols-outlined"
                        >
                          keyboard_arrow_down
                        </span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CCollapse visible={visible}>
                      <div style={{ paddingInline: 20 }}>
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
                          <CCol className="mt-1">
                            {userDetails.maritalStatus}
                          </CCol>
                          <CCol className="mt-1">Location:</CCol>
                          <CCol className="mt-1">{userDetails.location}</CCol>
                        </CRow>
                        <CRow>
                          <CCol className="mt-1">Posted by:</CCol>
                          <CCol className="mt-1">{userDetails.postedBy}</CCol>
                          <CCol className="mt-1">Mother Tongue:</CCol>
                          <CCol className="mt-1">{userDetails.language}</CCol>
                        </CRow>
                      </div>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCard>
              <CCard
                className="mt-4 animate__animated animate__bounceInUp"
                style={{
                  backgroundColor: COLORS.FULL_LIGHT_2,
                  border: "none",
                  boxShadow:
                    "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <CRow>
                  <CCol md={4} style={{ textAlign: "center", padding: 20 }}>
                    <CImage
                      src={AVATAR}
                      width={160}
                      height={160}
                      thumbnail
                      style={{
                        borderRadius: "50%",
                        border: `solid 5px ${COLORS.LIGHT}`,
                      }}
                    />
                  </CCol>
                  <CCol style={{ padding: 20 }}>
                    <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                      Hasintha Doluweera
                    </span>
                    <br />
                    <span style={{ color: "GrayText", fontSize: "0.9em" }}>
                      24Yrs
                    </span>
                    <br />
                    <br />
                    <span>
                      Nam et bibendum nibh, suscipit convallis quam. Etiam vitae
                      velit a ante ultrices posuere ut id leo. Nulla facilisi.
                      Sed egestas fringilla ex id mollis.{" "}
                    </span>
                    <br />
                    <div
                      className="mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                      }}
                    >
                      <div>
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </div>
                      <div>
                        <span className="material-symbols-outlined">
                          thumb_up
                        </span>
                      </div>
                      <div>
                        <span
                          onClick={() => setVisible(!visible)}
                          className="material-symbols-outlined"
                        >
                          keyboard_arrow_down
                        </span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CCollapse visible={visible}>
                      <div style={{ paddingInline: 20 }}>
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
                          <CCol className="mt-1">
                            {userDetails.maritalStatus}
                          </CCol>
                          <CCol className="mt-1">Location:</CCol>
                          <CCol className="mt-1">{userDetails.location}</CCol>
                        </CRow>
                        <CRow>
                          <CCol className="mt-1">Posted by:</CCol>
                          <CCol className="mt-1">{userDetails.postedBy}</CCol>
                          <CCol className="mt-1">Mother Tongue:</CCol>
                          <CCol className="mt-1">{userDetails.language}</CCol>
                        </CRow>
                      </div>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCard>
              <CCard
                className="mt-4 animate__animated animate__bounceInUp"
                style={{
                  border: "none",
                  boxShadow:
                    "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <CRow>
                  <CCol md={4} style={{ textAlign: "center", padding: 20 }}>
                    <CImage
                      src={AVATAR}
                      width={160}
                      height={160}
                      thumbnail
                      style={{
                        borderRadius: "50%",
                        border: `solid 5px ${COLORS.LIGHT}`,
                      }}
                    />
                  </CCol>
                  <CCol style={{ padding: 20 }}>
                    <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                      Hasintha Doluweera
                    </span>
                    <br />
                    <span style={{ color: "GrayText", fontSize: "0.9em" }}>
                      24Yrs
                    </span>
                    <br />
                    <br />
                    <span>
                      Nam et bibendum nibh, suscipit convallis quam. Etiam vitae
                      velit a ante ultrices posuere ut id leo. Nulla facilisi.
                      Sed egestas fringilla ex id mollis.{" "}
                    </span>
                    <br />
                    <div
                      className="mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                      }}
                    >
                      <div>
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </div>
                      <div>
                        <span className="material-symbols-outlined">
                          thumb_up
                        </span>
                      </div>
                      <div>
                        <span
                          onClick={() => setVisible(!visible)}
                          className="material-symbols-outlined"
                        >
                          keyboard_arrow_down
                        </span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CCollapse visible={visible}>
                      <div style={{ paddingInline: 20 }}>
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
                          <CCol className="mt-1">
                            {userDetails.maritalStatus}
                          </CCol>
                          <CCol className="mt-1">Location:</CCol>
                          <CCol className="mt-1">{userDetails.location}</CCol>
                        </CRow>
                        <CRow>
                          <CCol className="mt-1">Posted by:</CCol>
                          <CCol className="mt-1">{userDetails.postedBy}</CCol>
                          <CCol className="mt-1">Mother Tongue:</CCol>
                          <CCol className="mt-1">{userDetails.language}</CCol>
                        </CRow>
                      </div>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default NewMatches;
