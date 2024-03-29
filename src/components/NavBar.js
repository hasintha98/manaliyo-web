import React, { useEffect, useState } from "react";
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavLink,
  CImage,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CButton,
  CDropdownHeader,
  CDropdownItemPlain,
} from "@coreui/react";
import LOGO from "../assets/test-logo-caption.png";
import LoginModal from "./modals/LoginModal";
import Avatar from "../assets/no_profile.webp";
import { COLORS } from "../common/colors";
import RegisterModal from "./modals/RegisterModal";
import TokenService from "../services/token.service";
import { UserService } from "../services/user.service";
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const scroll = () => {
    const section = document.querySelector( '#contact' );
    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };

  useEffect(() => {
    const user = TokenService.getUser()

    if (user?.jwt) {
      setLoggedIn(true)
    } else {
      if(loggedIn) logOut()
    }
  }, [])

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    UserService.getUserCurrentUser()
      .then((res) => {
        setUserDetails(res);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    UserService.logout()
    setLoggedIn(false)
    window.location.href = "/";
    window.location.reload(false);
    // change status
  }

  return (
    <>
      <CNavbar
        expand="lg"
        placement="sticky-top"
        style={{ zIndex: 100, height: visible ? "" : "110px", backgroundColor: 'white', boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)'}}
      >
        <CContainer>
          <CImage src={LOGO} height={130} />
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav component="nav" className="ms-auto">
              <CNavLink href="#" active>
                Home
              </CNavLink>
              {loggedIn && <CNavLink style={{ cursor: 'pointer' }} href="#/user/newmatches">
                New Matches
              </CNavLink>}
              <CNavLink href="#">Privacy Policy</CNavLink>
              <CNavLink style={{ marginRight: "30px", cursor: 'pointer' }} onClick={scroll}>
                Contact Us
              </CNavLink>
             

              {!loggedIn && (
                <CButton
                  style={{ width: "150px", alignSelf: "right" }}
                  color="normal"
                  className="sign-up-btn"
                  variant="outline"
                  onClick={() => setLoginModalVisible(!loginModalVisible)}
                >
                  SIGN UP
                </CButton>
              )}
              {loggedIn && (
                <div style={{ textAlign: "right", backgroundColor: 'white' }}>
                  <CDropdown >
                    <CDropdownToggle
                      style={{ color: COLORS.MID_DARK, backgroundColor: COLORS.NAVBAR, border: `none` }}
                    >
                      <CImage
                        height={40}
                        style={{
                          border: "solid",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        shape="rounded"
                        src={userDetails?.user_image?.image1 || Avatar}
                      />
                    </CDropdownToggle>
                    <CDropdownMenu style={{width: '100px'}}>
                    <CDropdownItemPlain style={{fontSize: '0.9em'}}>
                        Sign In As: <br /><span style={{color: COLORS.PRIMARY}}>{TokenService.getUsername()}</span>
                      </CDropdownItemPlain>
                      
                    <CDropdownDivider />
                    <CDropdownItem href="#/user/dashboard">
                        My Dashboard
                      </CDropdownItem>
                      <CDropdownItem href="#/user/myprofile">
                        User Profile
                      </CDropdownItem>
                      <CDropdownItem href="#/user/photos">
                        My Photos
                      </CDropdownItem>
                      {/* <CDropdownItem href="#">Settings</CDropdownItem> */}
                      <CDropdownDivider />
                      <CDropdownItem onClick={logOut} style={{color: COLORS.RED_BTN, cursor: 'pointer'}}>Sign Out</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              )}
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
      <LoginModal
        visible={loginModalVisible}
        setVisible={(status) => setLoginModalVisible(status)}
        switchModals={(status) => {
          setLoginModalVisible(false);
          setRegisterModalVisible(status);
        }}
      />
      <RegisterModal
        visible={registerModalVisible}
        setVisible={(status) => setRegisterModalVisible(status)}
        switchModals={(status) => {
          setRegisterModalVisible(false);
          setLoginModalVisible(status);
        }}
      />
    </>
  );
};

export default NavBar;
