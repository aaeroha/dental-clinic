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

  // Phase 1 (0 -> 0.68): Implant (shunt + abutment pin) starts high above gum and screws down into bone
  const screwPhase = Math.min(1, progress / 0.68);
  const screwY = -24 + screwPhase * 28;
  const screwTilt =
    screwPhase < 1 ? Math.sin(screwPhase * Math.PI * 8) * 7 : 0;

  // Phase 2 (0.55 -> 1.0): Larger crown descends onto the abutment pin and seats flush on the implant
  const crownPhase = Math.max(0, Math.min(1, (progress - 0.55) / 0.42));
  const crownY = -22 + crownPhase * 27.5;

  return (
    <button
      type="button"
      className={`implant-scroll-widget ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Прокрутить страницу наверх"
      title={`Прогресс: ${Math.round(progress * 100)}% — Наверх`}
    >
      <svg
        viewBox="0 0 64 104"
        className="implant-widget-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="widgetImpGrad"
            x1="14"
            y1="8"
            x2="50"
            y2="94"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#167ffc" />
            <stop offset="100%" stopColor="#583FBC" />
          </linearGradient>
        </defs>

        {/* Gum / bone support line */}
        <path
          d="M9,62 Q32,55 55,62"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeOpacity="0.38"
          strokeLinecap="round"
        />

        {/* Threaded implant body (shunt) + abutment pin ("штырёк") */}
        <g
          style={{
            transform: `translateY(${screwY.toFixed(1)}px) rotate(${screwTilt.toFixed(1)}deg)`,
            transformOrigin: "32px 70px",
          }}
        >
          {/* Abutment pin on top of the shunt */}
          <rect
            x="27"
            y="43"
            width="10"
            height="12"
            rx="2.5"
            fill="#5ef2b8"
          />
          <path
            d="M23,54 L41,54 L37,86 Q32,92 27,86 Z"
            fill="url(#widgetImpGrad)"
          />
          <g
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
          >
            <line x1="22" y1="62" x2="42" y2="60" />
            <line x1="23" y1="69" x2="41" y2="67" />
            <line x1="24" y1="76" x2="40" y2="74" />
            <line x1="26" y1="83" x2="38" y2="81" />
          </g>
        </g>

        {/* Larger crown silhouette descending over the abutment pin onto the implant */}
        <g
          style={{
            transform: `translateY(${crownY.toFixed(1)}px)`,
            opacity: 0.25 + crownPhase * 0.75,
          }}
        >
          <path
            d="M17,22 C12,22 10,33 14,44 C16.5,50.5 21.5,53 32,53 C42.5,53 47.5,50.5 50,44 C54,33 52,22 47,22 C41.5,22 37,27 32,27 C27,27 22.5,22 17,22 Z"
            fill="url(#widgetImpGrad)"
            stroke="#ffffff"
            strokeWidth="1.8"
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
