import React, { useEffect, useRef, useState } from "react";
import "./TreatmentSteps.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { FiCheckCircle, FiShield } from "react-icons/fi";

const STEPS = [
  {
    num: "1",
    badge: "Диагностика",
    title: "Консультация и 3D-КЛКТ",
    text: "Детальный осмотр, конусно-лучевая компьютерная томография (КЛКТ) и фотопротокол. Врач оценивает объём костной ткани, положение нервов и пазух с точностью до десятых долей миллиметра.",
    points: ["Снимок 3D-КЛКТ за 1 минуту", "Анализ скрытых очагов", "Персональный разбор ситуации"],
  },
  {
    num: "2",
    badge: "3D-моделирование",
    title: "Цифровой план без слепков",
    text: "Вместо классических силиконовых слепков используется внутриротовой 3D-сканер. Компьютерная программа с ИИ моделирует будущую улыбку и траекторию установки имплантата.",
    points: ["Никакого дискомфорта от слепков", "Визуализация результата заранее", "Прозрачная смета без доплат"],
  },
  {
    num: "3",
    badge: "Хирургический этап",
    title: "Бережная имплантация по 3D-шаблону",
    text: "На 3D-принтере печатается индивидуальный навигационный шаблон. Имплантат аккуратно устанавливается строго по заданной оси — минимально травматично, без боли и отёков.",
    points: ["Точность позиционирования до 0,1 мм", "Комфортная анестезия", "Возможна временная коронка в день визита"],
  },
  {
    num: "4",
    badge: "Ортопедия и защита",
    title: "Фиксация коронки и наблюдение",
    text: "После приживления устанавливается прочная эстетичная коронка из диоксида циркония или керамики, идеально повторяющая форму и оттенок родных зубов.",
    points: ["Естественная эстетика и прикус", "Долговечные материалы", "Плановое наблюдение и контроль прикуса"],
  },
];

