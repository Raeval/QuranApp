import { useState } from "react";
import './css/RegistrationScreen.css';
import { register } from "../services/supabaseServices";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword === password) {
      const { error } = await register(email, password);
      if (error) {
        alert(error);
      } else {
        alert("successful");
        navigate("/loggedUser")
      }
    } else {
      alert("Password needs to be the same as confirm password.");
    }
  }

  return (
    <div className="screenRegistrationContainer">
      <div className="registrationContainer">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="formDetail">
            <p className="formText">Email</p>
            <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formInput"
            required
          />
          </div>
          <div className="formDetail">
            <p className="formText">Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formInput"
              required
            />
          </div>
          <div className="formDetail confirmContainer">
            <p className="formText">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="formInput"
              required
            />
            <div className="loginLinkContainer"><Link to="/login" className="loginLink">Already have an account?</Link></div>
          </div>
          <div className="buttonContainer">
            <button className="submitButton">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}