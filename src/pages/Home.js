import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../sections/Banner/Banner";
import DoctorAdvantages from "../sections/DoctorAdvantages/DoctorAdvantages";
import Emergency from "../sections/Emergency/Emergency";
import Footer from "../sections/Footer/Footer";
import Services from "../sections/Services/Services";
import TreatmentSteps from "../sections/TreatmentSteps/TreatmentSteps";
import Expert from "../sections/Expert/Expert";
import Sertificates from "../sections/Sertificates/";
import Testimonial from "../sections/Testimonial/Testimonial";
import Faq from "../sections/Faq/Faq";
import Appointment from "../sections/Appointment/Appointment";
import { AiTwotoneWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCookie, setCookie, initYandexMetrika } from "../utils/metrika";
import ImplantScrollWidget from "../components/ImplantScrollWidget/ImplantScrollWidget";

const Home = () => {
  const [cookieStatus, setCookieStatus] = useState(() =>
    getCookie("cookie_consent")
  );

  useEffect(() => {
    if (cookieStatus === "accepted") {
      initYandexMetrika();
    }
  }, [cookieStatus]);

  const handleAcceptCookies = () => {
    setCookie("cookie_consent", "accepted", 365);
    setCookie("cookie_preferences", "necessary,analytics,marketing", 365);
    setCookieStatus("accepted");
    initYandexMetrika();
  };

  const handleDeclineCookies = () => {
    setCookie("cookie_consent", "declined", 30);
    setCookieStatus("declined");
  };

  const showCookieBanner = !cookieStatus;

  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <DoctorAdvantages />
        <Emergency />
        <Services />
        <TreatmentSteps />
        <Expert />
        <Sertificates />
        <Testimonial />
        <Faq />
        <Appointment />
      </main>

      {showCookieBanner && (
        <div
          className="cookies"
          role="dialog"
          aria-label="Уведомление об использовании cookie"
        >
          <div className="container-svg">
            <AiTwotoneWarning />
          </div>
          <div className="text">
            <h5>Этот сайт использует файлы cookie</h5>
            <p>
              Для улучшения работы сайта используются файлы cookie{" "}
              <Link to="/cookie-agreement">(подробнее)</Link>. Сервис аналитики
              Яндекс.Метрика запускается только после вашего согласия.
            </p>
            <div className="cookies-actions">
              <button
                type="button"
                className="theme-btn theme-btn--outline"
                onClick={handleDeclineCookies}
              >
                Отклонить
              </button>
              <button
                type="button"
                className="theme-btn"
                onClick={handleAcceptCookies}
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}
      <ImplantScrollWidget />
      <Footer />
    </>
  );
};

export default Home;
