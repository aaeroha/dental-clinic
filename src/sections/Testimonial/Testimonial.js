import React from "react";
import "./Testimonial.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import img from "../../assets/testimonial/user.png";
import TestimoniCard from "../../components/TestimoniCard/TestimoniCard";
import Reveal from "../../components/Reveal/Reveal";
import { AiFillStar } from "react-icons/ai";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonails = [
    {
      id: 1,
      img: "https://avatars.mds.yandex.net/get-yapic/36777/KAEugzhz3z9vswDHg7p66SpiOL4-1/islands-68",
      name: "Ольга Митькевич",
      description:
        "Очень понравился хирург Боченков Роман Викторович. Справился грамотно с удалением сложного зуба мудрости. Был заботлив, вежлив и прислушивался к состоянию и просьбы пациента. Обслуживание отличное. Прошло 7 часов - никакой боли и отека. Надеюсь дальше будет также все хорошо.",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 2,
      img: img,
      name: "Анастасия Лазарева",
      description:
        "Ходим практически всей семьей к Боченкову Роману Викторовичу! Роман Викторович провел удаление сложных удалений детям и устанавливал винты для ортодонтии, золотые руки у него и очень деликатно и аккуратно все делает, дети его обожают, говорят совсем не больно! Полный восторг и максимальное доверие доктору❤️Ван лав ❤️",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 3,
      img: img,
      name: "Виктория Брикез",
      description:
        "Боченков Роман Викторович, отличный специалист, рекомендую его, если нужно протезирование. Все объяснит, предложит варианты, даст рекомендации. Качество работы всегда на высоте.",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 4,
      img: img,
      name: "Наталья Ф.",
      description:
        "Обратилась к Боченкову Роману Викторовичу по рекомендации, т. к. другой доктор не смог справиться с обычной вклейкой винира. Доктор Боченков подготовил винир, вычистил его, подготовил мой зуб и десну вокруг, и только потом вклеил винир на место. Работа идеальная! Почти месяц прошёл и всё держится прекрасно! Всех своих знакомых теперь отправляю только туда!",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 5,
      img: img,
      name: "Ольга Лудова",
      description:
        "Удаляла зубы и ставила импланты у Доктора Боченкова Романа Викторовича. (Слово «Доктор» с большой буквы написан умышленно, он знает свое дело, специалист своего дела). СПАСИБО ему БОЛЬШОЕ, а также персоналу клиники-вежливые, отзывчивые. Я радуюсь каждый день тому , что у меня зубы выросли новые. Спасибо еще раз!",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 6,
      img: img,
      name: "Сергей Ж",
      description:
        "Делюсь самыми лучшими впечатлениями от посещения клиники. Самые лучшие впечатления от работы врача Боченкова. В столь сложное время встретить профессионалов, людей разбирающихся в своей работе.. Это счастье. Очень доволен и ответственно рекомендую. Еще раз слова благодарности !",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 7,
      img: img,
      name: "Валерия Мамонова",
      description:
        "Лечусь у Боченкова Романа Викторовича. Профессионал своего дела. Удаление зуба и установка имплантата произведены оперативно и очень комфортно. Самые адекватные цены по району. И это при том, что сама работа врача гораздо лучше, чем в клиниках на районе. Проверено! Однозначно буду продолжать лечение и рекомендовать соседям и знакомым.",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
    {
      id: 8,
      img: img,
      name: "Андрей Шишкин",
      description:
        "Постоянный посетитель данного заведения. Замечательно место!! Отношение к клиентам на 5+. Особенная благодарность врачу Боченкову Роману Викторовичу. Сейчас редко встретишь культурного, внимательного к деталям и ВЫСОКОКВАЛИФИЦИРОВАННОГО специалиста своего дела, если нужно импланты только к нему, без вариантов. Спасибо всем за отличную работу.",
      ratings: [<AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />, <AiFillStar />],
    },
  ];

  return (
    <section
      id="testimonail"
      className="testimonail-section section-bg section-common pt-100 pb-70"
    >
      <div className="sound-waves-bg" aria-hidden="true">
        <div className="wave-emitter wave-emitter--1">
          <span />
          <span />
          <span />
        </div>
        <div className="wave-emitter wave-emitter--2">
          <span />
          <span />
          <span />
        </div>
        <div className="wave-emitter wave-emitter--3">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="container">
        <Reveal>
          <div className="row align-items-center mb-4">
            <div className="col-lg-5">
              <SectionTitle subTitle="Отзывы пациентов" title="Отзывы" />
            </div>
            <div className="col-lg-7">
              <p className="light-text testimonial-lead">
                Отзывы моих пациентов помогают мне постоянно совершенствоваться и
                предоставлять ещё более высокое качество стоматологической помощи.
              </p>
            </div>
          </div>
        </Reveal>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4200, disableOnInteraction: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonails.map((testimonail) => (
            <SwiperSlide key={testimonail.id}>
              <TestimoniCard testimonail={testimonail} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
