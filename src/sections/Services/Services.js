import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Services.scss";
import ServicesData from "./ServiceData";
import Service from "../../components/Service/Service";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section
      className="service-section pt-100 pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <SectionTitle
              title="КАКОЙ_ТО ТЕКСТ"
              subTitle="КАКОЙ_ТО ТЕКСТ"
            />
          </div>
          <div className="col-lg-6 col-sm-6">
            <p className="service-title-text">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
          </div>
        </div>

        <div className="row">
          {ServicesData.map((singleService) => (
            <Service serviceList={singleService} key={singleService.id} />
          ))}
        </div>
      </div>

      <div className="theme-btn text-center">
        <Link to="/contact">Записаться на приём</Link>
      </div>
    </section>
  );
};

export default Services;
