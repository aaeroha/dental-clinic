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
      const ratio =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(ratio);
      setVisible(scrollTop > 220);
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

  // Phase 1 (0 -> 0.68): Implant (shunt) starts high above gum (y=-26) and screws down 30px into bone (y=+4)
  const screwPhase = Math.min(1, progress / 0.68);
  const screwY = -26 + screwPhase * 30;
  const screwTilt =
    screwPhase < 1 ? Math.sin(screwPhase * Math.PI * 8) * 7 : 0;

  // Phase 2 (0.55 -> 1.0): Crown descends 24px from top onto the seated implant
  const crownPhase = Math.max(0, Math.min(1, (progress - 0.55) / 0.42));
  const crownY = -22 + crownPhase * 22;

  return (
    <button
      type="button"
      className={`implant-scroll-widget ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Прокрутить страницу наверх"
      title={`Прогресс: ${Math.round(progress * 100)}% — Наверх`}
    >
      <svg
        viewBox="0 0 64 102"
        className="implant-widget-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="widgetImpGrad"
            x1="14"
            y1="8"
            x2="50"
            y2="92"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#167ffc" />
            <stop offset="100%" stopColor="#583FBC" />
          </linearGradient>
        </defs>

        {/* Gum / bone support line */}
        <path
          d="M9,60 Q32,53 55,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeOpacity="0.38"
          strokeLinecap="round"
        />

        {/* Threaded implant body (shunt) starting higher above the gum and screwing down */}
        <g
          style={{
            transform: `translateY(${screwY.toFixed(1)}px) rotate(${screwTilt.toFixed(1)}deg)`,
            transformOrigin: "32px 68px",
          }}
        >
          <path
            d="M23,52 L41,52 L37,84 Q32,90 27,84 Z"
            fill="url(#widgetImpGrad)"
          />
          <g
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
          >
            <line x1="22" y1="60" x2="42" y2="58" />
            <line x1="23" y1="67" x2="41" y2="65" />
            <line x1="24" y1="74" x2="40" y2="72" />
            <line x1="26" y1="81" x2="38" y2="79" />
          </g>
        </g>

        {/* Crown silhouette descending onto the implant */}
        <g
          style={{
            transform: `translateY(${crownY.toFixed(1)}px)`,
            opacity: 0.25 + crownPhase * 0.75,
          }}
        >
          <path
            d="M20,27 C16,27 14,35 17,43 C19,48 23,51 32,51 C41,51 45,48 47,43 C50,35 48,27 44,27 C40,27 36,31 32,31 C28,31 24,27 20,27 Z"
            fill="url(#widgetImpGrad)"
            stroke="#ffffff"
            strokeWidth="1.7"
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
