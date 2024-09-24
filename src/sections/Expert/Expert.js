import React from "react";
import "./Expert.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Slider from "../../components/Slider/index";

const Expert = () => {
  return (
    <section
      className="expert-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row align-items-center">
          <SectionTitle
            subTitle="КАКОЙ_ТО ТЕКСТ"
            title="КАКОЙ_ТО ТЕКСТ"
            description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts"
          />
          <Slider />

          <div className="col-lg-6 col-md-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Expert;
