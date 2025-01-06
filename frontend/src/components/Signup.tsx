import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css"; 

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      navigate("/verifyacc");
    };
  
    return (
      <section className="signup">
        <div className="signup-container">
          <h2>
            <span className="highlight">Create</span> <span className="highlight2">Account</span>
          </h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="firstname">First name:</label>
            <input
              type="text"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
  
            <label htmlFor="lastname">Last name:</label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
  
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
  
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
  
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
  
            <button type="submit" className="verifyaccount">Sign Up</button>
          </form>
          <br></br>
          <p>
            Already have an account? <a href="/login" className="login-link">Login</a>
          </p>
          
        </div>
      </section>
    );
  };
  
  export default Signup;