import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Services.scss";
import ServicesData from "./ServiceData";
import Reveal from "../../components/Reveal/Reveal";
import { FiCheckCircle, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { useBooking } from "../../context/BookingContext";

const Services = () => {
  const [activeId, setActiveId] = useState(ServicesData[0].id);
  const [mobileOpenId, setMobileOpenId] = useState(ServicesData[0].id);
  const { openBooking } = useBooking();

  const handleTabClick = (id) => {
    setActiveId(id);
    setMobileOpenId((prev) => (prev === id ? null : id));
  };

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
                const isMobileOpen = item.id === mobileOpenId;
                return (
                  <div key={item.id} className="solution-tab-group">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-expanded={isMobileOpen}
                      className={`solution-tab ${isActive ? "is-active-desktop" : ""} ${
                        isMobileOpen ? "is-open-mobile" : ""
                      }`}
                      onClick={() => handleTabClick(item.id)}
                    >
                      <span className="solution-tab-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="solution-tab-text">
                        <span className="solution-tab-tag">{item.tag}</span>
                        <strong>{item.shortTitle}</strong>
                      </span>
                      <FiArrowRight
                        className="solution-tab-arrow d-none d-lg-block"
                        aria-hidden="true"
                      />
                      <FiChevronDown
                        className="solution-tab-chevron d-lg-none"
                        aria-hidden="true"
                      />
                    </button>

                    {/* Mobile inline accordion drawer — no scrolling down needed */}
                    <div
                      className={`solution-mobile-drawer d-lg-none ${
                        isMobileOpen ? "is-open" : ""
                      }`}
                    >
                      <div className="solution-mobile-drawer-inner">
                        <div className="solution-mobile-card">
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
                          <button
                            type="button"
                            className="theme-btn solution-cta w-100"
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop side-by-side detail panel */}
            <div className="solution-detail d-none d-lg-flex" role="tabpanel">
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
