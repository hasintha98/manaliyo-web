import { CCol, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

function CropperModal({ visible, setVisible, photoURL }) {
  const [croppedArea, setcroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setcroppedArea(croppedAreaPixels)
   
  }, [])

  const getCroppedImageUrl = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
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
    const parts = dataURL.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const byteCharacters = atob(parts[1])
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024)
      const byteNumbers = new Array(slice.length)

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  return (
    <CModal
      backdrop="static"
      size="xl"
      visible={visible}
      onClose={() => setVisible(false)}
    
    >
      <CModalBody>
        <CModalHeader></CModalHeader>
     
          <CRow>
            <CCol>
        <div style={{ height: "500px"}}>
          {photoURL && (
            <Cropper
            
              image={photoURL}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4}
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
    </CModal>
  );
}

export default CropperModal;
