import React from "react";
import logo from "../../assets/logo2.svg";
import "./Footer.scss";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import call from "../../assets/footer/calling.png";
import time from "../../assets/footer/time.png";
import location from "../../assets/footer/location.png";

const Footer = () => {
  const footerContacts = [
    { id: 1, title: "Номер телефона", info: "8(915)202-38-88", icon: call },
    { id: 2, title: "Режим работы", info: "По предварительной записи", icon: time },
    {
      id: 3,
      title: "Адрес",
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
              <img src={logo} alt="logo" />
              <h5 className="brand-text">Dr. Bochenkov</h5>
            </div>
            <p>Профессионализм достойный вашего доверия</p>
            <div className="social-logo">
              <p>Follow</p>
              <ul>
                <li>
                  <a href="https://api.whatsapp.com/send/?phone=79152023888&text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8Cc%D1%8F+%D0%BD%D0%B0+%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%21&type=phone_number&app_absent=0">
                    <FaWhatsapp size={40}/>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/DrBochenkov">
                    <FaTelegram size={40} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="footer-contact">
              <p>Контактная информация</p>

              {footerContacts.map((footerContact) => {
                return (
                  <div className="contact-list" key={footerContact.id}>
                    <div className="contact-icon">
                      <img src={footerContact.icon} alt="call" />
                    </div>
                    <div className="contact-text">
                      <p>{footerContact.title}</p>
                      <h5>{footerContact.info}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="copy-text">
            <p>&copy; Dr. Bochenkov Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
