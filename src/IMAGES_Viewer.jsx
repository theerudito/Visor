import React from "react";

export const IMAGES_Viewer = ({ base64, visible }) => {
  if (base64 === "") return;
  let imgData = "";
  if (base64.startsWith("iVBOR")) {
    imgData = `data:image/png;base64,${base64}`;
  } else if (base64.startsWith("/9j/")) {
    imgData = `data:image/jpeg;base64,${base64}`;
  } else if (base64.startsWith("PHN2Z")) {
    imgData = `data:image/svg+xml;base64,${base64}`;
  }

  return (
    <div>
      <div>
        <img
          src={imgData}
          alt="img"
          width="100%"
          height="600px"
          style={{
            border: "none",
            objectFit: "contain",
            visibility: visible ? "visible" : "hidden",
          }}
        ></img>
      </div>
    </div>
  );
};
