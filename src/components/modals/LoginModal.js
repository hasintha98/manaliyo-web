import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormText,
  CImage,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { COLORS } from "../../common/colors";
import LOGOICON from "../../assets/test-logo-r.png";
import { UserService } from "../../services/user.service";
import { MODAL_MSGES } from "../../common/typography";

function LoginModal({ visible, setVisible, switchModals }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = () => {
    setErrorMessage("");
    setLoading(true);
    UserService.login(email, password)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        setErrorMessage(MODAL_MSGES.LOGIN_INVALID);
        // setLoading(false)
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalBody>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              className="material-symbols-outlined"
              onClick={() => setVisible(false)}
            >
              close
            </span>
          </div>
          <div
            className="p-4 m-0"
            style={{
              // backgroundColor: COLORS.PRIMARY,
              // borderRadius: "0 0 40px 40px",
              // color: "white",
              textAlign: "center",
            }}
          >
            <CImage
              height={80}
              src={LOGOICON}
              style={{ borderRadius: "50%" }}
            />
            <h2 className="mt-4" style={{ textAlign: "center" }}>
              SIGN IN
            </h2>
            <p>
              Welcome back! Your journey continues here. Log in to Manaliyo and
              reconnect with your path to love and companionship.
            </p>
          </div>

          <div className="mt-4 p-4">
            <CFormLabel
              style={{ display: "flex", alignItems: "center" }}
              htmlFor="exampleFormControlInput1"
            >
              <span
                className="material-symbols-outlined"
                style={{ paddingRight: "10px" }}
              >
                mail
              </span>{" "}
              Email
            </CFormLabel>
            <CFormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleFormControlInput1"
              placeholder="name@email.com"
              aria-describedby="exampleFormControlInputHelpInline"
            />

            <CFormLabel
              className="mt-4"
              style={{ display: "flex", alignItems: "center" }}
              htmlFor="exampleFormControlInput1"
            >
              <span
                className="material-symbols-outlined"
                style={{ paddingRight: "10px" }}
              >
                lock
              </span>{" "}
              Password
            </CFormLabel>
            <CFormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleFormControlInput1"
              aria-describedby="exampleFormControlInputHelpInline"
            />
            <span className="animate__animated animate__fadeInDown" style={{ color: "red", fontSize: "0.8em" }}>
              {errorMessage}
            </span>
            <div style={{ textAlign: "center" }}>
              <CButton
                type="submit"
                className="mt-5 "
                disabled={loading}
                onClick={loginUser}
                style={{
                  backgroundColor: COLORS.PRIMARY,
                  border: "none",
                  width: "100%",
                }}
              >
                Sign In
              </CButton>

              <p className="mt-2" style={{ fontSize: "0.8em" }}>
                New User?{" "}
                <CLink
                  style={{ cursor: "pointer", color: COLORS.PRIMARY }}
                  onClick={() => switchModals(true)}
                >
                  Sign Up
                </CLink>
              </p>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
}

export default LoginModal;
