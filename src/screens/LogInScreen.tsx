import { useState } from "react"

export default function LogInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {

  }

  return (
    <div>
      <div className="logInContainer">
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
        </form>
      </div>
    </div>
  )
}