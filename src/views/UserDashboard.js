import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
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
import AVATAR from "../assets/no_profile.webp";
import UserNavBar from "../components/UserNavBar";
import FooterBar from "../components/FooterBar";
import { COLORS } from "../common/colors";
import { UserService } from "../services/user.service";
import CircularProgress from "../components/common/CircularProgress";

function UserDashboard() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    UserService.getUserCurrentUser()
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="background-body">
      <NavBar />
      <UserNavBar />
      <CContainer className="mb-5">
        <CCard className="mt-2 mb-5 p-4">
          <CRow className="mt-3 ">
            <CCol md={3}>
              <div
                className="animate__animated animate__bounceIn animate__slower"
                style={{ textAlign: "center" }}
              >
                 <CircularProgress img={userDetails?.user_image?.image1 || AVATAR} />
               
              </div>
              <CRow className="mt-3 animate__animated animate__bounceIn animate__slower">
                <span style={{ textAlign: "center" }}>
                  {userDetails?.basic_information?.firstName} {userDetails?.basic_information?.lastName}
                </span>
                <span style={{ color: "GrayText", textAlign: "center" }}>
                  {userDetails?.referenceNo}
                </span>
                <span style={{ color: "GrayText", textAlign: "center" }}>
                  {userDetails?.contact_information?.mobile}
                </span>
              </CRow>
             
            </CCol>
            <CCol
              style={{ fontSize: "0.9em" }}
              className="mt-2 animate__animated animate__zoomInLeft"
            >
              <h6 style={{ fontSize: "1.4em" }}>Your Active Summmery</h6>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardBody>
                      <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        25
                      </span>
                      <br />
                      <span style={{ color: "GrayText" }}>
                        Pending Invitations
                      </span>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol>
                  <CCard>
                    <CCardBody>
                      <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        25
                      </span>
                      <br />
                      <span style={{ color: "GrayText" }}>
                        Accepted Invitations
                      </span>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol>
                  <CCard>
                    <CCardBody>
                      <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        25
                      </span>
                      <br />
                      <span style={{ color: "GrayText" }}>Recent Visitors</span>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={4}>
                  <CCard>
                    <CCardBody>
                      <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        25
                      </span>
                      <br />
                      <span style={{ color: "GrayText" }}>
                        Chats Inititated
                      </span>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol md={4}>
                  <CCard>
                    <CCardBody>
                      <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        25
                      </span>
                      <br />
                      <span style={{ color: "GrayText" }}>Contacts Viewed</span>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol>
                  <CCard>
                    <CCardHeader style={{ backgroundColor: COLORS.FULL_LIGHT }}>
                      Account Type
                    </CCardHeader>
                    <CCardBody
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {userDetails?.accountType == "free" && <span style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Free Memebership
                      </span> }
                      {userDetails?.accountType == "paid" && <span style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Paid Memebership
                      </span> }
                      <span
                        style={{
                          color: COLORS.PRIMARY,
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Upgrade
                      </span>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default UserDashboard;
