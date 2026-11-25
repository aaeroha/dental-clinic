import React from "react";
import "./Emergency.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { useBooking } from "../../context/BookingContext";
import { FiBox, FiCpu, FiLayers, FiMaximize } from "react-icons/fi";

const TECH_MODULES = [
  {
    icon: <FiMaximize />,
    tag: "КЛКТ",
    title: "3D-томография",
    desc: "Точная диагностика костной ткани и каналов до 0,1 мм",
  },
  {
    icon: <FiLayers />,
    tag: "3D-сканер",
    title: "Без слепков",
    desc: "Цифровой оттиск за пару минут без дискомфорта",
  },
  {
    icon: <FiBox />,
    tag: "3D-печать",
    title: "Хирургические шаблоны",
    desc: "Установка имплантата строго в запланированную позицию",
  },
  {
    icon: <FiCpu />,
    tag: "ИИ-протокол",
    title: "Прогнозируемый результат",
    desc: "Моделирование вашей новой улыбки ещё до начала лечения",
  },
];

const Emergency = () => {
  const { openBooking } = useBooking();

  return (
    <section className="emergency-section">
      <div className="container">
        <div className="row align-items-stretch g-4 g-xl-5">
          <div className="col-lg-7 d-flex">
            <Reveal variant="fade-left" className="w-100 h-100">
              <div className="tech-showcase">
                <div className="tech-showcase-header">
                  <span className="tech-dot" />
                  <span>Цифровой 3D-протокол лечения</span>
                </div>
                <div className="tech-scan-line" aria-hidden="true" />
                <div className="tech-grid">
                  {TECH_MODULES.map((item) => (
                    <div className="tech-module" key={item.tag}>
                      <div className="tech-module-top">
                        <span className="tech-module-icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="tech-module-tag">{item.tag}</span>
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-5 d-flex align-items-center">
            <Reveal variant="fade-right" delay={100}>
              <div className="emergency-text">
                <SectionTitle
                  subTitle="Современная медицина"
                  title="Передовая стоматология уже не та, какой вы себе ее представляете"
                  description="Современные технологии позволяют планировать лечение от начала и до конца процесса ещё на этапе консультации и получать чётко прогнозируемый результат. Это достигается при комплексном применении конусно-лучевой томографии (КЛКТ), сканирования 3D-сканером, изготовления моделей, шаблонов и прототипов на 3D-принтере и искусственного интеллекта в специализированном программном обеспечении."
                  subDescription="А это значит — больше никаких слепков!"
                />
                <button
                  type="button"
                  className="theme-btn"
                  onClick={() =>
                    openBooking({
                      source: "technologies",
                      message:
                        "Здравствуйте! Интересует консультация с 3D-диагностикой и цифровым планированием.",
                    })
                  }
                >
                  Записаться на приём
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
