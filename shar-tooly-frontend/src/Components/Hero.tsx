import { Link } from "@tanstack/react-router";
import mainicon from "/shar-tooly-favicon-white.png";
import backgroundImg from "/clayton-robbins-Ru09fQONJWo-unsplash.jpg";

function Hero() {
  return (
    <div
      className="hero min-h-screen bg-black"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}>
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="w-3/4 hero-content glass glass-blur text-neutral-content text-center">
        <div className="max-w-md">
          <img
            src={mainicon}
            alt="Shar-Tooly Icon"
            className="w-20 h-20 mx-auto"
          />
          <h1 className="mb-5 text-white text-5xl font-bold">
            Share your tools
          </h1>
          <p className="mb-5">
            This is the place to share your tools with the world! Don't let them
            gather dust in your garage, share them with the community!
          </p>
          <Link
            className="btn btn-secondary"
            to="/gallery">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
