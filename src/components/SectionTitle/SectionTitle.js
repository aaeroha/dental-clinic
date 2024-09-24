import React from "react";
import "./SectionTitle.scss";

const SectionTitle = ({ subTitle, title, description, subDescription }) => {
  return (
    <div className="section-title">
      {subTitle ? <span>{subTitle}</span> : <></>}
      <h2>{title}</h2>
      <p>{description}</p>
      {subDescription ? <p>{subDescription}</p> : <></>}
    </div>
  );
};

export default SectionTitle;
