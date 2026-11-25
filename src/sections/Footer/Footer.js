import React from "react";
import logo from "../../assets/logo2.svg";
import "./Footer.scss";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import call from "../../assets/footer/calling.png";
import time from "../../assets/footer/time.png";
import location from "../../assets/footer/location.png";
import { trackGoal } from "../../utils/metrika";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerContacts = [
    { id: 1, title: "Номер телефона", info: "8 (915) 202-38-88", icon: call },
    { id: 2, title: "Режим работы", info: "По предварительной записи", icon: time },
    {
      id: 3,
      title: "Адрес приёма",
      info: "Москва, улица Обручева, 34/63с1, офис №21",
      icon: location,
    },
  ];

  return (
    <footer id="footer" className="pt-30 pb-30">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-5">
            <div className="footer-logo">
              <img
                src={logo}
                alt="Dr. Bochenkov логотип"
                width="52"
                height="52"
                loading="lazy"
              />
              <h5 className="brand-text">Dr. Bochenkov</h5>
            </div>
            <p>
              Стоматолог-хирург, имплантолог, ортопед Боченков Роман Викторович.
              Профессионализм, достойный вашего доверия.
            </p>
            <div className="social-logo">
              <p>Связь со мной</p>
              <ul>
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=79152023888&text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F+%D0%BD%D0%B0+%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%21&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Написать в WhatsApp"
                    onClick={() => trackGoal("click_whatsapp", { source: "footer" })}
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/DrBochenkov"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Написать в Telegram"
                    onClick={() => trackGoal("click_telegram", { source: "footer" })}
                  >
                    <FaTelegram size={24} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 col-md-6">
            <div className="footer-contact">
              <p>Контактная информация</p>

              {footerContacts.map((footerContact) => {
                return (
                  <div className="contact-list" key={footerContact.id}>
                    <div className="contact-icon">
                      <img
                        src={footerContact.icon}
                        alt=""
                        width="20"
                        height="20"
                        loading="lazy"
                      />
                    </div>
                    <div className="contact-text">
                      <p>{footerContact.title}</p>
                      {footerContact.id === 1 ? (
                        <h5>
                          <a
                            href="tel:+79152023888"
                            className="footer-phone-link"
                            onClick={() => trackGoal("click_phone", { source: "footer" })}
                          >
                            {footerContact.info}
                          </a>
                        </h5>
                      ) : (
                        <h5>{footerContact.info}</h5>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="copy-text">
            <p>&copy; 2009–{currentYear} Боченков Роман Викторович</p>
            <p className="medical-disclaimer">
              Имеются противопоказания. Необходима консультация специалиста.
            </p>
          </div>
          <div className="copy-links">
            <Link to="/cookie-agreement">
              Политика конфиденциальности и cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
