import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Services.scss";
import ServicesData from "./ServiceData";
import Service from "../../components/Service/Service";
import Slider from "react-slick";
import ReactWhatsapp from "react-whatsapp";

const Services = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      className="service-section pt-100 pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <SectionTitle title="КАКОЙ_ТО ТЕКСТ" subTitle="КАКОЙ_ТО ТЕКСТ" />
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
          <Slider {...settings} className="testimoni-slider">
            {ServicesData.map((item) => (
              // <TestimoniCard testimonail={testimonail} key={testimonail.id} />
              <Service serviceList={item} key={item.id} />
            ))}
          </Slider>
          {/* {ServicesData.map((singleService) => (
            <Service serviceList={singleService} key={singleService.id} />
          ))} */}
        </div>
      </div>
      <ReactWhatsapp
        className="theme-btn text-center"
        number="+79152023888"
        message="Хочу записатьcя на прием!"
      >
        Записаться на прием
      </ReactWhatsapp>
    </section>
  );
};

export default Services;
