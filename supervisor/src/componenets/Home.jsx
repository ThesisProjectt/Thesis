import React from "react";
import backgroundImage from "../assets/background1.png";
import logo from "../assets/logo.png";

function Home() {
  return (
    <div
      className="bg-cover bg-center bg-fixed h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div style={{ position: "absolute", top: "141px", left: "307px",}}>
        <img src={logo} alt="" style={{ width: "363px", height: "245px" }} />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          marginTop: "450px",
          marginLeft: "230px",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "242px",
            backgroundColor: "white",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "white", // Set background color to white
              color: "gray", // Set text color to black
            }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "white", // Set background color to white
              color: "black", // Set text color to black
            }}
          />
          <button
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#61D8D8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
