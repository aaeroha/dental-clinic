import React from "react";
import "./TestimoniCard.scss";
import defaultAvatar from "../../assets/testimonial/user.png";

const TestimoniCard = ({ testimonail }) => {
  const { img, name, description, ratings } = testimonail;

  return (
    <div className="single-testimoni">
      <article className="testimonial-card">
        <div className="testimonial-img">
          <img
            src={img}
            alt={`Аватар пациента ${name}`}
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />
        </div>
        <div className="testimonial-text">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <ul
          className="testimonial-rating"
          aria-label={`Оценка ${ratings?.length || 5} из 5`}
        >
          {ratings?.map((rating, i) => (
            <li key={i}>{rating}</li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export default TestimoniCard;
