import React from "react";
import "./index.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
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
        {[...Array(5)].map((el, index) => (
          <div key={index} className="slider-item">
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: require(`../../assets/banner/work/before${++index}.jpg`),
              }}
              secondImage={{
                imageUrl: require(`../../assets/banner/work/after${++index}.jpg`),
              }}
              delimiterColor="#583FBC"
              currentPercentPosition={50}
              delimiterIconStyles={delimiterIconStyles}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
