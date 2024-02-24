import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../common/colors";
import { UserService } from "../../services/user.service";
import TokenService from "../../services/token.service";
import { calculateAgeFromBday } from "../../common/common";
import {
  civilStatuses,
  districts,
  educationLevels,
  genders,
  religions,
  residencyStatuses,
} from "../../common/const";

function EditUserSectionModal({
  visible,
  setVisible,
  section,
  userDetails,
  reload,
}) {
  const [description, setDescription] = useState("");

  //basic info
  const [firstName, setFirstName] = useState(
    userDetails?.basic_information?.firstName
  );
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [district, setDistrict] = useState(districts[0]?.value)

  //personal
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("");

  //family
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [brothersCount, setBrothersCount] = useState(0);
  const [sistersCount, setSistersCount] = useState(0);
  const [parentsInformation, setParentsInformation] = useState("");
  const [siblingsDetails, setSiblingsDetails] = useState("");
  const [nativePlace, setNativePlace] = useState("");
  const [familyValues, setFamilyValues] = useState("");

  //education
  const [highestQualification, setHighestQualification] = useState("");
  const [details, setDetails] = useState("");
  const [college, setCollege] = useState("");
  const [university, setUniversity] = useState("");

  //career
  const [occupation, setOccupation] = useState("");
  const [occupationDetails, setOccupationDetails] = useState("");
  const [salary, setSalary] = useState("");
  const [employerName, setEmployerName] = useState("");

  //location
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [residencyStatus, setResidencyStatus] = useState("");

  //lifestyle
  const [drinking, setDrinking] = useState("Yes");
  const [smoking, setSmoking] = useState("Yes");

  //hobby
  const [hobbyDetails, setHobbyDetails] = useState("");

  //contact
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [keepUsername, setKeepUsername] = useState(true);

  //change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    console.log(keepUsername);
  }, [keepUsername]);

  const userId = TokenService.getUser()?.user?.id;
  const basicInfoId = userDetails?.basic_information?.id;
  const contactInfoId = userDetails?.contact_information?.id;
  const personalInfoId = userDetails?.personal_information?.id;
  const familyInfoId = userDetails?.family_background?.id;
  const hobbiesInfoId = userDetails?.interests_and_hobbie?.id;
  const habitsInfoId = userDetails?.lifestyle_habit?.id;
  const careerInfoId = userDetails?.occupation_and_finance?.id;
  const educationInfoId = userDetails?.education?.id;
  const locationInfoId = userDetails?.location_information?.id;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    setNewPassword(newPassword);
    setIsValid(passwordRegex.test(newPassword));
  };

  const saveBasicInfo = (sectionType) => {
    console.log(sectionType);
    let data = null;
    let saveId = null;
    if (section == "personality") {
      saveId = basicInfoId;
      data = {
        user_Id: userId,
        description,
      };
    } else {
      if (section == "basicl") saveId = basicInfoId;
      else if (section == "family") saveId = familyInfoId;
      else if (section == "education") saveId = educationInfoId;
      else if (section == "personal") saveId = personalInfoId;
      else if (section == "career") saveId = careerInfoId;
      else if (section == "location") saveId = locationInfoId;
      else if (section == "hobby") saveId = hobbiesInfoId;
      else if (section == "lifestyle") saveId = habitsInfoId;
      else if (section == "contact") saveId = contactInfoId;

      data = {
        user_Id: userId,
        firstName,
        lastName,
        maritalStatus,
        religion,
        gender,
        location: district,
        birthDate: birthDate,
        age: calculateAgeFromBday(birthDate),
        height: height ? height : 0,
        weight: weight ? weight : 0,
        bodyType,
        fatherName,
        motherName,
        parentsInformation,
        siblingsDetails,
        brothersCount,
        sistersCount,
        nativePlace,
        familyValues,
        highestQualification,
        details,
        college,
        university,
        occupation,
        occupationDetails,
        salary,
        employerName,
        streetAddress,
        city,
        country,
        residencyStatus,
        zipCode,
        drinking,
        smoking,
        hobbies: hobbyDetails,
        email,
        mobile,
      };
    }

    UserService.updateUserInfoBySection(saveId, data, sectionType)
      .then((res) => {
        console.log(res);
        if (section == "contact" && !keepUsername) {
        }
        reload(true);
        setVisible(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changePassword = async () => {
    setAlertMessage(null)
    if(!(currentPassword && newPassword)) {
      setAlertMessage("Please Fill Above Details")
      return
    }

    if(!isValid) {
      return
    }

    try {
      const userStatus = await UserService.checkUser(TokenService.getUsername(), currentPassword)
      if(userStatus?.jwt) {
        const response = await UserService.updateUser(TokenService.getUser()?.user?.id, {password: newPassword})
      } else {
        setAlertMessage("Your Current Password is not valid")
      }
    } catch (e) {
      console.log(e);
      setAlertMessage("Your Current Password is not valid")
    }
    

  };

  useEffect(() => {
    setDescription(userDetails?.basic_information?.description);

    setFirstName(userDetails?.basic_information?.firstName);
    setLastName(userDetails?.basic_information?.lastName);
    setGender(userDetails?.basic_information?.gender);
    setBirthDate(userDetails?.basic_information?.birthDate);
    setMaritalStatus(userDetails?.basic_information?.maritalStatus);
    setReligion(userDetails?.basic_information?.religion);
    setDistrict(userDetails?.basic_information?.location);

    setHeight(userDetails?.personal_information?.height);
    setWeight(userDetails?.personal_information?.weight);
    setBodyType(userDetails?.personal_information?.bodyType);

    setFatherName(userDetails?.family_background?.fatherName);
    setMotherName(userDetails?.family_background?.motherName);
    setParentsInformation(userDetails?.family_background?.parentsInformation);
    setSiblingsDetails(userDetails?.family_background?.siblingsDetails);
    setBrothersCount(userDetails?.family_background?.brothersCount);
    setSistersCount(userDetails?.family_background?.sistersCount);
    setNativePlace(userDetails?.family_background?.nativePlace);
    setFamilyValues(userDetails?.family_background?.familyValues);

    setHighestQualification(userDetails?.education?.highestQualification);
    setDetails(userDetails?.education?.details);
    setCollege(userDetails?.education?.college);
    setUniversity(userDetails?.education?.university);

    setOccupation(userDetails?.occupation_and_finance?.occupation);
    setOccupationDetails(
      userDetails?.occupation_and_finance?.occupationDetails
    );
    setSalary(userDetails?.occupation_and_finance?.salary);

    setStreetAddress(userDetails?.location_information?.streetAddress);
    setZipCode(userDetails?.location_information?.zipCode);
    setCity(userDetails?.location_information?.city);
    setCountry(userDetails?.location_information?.country);
    setResidencyStatus(userDetails?.location_information?.residencyStatus);

    setDrinking(userDetails?.lifestyle_habit?.drinking);
    setSmoking(userDetails?.lifestyle_habit?.smoking);

    setHobbyDetails(userDetails?.interests_and_hobbie?.hobbies);
  }, [section, userDetails]);

  return (
    <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      size="lg"
    >
      <CModalBody style={{ marginInline: "15px" }}>
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
        {section == "personality" && (
          <div>
            <CRow className="mt-3">
              <CCol>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Personality, Family Details, Career, Partner Expectations etc.
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol>
                <CFormTextarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </CCol>
            </CRow>
          </div>
        )}
        {section == "hobby" && (
          <div>
            <CRow className="mt-3">
              <CCol>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Hobbies and Interests
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol>
                <CFormTextarea
                  value={hobbyDetails}
                  onChange={(e) => setHobbyDetails(e.target.value)}
                />
              </CCol>
            </CRow>
          </div>
        )}
        {section == "basicl" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Basics & Lifestyle
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    First Name:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Last Name:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Marital Status:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={civilStatuses}
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Gender:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={genders}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Date of Birth:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Religion:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={religions}
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Region:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={districts}
                      value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    />
                  </CCol>
                  
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}

        {section == "personal" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Personal Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Height (Ft):
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Weight (Kg):
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Body Type:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}

        {section == "family" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Family Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Father's Name:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Mother's Name:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    No. of Brothers :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={brothersCount}
                      onChange={(e) => setBrothersCount(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    No. of Sisters :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={sistersCount}
                      onChange={(e) => setSistersCount(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Parents Information :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={parentsInformation}
                      onChange={(e) => setParentsInformation(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Siblings Details :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={siblingsDetails}
                      onChange={(e) => setSiblingsDetails(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Native Place :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={nativePlace}
                      onChange={(e) => setNativePlace(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Family Values :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={familyValues}
                      onChange={(e) => setFamilyValues(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
        {section == "education" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Education Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Highest Qualification:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                    options={educationLevels}
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Other Details:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    College(s) Attended :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    University(s) Attended :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
        {section == "career" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Career Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Occupation:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Other Details:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={occupationDetails}
                      onChange={(e) => setOccupationDetails(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Annual Income :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Employer Name :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={employerName}
                      onChange={(e) => setEmployerName(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}

        {section == "location" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Location Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Street Address:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Country:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    City :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Zip / Pin code :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Residency Status :
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={residencyStatuses}
                      value={residencyStatus}
                      onChange={(e) => setResidencyStatus(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
        {section == "lifestyle" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Lifestyle Habbits
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Drinking:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={["Yes", "No", "Not Specify"]}
                      value={drinking}
                      onChange={(e) => setDrinking(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Smoking:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormSelect
                      options={["Yes", "No", "Not Specify"]}
                      value={smoking}
                      onChange={(e) => setSmoking(e.target.value)}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}

        {section == "contact" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Contact Information
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">
                    Email Address:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    Contact Number:
                  </CCol>
                  <CCol xs={6} sm={3} className="mt-1">
                    <CFormInput
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={6} className="mt-1">
                    <CFormSwitch
                      id="flexCheckChecked"
                      label="Keep username as it is"
                      value={keepUsername}
                      onChange={(e) => setKeepUsername(e.target.checked)}
                      defaultChecked
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
        {section == "password" && (
          <div>
            <CRow className="mt-3">
              <CCol style={{ display: "flex", gap: 10 }}>
                <h6 style={{ color: COLORS.MID_DARK, fontWeight: "bold" }}>
                  Change Password
                </h6>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ fontSize: "0.9em" }}>
                <CRow>
                  <CCol xs={6} sm={4} className="mt-1">
                    Current Password:
                  </CCol>
                  <CCol xs={6} sm={4} className="mt-1">
                    <CFormInput
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2">
                  <CCol xs={6} sm={4} className="mt-1">
                    New Password:
                  </CCol>
                  <CCol xs={6} sm={4} className="mt-1">
                    <CFormInput
                      type="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                    />
                  </CCol>
                </CRow>
                <span className="mt-3" style={{color: 'red'}}>{alertMessage}</span>
                <CRow className="mt-4 mb-4">
                  <CCol
                    xs={12}
                    sm={8}
                    className="mt-1"
                    style={{ color: "GrayText" }}
                  >
                    <span
                      style={{
                        color: newPassword ? (isValid ? "green" : "red") : "",
                      }}
                    >
                      * Password must be at least 8 characters long and contain
                      a mix of letters, numbers, and special characters.
                    </span>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
        <CRow className="mt-3">
          <CCol style={{ display: "flex", justifyContent: "end" }}>
            <CButton
              className="primary-btn"
              onClick={() => {
                if (section == "personality")
                  saveBasicInfo("basicinformations");
                else if (section == "basicl")
                  saveBasicInfo("basicinformations");
                else if (section == "personal")
                  saveBasicInfo("personal-informations");
                else if (section == "family")
                  saveBasicInfo("family-backgrounds");
                else if (section == "education") saveBasicInfo("educations");
                else if (section == "career")
                  saveBasicInfo("occupation-and-finances");
                else if (section == "location")
                  saveBasicInfo("location-informations");
                else if (section == "lifestyle")
                  saveBasicInfo("lifestyle-habits");
                else if (section == "hobby")
                  saveBasicInfo("interests-and-hobbies");
                else if (section == "contact")
                  saveBasicInfo("contactinformations");
                else if (section == "password") changePassword();
                else return;
              }}
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  );
}

export default EditUserSectionModal;
