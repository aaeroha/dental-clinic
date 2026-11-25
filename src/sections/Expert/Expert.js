import React from "react";
import "./Expert.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Slider from "../../components/Slider/index";
import Reveal from "../../components/Reveal/Reveal";

const SMILES_BG = [
  { top: "6%", left: "4%", size: 112, delay: "0s", rotate: "-10deg" },
  { top: "10%", right: "6%", size: 130, delay: "-2.2s", rotate: "12deg" },
  { top: "42%", left: "1%", size: 90, delay: "-4.1s", rotate: "8deg" },
  { top: "46%", right: "2%", size: 100, delay: "-1.3s", rotate: "-14deg" },
  { bottom: "4%", left: "14%", size: 116, delay: "-3.4s", rotate: "7deg" },
  { bottom: "6%", right: "14%", size: 98, delay: "-5.2s", rotate: "-9deg" },
];

function SmileSvg({ uid }) {
  return (
    <svg viewBox="0 0 220 120" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={`mouthClip-${uid}`}>
          <path d="M22,52 Q110,40 198,52 Q178,86 110,88 Q42,86 22,52 Z" />
        </clipPath>
        <linearGradient id={`lipGrad-${uid}`} x1="0" y1="22" x2="220" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#167ffc" />
          <stop offset="100%" stopColor="#7c66f0" />
        </linearGradient>
      </defs>

      {/* Inner mouth cavity in deep indigo */}
      <path
        d="M16,50 Q110,36 204,50 Q180,92 110,94 Q40,92 16,50 Z"
        fill="currentColor"
        fillOpacity="0.24"
      />

      {/* Upper & Lower teeth clipped inside mouth */}
      <g clipPath={`url(#mouthClip-${uid})`}>
        {/* Upper Teeth */}
        <g fill="#ffffff" fillOpacity="0.88" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5">
          <rect x="86" y="45" width="23" height="24" rx="6" />
          <rect x="111" y="45" width="23" height="24" rx="6" />
          <rect x="65" y="44" width="19" height="22" rx="6" />
          <rect x="136" y="44" width="19" height="22" rx="6" />
          <rect x="47" y="44" width="16" height="21" rx="6" />
          <rect x="157" y="44" width="16" height="21" rx="6" />
          <rect x="31" y="44" width="14" height="19" rx="5" />
          <rect x="175" y="44" width="14" height="19" rx="5" />
        </g>

        {/* Lower Teeth */}
        <g fill="#ffffff" fillOpacity="0.72" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.4">
          <rect x="93" y="69" width="16" height="16" rx="5" />
          <rect x="111" y="69" width="16" height="16" rx="5" />
          <rect x="75" y="68" width="16" height="16" rx="5" />
          <rect x="129" y="68" width="16" height="16" rx="5" />
          <rect x="58" y="67" width="15" height="16" rx="5" />
          <rect x="147" y="67" width="15" height="16" rx="5" />
          <rect x="42" y="65" width="14" height="15" rx="4" />
          <rect x="164" y="65" width="14" height="15" rx="4" />
        </g>
      </g>

      {/* Upper Lip in site accent gradient */}
      <path
        d="M8,49 C36,42 70,22 92,26 C100,28 106,33 110,33 C114,33 120,28 128,26 C150,22 184,42 212,49 C182,53 148,47 110,47 C72,47 38,53 8,49 Z"
        fill={`url(#lipGrad-${uid})`}
        fillOpacity="0.65"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />

      {/* Lower Lip in site accent gradient */}
      <path
        d="M8,49 C38,53 72,85 110,85 C148,85 182,53 212,49 C190,82 156,105 110,105 C64,105 30,82 8,49 Z"
        fill={`url(#lipGrad-${uid})`}
        fillOpacity="0.52"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const Expert = () => {
  return (
    <section id="portfolio" className="expert-section">
      <div className="smiles-bg" aria-hidden="true">
        {SMILES_BG.map((item, idx) => (
          <span
            key={idx}
            className="smile-bg-item"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              width: `${item.size}px`,
              animationDelay: item.delay,
              "--smile-rotate": item.rotate,
            }}
          >
            <SmileSvg uid={idx} />
          </span>
        ))}
      </div>
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Портфолио"
            title="Примеры работ «До и После»"
            description="Потяните ползунок влево или вправо на любой карточке, чтобы сравнить исходную ситуацию и результат лечения."
          />
        </Reveal>
        <Reveal delay={100}>
          <Slider />
        </Reveal>
      </div>
    </section>
  );
};

export default Expert;
