import React from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";
import icon from "../../assets/banner/icons/Calling.png";
import bannerImg from "../../assets/banner/1.png";
import bannerPattern from "../../assets/banner/pattern_02.png";
import shapeOne from "../../assets/banner/vector_01.png";
import shapeTwo from "../../assets/banner/vector_02.png";
import shapeThree from "../../assets/banner/vector_03.png";
import shapeFour from "../../assets/banner/pattern.png";

const Banner = () => {
  return (
    <section className="section-bg section-common banner-section">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="banner-text"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <h1>Приветствую Вас!</h1>
                  <p className="light-text">
                    Меня зовут Боченков Роман Викторович
                    <br />Я врач-стоматолог, уже более 17 лет, веду
                    ортопедический и хирургический приемы.
                    <br />В практике для меня важно найти индивидуальный подход
                    к каждому пациенту и провести лечение по инновационным
                    протоколам.
                    <br />
                    Вам стоит обратиться ко мне! Давайте расскажу чуть
                    подробнее:
                  </p>

                  <div className="banner-bottom">
                    <div className="theme-btn">
                      <Link to="/contact">Запишитесь на консультацию</Link>
                    </div>
                    <a href="tel:89152023888" className="none-decor">
                      <div className="banner-call">
                        <div className="icon">
                          <img src={icon} alt="icon" />
                        </div>
                        <div className="call-text">
                          <p>Телефон для записи</p>

                          <h6>8(915)202-38-88</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div
                  className="banner-img-area"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="500"
                >
                  <div className="banner-img">
                    <img src={bannerImg} alt="banner model" />
                  </div>
                  <div className="info-box">
                    <div className="info-text">
                      <p>
                        20 лет я совершенствуюсь и развиваюсь, чтобы лечить!
                      </p>
                    </div>
                  </div>

                  {/* Vector Shapes */}
                  <div className="shapes">
                    <img src={shapeOne} alt="shape" className="swing" />
                    <img
                      src={shapeTwo}
                      alt="shape"
                      className="complex-motion-fast sphere"
                    />
                    <img
                      src={shapeThree}
                      alt="shape"
                      className="complex-motion-long sphere"
                    />
                    <img src={shapeFour} alt="shape" className="grow-shrink" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Pattern Vector*/}
      <img
        className="banner-pattern wave"
        src={bannerPattern}
        alt="banner pattern"
      />
    </section>
  );
};

export default Banner;
