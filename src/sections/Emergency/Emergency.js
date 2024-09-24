import React from "react";
import "./Emergency.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import EmergencyImg from "../../assets/emergency.png";
import { Link } from "react-router-dom";

const Emergency = () => {
  return (
    <section
      className="emergency-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="emergency-img">
              <img src={EmergencyImg} alt="Emergency" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="emergency-text">
              <SectionTitle
                subTitle="Современная медицина"
                title="Передовая стоматология уже не та, какой вы себе ее представляете."
                description={`Современные технологии позволяют планировать лечение от начала и до конца процесса еще на этапе консультации и получать четко прогнозируемый результат. 
                Это достигается при комплексном применении Конусно-лучевой томографии ( КЛКТ ) Сканировании 3D сканером, 
                изготовлению моделей, шаблонов и прототипов на 3D принтере и, конечно, Искуственному Интелекту в виде специализированного програмного обеспечения.`}
                subDescription={`А это значит, больше никаких слепков!`}
              />
              <div className="theme-btn">
                <Link to="/contact">Записаться на приём</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
