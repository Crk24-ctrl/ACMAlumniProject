import "../styles/login.css"; 



const Login: React.FC = () => {
    return (
      <section className="login" >
       <div className="login-container">
        <h2>
        <span className="highlight2">Welcome</span> <span className="highlight">Back!</span>
        </h2>
        <form className="login-form">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
  
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required />
  
          <button type="submit" className="login-button">Login</button>
          <a href="/reset-password" className="forgot-password">Forgot your password?</a>
        </form>
        <p>Or</p>
        <a href="/signup" className="create-account">Create Account</a>
      </div>
      </section>
    );
  };

  export default Login;
  
