import { useState } from "react"
import './css/LogInScreen.css'
import { signIn } from "../services/supabaseServices";
import { useNavigate } from "react-router-dom";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      alert(error);
    } else {
      alert("successful");
      navigate("/loggedUser");
    }
  }

  return (
    <div className="screenLoginContainer">
      <div className="logInContainer">
        <h2>Login</h2>
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
          <div className="buttonContainer">
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}