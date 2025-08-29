import { useState } from "react";
import './css/RegistrationScreen.css';

export default function RegistrationScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {

  }

  return (
    <div className="screenContainer">
      <div className="registrationContainer">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="formDetail">
            <p className="formText">Username</p>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <div className="formDetail">
            <p className="formText">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="formInput"
              required
            />
            </div>
        </form>
      </div>
    </div>
  )
}