import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./Banner.scss";
import icon from "../../assets/banner/icons/Calling.png";
import bannerImgFallback from "../../assets/banner/1.png";
import bannerImgDesktop from "../../assets/banner/1-desktop.webp";
import bannerImgMobile from "../../assets/banner/1-mobile.webp";
import { useBooking } from "../../context/BookingContext";
import { trackGoal } from "../../utils/metrika";

const BannerImplant3D = lazy(() =>
  import("../../components/Implant3D/BannerImplant3D")
);

const HERO_TITLE = "Приветствую Вас!";
const HERO_LINE_1 = "Меня зовут Боченков Роман Викторович.";
const HERO_LINE_2 =
  "Я врач-стоматолог, уже более 19 лет веду ортопедический и хирургический приёмы. В практике для меня важно найти индивидуальный подход к каждому пациенту и провести лечение по инновационным протоколам.";
const TOTAL_CHARS = HERO_TITLE.length + HERO_LINE_1.length + HERO_LINE_2.length;

const Banner = () => {
  const { openBooking } = useBooking();
  const [typedCount, setTypedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTypedCount(TOTAL_CHARS);
      setIsDone(true);
      return undefined;
    }

    let timerId;
    let isActive = false;

    const startTyping = () => {
      clearTimeout(timerId);
      let current = 0;
      setTypedCount(0);
      setIsDone(false);

      const step = () => {
        if (!isActive) return;
        if (current < TOTAL_CHARS) {
          current += 1;
          setTypedCount(current);
          const delay = current <= HERO_TITLE.length ? 36 : 16;
          timerId = setTimeout(step, delay);
        } else {
          setIsDone(true);
        }
      };

      timerId = setTimeout(step, 160);
    };

    if (typeof IntersectionObserver === "undefined") {
      isActive = true;
      startTyping();
      return () => clearTimeout(timerId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !isActive) {
          isActive = true;
          startTyping();
        } else if (!visible && isActive) {
          isActive = false;
          clearTimeout(timerId);
          setTypedCount(0);
          setIsDone(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      isActive = false;
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, []);

  const titleCount = Math.min(typedCount, HERO_TITLE.length);
  const line1Offset = Math.max(0, typedCount - HERO_TITLE.length);
  const line1Count = Math.min(line1Offset, HERO_LINE_1.length);
  const line2Count = Math.max(0, line1Offset - HERO_LINE_1.length);

  const typedTitle = HERO_TITLE.slice(0, titleCount);
  const typedLine1 = HERO_LINE_1.slice(0, line1Count);
  const typedLine2 = HERO_LINE_2.slice(0, line2Count);

  const typingInTitle = typedCount <= HERO_TITLE.length && !isDone;

  return (
    <section
      id="header"
      ref={sectionRef}
      className="section-bg section-common banner-section"
    >
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-5 d-flex">
            <div className="banner-text">
              <div className="banner-text-main">
                <div className="hero-badges">
                  <span className="hero-badge">Стоматолог-хирург</span>
                  <span className="hero-badge">Имплантолог</span>
                  <span className="hero-badge">Ортопед</span>
                </div>

                <div className="hero-title-wrap">
                  <h1 className="hero-title--ghost" aria-hidden="true">
                    {HERO_TITLE}
                  </h1>
                  <h1
                    className="hero-title--typed"
                    aria-label="Стоматолог-хирург и имплантолог в Москве — Боченков Роман Викторович"
                  >
                    {typedTitle}
                    {typingInTitle && (
                      <span className="typing-cursor" aria-hidden="true">|</span>
                    )}
                  </h1>
                </div>

                <div className="hero-lead-wrap">
                  <p className="light-text hero-lead hero-lead--ghost" aria-hidden="true">
                    <b>{HERO_LINE_1}</b>
                    <br />
                    {HERO_LINE_2}
                  </p>
                  <p className="light-text hero-lead hero-lead--typed">
                    <b>{typedLine1}</b>
                    {line1Offset > HERO_LINE_1.length && <br />}
                    {typedLine2}
                    {!typingInTitle && !isDone && (
                      <span className="typing-cursor" aria-hidden="true">|</span>
                    )}
                  </p>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <strong>19+ лет</strong>
                    <span>клинической практики</span>
                  </div>
                  <div className="hero-stat">
                    <strong>3D &amp; КЛКТ</strong>
                    <span>цифровое планирование</span>
                  </div>
                  <div className="hero-stat">
                    <strong>м. Калужская</strong>
                    <span>ул. Обручева, 34/63с1</span>
                  </div>
                </div>
              </div>

              <div className="banner-bottom">
                <button
                  type="button"
                  className="theme-btn hero-cta"
                  onClick={() => openBooking({ source: "hero" })}
                >
                  Запишитесь на консультацию
                </button>
                <a
                  href="tel:+79152023888"
                  className="none-decor banner-call-link"
                  onClick={() => trackGoal("click_phone", { source: "hero" })}
                >
                  <div className="banner-call">
                    <div className="icon">
                      <img src={icon} alt="" width="24" height="24" />
                    </div>
                    <div className="call-text">
                      <p>Телефон для записи</p>
                      <h6>8 (915) 202-38-88</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-7 d-flex">
            <div className="banner-img-area">
              <Suspense fallback={null}>
                <BannerImplant3D />
              </Suspense>

              <div className="banner-doctor-col">
                <div className="banner-img">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={bannerImgMobile}
                      type="image/webp"
                    />
                    <source srcSet={bannerImgDesktop} type="image/webp" />
                    <img
                      src={bannerImgFallback}
                      alt="Стоматолог-хирург и имплантолог Боченков Роман Викторович"
                      width="700"
                      height="899"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="info-box speech-bubble">
                  <svg
                    className="speech-tail"
                    viewBox="0 0 34 22"
                    aria-hidden="true"
                  >
                    <path
                      d="M6,22 C8,12 4,4 1,1 C10,3 20,10 28,22 Z"
                      className="speech-tail-fill"
                    />
                    <path
                      d="M6,21 C8,12 4,4 1,1 C10,3 20,10 28,21"
                      className="speech-tail-stroke"
                      fill="none"
                    />
                  </svg>
                  <div className="info-text">
                    <p>20 лет я совершенствуюсь и развиваюсь, чтобы лечить!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-tech-backdrop" aria-hidden="true" />
    </section>
  );
};

export default Banner;
