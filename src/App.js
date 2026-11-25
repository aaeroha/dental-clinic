import "./App.scss";
import Home from "./pages/Home";
import Cookie from "./pages/Cookie";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cookie-agreement" element={<Cookie />} />
        </Routes>
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;
