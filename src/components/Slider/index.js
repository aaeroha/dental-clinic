import React from "react";
import after1 from "../../assets/banner/work/after1.jpg";
import after2 from "../../assets/banner/work/after2.jpg";
import after3 from "../../assets/banner/work/after3.jpg";
import after4 from "../../assets/banner/work/after4.jpg";
import after5 from "../../assets/banner/work/after5.jpg";
import after6 from "../../assets/banner/work/after6.jpg";
import before1 from "../../assets/banner/work/before1.jpg";
import before2 from "../../assets/banner/work/before2.jpg";
import before3 from "../../assets/banner/work/before3.jpg";
import before4 from "../../assets/banner/work/before4.jpg";
import before5 from "../../assets/banner/work/before5.jpg";
import before6 from "../../assets/banner/work/before6.jpg";
import "./index.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { Swiper, SwiperSlide } from "swiper/react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
const images = [
  { before: before1, after: after1 },
  { before: before2, after: after2 },
  { before: before3, after: after3 },
  { before: before4, after: after4 },
  { before: before5, after: after5 },
  { before: before6, after: after6 },
];
function Slider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1400, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  const delimiterIconStyles = {
    width: "50px",
    height: "50px",
    backgroundSize: "cover",
    borderRadius: "none",
    backgroundImage: "url(<some-path-here>)",
  };
  return (
    <div className="slider">
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        infinite={true}
        showDots={true}
      >
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <ReactBeforeSliderComponent
              firstImage={{ imageUrl: image.before }}
              secondImage={{ imageUrl: image.after }}
              delimiterColor="#583FBC"
              currentPercentPosition={50}
              delimiterIconStyles={delimiterIconStyles}
            />
          </div>
        ))}
      </Carousel>
      {/* <Swiper spaceBetween={50} slidesPerView={1} infinite={true}>
        {images.map((image, index) => (
          <SwiperSlide key={index} className="slider-item">
            <ReactBeforeSliderComponent
              firstImage={{ imageUrl: image.before }}
              secondImage={{ imageUrl: image.after }}
              delimiterColor="#583FBC"
              currentPercentPosition={50}
              delimiterIconStyles={delimiterIconStyles}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}

export default Slider;
