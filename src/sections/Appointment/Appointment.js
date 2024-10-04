import React from "react";
import "./Appointment.scss";
import { AiFillHome } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
const Appointment = () => {
  return (
    <section
      id="map"
      className="appointment-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <SectionTitle
          className="test"
          title="Как нас найти"
          description="Мы находимся не далеко от м.Калужская, пожалуйста, ознакомьтесь с информацией на карте."
        />
      </div>
      <div className="yandex-map">
        <iframe
          title="Как добраться"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae1e2996050b94f708d192b48137efae21750d84c057fca22c893cced0dedd6cf&amp;source=constructor"
          width="100%"
          height="720"
          frameBorder="0"
        ></iframe>
        <a
          href="https://yandex.ru/navi/213/moscow/house/ulitsa_obrucheva_34_63s1/Z04YcwRpTUQHQFtvfXp0dX9gZA==/?ll=37.539410%2C55.654330&z=16"
          style={{ textDecoration: "none" }}
        >
          <div className="location-name">
            <AiFillHome />
            <p>Москва, улица Обручева, 34/63с1, офис №21</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Appointment;
