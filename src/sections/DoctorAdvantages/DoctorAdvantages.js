import React, { useEffect, useRef, useState } from "react";
import "./DoctorAdvantages.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { FiChevronsDown } from "react-icons/fi";

const STATS = [
  { target: 19, suffix: "+", label: "лет клинической практики" },
  { target: 3500, suffix: "+", label: "успешных операций и имплантаций" },
  { target: 98, suffix: "%", label: "приживаемость имплантатов" },
  { target: 0, suffix: "", label: "неприятных слепков — 100% 3D" },
];

function DoctorCheckSvg() {
  return (
    <svg viewBox="0 0 40 40" className="adv-svg" aria-hidden="true">
      <circle cx="17" cy="13" r="6" fill="#4ea8de" />
      <path
        d="M6,32 C6,24.5 11,21 17,21 C23,21 28,24.5 28,32 Z"
        fill="#3a86ff"
      />
      <circle cx="29" cy="27" r="8" fill="#2ec4b6" stroke="#ffffff" strokeWidth="2" />
      <path
        d="M25.5,27 L28,29.5 L33,24.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cpu3DSvg() {
  return (
    <svg viewBox="0 0 40 40" className="adv-svg" aria-hidden="true">
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

function HeartRedSvg() {
  return (
    <svg viewBox="0 0 40 40" className="adv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="advHeartGrad" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#d90429" />
        </linearGradient>
      </defs>
      <path
        d="M20,34 C20,34 6,25 6,14.5 C6,9.8 9.6,6.5 14,6.5 C16.8,6.5 19,8 20,10 C21,8 23.2,6.5 26,6.5 C30.4,6.5 34,9.8 34,14.5 C34,25 20,34 20,34 Z"
        fill="url(#advHeartGrad)"
      />
      <path
        d="M11,13 C11.5,10.8 13.2,9.8 15,10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function GoldMedalSvg() {
  return (
    <svg viewBox="0 0 40 40" className="adv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="goldGrad" x1="10" y1="14" x2="30" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="55%" stopColor="#f4a261" />
          <stop offset="100%" stopColor="#e09f3e" />
        </linearGradient>
      </defs>
      {/* Red ribbon tails / tag */}
      <path d="M13,4 L19,4 L21,16 L15,16 Z" fill="#e63946" />
      <path d="M27,4 L21,4 L19,16 L25,16 Z" fill="#c1121f" />
      {/* Gold medal circle */}
      <circle cx="20" cy="24" r="11" fill="url(#goldGrad)" stroke="#fff3b0" strokeWidth="1.5" />
      <circle cx="20" cy="24" r="7.5" fill="none" stroke="#b5651d" strokeWidth="1.2" opacity="0.5" />
      <path
        d="M20,18.5 L21.7,22 L25.5,22.5 L22.7,25.2 L23.4,29 L20,27.2 L16.6,29 L17.3,25.2 L14.5,22.5 L18.3,22 Z"
        fill="#fff8d6"
      />
    </svg>
  );
}

const ADVANTAGES = [
  {
    icon: <DoctorCheckSvg />,
    animClass: "adv-icon--user",
    title: "Один врач на всех этапах",
    text: "От первичной диагностики и хирургии до финального протезирования — без передачи пациента от специалиста к специалисту.",
  },
  {
    icon: <Cpu3DSvg />,
    animClass: "adv-icon--cpu",
    title: "Прогнозируемый 3D-результат",
    text: "Вы видите будущую улыбку и точный план лечения с этапами и сроками ещё до начала процедур.",
  },
  {
    icon: <HeartRedSvg />,
    animClass: "adv-icon--heart",
    title: "Деликатно и без боли",
    text: "Современная анестезия, атравматичное удаление и бережный подход даже в сложных клинических случаях и у детей.",
  },
  {
    icon: <GoldMedalSvg />,
    animClass: "adv-icon--award",
    title: "Честная смета и гарантия",
    text: "Прозрачное ценообразование без скрытых доплат, проверенные системы имплантатов и официальная гарантия.",
  },
];

function AnimatedNumber({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) return undefined;

    let rafId = 0;

    const run = () => {
      cancelAnimationFrame(rafId);
      setVal(0);
      const duration = 1000;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(target * eased));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      setVal(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
        } else {
          cancelAnimationFrame(rafId);
          setVal(0);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {target === 0 ? "0" : val.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

const DoctorAdvantages = () => {
  const [openIdx, setOpenIdx] = useState(-1);

  const toggleCard = (idx) => {
    if (typeof window !== "undefined" && window.innerWidth > 991) return;
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="about" className="advantages-section pt-100">
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="О враче и подходе"
            title="Персональная ответственность за вашу улыбку"
            description="Я веду приём лично — от первичной 3D-диагностики и хирургии до финального протезирования."
          />
        </Reveal>

        <div className="stats-grid">
          {STATS.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 80} variant="scale-in">
              <div className="stat-card">
                <div className="stat-value">
                  <AnimatedNumber target={item.target} suffix={item.suffix} />
                </div>
                <div className="stat-label">{item.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="advantages-grid">
          {ADVANTAGES.map((adv, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={adv.title} delay={idx * 90} variant="fade-up">
                <article
                  className={`advantage-card ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="advantage-card-trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleCard(idx)}
                  >
                    <div className="advantage-card-head">
                      <div
                        className={`advantage-icon ${adv.animClass}`}
                        aria-hidden="true"
                      >
                        {adv.icon}
                      </div>
                      <span className="adv-chevron" aria-hidden="true">
                        <FiChevronsDown />
                      </span>
                    </div>
                    <h3>{adv.title}</h3>
                  </button>
                  <div className="adv-desc-wrap">
                    <div className="adv-desc-inner">
                      <p>{adv.text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DoctorAdvantages;
