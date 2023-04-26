import React from "react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //signup
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const reqOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let url =
        "https://mpxp4clm1b.execute-api.ap-south-1.amazonaws.com/jwt_prod/api/v1/users/userSignup";

      const response = await axios.post(
        url,
        { username, email, password },
        reqOptions
      );

      console.log(response.data.message);
      if (response.data.message === "User successfully created") {
        setLoginType("login");
        enqueueSnackbar(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      enqueueSnackbar(error.response.data.message);
    }
  };

  //login
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const reqOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let url =
        "https://mpxp4clm1b.execute-api.ap-south-1.amazonaws.com/jwt_prod/api/v1/users/userLogin";

      const response = await axios.post(url, { email, password }, reqOptions);
      enqueueSnackbar(response.data.message);
      if (response.data.message === "User successfully Login") {
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response.data.message);
      enqueueSnackbar(error.response.data.message);
    }
  };

  return (
    <div>
      {loginType === "login" ? (
        <>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button value="submit">Login</button>
          </form>
          <p>
            Create a account ?
            <span onClick={() => setLoginType("signup")}>Signup</span>
          </p>
        </>
      ) : (
        <>
          <h1>Sign up</h1>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter your Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button value="submit">Create Account</button>
          </form>
          <p>
            Already I have account ?
            <span onClick={() => setLoginType("login")}>SignIn</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
