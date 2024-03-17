import { cilArrowLeft, cilBackspace } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CButtonGroup,
  CCol,
  CForm,
  CFormCheck,
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
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import Select from "react-select";
import { COLORS } from "../../common/colors";
import { UserService } from "../../services/user.service";
import { MODAL_MSGES } from "../../common/typography";
import LoadingFullscreen from "../LoadingFullscreen";
import LOGOICON from "../../assets/test-logo-r.png";
import {
  calculateAgeFromBday,
  extractUsernameFromEmail,
  getNullOrUndefinedAttributes,
  randomNumberGen,
} from "../../common/common";
import TokenService from "../../services/token.service";
import ErrorModal from "./ErrorModal";
import { districts, genders } from "../../common/const";
import GoogleLogin from "react-google-login";

function RegisterModal({ visible, setVisible, switchModals, partnerData }) {
  const [formType, setFormType] = useState("first");

  const [profileType, setProfileType] = useState("myself");
  const [gender, setGender] = useState("male");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState([]);
  const [district, setDistrict] = useState(districts[0]);

  const [mobileNo, setMobileNo] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");
  const [errorMessage, setErrorMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState(
    "Please Fill All Required Fields"
  );
  const [locationAlertMessage, setLocationAlertMessage] = useState(
    "Something Wrong With Location Server"
  );
  const [isAlert, setIsAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const backButtonHandle = () => {
    if (formType == "second") setFormType("first");
    else if (formType == "third") setFormType("second");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    setPassword(newPassword);
    setIsValid(passwordRegex.test(newPassword));
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    const phoneRegex = /^(?:\+?94|0)?(?:7\d{8})$/;

    setMobileNo(newPhoneNumber);
    setIsValidPhoneNumber(phoneRegex.test(newPhoneNumber));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(newEmail);
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const registerUser = async () => {
    setIsAlert(false);
    setLoading(true);

    if (!isValidEmail) {
      setErrorMessage(
        <div>
          <span>Email Address is not Valid!</span> <br />{" "}
          <span style={{ color: "GrayText", fontSize: "0.8em" }}>
            Please enter a valid email address (e.g., example@example.com).
          </span>
        </div>
      );
      setIsAlert(true);
      setLoading(false);
      return;
    }

    if (!isValidPhoneNumber) {
      setErrorMessage(
        <div>
          <span>Contact Number is not Valid!</span> <br />{" "}
          <span style={{ color: "GrayText", fontSize: "0.8em" }}>
            Please enter a valid sri lankan mobile number (eg: +94)
          </span>
        </div>
      );
      setIsAlert(true);
      setLoading(false);
      return;
    }

    if (!isValid) {
      setErrorMessage(
        <div>
          <span>Password is not Valid!</span> <br />{" "}
          <span style={{ color: "GrayText", fontSize: "0.8em" }}>
            Password must be at least 8 characters long and contain a mix of
            letters, numbers, and special characters for security reasons.
          </span>
        </div>
      );
      setIsAlert(true);
      setLoading(false);
      return;
    }

    if (!dateOfBirth[0] && !dateOfBirth[1] && !dateOfBirth[2]) {
      setErrorMessage(alertMessage);
      setIsAlert(true);
      setLoading(false);
      return;
    }

    const requiredData = {
      email,
      password,
      username: extractUsernameFromEmail(email),
      gender,
      profileType,
      firstName,
      lastName,
      location: district?.value,
      bday: `${dateOfBirth[2]}-${dateOfBirth[1]}-${dateOfBirth[0]}`,
      mobileNo,
    };

    const result = getNullOrUndefinedAttributes(requiredData);

    if (result.length > 0) {
      setErrorMessage(alertMessage);
      setIsAlert(true);
      setLoading(false);
      return;
    }

    try {
      setLoadingMsg("Creating Profile...");
      const userResponse = await UserService.registerUser({
        email: requiredData.email,
        password: requiredData.password,
        username: requiredData.username,
        profileType: requiredData.profileType,
        accountType: "free",
        referenceNo: `${gender == "male" ? "MN" : "FE"}${dateOfBirth[2]}${
          dateOfBirth[1]
        }${dateOfBirth[0]}${firstName.charAt(0)}${lastName.charAt(
          0
        )}${randomNumberGen()}`,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoadingMsg("Registering Basic Informations...");
      await UserService.registerBasicInformation(
        {
          user_Id: userResponse?.user?.id,
          firstName: requiredData.firstName,
          lastName: requiredData.lastName,
          birthDate: requiredData.bday,
          gender: requiredData.gender,
          location: requiredData.location,
          age: calculateAgeFromBday(requiredData.bday),
        },
        userResponse?.jwt
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoadingMsg("Registering Contact Information...");
      await UserService.registerContactInformation(
        {
          user_Id: userResponse?.user?.id,
          mobile: requiredData.mobileNo,
          email: userResponse?.user?.email,
        },
        userResponse?.jwt
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      if(partnerData) {
        setLoadingMsg("Registering Partner Information...");
        await UserService.registerPartnerInformation(
          {
            user_Id: userResponse?.user?.id,
            gender: partnerData?.ppGender,
            age: [[partnerData?.ppAge[0]], [partnerData?.ppAge[1]]],
            location: partnerData?.ppLocation,
            religion: partnerData?.ppReligion
          },
          userResponse?.jwt
        );
  
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      window.location.href = "#/user/dashboard";
      window.location.reload(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        err?.response?.data?.error?.message ||
          err?.response.message ||
          err?.message
      );
      setLoading(false);
      setIsAlert(true);
    }
  };

  const dobUpdate = (index, newValue) => {
    const newArray = [...dateOfBirth];
    newArray[index] = newValue;
    setDateOfBirth(newArray);
  };

  const responseGoogle = (response) => {
    console.log(response);
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
          <ErrorModal
            open={isAlert}
            onOpen={(value) => setIsAlert(value)}
            title={"Failed Operation"}
            description={errorMessage}
          />
          <LoadingFullscreen loading={loading} message={loadingMsg} />
          <span
            style={{ cursor: "pointer" }}
            className="material-symbols-outlined"
            onClick={() => setVisible(false)}
          >
            close
          </span>
        </div>
        <div className="mb-3" style={{ textAlign: "center" }}>
          <CImage
            width={80}
            height={80}
            src={LOGOICON}
            style={{ borderRadius: "50%" }}
          />
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
                <li
                  className="formbold-step-menu1"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormType("first")}
                >
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
                <li
                  className="formbold-step-menu2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormType("second")}
                >
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
                <li
                  className="formbold-step-menu3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormType("third")}
                >
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
                <p>
                  Share your passions, shape your story! Tell us about your
                  interests to find connections that resonate with your heart.
                  Let's create a profile that reflects the unique tapestry of
                  you.
                </p>

                <h4 style={{ textAlign: "left" }}>
                  Who are we creating this{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    profile{" "}
                  </span>{" "}
                  for?
                </h4>

                <CRow className="mt-2" style={{ display: "flex", gap: 10 }}>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        shape: "rounded-pill",
                        color: "dark",
                        variant: "outline",
                        className: "primary-btn ",
                      }}
                      value={"myself"}
                      onChange={(e) => setProfileType(e.target.value)}
                      type="radio"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      label="My  Self"
                      defaultChecked
                    />
                  </CCol>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"myson"}
                      onChange={(e) => setGender(e.target.value)}
                      name="options-outlined"
                      id="danger-son"
                      autoComplete="off"
                      label="My Son"
                    />
                  </CCol>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"mydaughter"}
                      onChange={(e) => setProfileType(e.target.value)}
                      name="options-outlined"
                      id="danger-daughter"
                      autoComplete="off"
                      label="My Daughter"
                    />
                  </CCol>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"mybrother"}
                      onChange={(e) => setProfileType(e.target.value)}
                      name="options-outlined"
                      id="danger-brother"
                      autoComplete="off"
                      label="My Brother"
                    />
                  </CCol>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"mysister"}
                      onChange={(e) => setProfileType(e.target.value)}
                      name="options-outlined"
                      id="danger-sister"
                      autoComplete="off"
                      label="My Sister"
                    />
                  </CCol>
                  <CCol className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"myfriend"}
                      onChange={(e) => setProfileType(e.target.value)}
                      name="options-outlined"
                      id="danger-friend"
                      autoComplete="off"
                      label="My Friend"
                    />
                  </CCol>
                  <CCol xs={2} className="mt-2">
                    <CFormCheck
                      button={{
                        color: "dark",
                        variant: "outline",
                        shape: "rounded-pill",
                      }}
                      type="radio"
                      value={"myrelative"}
                      onChange={(e) => setProfileType(e.target.value)}
                      name="options-outlined"
                      id="danger-relative"
                      autoComplete="off"
                      label="My   Relative"
                    />
                  </CCol>
                </CRow>
                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  How do you identify? Let us know your{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    {" "}
                    gender{" "}
                  </span>
                  .
                </h4>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormCheck
                    button={{
                      color: "dark",
                      variant: "outline",
                      shape: "rounded-pill",
                    }}
                    value={genders[0]}
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="options-gneder"
                    id="success-male"
                    autoComplete="off"
                    label="Male"
                    defaultChecked
                  />

                  <CFormCheck
                    button={{
                      color: "dark",
                      variant: "outline",
                      shape: "rounded-pill",
                    }}
                    type="radio"
                    value={genders[1]}
                    onChange={(e) => setGender(e.target.value)}
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
                <p>
                  Share your basics and let's kickstart your journey to love.{" "}
                </p>
                <h5 style={{ textAlign: "left" }}>
                  Hello there! What's your{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    name{" "}
                  </span>{" "}
                  ? <span style={{ color: "red" }}>*</span>
                </h5>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="text"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="First Name"
                    floatingLabel="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <CFormInput
                    type="text"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="Last Name"
                    floatingLabel="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <h5 className="mt-4" style={{ textAlign: "left" }}>
                  Where do you call{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    home{" "}
                  </span>{" "}
                  ?<span style={{ color: "red" }}> *</span>
                </h5>
                <CCol md={5}>
                  <div className="mt-4" style={{ zIndex: "1000" }}>
                    <Select
                      type="text"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      options={districts}
                      value={district}
                      onChange={(e) => setDistrict(e)}
                    />
                  </div>
                </CCol>
                <h5 className="mt-4" style={{ textAlign: "left" }}>
                  Let's celebrate you! When's your{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    birth day{" "}
                  </span>
                  ?<span style={{ color: "red" }}> *</span>
                </h5>

                <div className="mt-4" style={{ display: "flex", gap: 10 }}>
                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="DD"
                    floatingLabel="DD"
                    style={{ width: "75px" }}
                    value={dateOfBirth[0]}
                    onChange={(e) => dobUpdate(0, e.target.value)}
                  />

                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="MM"
                    floatingLabel="MM"
                    style={{ width: "75px" }}
                    value={dateOfBirth[1]}
                    onChange={(e) => dobUpdate(1, e.target.value)}
                  />
                  <CFormInput
                    type="number"
                    name="options-outlined"
                    id="success-myself"
                    autoComplete="off"
                    placeholder="YYYY"
                    floatingLabel="YYYY"
                    style={{ width: "100px" }}
                    value={dateOfBirth[2]}
                    onChange={(e) => dobUpdate(2, e.target.value)}
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
                  disabled={
                    !(
                      firstName &&
                      lastName &&
                      dateOfBirth[0] &&
                      dateOfBirth[1] &&
                      dateOfBirth[2]
                    )
                  }
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
                  An active email & contact number are required to secure your
                  profile
                </p>
                <h4 className="mt-2" style={{ textAlign: "left" }}>
                  What's your{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    phone number
                  </span>{" "}
                  ?<span style={{ color: "red" }}> *</span>
                </h4>

                <div className="mt-" style={{ display: "flex", gap: 10 }}>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      placeholder="Ex: +94123456789"
                      value={mobileNo}
                      text="We use your mobile number for verification."
                      onChange={handlePhoneNumberChange}
                    />
                  </CCol>
                </div>
                
               
              <CCol md={6} className="mt-3">
                <hr />
               <span style={{ width: '100%', color: COLORS.PRIMARY}}>Setup Your Account!</span> 
            
              </CCol>
             
              

                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  What's your{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    email address
                  </span>{" "}
                  ? <span style={{ color: "red" }}>*</span>
                </h4>

                <div className="mt-2">
                  <CCol md={6}>
                    <CFormInput
                      type="email"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      placeholder="Enter your email address"
                      value={email}
                      text="if your email is someone@email.com, your username will be stored as 'someone'."
                      onChange={handleEmailChange}
                    />
                  </CCol>
                </div>
               

                <h4 className="mt-4" style={{ textAlign: "left" }}>
                  Choose a{" "}
                  <span style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                    password{" "}
                  </span>
                  for your account.
                  <span style={{ color: "red" }}> *</span>
                </h4>
                <div className="mt-2" style={{ display: "flex", gap: 10 }}>
                  <CCol md={6}>
                    <CFormInput
                      type="password"
                      name="options-outlined"
                      id="success-myself"
                      autoComplete="off"
                      value={password}
                      placeholder="Enter your password"
                      text={
                        <span
                          style={{
                            color: password ? (isValid ? "green" : "red") : "",
                          }}
                        >
                          Password must be at least 8 characters long and
                          contain a mix of letters, numbers, and special
                          characters.
                        </span>
                      }
                      onChange={handlePasswordChange}
                      defaultChecked
                    />
                  </CCol>
                </div>
                <CCol md={6}>
                <p
                className="mt-4 mb-4"
                style={{ color: "GrayText", fontStyle: "italic", textAlign: 'center' }}
              >
                ----- Or -----
              </p>
                </CCol>
                <CCol md={6}  style={{textAlign: 'center' }} className="mt-4">
               
                <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
                </CCol>
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
                  disabled={loading || !(email && mobileNo && password)}
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
