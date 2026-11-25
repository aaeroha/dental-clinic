import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Services.scss";
import ServicesData from "./ServiceData";
import Reveal from "../../components/Reveal/Reveal";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { useBooking } from "../../context/BookingContext";

const Services = () => {
  const [activeId, setActiveId] = useState(ServicesData[0].id);
  const { openBooking } = useBooking();

  return (
    <section id="solutions" className="service-section pt-100 pb-70">
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Клинические решения"
            title="Решения для вашей улыбки"
            description="Выберите актуальную ситуацию — посмотрите, как она решается по современным протоколам"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="solutions-panel">
            <div className="solutions-tabs" role="tablist" aria-label="Клинические ситуации">
              {ServicesData.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`solution-tab ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="solution-tab-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="solution-tab-text">
                      <span className="solution-tab-tag">{item.tag}</span>
                      <strong>{item.shortTitle}</strong>
                    </span>
                    <FiArrowRight className="solution-tab-arrow" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="solution-detail" role="tabpanel">
              <div className="solution-detail-stack">
                {ServicesData.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <div
                      key={item.id}
                      className={`solution-detail-inner ${isActive ? "is-active" : ""}`}
                      aria-hidden={!isActive}
                    >
                      <div className="solution-detail-head">
                        <div className="solution-detail-icon" aria-hidden="true">
                          {item.icon}
                        </div>
                        <span className="solution-detail-tag">{item.tag}</span>
                      </div>

                      <h3>{item.title}</h3>
                      <p className="solution-detail-desc">{item.description}</p>

                      <ul className="solution-benefits">
                        {item.benefits.map((b) => (
                          <li key={b}>
                            <FiCheckCircle aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="solution-cta-wrap">
                        <button
                          type="button"
                          className="theme-btn solution-cta"
                          tabIndex={isActive ? 0 : -1}
                          onClick={() =>
                            openBooking({
                              source: `solutions:${item.tag}`,
                              message: item.whatsappMessage,
                            })
                          }
                        >
                          Обсудить этот случай
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
