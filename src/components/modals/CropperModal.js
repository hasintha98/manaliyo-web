import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { UserService } from "../../services/user.service";
import TokenService from "../../services/token.service";
import LoadingFullscreen from "../LoadingFullscreen";

function CropperModal({ visible, setVisible, photoURL, imageNumber, reload }) {
  const [croppedArea, setcroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [editedPhotoURL, seteditedPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setcroppedArea(croppedAreaPixels);
  }, []);
  const userId = TokenService.getUser()?.user?.id;

  const getCroppedImageUrl = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { width, height } = croppedAreaPixels;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
          img,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          width,
          height,
          0,
          0,
          width,
          height
        );

        resolve(canvas.toDataURL());
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const uploadPhoto = async (event) => {
    event.preventDefault();

    if (!photoURL) {
      alert("Please select a file");
      return;
    }
    setLoading(true);
    const croppedImageUrl = await getCroppedImageUrl(photoURL, croppedArea);
    seteditedPhotoURL(croppedImageUrl);
    console.log(dataURLToBlob(croppedImageUrl));

    const blob = await fetch(croppedImageUrl).then((res) => res.blob());
    const file = new File([blob], `${userId}-${imageNumber}.jpg`, {
      type: "image/jpg",
    });
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("imageNumber", imageNumber);
    formData.append("img", file); // image

    UserService.uploadUserImage(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        reload();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <>
    
    <CModal
      backdrop="static"
      size="xl"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      {" "}
      <LoadingFullscreen loading={loading} message="Uploading Image..." />
      <CModalHeader style={{ fontWeight: "bold" }}>Capture Modal</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol>
            <div style={{ height: "500px" }}>
              {photoURL && (
                <Cropper
                  image={photoURL}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  zoomSpeed={0.1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={uploadPhoto}>
          Upload
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  );
}

export default CropperModal;
