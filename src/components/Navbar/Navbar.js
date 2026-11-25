import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import logo from "./../../assets/logo2.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { trackGoal } from "../../utils/metrika";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    toggleTheme();
    trackGoal("toggle_theme", { theme: next });
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleFocusIn = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [menuOpen]);

  const scrollToSection = (id, block = "start") => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block });
      }, 150);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block });
    }
  };

  const navbarItems = [
    { name: "О враче", path: "about", block: "start" },
    { name: "Технологии", path: "emergency", block: "start" },
    { name: "Работы", path: "portfolio", block: "start" },
    { name: "Отзывы", path: "testimonail", block: "start" },
    { name: "Вопросы", path: "faq", block: "start" },
    { name: "Контакты", path: "footer", block: "end" },
  ];

  return (
    <header className="main-nav" ref={navContainerRef}>
      <div className="container">
        <nav className="navbar navbar-expand-lg" aria-label="Навигация по сайту">
          <div className="container-fluid px-0">
            <Link className="navbar-brand" to="/" onClick={() => setMenuOpen(false)}>
              <img src={logo} alt="Dr. Bochenkov логотип" width="46" height="46" />
              <span className="brand-text">Dr. Bochenkov</span>
            </Link>

            <div className="nav-mobile-controls d-flex align-items-center gap-2 d-lg-none">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={handleToggleTheme}
                aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
                title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
              <button
                className="navbar-toggler"
                type="button"
                aria-controls="navbarSupportedContent"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>

            <div
              className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {navbarItems.map((navSingle) => (
                  <li className="nav-item" key={navSingle.name}>
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => scrollToSection(navSingle.path, navSingle.block)}
                    >
                      {navSingle.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="nav-actions">
                <button
                  type="button"
                  className="theme-toggle-btn d-none d-lg-inline-flex"
                  onClick={handleToggleTheme}
                  aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
                  title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
                <button
                  type="button"
                  className="theme-btn nav-cta-btn"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking({ source: "navbar" });
                  }}
                >
                  Запись на приём
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
