import React, { useEffect, useState } from "react";
import "./ImplantScrollWidget.scss";
import { FiArrowUp } from "react-icons/fi";

const ImplantScrollWidget = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(ratio);
      setVisible(scrollTop > 260);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Screw starts slightly higher and seats neatly down to y=40..72 inside 0..84 viewBox
  const screwPhase = Math.min(1, progress / 0.75);
  const screwY = -6 + screwPhase * 10;
  const screwTilt = Math.sin(screwPhase * Math.PI * 6) * 3.5;

  // Crown descends from y=4 down onto implant top cleanly inside viewBox
  const crownPhase = Math.max(0, Math.min(1, (progress - 0.55) / 0.4));
  const crownY = -4 + crownPhase * 8;

  return (
    <button
      type="button"
      className={`implant-scroll-widget ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Прокрутить страницу наверх"
      title={`Прогресс: ${Math.round(progress * 100)}% — Наверх`}
    >
      <svg viewBox="0 0 64 84" className="implant-widget-svg" aria-hidden="true">
        <defs>
          <linearGradient id="widgetImpGrad" x1="14" y1="8" x2="50" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#167ffc" />
            <stop offset="100%" stopColor="#583FBC" />
          </linearGradient>
        </defs>

        {/* Gum / bone support line */}
        <path
          d="M10,44 Q32,38 54,44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeOpacity="0.32"
          strokeLinecap="round"
        />

        {/* Threaded implant body driving into bone */}
        <g
          style={{
            transform: `translateY(${screwY.toFixed(1)}px) rotate(${screwTilt.toFixed(1)}deg)`,
            transformOrigin: "32px 54px",
          }}
        >
          <path
            d="M23,38 L41,38 L37,68 Q32,74 27,68 Z"
            fill="url(#widgetImpGrad)"
          />
          <g stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" opacity="0.92">
            <line x1="22" y1="45" x2="42" y2="43" />
            <line x1="23" y1="52" x2="41" y2="50" />
            <line x1="24" y1="59" x2="40" y2="57" />
            <line x1="26" y1="65" x2="38" y2="63" />
          </g>
        </g>

        {/* Crown silhouette seating on top */}
        <g
          style={{
            transform: `translateY(${crownY.toFixed(1)}px)`,
            opacity: 0.4 + crownPhase * 0.6,
          }}
        >
          <path
            d="M20,14 C16,14 14,22 17,30 C19,35 23,37 32,37 C41,37 45,35 47,30 C50,22 48,14 44,14 C40,14 36,18 32,18 C28,18 24,14 20,14 Z"
            fill="url(#widgetImpGrad)"
            stroke="#ffffff"
            strokeWidth="1.6"
          />
        </g>
      </svg>

      <span className="implant-widget-meta">
        <FiArrowUp className="implant-widget-arrow" />
        <span>{Math.round(progress * 100)}%</span>
      </span>
    </button>
  );
};

export default ImplantScrollWidget;