function StepScene({ activeStep }) {
  return (
    <div className="scrolly-stage">
      <div className="scrolly-visuals">
        <div className="scrolly-stage-header">
          <span className="stage-pill">Этап {STEPS[activeStep].num}</span>
          <span className="stage-badge">{STEPS[activeStep].badge}</span>
        </div>

        {/* Scene 0: 3D CBCT Scan */}
        <div className={`scrolly-scene ${activeStep === 0 ? "is-active" : ""}`}>
          <svg viewBox="30 22 300 225" className="scene-svg" aria-hidden="true">
            <defs>
              <linearGradient id="cbctGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#167ffc" />
                <stop offset="100%" stopColor="#7c66f0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
              <line x1="40" y1="60" x2="320" y2="60" />
              <line x1="40" y1="120" x2="320" y2="120" />
              <line x1="40" y1="180" x2="320" y2="180" />
              <line x1="40" y1="240" x2="320" y2="240" />
              <line x1="100" y1="30" x2="100" y2="250" />
              <line x1="180" y1="30" x2="180" y2="250" />
              <line x1="260" y1="30" x2="260" y2="250" />
            </g>
            {/* Jaw / bone contour */}
            <path
              d="M65,175 Q180,225 295,175"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Tooth silhouette */}
            <path
              d="M150,70 C140,70 132,84 138,108 L152,168 C156,184 166,184 170,165 L180,128 L190,165 C194,184 204,184 208,168 L222,108 C228,84 220,70 210,70 C198,70 190,82 180,82 C170,82 162,70 150,70 Z"
              fill="rgba(124,102,240,0.22)"
              stroke="url(#cbctGrad)"
              strokeWidth="3"
            />
            {/* Scan target crosshairs */}
            <circle cx="180" cy="128" r="54" fill="none" stroke="#5ef2b8" strokeWidth="1.5" strokeDasharray="5 5" className="spin-slow" />
            <rect x="75" y="45" width="210" height="3" rx="2" fill="#5ef2b8" className="cbct-beam" />
            <text x="50" y="42" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="700">КЛКТ 3D · 0.1 мм</text>
          </svg>
        </div>

        {/* Scene 1: 3D Digital Plan */}
        <div className={`scrolly-scene ${activeStep === 1 ? "is-active" : ""}`}>
          <svg viewBox="35 20 290 225" className="scene-svg" aria-hidden="true">
            <defs>
              <linearGradient id="planGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#167ffc" />
                <stop offset="100%" stopColor="#5ef2b8" />
              </linearGradient>
            </defs>
            {/* Axis lines */}
            <line x1="180" y1="24" x2="180" y2="256" stroke="#5ef2b8" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="50" y1="145" x2="310" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            {/* Planned crown wireframe */}
            <path
              d="M144,62 C134,62 128,82 135,108 C142,126 154,132 180,132 C206,132 218,126 225,108 C232,82 226,62 216,62 C202,62 192,72 180,72 C168,72 158,62 144,62 Z"
              fill="rgba(22,127,252,0.18)"
              stroke="url(#planGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              className="pulse-soft"
            />
            {/* Planned screw trajectory */}
            <rect x="166" y="142" width="28" height="78" rx="8" fill="none" stroke="#5ef2b8" strokeWidth="2.5" strokeDasharray="5 4" />
            <circle cx="180" cy="145" r="5" fill="#5ef2b8" />
            <text x="220" y="54" fill="#5ef2b8" fontSize="11" fontWeight="700">ИИ-модель 1:1</text>
            <text x="52" y="136" fill="rgba(255,255,255,0.72)" fontSize="11" fontWeight="600">Ось 90.0°</text>
          </svg>
        </div>

        {/* Scene 2: Implant Screwing In (logo-inspired) */}
        <div className={`scrolly-scene ${activeStep === 2 ? "is-active" : ""}`}>
          <svg viewBox="35 22 290 235" className="scene-svg" aria-hidden="true">
            <defs>
              <linearGradient id="impGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#167ffc" />
                <stop offset="100%" stopColor="#7c66f0" />
              </linearGradient>
            </defs>
            {/* Surgical 3D guide */}
            <path d="M90,140 L270,140" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" />
            <rect x="150" y="128" width="60" height="22" rx="6" fill="rgba(94,242,184,0.22)" stroke="#5ef2b8" strokeWidth="2" />
            {/* Bone bed */}
            <path d="M125,152 L235,152 L222,248 Q180,262 138,248 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            {/* Animated screwing implant */}
            <g className="implant-screw-anim">
              {/* Top platform */}
              <rect x="164" y="56" width="32" height="14" rx="4" fill="url(#impGrad)" />
              {/* Implant neck & body */}
              <path
                d="M167,70 L193,70 L189,154 Q180,164 171,154 Z"
                fill="url(#impGrad)"
              />
              {/* Screw threads */}
              <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
                <line x1="163" y1="84" x2="197" y2="79" />
                <line x1="164" y1="98" x2="196" y2="93" />
                <line x1="165" y1="112" x2="195" y2="107" />
                <line x1="166" y1="126" x2="194" y2="121" />
                <line x1="168" y1="140" x2="192" y2="135" />
              </g>
            </g>
            {/* Rotation arrows */}
            <path d="M132,84 C122,94 122,110 132,118" fill="none" stroke="#5ef2b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M228,84 C238,94 238,110 228,118" fill="none" stroke="#5ef2b8" strokeWidth="2" strokeLinecap="round" />
            <text x="52" y="42" fill="rgba(255,255,255,0.78)" fontSize="11" fontWeight="700">3D-шаблон + имплант</text>
          </svg>
        </div>

        {/* Scene 3: Crown Fixation & Guarantee */}
        <div className={`scrolly-scene ${activeStep === 3 ? "is-active" : ""}`}>
          <svg viewBox="45 25 270 225" className="scene-svg" aria-hidden="true">
            <defs>
              <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d8d4ff" />
              </linearGradient>
              <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#167ffc" />
                <stop offset="100%" stopColor="#7c66f0" />
              </linearGradient>
            </defs>
            {/* Gum / bone */}
            <path d="M75,148 Q180,136 285,148 L285,250 L75,250 Z" fill="rgba(255,255,255,0.06)" />
            {/* Seated implant */}
            <path d="M167,144 L193,144 L189,226 Q180,236 171,226 Z" fill="url(#baseGrad)" />
            <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85">
              <line x1="164" y1="160" x2="196" y2="155" />
              <line x1="165" y1="176" x2="195" y2="171" />
              <line x1="166" y1="192" x2="194" y2="187" />
              <line x1="168" y1="208" x2="192" y2="203" />
            </g>
            {/* Abutment */}
            <rect x="171" y="124" width="18" height="22" rx="3" fill="#5ef2b8" />
            {/* Animated lowering crown */}
            <g className="crown-seat-anim">
              <path
                d="M142,48 C130,48 124,74 134,106 C142,126 156,132 180,132 C204,132 218,126 226,106 C236,74 230,48 218,48 C203,48 193,59 180,59 C167,59 157,48 142,48 Z"
                fill="url(#crownGrad)"
                stroke="#7c66f0"
                strokeWidth="2.5"
              />
            </g>
            {/* Sparkles */}
            <circle cx="246" cy="58" r="4" fill="#5ef2b8" className="pulse-soft" />
            <circle cx="116" cy="66" r="3" fill="#ffffff" className="pulse-soft" />
          </svg>
          <div className="stage-guarantee">
            <FiShield />
            <span>Плановое наблюдение и контроль прикуса</span>
          </div>
        </div>

        <div className="scrolly-progress">
          {STEPS.map((s, idx) => (
            <span
              key={s.num}
              className={`scrolly-dot ${activeStep === idx ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TreatmentSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    let rafId = 0;

    const pickClosestStep = () => {
      const els = stepRefs.current;
      if (!els.length) return;

      const isMobile = window.innerWidth <= 991;
      const focusY = window.innerHeight * (isMobile ? 0.62 : 0.46);

      let bestIdx = 0;
      let bestDist = Infinity;

      els.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveStep((prev) => (prev === bestIdx ? prev : bestIdx));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(pickClosestStep);
    };

    pickClosestStep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSelectStep = (idx) => {
    setActiveStep(idx);
    const el = stepRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="steps-section pt-100 pb-70">
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Понятный процесс"
            title="Как проходит лечение"
            description="Листайте вниз — каждый этап наглядно показан на интерактивной схеме"
          />
        </Reveal>

        <div className="scrolly-layout">
          <div className="scrolly-sticky-col">
            <StepScene activeStep={activeStep} />
          </div>

          <div className="scrolly-steps-col">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  data-step-index={idx}
                  className={`scrolly-step-card ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSelectStep(idx)}
                >
                  <div className="step-card-top">
                    <span className="step-number">{step.num}</span>
                    <span className="step-tag">{step.badge}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <ul className="step-points">
                    {step.points.map((pt) => (
                      <li key={pt}>
                        <FiCheckCircle aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSteps;
