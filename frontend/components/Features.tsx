import "../styles/features.css";
const Features: React.FC = () => {
  return (
    <section id="features" className="features" >
      <h2>How does <span className="highlight">Deal</span><span className="highlight2">Finder </span>work?</h2>

      <div className="features-container">
        <div className="feature">
          <img src="/feature1.png" alt="Sign up" />
          <h3>1. Sign up/Login</h3>
          <br></br>
          <p>Users must create an account to access deals.</p>
        </div>
        <div className="feature">
          <img src="/feature2.png" alt="Explore Deals" />
          <h3>2. Explore the Deals</h3>
          <br></br>
          <p>Users can explore a wide range of deals </p>
          <p>and discounts from various shopping websites.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;