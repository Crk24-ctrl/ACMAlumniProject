import "../styles/resetpass.css"; 

const ResetPassword: React.FC = () => {
    return (
      <section className="reset-password">
        <div className="reset-container">
          <h2>Reset your password</h2>
          <p>Enter the email address you registered with</p>
          <form className="reset-form">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="reset-button">
              Send Password Reset Link
            </button>
          </form>
          <a href="/login" className="back-to-login">
            Back to Sign In
          </a>
        </div>
      </section>
    );
  };

  export default ResetPassword;