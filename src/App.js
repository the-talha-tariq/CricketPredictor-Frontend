import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Predictions from "./pages/Predictions";
import About from "./pages/About";
import AllMatches from "./pages/AllMatches"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/about" element={<About />} />
            <Route path="/allMatches" element={<AllMatches />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
