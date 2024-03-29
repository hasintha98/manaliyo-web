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
import AVATAR from "../assets/no_profile.webp";
import UserNavBar from "../components/UserNavBar";
import FooterBar from "../components/FooterBar";
import { COLORS } from "../common/colors";
import FilterOptions from "../components/FilterOptions";
import { UserService } from "../services/user.service";
import { captalizeFirstChar, truncateTextWithEllipsis } from "../common/common";
import LoadingFullscreen from "../components/LoadingFullscreen";
import NoDataArt from "../components/common/NoDataArt";
import { MODAL_MSGES } from "../common/typography";
import TokenService from "../services/token.service";

function NewMatches() {
  const [userDetails, setUserDetails] = useState([]);
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pageGap = 10;

  const [startPage, setStartPage] = useState(0);
  const [limitPage, setLimitPage] = useState(pageGap);
  useEffect(() => {
    setIsLoading(true);
    UserService.getUsersWithFilters(filters, startPage, limitPage)
      .then((res) => {
        setIsLoading(false);
        setFilterVisible(false);
        setUserDetails(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setFilterVisible(false);
        console.log(err);
      });
  }, [filters, limitPage, startPage]);

  const updateLikes = async (likesId, status, currentLikes) => {
    let newLikes = [];
    if (status) {
      newLikes = !currentLikes ? [[likesId]] : [...currentLikes, [likesId]];
    } else {
      newLikes = currentLikes.filter((e) => e !== likesId);
    }

    const data = {
      likes: newLikes,
    };

    UserService.updateUser(TokenService.getUser()?.user?.id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              <div
                className="card-list"
                style={{
                  height: "1000px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "10px",
                }}
              >
                {isLoading ? (
                  <LoadingFullscreen
                    loading={isLoading}
                    message="Searching..."
                    fulscreen={false}
                    dark={true}
                    height={120}
                    textSize={"1.4em"}
                  />
                ) : !userDetails || userDetails.length == 0 ? (
                  <NoDataArt
                    lottie={true}
                    visible={true}
                    background="white"
                    description={MODAL_MSGES.SEARCH_NO_DATA_DOUND}
                  />
                ) : (
                  userDetails.map((user, i) => (
                    <CCard
                      key={i}
                      className={`mt-4 animate__animated animate__bounceInUp `}
                      style={{
                        backgroundColor:
                          user?.accountType == "paid"
                            ? COLORS.FULL_LIGHT_2
                            : "",
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
                            src={user?.user_image?.image1 || AVATAR}
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
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1.2em",
                                }}
                                onClick={() => {
                                  window.location.href =
                                    "#/user/profile/" + user.id;
                                }}
                              >
                                {user?.basic_information?.firstName}{" "}
                                {user.basic_information?.lastName}
                              </span>

                              {/* <span
                              style={{
                                paddingRight: "30px",
                                color: COLORS.PRIMARY,
                              }}
                              className="material-symbols-outlined"
                            >
                              favorite
                            </span> */}
                              <div
                                style={{ paddingRight: "25px" }}
                                onClick={() =>
                                  updateLikes(user?.id, true, user?.likes)
                                }
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/jjoolpwc.json"
                                  trigger="morph"
                                  stroke="bold"
                                  state="morph-two-hearts"
                                  colors="primary:#e776b6,secondary:#8f4a7e"
                                  style={{ wdith: 10 }}
                                ></lord-icon>
                              </div>
                            </div>
                            <div
                              style={{ display: "flex", gap: 10 }}
                              onClick={() => {
                                window.location.href =
                                  "#/user/profile/" + user.id;
                              }}
                            >
                              <span
                                style={{
                                  color: "GrayText",
                                  fontSize: "0.9em",
                                  paddingBottom: "5px",
                                }}
                              >
                                {user?.basic_information?.age}Yrs
                              </span>
                              <span
                                className="material-symbols-outlined"
                                style={{
                                  fontSize: "20px",
                                  color: COLORS.PRIMARY,
                                }}
                              >
                                {user?.basic_information?.gender == "male"
                                  ? "man_2"
                                  : "woman_2"}
                              </span>
                            </div>
                            <div
                              className="mt-1"
                              style={{
                                paddingBottom: user?.basic_information
                                  ?.description
                                  ? "4px"
                                  : "50px",
                              }}
                              onClick={() => {
                                window.location.href =
                                  "#/user/profile/" + user.id;
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
                        <CCol
                          onClick={() => {
                            window.location.href = "#/user/profile/" + user.id;
                          }}
                        >
                          <CCollapse
                            visible={visible.includes(user.id)}
                            className="pt-2"
                          >
                            <div style={{ paddingInline: 20 }}>
                              <CRow>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Age / Height (Ft):
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {user?.basic_information?.age || "-"} /{" "}
                                  {user?.personal_information?.height || "-"}
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Religion:
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {user?.basic_information?.religion || "-"}
                                </CCol>
                              </CRow>
                              <CRow>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Marital Status:
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {user?.basic_information?.maritalStatus ||
                                    "-"}
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Location:
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {user?.basic_information?.location &&
                                  user?.location_information?.city
                                    ? captalizeFirstChar(
                                        user?.basic_information?.location
                                      ) +
                                      " / " +
                                      captalizeFirstChar(
                                        user?.location_information?.city
                                      )
                                    : captalizeFirstChar(
                                        user?.basic_information?.location
                                      ) ||
                                      captalizeFirstChar(
                                        user?.location_information?.city
                                      ) ||
                                      "-"}
                                </CCol>
                              </CRow>
                              <CRow>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Posted by:
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {" "}
                                  {user?.profileType || "-"}
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: COLORS.MID_DARK }}
                                >
                                  Occupation
                                </CCol>
                                <CCol
                                  className="mt-1"
                                  xs={6}
                                  sm={3}
                                  style={{ color: "GrayText" }}
                                >
                                  {user?.occupation_and_finance?.occupation ||
                                    "-"}
                                </CCol>
                              </CRow>
                            </div>
                          </CCollapse>
                        </CCol>
                      </CRow>
                    </CCard>
                  ))
                )}
              </div>
              <div style={{ textAlign: "end" }}>
                <CPagination
                  className="mt-5 animate__animated animate__bounceInUp"
                  aria-label="Page navigation example"
                >
                  {startPage != 0 && (
                    <CPaginationItem
                      style={{ color: COLORS.PRIMARY, cursor: "pointer" }}
                      onClick={() => {
                        setStartPage(startPage - pageGap);
                        setLimitPage(limitPage - pageGap);
                      }}
                    >
                      Previous
                    </CPaginationItem>
                  )}
                  {userDetails.length != 0 && userDetails.length >= pageGap && (
                    <CPaginationItem
                      style={{ color: COLORS.PRIMARY, cursor: "pointer" }}
                      onClick={() => {
                        setStartPage(startPage + pageGap);
                        setLimitPage(limitPage + pageGap);
                      }}
                    >
                      Next
                    </CPaginationItem>
                  )}
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
