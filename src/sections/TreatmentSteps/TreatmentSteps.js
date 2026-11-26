import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./TreatmentSteps.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { FiCheckCircle } from "react-icons/fi";

const TreatmentSteps3D = lazy(() =>
  import("../../components/Implant3D/TreatmentSteps3D")
);

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

        <Suspense
          fallback={
            <div className="steps-3d-fallback">Загрузка 3D-сцены...</div>
          }
        >
          <TreatmentSteps3D activeStep={activeStep} />
        </Suspense>

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
            description="Листайте вниз — каждый этап наглядно показан на интерактивной 3D-модели"
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
