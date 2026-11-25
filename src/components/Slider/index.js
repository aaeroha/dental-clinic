import React, { useEffect, useState } from "react";
import "./index.scss";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BeforeAfter from "../BeforeAfter/BeforeAfter";
import { trackGoal } from "../../utils/metrika";

const PORTFOLIO_CASES = [
  { id: 1, title: "Восстановление эстетики улыбки" },
  { id: 2, title: "Имплантация и протезирование" },
  { id: 3, title: "Комплексная реабилитация" },
  { id: 4, title: "Цифровое 3D-протезирование" },
  { id: 5, title: "Ортопедическое лечение" },
  { id: 6, title: "Одномоментная имплантация" },
];

function Slider() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (expandedIndex === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setExpandedIndex(null);
      if (e.key === "ArrowLeft")
        setExpandedIndex((i) => (i > 0 ? i - 1 : PORTFOLIO_CASES.length - 1));
      if (e.key === "ArrowRight")
        setExpandedIndex((i) => (i < PORTFOLIO_CASES.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedIndex]);

  const suffix = isMobile ? "mobile" : "desktop";

  const openExpanded = (idx) => {
    setExpandedIndex(idx);
    trackGoal("expand_portfolio_ba", { case: PORTFOLIO_CASES[idx].title });
  };

  return (
    <div className="portfolio-slider">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        noSwipingClass="swiper-no-swiping"
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
        }}
      >
        {PORTFOLIO_CASES.map((item, idx) => (
          <SwiperSlide key={item.id}>
            <BeforeAfter
              beforeSrc={require(`../../assets/banner/work/before${item.id}-${suffix}.webp`)}
              afterSrc={require(`../../assets/banner/work/after${item.id}-${suffix}.webp`)}
              beforeAlt={`До лечения — ${item.title}`}
              afterAlt={`После лечения — ${item.title}`}
              caption={item.title}
              onExpand={() => openExpanded(idx)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {expandedIndex !== null && (
        <div
          className="app-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Крупный просмотр: ${PORTFOLIO_CASES[expandedIndex].title}`}
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="app-modal-window ba-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-modal-close"
              onClick={() => setExpandedIndex(null)}
              aria-label="Закрыть окно"
            >
              <FiX />
            </button>

            <div className="ba-modal-body">
              <button
                type="button"
                className="ba-modal-nav"
                onClick={() =>
                  setExpandedIndex((i) =>
                    i > 0 ? i - 1 : PORTFOLIO_CASES.length - 1
                  )
                }
                aria-label="Предыдущий пример"
              >
                <FiChevronLeft />
              </button>

              <div className="ba-modal-stage">
                <BeforeAfter
                  key={PORTFOLIO_CASES[expandedIndex].id}
                  beforeSrc={require(`../../assets/banner/work/before${PORTFOLIO_CASES[expandedIndex].id}-desktop.webp`)}
                  afterSrc={require(`../../assets/banner/work/after${PORTFOLIO_CASES[expandedIndex].id}-desktop.webp`)}
                  beforeAlt={`До лечения — ${PORTFOLIO_CASES[expandedIndex].title}`}
                  afterAlt={`После лечения — ${PORTFOLIO_CASES[expandedIndex].title}`}
                  caption={`${PORTFOLIO_CASES[expandedIndex].title} (${expandedIndex + 1} / ${PORTFOLIO_CASES.length})`}
                  isLarge
                />
              </div>

              <button
                type="button"
                className="ba-modal-nav"
                onClick={() =>
                  setExpandedIndex((i) =>
                    i < PORTFOLIO_CASES.length - 1 ? i + 1 : 0
                  )
                }
                aria-label="Следующий пример"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;
