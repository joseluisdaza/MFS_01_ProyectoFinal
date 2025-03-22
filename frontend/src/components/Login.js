import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import "../styles/Login.css";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/api/";
const LOGIN_URL = `${BACKEND_URL}auth/login`;

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      // console.log("LOGIN HASHED PASSWORD:");
      // console.log(hashedPassword);
      // console.log(password);

      // const response = await axios.post(LOGIN_URL, {
      //   Correo: email,
      //   Password: hashedPassword,
      // });

      const response = await axios.post(LOGIN_URL, {
        Correo: email,
        Password: password,
      });

      console.log("LOGIN RESPONSE:");
      console.log(response.data);

      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
