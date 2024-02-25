import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  CBadge,
  CButton,
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
import { UserService } from "../services/user.service";
import TokenService from "../services/token.service";
import CropperModal from "../components/modals/CropperModal";

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false)
  const userId = TokenService.getUser()?.user?.id;

  const handleFileChange = (event) => {
    setCropperVisible(false)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        setCropperVisible(true)
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    UserService.uploadUserImage(userId, selectedFile)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="background-body">
      <NavBar />
      <UserNavBar />
      <CContainer className="mb-5">
        <CCard className="mt-2 mb-5 p-4">
          <CRow className="mt-3 animate__animated animate__bounceIn">
            <CForm
              id="file-upload-form"
              onSubmit={uploadPhoto}
              class="uploader"
            >
              <CFormInput
                id="file-upload"
                type="file"
                name="fileUpload"
                accept="image/*"
                onChange={handleFileChange}
              />

              <label for="file-upload" id="file-drag">
                {selectedFile && (
                  <CImage
                    id="file-image"
                    src={selectedFile}
                    alt="Preview"
                    className="img-fluid"
                  />
                )}

                {!selectedFile && (
                  <div id="start">
                    <i class="fa fa-download" aria-hidden="true"></i>
                    <span>Upload Photos From Your Device</span>
                    <div>
                      Note: You can upload 20 photos to your profile. Each
                      photos must be less than 15 MB and in jpg, jpeg, png or
                      webp format. All photos uploaded are screened as per Photo
                      Guidelines and 98% of those get activated within 2 hours.
                    </div>
                    <div id="notimage" class="hidden">
                      Please select an image
                    </div>
                    <span id="file-upload-btn" class="btn btn-primary">
                      Select a file
                    </span>
                  </div>
                )}
                {selectedFile && (
                  <div id="start">
                    <i class="fa fa-download" aria-hidden="true"></i>

                    <div>Photo is Selected</div>
                    <CButton className="danger">Remove Photo</CButton>
                    <CButton class="btn btn-primary" type="submit">
                      Upload Now
                    </CButton>
                  </div>
                )}

                <CropperModal 
                visible={cropperVisible}
                setVisible={() => setCropperVisible(false)}
                photoURL={selectedFile}
                />

                <div id="response" class="hidden">
                  <div id="messages"></div>
                  <progress class="progress" id="file-progress" value="0">
                    <span>0</span>%
                  </progress>
                </div>
              </label>
            </CForm>
          </CRow>

          <CRow>
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
