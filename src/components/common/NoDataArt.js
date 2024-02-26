import { CCol, CImage, CLink, CRow, CSpinner } from "@coreui/react";
import React from "react";
import noDataAnimation from "../../assets/other/no_data.json";
import Lottie from "lottie-react";
import { COLORS } from "../../common/colors";
import '../../App.css'

function NoDataArt({
  icon,
  visible,
  size = 100,
  description = "Fetching...",
  width = "50%",
  button = "",
  buttonClicked,
  lottie = false,
  background = "#F3F3F3"
}) {
  return (
    visible && (
      <CRow className="mt-2">
        <CCol style={{ textAlign: "center", padding: 20,backgroundColor: background, borderRadius: '15px', width: '100%' }}>
          {!lottie ?<lord-icon
            src={`https://cdn.lordicon.com/${icon}.json`}
            trigger="hover"
            colors={`primary:#0000,secondary:${COLORS.PRIMARY}`}
            style={{ width: "90px", height: "90px" }}
          ></lord-icon> :
         <Lottie
            loop={true}
            autoplay={true}
            size={10}
            style={{ height: "150px" }}
            className="match-animation"
            animationData={noDataAnimation}
          /> }

          <h6
            className="mt-3 desc-loricons"
            style={{ maxWidth: width, width: "100%", textAlign: "center", margin: "0 auto", color: 'black' }}
          >
            {description}
          </h6>
          {button && (
            <CLink style={{ color: COLORS.MID_DARK, cursor: "pointer" }} onClick={() => buttonClicked(true)}>
              {button}
            </CLink>
          )}
        </CCol>
      </CRow>
    )
  );
}

export default NoDataArt;
