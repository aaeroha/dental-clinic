import React from "react";
import "./Emergency.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { useBooking } from "../../context/BookingContext";

function CtTargetSvg() {
  return (
    <svg viewBox="0 0 40 40" className="tech-svg tech-svg--target" aria-hidden="true">
      <g className="target-reticle" stroke="#5ef2b8" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M9,14 V10 A2,2 0 0 1 11,8 H15" />
        <path d="M25,8 H29 A2,2 0 0 1 31,10 V14" />
        <path d="M31,26 V30 A2,2 0 0 1 29,32 H25" />
        <path d="M15,32 H11 A2,2 0 0 1 9,30 V26" />
      </g>
      <circle cx="20" cy="20" r="6" fill="none" stroke="#5ef2b8" strokeWidth="1.6" strokeOpacity="0.65" className="target-ring" />
      <circle cx="20" cy="20" r="2.4" fill="#5ef2b8" className="target-dot" />
    </svg>
  );
}

function ScannerLayersSvg() {
  return (
    <svg viewBox="0 0 40 40" className="tech-svg tech-svg--layers" aria-hidden="true">
      <g className="layer-top">
        <polygon points="20,7 33,13 20,19 7,13" fill="#4cc9f0" fillOpacity="0.35" stroke="#4cc9f0" strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      <g className="layer-mid">
        <polyline points="7,20 20,26 33,20" fill="none" stroke="#5ef2b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="layer-bot">
        <polyline points="7,27 20,33 33,27" fill="none" stroke="#907df5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function RadarCubeSvg() {
  return (
    <svg viewBox="0 0 40 40" className="tech-svg tech-svg--cube" aria-hidden="true">
      <g className="cube-wire" fill="rgba(94, 242, 184, 0.1)" stroke="#5ef2b8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="20,6 32,12.5 32,27.5 20,34 8,27.5 8,12.5" />
        <polyline points="8,12.5 20,19 32,12.5" fill="none" />
        <line x1="20" y1="19" x2="20" y2="34" />
      </g>
    </svg>
  );
}

function AiChipSvg() {
  return (
    <svg viewBox="0 0 40 40" className="tech-svg tech-svg--chip" aria-hidden="true">
      <g stroke="#48bfe3" strokeWidth="2.2" strokeLinecap="round">
        <line x1="15" y1="4" x2="15" y2="9" />
        <line x1="25" y1="4" x2="25" y2="9" />
        <line x1="15" y1="31" x2="15" y2="36" />
        <line x1="25" y1="31" x2="25" y2="36" />
        <line x1="4" y1="15" x2="9" y2="15" />
        <line x1="4" y1="25" x2="9" y2="25" />
        <line x1="31" y1="15" x2="36" y2="15" />
        <line x1="31" y1="25" x2="36" y2="25" />
      </g>
      <rect x="9" y="9" width="22" height="22" rx="5" fill="#5e60ce" />
      <rect x="14" y="14" width="12" height="12" rx="3" fill="#5ef2b8" />
    </svg>
  );
}

const TECH_MODULES = [
  {
    icon: <CtTargetSvg />,
    iconTheme: "tech-icon--dark-radar",
    tag: "КЛКТ",
    title: "3D-томография",
    desc: "Точная диагностика костной ткани и каналов до 0,1 мм",
  },
  {
    icon: <ScannerLayersSvg />,
    iconTheme: "tech-icon--dark-scan",
    tag: "3D-сканер",
    title: "Без слепков",
    desc: "Цифровой оттиск за пару минут без дискомфорта",
  },
  {
    icon: <RadarCubeSvg />,
    iconTheme: "tech-icon--dark-radar",
    tag: "3D-печать",
    title: "Хирургические шаблоны",
    desc: "Установка имплантата строго в запланированную позицию",
  },
  {
    icon: <AiChipSvg />,
    iconTheme: "tech-icon--dark-chip",
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
                        <span
                          className={`tech-module-icon ${item.iconTheme}`}
                          aria-hidden="true"
                        >
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
