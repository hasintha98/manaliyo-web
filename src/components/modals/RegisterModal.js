import { cilArrowLeft, cilBackspace } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormText,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { COLORS } from "../../common/colors";
import { UserService } from "../../services/user.service";
import { MODAL_MSGES } from "../../common/typography";

function RegisterModal({ visible, setVisible, switchModals }) {
  const [formType, setFormType] = useState("first");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const backButtonHandle = () => {
    if (formType == "second") setFormType("first");
    else if (formType == "third") setFormType("second");
  };

  const registerUser = () => {
    if (!email || !password) {
      return;
    }

    setLoading(true);
    UserService.registerUser({ email, password })
      .then((res) => {
        console.log(res);
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
        size="xl"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "10px",
            paddingTop: "10px",
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
        <span
          className="px-5"
          style={{ textAlign: "center", color: "GrayText" }}
        >
          Unlock the door to love! Join Manaliyo today and start your journey
          towards a lifetime of meaningful connections. Your perfect match is
          just a click away. Sign up now and let the magic begin!
        </span>
        <div className="formbold-main-wrapper mt-4">
          <div class="formbold-steps">
            <ul>
              {formType == "first" ? (
                <li className="formbold-step-menu1 active">
                  <span>1</span>
                  Interest
                </li>
              ) : (
                <li className="formbold-step-menu1">
                  <span>1</span>
                  Interest
                </li>
              )}
              {formType == "second" ? (
                <li className="formbold-step-menu2 active">
                  <span>2</span>
                  Basic
                </li>
              ) : (
                <li className="formbold-step-menu2">
                  <span>2</span>
                  Basic
                </li>
              )}
              {formType == "third" ? (
                <li className="formbold-step-menu3 active">
                  <span>3</span>
                  Credentials
                </li>
              ) : (
                <li className="formbold-step-menu3">
                  <span>3</span>
                  Credentials
                </li>
              )}
            </ul>
          </div>
        </div>

        <hr />
        <CModalBody className="px-5 pb-5">
          {formType == "first" && (
            <div>
              <div className="animate__animated animate__zoomIn">
                <h4 style={{ textAlign: "left" }}>This Profile is for ...</h4>

                <CRow className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CCol>
                    <CFormCheck
                      button={{
                        shape: "rounded-pill",
                        color: "primary",
                        variant: "outline",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      label="Myself"
                      defaultChecked
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-son"
                      autoComplete="off"
                      label="My Son"
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-daughter"
                      autoComplete="off"
                      label="My Daughter"
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-brother"
                      autoComplete="off"
                      label="My Brother"
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-sister"
                      autoComplete="off"
                      label="My Sister"
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-friend"
                      autoComplete="off"
                      label="My Friend"
                    />
                  </CCol>
                  <CCol>
                    <CFormCheck
                      button={{
                        color: "primary",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      name="options-outlined"
                      id="danger-relative"
                      autoComplete="off"
                      label="My Relative"
                    />
                  </CCol>
                </CRow>
                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  Gender
                </h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormCheck
                    button={{
                      color: "primary",
                      variant: "outline",
                      shape: "rounded-pill",
                    }}
                    type="radio"
                    name="options-gneder"
                    id="success-male"
                    autoComplete="off"
                    label="Male"
                    defaultChecked
                  />

                  <CFormCheck
                    button={{
                      color: "primary",
                      variant: "outline",
                      shape: "rounded-pill",
                    }}
                    type="radio"
                    name="options-gneder"
                    id="danger-Female"
                    autoComplete="off"
                    label="Female"
                  />
                </div>
              </div>
              <div className="mt-5" style={{ textAlign: "right" }}>
                <CButton
                  className="primary-btn"
                  onClick={() => setFormType("second")}
                >
                  Continue
                </CButton>
                {/* <CButton onClick={() => setVisible(false)}>Cancel</CButton> */}
              </div>
            </div>
          )}

          {formType == "second" && (
            <div>
              <div className="animate__animated animate__zoomIn">
                <h4 style={{ textAlign: "left" }}>Your Name</h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="text"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="First Name"
                    defaultChecked
                  />
                  <CFormInput
                    type="text"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="Last Name"
                    defaultChecked
                  />
                </div>
                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  Date of birth
                </h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="DD"
                    style={{ width: "100px" }}
                    defaultChecked
                  />

                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="MM"
                    style={{ width: "100px" }}
                    defaultChecked
                  />
                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="YYYY"
                    style={{ width: "100px" }}
                    defaultChecked
                  />
                </div>
              </div>
              <div className="mt-5" style={{ textAlign: "right" }}>
                <CButton
                  className="primary-btn"
                  onClick={() => backButtonHandle()}
                >
                  Back
                </CButton>
                <CButton
                  className="primary-btn"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setFormType("third")}
                >
                  Continue
                </CButton>
                {/* <CButton onClick={() => setVisible(false)}>Cancel</CButton> */}
              </div>
            </div>
          )}

          {formType == "third" && (
            <div>
              <div className="animate__animated animate__zoomIn">
                <p>
                  An active email ID & phone No. are required to secure your
                  profile
                </p>
                <h4 style={{ textAlign: "left" }}>Email ID</h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="email"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    defaultChecked
                  />
                </div>
                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  Mobile No.
                </h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="text"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="Ex: 0771234567"
                    defaultChecked
                  />
                </div>
                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  Password
                </h4>
                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="password"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    defaultChecked
                  />
                </div>
              </div>
              <div className="mt-5" style={{ textAlign: "right" }}>
                <CButton
                  className="primary-btn"
                  onClick={() => backButtonHandle()}
                >
                  Back
                </CButton>
                <CButton
                  className="primary-btn"
                  disabled={loading}
                  style={{ marginLeft: "10px" }}
                  onClick={() => registerUser()}
                >
                  Register
                </CButton>
                {/* <CButton onClick={() => setVisible(false)}>Cancel</CButton> */}
              </div>
            </div>
          )}
        </CModalBody>
      </CModal>
    </>
  );
}

export default RegisterModal;
