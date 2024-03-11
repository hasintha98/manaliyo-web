import React from "react";
import "./common-components.css";
import { CImage } from "@coreui/react";
import { COLORS } from "../../common/colors";

const CircularProgress = ({ img, count }) => {

  return (
    <div
      class="ui-widgets"
      style={{
        borderRightColor: count <= 99 ? COLORS.MID_LIGHT : COLORS.PRIMARY,
        borderTopColor: count <= 60 ? COLORS.MID_LIGHT : COLORS.PRIMARY,
        borderLeftColor: count <= 30 ? COLORS.MID_LIGHT : COLORS.PRIMARY,
      }}
    >
      <div class="ui-values">
        {" "}
        <CImage
          src={img}
          width={175}
          height={175}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div class="ui-labels">
        <span>{count?.toFixed(0)}%</span>
        <br />
        <span>Profile Completion</span>
      </div>
    </div>
  );
};

export default CircularProgress;
