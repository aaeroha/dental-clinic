import React from "react";
import "./ThemeIcon.scss";

const ThemeIcon = ({ icon }) => {
  const isElement = React.isValidElement(icon);
  return (
    <div className="icon-box">
      {isElement ? (
        <span className="icon-box-svg" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <img src={icon} alt="" />
      )}
    </div>
  );
};

export default ThemeIcon;
