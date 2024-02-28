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

import IMAGE from "../assets/no_profile.webp";
import { UserService } from "../services/user.service";
import TokenService from "../services/token.service";
import CropperModal from "../components/modals/CropperModal";

function UserPhotoGallery() {
  const [userDetails, setUserDetails] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [imageNumber, setImageNumber] = useState(1);
  const userId = TokenService.getUser()?.user?.id;

  const handleFileChange = (event) => {
    setCropperVisible(false);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const findFirstEmptyImage = (data) => {
    for (let i = 1; i <= 4; i++) {
      const imageKey = `image${i}`;
      if (!data[imageKey]) {
        return i;
      }
    }
    return null; // If no empty image attribute found
  };

  const getUserDetail = () => {
    UserService.getUserCurrentUser()
      .then((res) => {
        setUserDetails(res);
        setImageNumber(findFirstEmptyImage(res?.user_image));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUserImage = async (imageNumber) => {
    const data = {
      id: userDetails?.user_image?.id,
      ["image" + imageNumber]: "",
    };

    console.log(data);

    UserService.updateUserImage(userDetails?.user_image?.id, data)
      .then((res) => {
        getUserDetail();
      })
      .catch((err) => {
        console.log(err);
      });
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
              // onSubmit={uploadPhoto}
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
                    {!imageNumber && (
                      <div id="notimage">
                        Looks like you've reached the photo limit! Consider
                        removing some old photos
                      </div>
                    )}
                    <div
                      id="file-upload-btn"
                      class="btn btn-primary"
                      hidden={!imageNumber}
                    >
                      Select a file
                    </div>
                  </div>
                )}
                {selectedFile && (
                  <div id="start">
                    <i class="fa fa-download" aria-hidden="true"></i>

                    <div>Photo is Selected</div>
                    <CButton className="danger" onClick={() => setSelectedFile(null)}>Remove Photo</CButton>
                    
                  </div>
                )}

                <CropperModal
                  visible={cropperVisible}
                  setVisible={() => setCropperVisible(false)}
                  photoURL={selectedFile}
                  imageNumber={imageNumber}
                  reload={() => {
                    setCropperVisible(false);
                    setSelectedFile(null);
                    getUserDetail();
                  }}
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
                <div className="image-container">
                  <CImage
                    src={userDetails?.user_image?.image1 || IMAGE}
                    alt="Cinque Terre"
                    className="gallery-img"
                    style={{ height: "305px" }}
                  />
                  {userDetails?.user_image?.image1 && (
                    <div className="delete-icon">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "white" }}
                        onClick={() => removeUserImage(1)}
                      >
                        delete
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <div className="image-container">
                  <CImage
                    src={userDetails?.user_image?.image2 || IMAGE}
                    alt="Cinque Terre"
                    className="gallery-img"
                    style={{ height: "305px" }}
                  />
                  {userDetails?.user_image?.image2 && (
                    <div className="delete-icon">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "white" }}
                        onClick={() => removeUserImage(2)}
                      >
                        delete
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <div className="image-container">
                  <CImage
                    src={userDetails?.user_image?.image3 || IMAGE}
                    alt="Cinque Terre"
                    className="gallery-img"
                    style={{ height: "305px" }}
                  />
                  {userDetails?.user_image?.image3 && (
                    <div className="delete-icon">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "white" }}
                        onClick={() => removeUserImage(3)}
                      >
                        delete
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="animate__animated animate__zoomInLeft responsive mt-3">
              <div class="gallery">
                <div className="image-container">
                  <CImage
                    src={userDetails?.user_image?.image4 || IMAGE}
                    alt="Cinque Terre"
                    className="gallery-img"
                    style={{ height: "305px" }}
                  />
                  {userDetails?.user_image?.image4 && (
                    <div className="delete-icon">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "white" }}
                        onClick={() => removeUserImage(4)}
                      >
                        delete
                      </span>
                    </div>
                  )}
                </div>
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
