import { useState } from "react";
import "../styles/verifyacc.css"; 
import { useNavigate } from "react-router-dom";


const VerifyAcc: React.FC = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const navigate = useNavigate();
  
    const handleInputChange = (value: string, index: number) => {
      if (!/^[0-9]*$/.test(value)) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate("/chooseusername");
    };
  
    return (
      <section className="verifyacc">
        <div className="verifyacc-container">
          <h2>Verify your account</h2>
          <p>Enter verification code received on email</p>
          <form className="reset-form" onSubmit={handleSubmit}>
            <label htmlFor="verification">Verification code</label>
            <div className="verification-code-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="verification-input"
                  required
                />
              ))}
            </div>
            <button type="submit" className="usernamesignup">
              Next
            </button>
          </form>
          <br />
          <p>Already have an account?</p>
          <a href="/login" className="back-to-login">
            Back to Sign In
          </a>
        </div>
      </section>
    );
  };


export default VerifyAcc;  