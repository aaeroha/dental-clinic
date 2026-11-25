import React from "react";
import "./SectionTitle.scss";

const SectionTitle = ({ subTitle, title, description, subDescription }) => {
  return (
    <div className="section-title">
      {subTitle ? <span>{subTitle}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {subDescription ? <p>{subDescription}</p> : null}
    </div>
  );
};

export default SectionTitle;
