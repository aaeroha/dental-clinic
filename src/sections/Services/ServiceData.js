import React from "react";

function SmileAnimSvg() {
  return (
    <svg viewBox="0 0 40 40" className="sol-svg sol-svg--smile" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="#ffd166" stroke="#fff3b0" strokeWidth="1.5" />
      <circle cx="14.5" cy="16" r="2.2" fill="#181945" className="smile-eye smile-eye--l" />
      <circle cx="25.5" cy="16" r="2.2" fill="#181945" className="smile-eye smile-eye--r" />
      <path
        d="M12.5,22.5 Q20,30.5 27.5,22.5"
        fill="none"
        stroke="#181945"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="smile-mouth"
      />
      <path
        d="M14.5,24 Q20,28.5 25.5,24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="smile-teeth"
      />
    </svg>
  );
}

function ShieldShineSvg() {
  return (
    <svg viewBox="0 0 40 40" className="sol-svg sol-svg--shield" aria-hidden="true">
      <defs>
        <clipPath id="solShieldClip">
          <path d="M20,4 L33,9.5 V19.5 C33,27.5 27.3,33.6 20,36 C12.7,33.6 7,27.5 7,19.5 V9.5 Z" />
        </clipPath>
        <linearGradient id="solShieldGrad" x1="7" y1="4" x2="33" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4cc9f0" />
          <stop offset="100%" stopColor="#4361ee" />
        </linearGradient>
      </defs>
      <path
        d="M20,4 L33,9.5 V19.5 C33,27.5 27.3,33.6 20,36 C12.7,33.6 7,27.5 7,19.5 V9.5 Z"
        fill="url(#solShieldGrad)"
        stroke="#e0f7ff"
        strokeWidth="1.5"
      />
      <g clipPath="url(#solShieldClip)">
        <rect
          x="-24"
          y="0"
          width="14"
          height="46"
          fill="#ffffff"
          opacity="0.45"
          transform="rotate(22 20 20)"
          className="shield-shine-bar"
        />
      </g>
      <path
        d="M15,20 L18.5,23.5 L25.5,16.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToothSparkSvg() {
  return (
    <svg viewBox="0 0 40 40" className="sol-svg sol-svg--tooth" aria-hidden="true">
      <path
        d="M13,7 C9,7 7,11.5 8.5,17.5 L12.5,31.5 C13.5,35 16.5,34.5 17.5,30 L20,22 L22.5,30 C23.5,34.5 26.5,35 27.5,31.5 L31.5,17.5 C33,11.5 31,7 27,7 C23.8,7 22,9.5 20,9.5 C18,9.5 16.2,7 13,7 Z"
        fill="#ffffff"
        stroke="#7c66f0"
        strokeWidth="1.8"
        strokeLinejoin="round"
        className="tooth-body"
      />
      <path
        d="M31,7 L32.2,10.2 L35.5,11.5 L32.2,12.8 L31,16 L29.8,12.8 L26.5,11.5 L29.8,10.2 Z"
        fill="#5ef2b8"
        className="tooth-spark"
      />
    </svg>
  );
}

function ChatTypingSvg() {
  return (
    <svg viewBox="0 0 40 40" className="sol-svg sol-svg--chat" aria-hidden="true">
      {/* Secondary bubble */}
      <g className="chat-bubble-back">
        <path
          d="M16,7 H32 A4,4 0 0 1 36,11 V20 A4,4 0 0 1 32,24 H28 L29,28 L23,24 H16 A4,4 0 0 1 12,20 V11 A4,4 0 0 1 16,7 Z"
          fill="#4cc9f0"
          opacity="0.88"
        />
      </g>
      {/* Primary bubble */}
      <g className="chat-bubble-front">
        <path
          d="M8,13 H26 A4,4 0 0 1 30,17 V26 A4,4 0 0 1 26,30 H14 L9,34 L10,30 H8 A4,4 0 0 1 4,26 V17 A4,4 0 0 1 8,13 Z"
          fill="#ffffff"
          stroke="#7c66f0"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="21.5" r="2" fill="#583FBC" className="chat-dot chat-dot--1" />
        <circle cx="17" cy="21.5" r="2" fill="#583FBC" className="chat-dot chat-dot--2" />
        <circle cx="22" cy="21.5" r="2" fill="#583FBC" className="chat-dot chat-dot--3" />
      </g>
    </svg>
  );
}

const ServicesData = [
  {
    id: 1,
    icon: <SmileAnimSvg />,
    tag: "Эстетика за 1 день",
    shortTitle: "Боюсь остаться без зуба в зоне улыбки",
    title: "Страх остаться без зубов в эстетически значимой зоне?",
    description:
      "Временные коронки, изготовленные по 3D-модели ещё до операции, полностью решают эту проблему. Сразу после удаления и установки имплантата вы выходите из кабинета с красивой улыбкой.",
    benefits: [
      "Временная коронка фиксируется в день операции",
      "Естественный оттенок и форма под ваши зубы",
      "Комфортное общение без стеснения на период приживления",
    ],
    whatsappMessage:
      "Здравствуйте! Интересует имплантация в зоне улыбки с временной коронкой в день операции.",
  },
  {
    id: 2,
    icon: <ShieldShineSvg />,
    tag: "Несъёмное протезирование",
    shortTitle: "Неудобно носить съёмный протез",
    title: "Дискомфортно использовать съёмные протезы?",
    description:
      "Несъёмные конструкции, отфрезерованные из диоксида циркония или композита с опорой на 4 или 6 имплантатов, надёжно фиксируются и возвращают ощущение собственных зубов.",
    benefits: [
      "Протез не натирает и не выпадает при разговоре и еде",
      "Полное восстановление жевательной функции",
      "Точное цифровое фрезерование по 3D-скану",
    ],
    whatsappMessage:
      "Здравствуйте! Хочу узнать подробнее о несъёмном протезировании на 4 или 6 имплантатах.",
  },
  {
    id: 3,
    icon: <ToothSparkSvg />,
    tag: "1 визит вместо 2 этапов",
    shortTitle: "Нужно удалить зуб и поставить имплант",
    title: "Имплантация одномоментно с удалением зуба",
    description:
      "Высокотехнологичный дизайн современных имплантатов позволяет получить отличную первичную стабильность сразу после удаления зуба, даже в условиях дефицита костной ткани.",
    benefits: [
      "Меньше хирургических вмешательств и анестезий",
      "Атрофия костной ткани заметно ниже, чем при двухэтапном протоколе",
      "Сохранение естественного контура десны",
    ],
    whatsappMessage:
      "Здравствуйте! Интересует одномоментная имплантация сразу после удаления зуба.",
  },
  {
    id: 4,
    icon: <ChatTypingSvg />,
    tag: "Персональный план",
    shortTitle: "Нужна диагностика и честная смета",
    title: "Остались вопросы по вашему клиническому случаю?",
    description:
      "На очной консультации разберём снимки КЛКТ, подберём оптимальную методику под ваш бюджет и составим пошаговый план лечения без навязывания лишних процедур.",
    benefits: [
      "Прозрачная стоимость и сроки до начала лечения",
      "Разбор нескольких вариантов восстановления",
      "Личный контроль врача от диагностики до результата",
    ],
    whatsappMessage:
      "Здравствуйте! Хочу записаться на консультацию и составить план лечения.",
  },
];

export default ServicesData;
