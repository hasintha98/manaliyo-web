import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  CBadge,
  CCard,
  CCol,
  CContainer,
  CForm,
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
import AVATAR from "../assets/2.jpg";
import UserNavBar from "../components/UserNavBar";
import FooterBar from "../components/FooterBar";
import { COLORS } from "../common/colors";
import "../scss/uploader.css";

import IMAGE from "../assets/2.jpg";

function UserPhotoGallery() {
  const [userDetails, setUserDetails] = useState({
    id: "21674891264786",
    firstName: "Hasintha",
    lastName: "Doluweera",
    age: 25,
    height: "5.6",
    religion: "Buddhist, Buddhist",
    maritalStatus: "Single",
    location: "Colombo",
    postedBy: "Self",
    language: "sinhala",
    dob: "1998-10-12",
    country: "Sri Lanka",
    SunSign: "Libra",
    diet: "non-veg",
    personalValues: "-",
    bloodGroup: "B-",
    healthInformation: "-",
    disability: "-",
    community: "Buddhist",
    SubCommunity: "-",
    fatherStatus: "",
    motherStatus: "",
    noOfBrothers: "",
    noOfSisters: "",
    familyLocation: "",
    familyType: "",
    nativePlace: "",
    familyValues: "",
    familyAffluence: "",
    higherQualification: "",
    workingWith: "",
    collegeAttended: "",
    workingAs: "",
    annualIncome: "",
    employerName: "",
    currentResidance: "",
    residencyStatus: "",
    stateOfResidence: "",
    zipCode: "",
  });
  return (
    <div className="background-body">
      <NavBar />
      <UserNavBar />
      <CContainer className="mb-5">
        <CCard className="mt-2 mb-5 p-4">
          <CRow className="mt-3 animate__animated animate__bounceIn" >
            <CForm id="file-upload-form" class="uploader">
              <CFormInput
                id="file-upload"
                type="file"
                name="fileUpload"
                accept="image/*"
              />

              <label for="file-upload" id="file-drag">
                <CImage id="file-image" src="#" alt="Preview" class="hidden" />
                <div id="start">
                  <i class="fa fa-download" aria-hidden="true"></i>
                  <span>Upload Photos From Your Device</span>
                  <div>
                    Note: You can upload 20 photos to your profile. Each photos
                    must be less than 15 MB and in jpg, jpeg, png or webp
                    format. All photos uploaded are screened as per Photo
                    Guidelines and 98% of those get activated within 2 hours.
                  </div>
                  <div id="notimage" class="hidden">
                    Please select an image
                  </div>
                  <span id="file-upload-btn" class="btn btn-primary">
                    Select a file
                  </span>
                </div>
                <div id="response" class="hidden">
                  <div id="messages"></div>
                  <progress class="progress" id="file-progress" value="0">
                    <span>0</span>%
                  </progress>
                </div>
              </label>
            </CForm>
          </CRow>

          <CRow >
            <div className="animate__animated animate__zoomInLeft responsive mt-3" >
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
          
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
          
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
          
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
          
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <a target="_blank" href="img_5terre.jpg">
                  <CImage src={IMAGE} alt="Cinque Terre" height={50} />
                </a>
              </div>
            </div>
          
          
          </CRow>
        </CCard>
      </CContainer>
      <FooterBar />
    </div>
  );
}

export default UserPhotoGallery;
