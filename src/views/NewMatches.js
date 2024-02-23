import React, { useEffect, useState } from "react";
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
import { UserService } from "../services/user.service";

function NewMatches() {
  const [userDetails, setUserDetails] = useState([]);
  const [filters, setFilters] = useState([])
  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    UserService.getUsersWithFilters(filters)
      .then((res) => {
        console.log(res)
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filters]);



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
            <FilterOptions onSearch={(searchFilters) => setFilters(searchFilters)} />
          </COffcanvasBody>
        </COffcanvas>
        <CRow>
          <CCol className="filter-section" sm={3}>
            <CCard style={{ minHeight: "500px" }}>
              <FilterOptions onSearch={(searchFilters) => setFilters(searchFilters)}/>
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
              {userDetails && userDetails.map((user, i) => (
              <CCard
              onClick={() => {
                window.location.href = '#/user/profile/' + user.id;
              }}
             
              key={i}
                className="mt-4 animate__animated animate__bounceInUp"
                style={{
                  backgroundColor: COLORS.FULL_LIGHT_2,
                  border: "none",
                  boxShadow:
                    "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
                    cursor: 'pointer'
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
                      {user?.basic_information?.firstName} {user.basic_information?.lastName}
                    </span>
                    <br />
                    <span style={{ color: "GrayText", fontSize: "0.9em" }}>
                    {user?.basic_information?.age}Yrs
                    </span>
                    <br />
                    <br />
                    <span>
                    {user?.basic_information?.description || "No Description Available..."}
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
                <CRow className="pb-3">
                  <CCol>
                    <CCollapse visible={visible}>
                      <div style={{ paddingInline: 20 }}>
                        <CRow>
                          <CCol>Age / Height:</CCol>
                          <CCol>
                            {user?.basic_information?.age || '-'} / {userDetails?.basic_information?.height || '-'}
                          </CCol>
                          <CCol>Religion / Community:</CCol>
                          <CCol>{userDetails?.religion}</CCol>
                        </CRow>
                        <CRow>
                          <CCol className="mt-1">Marital Status:</CCol>
                          <CCol className="mt-1">
                            {userDetails?.maritalStatus || '-'}
                          </CCol>
                          <CCol className="mt-1">Location:</CCol>
                          <CCol className="mt-1">{userDetails?.location || '-'}</CCol>
                        </CRow>
                        <CRow>
                          <CCol className="mt-1">Posted by:</CCol>
                          <CCol className="mt-1"> {user?.profileType || '-'}</CCol>
                          <CCol className="mt-1">Mother Tongue:</CCol>
                          <CCol className="mt-1">{userDetails?.language || '-'}</CCol>
                        </CRow>
                      </div>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCard>
               ))}
             
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default NewMatches;
