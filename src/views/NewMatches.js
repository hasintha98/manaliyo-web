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
  CPagination,
  CPaginationItem,
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
import { truncateTextWithEllipsis } from "../common/common";

function NewMatches() {
  const [userDetails, setUserDetails] = useState([]);
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    UserService.getUsersWithFilters(filters)
      .then((res) => {
        console.log(res);
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
            <FilterOptions
              onSearch={(searchFilters) => setFilters(searchFilters)}
            />
          </COffcanvasBody>
        </COffcanvas>
        <CRow>
          <CCol className="filter-section" sm={3}>
            <CCard style={{ minHeight: "500px" }}>
              <FilterOptions
                onSearch={(searchFilters) => setFilters(searchFilters)}
              />
            </CCard>
          </CCol>
          <CCol className="filter-btn" sm={3}>
            <CButton
              variant="ghost"
              style={{ color: COLORS.PRIMARY }}
              onClick={() => setFilterVisible(true)}
            >
              {"Filters >>"}
            </CButton>
          </CCol>
          <CCol>
            <CCard style={{ padding: 20 }}>
              <h5 className="new-match-heading">
                Members who match most of your Preferences
              </h5>
              {userDetails &&
                userDetails.map((user, i) => (
                  <CCard
                    key={i}
                    className="mt-4 animate__animated animate__bounceInUp"
                    style={{
                      backgroundColor:
                        user?.accountType == "paid" ? COLORS.FULL_LIGHT_2 : "",
                      border: "none",
                      boxShadow:
                        "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
                      cursor: "pointer",
                    }}
                  >
                    <CRow>
                      <CCol
                        md={4}
                        style={{ textAlign: "center", height: "220px" }}
                        onClick={() => {
                          window.location.href = "#/user/profile/" + user.id;
                        }}
                      >
                        <CImage
                          src={AVATAR}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "0 0% 50% 0%",
                            objectFit: "cover",
                            borderRight: `8px solid ${COLORS.LIGHT}`,
                            borderBottom: `4px solid ${COLORS.LIGHT}`,
                          }}
                        />
                      </CCol>
                      <CCol style={{ padding: 20 }}>
                        <div
                          onClick={() => {
                            window.location.href = "#/user/profile/" + user.id;
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{ fontWeight: "bold", fontSize: "1.2em" }}
                            >
                              {user?.basic_information?.firstName}{" "}
                              {user.basic_information?.lastName}
                            </span>

                            <span
                              style={{ paddingRight: "30px", color: COLORS.PRIMARY }}
                              className="material-symbols-outlined"
                            >
                              favorite
                            </span>
                          </div>

                          <span
                            style={{ color: "GrayText", fontSize: "0.9em" }}
                          >
                            {user?.basic_information?.age}Yrs
                          </span>

                          <div
                            className="mt-1"
                            style={{
                              paddingBottom: user?.basic_information
                                ?.description
                                ? "4px"
                                : "50px",
                            }}
                          >
                            {truncateTextWithEllipsis(
                              user?.basic_information?.description ||
                                "No Description Available...",
                              30
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "30px",
                          }}
                        >
                          {/* <div>
                            <span className="material-symbols-outlined">
                              thumb_up
                            </span>
                          </div> */}
                          <div>
                            <span
                              onClick={() => {
                                if (visible.includes(user.id)) {
                                  setVisible((l) =>
                                    l.filter((id) => id !== user.id)
                                  );
                                } else setVisible([...visible, user.id]);
                              }}
                              className="material-symbols-outlined"
                            >
                              keyboard_arrow_down
                            </span>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CCollapse
                          visible={visible.includes(user.id)}
                          className="pt-2"
                        >
                          <div style={{ paddingInline: 20 }}>
                            <CRow>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}> 
                                Age / Height (Ft):
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}>
                                {user?.basic_information?.age || "-"} /{" "}
                                {user?.personal_information?.height || "-"}
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}>
                                Religion:
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}> 
                                {user?.basic_information?.religion ||
                                  "-"}
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}>
                                Marital Status:
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}>
                                {user?.basic_information
                                  ?.maritalStatus || "-"}
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}>
                                Location:
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}>
                                {user?.basic_information?.location + " / " +user?.location_information?.city ||
                                  "-"}
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}>
                                Posted by:
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}>
                                {" "}
                                {user?.profileType || "-"}
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: COLORS.MID_DARK}}>
                                Occupation
                              </CCol>
                              <CCol className="mt-1" xs={6} sm={3} style={{color: 'GrayText'}}>
                                {user?.occupation_and_finance?.occupation ||
                                  "-"}
                              </CCol>
                            </CRow>
                          </div>
                        </CCollapse>
                      </CCol>
                    </CRow>
                  </CCard>
                ))}
              <div style={{ textAlign: "end" }}>
                <CPagination
                  className="mt-5 animate__animated animate__bounceInUp"
                  aria-label="Page navigation example"
                >
                  <CPaginationItem
                    style={{ color: COLORS.PRIMARY, cursor: "pointer" }}
                    // onClick={() => setPage(metaData.page - 1)}
                  >
                    Previous
                  </CPaginationItem>
                  <CPaginationItem
                    style={{ color: COLORS.PRIMARY, cursor: "pointer" }}
                    // onClick={() => setPage(metaData.page + 1)}
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default NewMatches;
