import React, { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../sections/Banner/Banner";
import Emergency from "../sections/Emergency/Emergency";
import Footer from "../sections/Footer/Footer";
import Services from "../sections/Services/Services";
import Testimonial from "../sections/Testimonial/Testimonial";

const LazyExpert = React.lazy(() => import("../sections/Expert/Expert"));
const LazySertificates = React.lazy(() => import("../sections/Sertificates/"));
const LazyAppointment = React.lazy(() =>
  import("../sections/Appointment/Appointment")
);

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Emergency />
      <Services />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyExpert />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySertificates />
      </Suspense>
      <Testimonial />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAppointment />
      </Suspense>
      <Footer />
    </>
  );
};

export default Home;
