import {
  CButton,
  CCol,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React from "react";
import { COLORS } from "../../common/colors";

function EditUserSectionModal({ visible, setVisible, section, userDetails }) {
  return (
    <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      size="lg"
    >
      <CModalBody style={{ marginInline: '15px' }}>
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
                <CFormTextarea />
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
                  <CCol xs={6} sm={3}>Age:</CCol>
                  <CCol xs={6} sm={3}><CFormInput /></CCol>
                  <CCol xs={6} sm={3}>Diet:</CCol>
                  <CCol xs={6} sm={3}><CFormInput /></CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">Date of Birth:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                  <CCol xs={6} sm={3} className="mt-1">Personal Values:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">Marital Status:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                  <CCol xs={6} sm={3} className="mt-1">Sun Sign:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">Height:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                  <CCol xs={6} sm={3} className="mt-1">Blood Group:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1">Grew up in:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                  <CCol xs={6} sm={3} className="mt-1">Health Information:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} sm={3} className="mt-1"></CCol>
                  <CCol xs={6} sm={3} className="mt-1"></CCol>
                  <CCol xs={6} sm={3} className="mt-1">Disability:</CCol>
                  <CCol xs={6} sm={3} className="mt-1"><CFormInput /></CCol>
                </CRow>
              </CCol>
            </CRow>
          </div>
        )}
         <CRow className="mt-3">
              <CCol style={{ display: "flex", justifyContent: "end" }}>
                <CButton className="primary-btn"> Save </CButton>
              </CCol>
            </CRow>
      </CModalBody>
    </CModal>
  );
}

export default EditUserSectionModal;
