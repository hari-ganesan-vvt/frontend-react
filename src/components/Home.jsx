import React from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let url =
        "https://pdy33tz86g.execute-api.ap-south-1.amazonaws.com/testing-api/api/v1/users/userLogout";
      const reqOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(url, reqOptions);
      if (response.data.message === "User has been logged out.") {
        enqueueSnackbar(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
