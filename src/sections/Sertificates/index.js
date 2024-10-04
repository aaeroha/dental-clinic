import React from "react";
import "./index.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Sertificates = () => {
  return (
    <section
      id="sertificates"
      className="sertificates-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row align-items-center">
          <SectionTitle subTitle="Повышение квалификации" title="Сертификаты" />
          <Swiper
            modules={[Navigation, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop
            breakpoints={{
              // when window width is >= 320px
              250: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              892: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              1200: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {[...Array(10)].map((image, id) => (
              <SwiperSlide key={id}>
                <img
                  src={require(`../../assets/sertificates/${++id}.webp`)}
                  alt="Сертификат"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="col-lg-6 col-md-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Sertificates;
