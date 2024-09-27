import React from "react";
import logo from "../../assets/logo2.svg";
import "./Footer.scss";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import call from "../../assets/footer/calling.png";
import time from "../../assets/footer/time.png";
import location from "../../assets/footer/location.png";

const Footer = () => {
  const footerMenu = [
    {
      name: "About Us",
      link: "/",
    },
    {
      name: "Dental Services",
      link: "/",
    },
    {
      name: "Dentist",
      link: "/",
    },
    {
      name: "FAQs",
      link: "/",
    },
  ];

  const footerContacts = [
    { id: 1, title: "Номер телефона", info: "8(915)202-38-88", icon: call },
    { id: 2, title: "Режим работы", info: "09:00 - 18:00", icon: time },
    {
      id: 3,
      title: "Адрес",
      info: "Москва, улица Обручева, 34/63с1, офис №21",
      icon: location,
    },
  ];

  return (
    <footer className="pt-30 pb-30">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-5">
            <div className="footer-logo">
              <img src={logo} alt="logo" />
              <h5 className="brand-text">Dr. Bochenkov</h5>
            </div>
            <p>
              Dental Care Seattle is a top-rated local practice for cosmetic,
              preventative, and restorative dentistry on First Hill
            </p>

            <div className="social-logo">
              <p>Follow us on</p>
              <ul>
                <li>
                  <a href="/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-2">
            {/* <div className="footer-link">
              <p>Quick Links</p>
              <ul>
                {footerMenu.map((singleMenu) => (
                  <li key={singleMenu.name}>
                    <Link to="/">{singleMenu.name}</Link>
                  </li>
                ))}
              </ul>
            </div> */}
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
