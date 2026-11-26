import React, { useEffect, useState } from "react";
import "./index.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { trackGoal } from "../../utils/metrika";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const TOTAL_CERTIFICATES = 10;

const certImages = import.meta.glob("../../assets/sertificates/*-*.webp", {
  eager: true,
  import: "default",
});

const getCertImage = (num, variant) =>
  certImages[`../../assets/sertificates/${num}-${variant}.webp`];

const GRAD_CAPS = [
  { left: "6%", delay: "0s", duration: "4.6s", size: 58, height: "-480px", drift: "-28px", spin: "-220deg" },
  { left: "16%", delay: "-1.4s", duration: "5.2s", size: 32, height: "-410px", drift: "24px", spin: "260deg" },
  { left: "28%", delay: "-2.8s", duration: "4.3s", size: 68, height: "-510px", drift: "-18px", spin: "190deg" },
  { left: "41%", delay: "-0.7s", duration: "5.5s", size: 28, height: "-390px", drift: "30px", spin: "-280deg" },
  { left: "54%", delay: "-3.6s", duration: "4.8s", size: 48, height: "-470px", drift: "-22px", spin: "240deg" },
  { left: "67%", delay: "-2.1s", duration: "5.0s", size: 64, height: "-440px", drift: "20px", spin: "-200deg" },
  { left: "79%", delay: "-4.1s", duration: "4.4s", size: 36, height: "-495px", drift: "-26px", spin: "300deg" },
  { left: "90%", delay: "-1.0s", duration: "5.3s", size: 52, height: "-420px", drift: "16px", spin: "-250deg" },
];

const Sertificates = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i > 0 ? i - 1 : TOTAL_CERTIFICATES - 1));
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i < TOTAL_CERTIFICATES - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const openCertificate = (index) => {
    setActiveIndex(index);
    trackGoal("open_certificate", { index: index + 1 });
  };

  return (
    <section id="sertificates" className="sertificates-section">
      <div className="grad-caps-bg" aria-hidden="true">
        {GRAD_CAPS.map((cap, i) => (
          <span
            key={i}
            className="grad-cap-particle"
            style={{
              left: cap.left,
              fontSize: `${cap.size}px`,
              animationDelay: cap.delay,
              animationDuration: cap.duration,
              "--cap-height": cap.height,
              "--cap-drift": cap.drift,
              "--cap-spin": cap.spin,
            }}
          >
            <FaGraduationCap />
          </span>
        ))}
      </div>
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Повышение квалификации"
            title="Сертификаты и обучение"
            description="Нажмите на любой сертификат, чтобы открыть его в полном размере."
          />
        </Reveal>
        <Reveal delay={100}>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="sertificates-swiper"
          >
            {[...Array(TOTAL_CERTIFICATES)].map((_, index) => {
              const num = index + 1;
              return (
                <SwiperSlide key={num}>
                  <button
                    type="button"
                    className="certificate-card"
                    onClick={() => openCertificate(index)}
                    aria-label={`Открыть сертификат №${num} в полном размере`}
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet={getCertImage(num, "mobile")}
                        type="image/webp"
                      />
                      <img
                        src={getCertImage(num, "desktop")}
                        alt={`Сертификат врача №${num}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <span className="certificate-zoom-badge" aria-hidden="true">
                      <FiMaximize2 />
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Reveal>
      </div>

      {activeIndex !== null && (
        <div
          className="app-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр сертификата №${activeIndex + 1}`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="app-modal-window certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-modal-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Закрыть окно"
            >
              <FiX />
            </button>
            <div className="certificate-modal-body">
              <button
                type="button"
                className="certificate-modal-nav"
                onClick={() =>
                  setActiveIndex((i) =>
                    i > 0 ? i - 1 : TOTAL_CERTIFICATES - 1
                  )
                }
                aria-label="Предыдущий сертификат"
              >
                <FiChevronLeft />
              </button>
              <img
                src={getCertImage(activeIndex + 1, "desktop")}
                alt={`Сертификат врача №${activeIndex + 1}`}
                className="certificate-modal-img"
              />
              <button
                type="button"
                className="certificate-modal-nav"
                onClick={() =>
                  setActiveIndex((i) =>
                    i < TOTAL_CERTIFICATES - 1 ? i + 1 : 0
                  )
                }
                aria-label="Следующий сертификат"
              >
                <FiChevronRight />
              </button>
            </div>
            <div className="certificate-modal-counter">
              Сертификат {activeIndex + 1} из {TOTAL_CERTIFICATES}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sertificates;
