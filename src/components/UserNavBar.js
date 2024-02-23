import React, { useState } from "react";
import {
  CNavbar,
  CContainer,
  CNavbarNav,
  CNavLink,
  CButton,
} from "@coreui/react";
import { useLocation } from "react-router-dom";
import { COLORS } from "../common/colors";

const UserNavBar = () => {
  const location = useLocation();

  return (
    <>
      <CNavbar
        expand="sm"
        placement="sticky-top"
        className=" animate__animated animate__fadeInDown"
        style={{ zIndex: 0, backgroundColor: "#FFFFFF" }}
      >
        <CContainer style={{ display: "flex", justifyContent: "center" }}>
          <CNavbarNav component="nav" expand="sm">
            <CNavLink
              href="#/user/dashboard"
              style={{
                color: location.pathname == "/user/dashboard" ? COLORS.PRIMARY : "",
              }}
            >
              Dashboard
            </CNavLink>

            <CNavLink
              href="#/user/myprofile"
              style={{
                color: location.pathname == "/user/myprofile" ?  COLORS.PRIMARY : "",
              }}
            >
              My Profile
            </CNavLink>
            <CNavLink
              href="#/user/photos"
              style={{
                color: location.pathname == "/user/photos" ?  COLORS.PRIMARY : "",
              }}
            >
              My Photos
            </CNavLink>
          </CNavbarNav>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default UserNavBar;
