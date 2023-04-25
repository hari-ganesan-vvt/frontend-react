import React from "react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //signup
  const handleSignup = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };
    let url =
      " https://test-node-api-7oo8.onrender.com/api/v1/users/userRegister";
    fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        enqueueSnackbar(data.message);
        if (data.message === "User successfully created") {
          setLoginType("login");
        }
      })
      .catch((err) => console.log(err));
  };

  //login
  const handleLogin = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    let url = "https://test-node-api-7oo8.onrender.com/api/v1/users/userLogin";
    fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        enqueueSnackbar(data.message);
        if (data.message === "User successfully Login") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
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
