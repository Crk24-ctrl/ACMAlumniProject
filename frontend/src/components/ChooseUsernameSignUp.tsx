import { useNavigate } from "react-router-dom";
import "../styles/chooseUsername.css";



const ChooseUsernameSignUp: React.FC = () => {
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      navigate("/login");
    };
  
    return (
      <section className="usersignup">
        <div className="usersignup-container">
          <h2>Choose Username</h2>
          <form className="reset-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Create username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              required
            />
            <button type="submit" className="signup-button">Create account</button>
          </form>
          <p>Already have an account? <a href="/login" className="back-to-login">Back to Sign In</a></p>
        </div>
      </section>
    );
  };
  
  export default ChooseUsernameSignUp;
  