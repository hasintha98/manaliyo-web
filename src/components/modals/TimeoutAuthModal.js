import { cilArrowRight, cilSave, cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../common/colors";
import LOGOICON from "../../assets/test-logo-r.png";
import { UserService } from "../../services/user.service";

function TimeoutAuthModal({ open }) {
  return (
    <CModal
      alignment="center"
      visible={open}
      backdrop="static"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader closeButton={false}>
        <CModalTitle
          id="VerticallyCenteredExample"
          style={{ textAlign: "center" }}
        >
          Login Expired!
        </CModalTitle>
      </CModalHeader>
      <CModalBody className="m-3">
        <div
          style={{
            textAlign: "center",
          }}
          className="mb-3"
        >
          <CImage height={80} src={LOGOICON} style={{ borderRadius: "50%" }} />
        </div>
        <p style={{ textAlign: "center", fontSize: "1em", color: "GrayText" }}>
          Your login session has expired. <br />
          For security reasons, please sign out now to prevent unauthorized
          access to your account
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={async () => {
            await UserService.logout();
            window.location.href = "/";
            window.location.reload(false);
          }}
        >
          SIGN OUT
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default TimeoutAuthModal;
