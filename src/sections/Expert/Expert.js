import React from "react";
import "./Expert.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Slider from "../../components/Slider/index";

const Expert = () => {
  return (
    <section id="portfolio"
      className="expert-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row align-items-center">
          <SectionTitle subTitle="Портфолио" title="Примеры работ" />
          <Slider />

          <div className="col-lg-6 col-md-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Expert;
