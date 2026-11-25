import React, { useState } from "react";
import "./Faq.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Reveal from "../../components/Reveal/Reveal";
import { FiChevronDown } from "react-icons/fi";
import { trackGoal } from "../../utils/metrika";

export const FAQ_ITEMS = [
  {
    q: "Больно ли устанавливать зубной имплантат?",
    a: "Нет. Процедура проводится под современной местной анестезией, поэтому во время операции пациент чувствует только лёгкое прикосновение. При использовании 3D-шаблонов вмешательство минимально травматично, а восстановление проходит комфортно.",
  },
  {
    q: "Можно ли удалить зуб и сразу поставить имплантат с временной коронкой?",
    a: "Да, это одномоментная имплантация. Если нет острого воспаления и достаточно костной ткани, имплантат устанавливается сразу в лунку удалённого зуба, а при работе в зоне улыбки заранее изготавливается временная коронка — вы не останетесь без зуба.",
  },
  {
    q: "Зачем нужно 3D-сканирование и КЛКТ перед лечением?",
    a: "Конусно-лучевая томография (КЛКТ) и внутриротовой 3D-сканер позволяют увидеть анатомию с точностью до долей миллиметра, отказаться от неприятных слепков и заранее спрогнозировать результат и бюджет лечения.",
  },
  {
    q: "Сколько времени занимает полное приживление имплантата?",
    a: "В среднем остеоинтеграция занимает от 2 до 4 месяцев на нижней челюсти и 3–6 месяцев на верхней. Точные сроки врач определяет индивидуально после анализа КЛКТ.",
  },
  {
    q: "Как записаться на консультацию и что взять с собой?",
    a: "Вы можете написать в WhatsApp, Telegram или позвонить по номеру +7 (915) 202-38-88. Если у вас уже есть свежий снимок КЛКТ (до 6 месяцев), возьмите его с собой на диск или флешке.",
  },
];

const BG_QUESTIONS = [
  { top: "8%", right: "10%", size: 92, delay: "0s", duration: "6s", rotate: "14deg" },
  { top: "28%", right: "4%", size: 58, delay: "-1.5s", duration: "5.2s", rotate: "-18deg" },
  { top: "48%", right: "15%", size: 108, delay: "-3s", duration: "7.2s", rotate: "10deg" },
  { bottom: "16%", right: "6%", size: 74, delay: "-2.4s", duration: "5.8s", rotate: "-12deg" },
  { top: "14%", left: "3%", size: 52, delay: "-4s", duration: "6.4s", rotate: "-14deg" },
  { bottom: "10%", left: "5%", size: 64, delay: "-1s", duration: "6.8s", rotate: "16deg" },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    const next = openIndex === idx ? -1 : idx;
    setOpenIndex(next);
    if (next !== -1) {
      trackGoal("faq_open", { question: FAQ_ITEMS[idx].q });
    }
  };

  return (
    <section id="faq" className="faq-section pt-100 pb-70">
      <div className="faq-bg-marks" aria-hidden="true">
        {BG_QUESTIONS.map((item, idx) => (
          <span
            key={idx}
            className="faq-bg-mark"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              fontSize: `${item.size}px`,
              animationDelay: item.delay,
              animationDuration: item.duration,
              "--mark-rotate": item.rotate,
            }}
          >
            ?
          </span>
        ))}
      </div>
      <div className="container">
        <Reveal>
          <SectionTitle
            subTitle="Вопросы и ответы"
            title="Частые вопросы пациентов"
          />
        </Reveal>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={item.q} delay={idx * 60}>
                <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(idx)}
                  >
                    <span>{item.q}</span>
                    <FiChevronDown className="faq-chevron" aria-hidden="true" />
                  </button>
                  <div className="faq-answer-wrap">
                    <div className="faq-answer">{item.a}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
