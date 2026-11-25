import React, { createContext, useContext, useEffect, useState } from "react";
import { FaWhatsapp, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { trackGoal } from "../utils/metrika";
import "./BookingModal.scss";

const BookingContext = createContext({
  openBooking: () => {},
});

const DEFAULT_MESSAGE = "Здравствуйте! Хочу записаться на приём к доктору Боченкову.";

export function BookingProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: DEFAULT_MESSAGE,
    source: "general",
  });

  const openBooking = ({ message = DEFAULT_MESSAGE, source = "general" } = {}) => {
    setModalState({ isOpen: true, message, source });
    trackGoal("open_booking_modal", { source });
  };

  const closeBooking = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (!modalState.isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalState.isOpen]);

  const encodedText = encodeURIComponent(modalState.message);
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=79152023888&text=${encodedText}&type=phone_number&app_absent=0`;
  const telegramUrl = `https://t.me/DrBochenkov?text=${encodedText}`;

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}

      {modalState.isOpen && (
        <div
          className="app-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Выбор способа записи на приём"
          onClick={closeBooking}
        >
          <div
            className="app-modal-window booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-modal-close"
              onClick={closeBooking}
              aria-label="Закрыть окно"
            >
              <FiX />
            </button>

            <div className="booking-modal-head">
              <span className="booking-modal-pill">Удобная запись</span>
              <h3>Выберите, где вам удобнее общаться</h3>
              <p>
                Сообщение подставится автоматически — вам останется только
                нажать «Отправить».
              </p>
            </div>

            <div className="booking-options">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="booking-option booking-option--wa"
                onClick={() => {
                  trackGoal("click_whatsapp", { source: modalState.source });
                  closeBooking();
                }}
              >
                <span className="booking-option-icon" aria-hidden="true">
                  <FaWhatsapp />
                </span>
                <span className="booking-option-info">
                  <strong>WhatsApp</strong>
                  <span>Быстрый ответ и отправка снимков</span>
                </span>
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="booking-option booking-option--tg"
                onClick={() => {
                  trackGoal("click_telegram", { source: modalState.source });
                  closeBooking();
                }}
              >
                <span className="booking-option-icon" aria-hidden="true">
                  <FaTelegramPlane />
                </span>
                <span className="booking-option-info">
                  <strong>Telegram (@DrBochenkov)</strong>
                  <span>Удобная переписка в мессенджере</span>
                </span>
              </a>

              <a
                href="tel:+79152023888"
                className="booking-option booking-option--phone"
                onClick={() => {
                  trackGoal("click_phone", { source: modalState.source });
                  closeBooking();
                }}
              >
                <span className="booking-option-icon" aria-hidden="true">
                  <FaPhoneAlt />
                </span>
                <span className="booking-option-info">
                  <strong>Позвонить: 8 (915) 202-38-88</strong>
                  <span>Живая консультация по телефону</span>
                </span>
              </a>
            </div>

            <div className="booking-modal-meta">
              <span>
                <FiMapPin aria-hidden="true" /> м. Калужская, ул. Обручева, 34/63с1
              </span>
              <span>
                <FiClock aria-hidden="true" /> По предварительной записи
              </span>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
