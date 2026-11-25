import React from "react";
import "./Appointment.scss";
import { AiFillHome } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { trackGoal } from "../../utils/metrika";

const Appointment = () => {
  return (
    <section id="map" className="appointment-section">
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Как добраться"
            title="Адрес приёма"
            description="Метро Калужская (выход № 5), ул. Обручева 34/63 стр. 1, офис № 21."
          />
        </Reveal>
      </div>
      <Reveal variant="scale-in">
        <div className="yandex-map">
          <iframe
            title="Как добраться к доктору Боченкову"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae1e2996050b94f708d192b48137efae21750d84c057fca22c893cced0dedd6cf&amp;source=constructor"
            width="100%"
            height="720"
            frameBorder="0"
            loading="lazy"
          ></iframe>
          <a
            href="https://yandex.ru/navi/213/moscow/house/ulitsa_obrucheva_34_63s1/Z04YcwRpTUQHQFtvfXp0dX9gZA==/?ll=37.539410%2C55.654330&z=16"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGoal("open_yandex_navi")}
          >
            <div className="location-name">
              <AiFillHome />
              <p>
                Открыть маршрут в Яндекс.Навигаторе: ул. Обручева, 34/63с1, офис №21
              </p>
            </div>
          </a>
        </div>
      </Reveal>
    </section>
  );
};

export default Appointment;
