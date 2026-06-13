import LoginPanel from "./components/Login/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./components/Register/Register"
import Dealers from './components/Dealers/Dealers'
import Dealer from "./components/Dealers/Dealer"
import PostReview from "./components/Dealers/PostReview";
import Header from "./components/Header/Header";
import "./App.css";

const isLoggedIn = () => sessionStorage.getItem("username") != null;

const RequireAuth = ({ children }) => (
  isLoggedIn() ? children : <Navigate to="/login" replace />
);

const Home = () => {
  const loggedIn = isLoggedIn();

  return (
    <div className="app-shell">
      <Header />
      <main className="home-page">
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow">Certified dealership search</p>
            <h1>Find the right dealership before you visit the lot.</h1>
            <p className="hero-text">Browse verified dealerships, compare locations, and read customer reviews from one focused workspace.</p>
            <div className="hero-actions">
              <a href={loggedIn ? "/dealers" : "/login"} className="button button-primary">
                {loggedIn ? "View Dealerships" : "Login to View Dealerships"}
              </a>
              {!loggedIn && <a href="/register" className="button button-secondary">Create Account</a>}
            </div>
          </div>
          <img src="/static/car_dealership.jpg" alt="Car dealership" className="hero-image" />
        </section>
        <section className="metric-row" aria-label="Highlights">
          <div><strong>50+</strong><span>Dealer locations</span></div>
          <div><strong>Nationwide</strong><span>State filtering</span></div>
          <div><strong>Review-ready</strong><span>Sentiment insights</span></div>
        </section>
      </main>
    </div>
  );
};

const About = () => (
  <div className="app-shell">
    <Header />
    <main className="content-page">
      <section className="content-hero">
        <p className="eyebrow dark">About Us</p>
        <h1>A smarter way to choose your next dealership.</h1>
        <p>DriveLine helps drivers compare dealerships, inspect customer reviews, and share purchase experiences with more confidence.</p>
      </section>
      <section className="info-grid">
        <article>
          <h2>Curated Dealer Data</h2>
          <p>We organize dealer locations, addresses, and review activity into a simple directory built for quick comparison.</p>
        </article>
        <article>
          <h2>Review Sentiment</h2>
          <p>Reviews are paired with sentiment analysis so buyers can spot patterns in customer experience faster.</p>
        </article>
        <article>
          <h2>Built for Buyers</h2>
          <p>The app keeps the workflow focused: find a dealership, review details, and add feedback after your visit.</p>
        </article>
      </section>
    </main>
  </div>
);

const Contact = () => (
  <div className="app-shell">
    <Header />
    <main className="content-page">
      <section className="content-hero">
        <p className="eyebrow dark">Contact Us</p>
        <h1>Need help with a dealership or review?</h1>
        <p>Reach the support team and we will help with account access, dealer information, and review submissions.</p>
      </section>
      <section className="contact-panel">
        <div>
          <span>Email</span>
          <strong>support@driveline.example</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>+234 800 123 4567</strong>
        </div>
        <div>
          <span>Hours</span>
          <strong>Monday - Friday, 9AM - 5PM</strong>
        </div>
        <div>
          <span>Office</span>
          <strong>Ikeja, Lagos, Nigeria</strong>
        </div>
      </section>
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dealers" element={<RequireAuth><Dealers/></RequireAuth>} />
      <Route path="/dealer/:id" element={<RequireAuth><Dealer/></RequireAuth>} />
      <Route path="/postreview/:id" element={<RequireAuth><PostReview/></RequireAuth>} />
    </Routes>
  );
}
export default App;
