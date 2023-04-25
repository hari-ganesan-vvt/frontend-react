import React from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    let url = "http://localhost:8080/api/v1/users/userLogout";
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        enqueueSnackbar(data.message);
        if (data.message === "User has been logged out.") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
