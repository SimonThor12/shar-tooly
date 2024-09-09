import mainicon from "../../public/shar-tooly-favicon-white.png";

function Hero() {
  return (
    <div
      className="hero min-h-screen bg-black"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?tools')",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content glass glass-blur text-neutral-content text-center">
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
          <button className="btn btn-secondary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
