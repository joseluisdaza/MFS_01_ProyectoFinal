import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
const LOGIN_URL = `${BACKEND_URL}auth/login`;

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("LOGIN SUBMIT");
    e.preventDefault();
    try {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      const response = await axios.post(LOGIN_URL, {
        Correo: email,
        Password: hashedPassword,
      });

      console.log("LOGIN RESPONSE:");
      console.log(response.data);

      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
