import React from "react";
import "./Navbar.scss";
import logo from "./../../assets/logo2.svg";
import { Link } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";

const Navbar = () => {
  const navbarItems = [
    {
      name: "Главная",
      path: "header",
      function: () => {
        const footerElement = document.getElementById("header");
        if (footerElement) {
          footerElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      },
    },
    {
      name: "Отзывы",
      path: "testimonail",
      function: () => {
        const footerElement = document.getElementById("testimonail");
        if (footerElement) {
          footerElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      },
    },
    {
      name: "Портфолио",
      path: "portfolio",
      function: () => {
        const footerElement = document.getElementById("portfolio");
        if (footerElement) {
          footerElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      },
    },
    {
      name: "Карта",
      path: "map",
      function: () => {
        const footerElement = document.getElementById("map");
        if (footerElement) {
          footerElement.scrollIntoView({
            behavior: "auto",
            block: "nearest",
          });
        }
      },
    },
    {
      name: "Контакты",
      path: "footer",
      function: () => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
          footerElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      },
    },
  ];

  return (
    <div className="main-nav">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            {/* Logo */}
            <Link className="navbar-brand">
              <img src={logo} alt="logo" />
              <h5 className="brand-text">Dr. Bochenkov</h5>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Navbar Link */}
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                {navbarItems.map((navSingle) => (
                  <li className="nav-item" key={navSingle.name}>
                    <button className="nav-link" onClick={navSingle.function}>
                      {navSingle.name}
                    </button>
                  </li>
                ))}
              </ul>
              <ReactWhatsapp
                className="theme-btn"
                number="+79152023888"
                message="Хочу записатьcя на прием!"
              >
                Запись на прием
              </ReactWhatsapp>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
