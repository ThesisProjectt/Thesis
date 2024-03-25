import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Bg from "../assets/bg.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const log = async () => {
    if (email==="" || password==="") {
      return ("Please enter both email and password");
    }
    const data = { email: email, password: password };
    console.log(data);
    try {
      // await axios
      //   .post("http://localhost:3000/client/login",data)
      //   .then( () => {
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-start justify-start p-14">
        <img className="w-60" src={Logo} alt="logo" />
      </div>
      <div className="flex w-full justify-center items-center">
        <div className=" flex w-3/4 py-28 justify-start items-start">
          <div className=" flex flex-col gap-10 rounded-xl  bg-white p-16 m-10 text w-1/3 border ">
            <input
              type="text"
              placeholder="Your e-mail address"
              className="text-start w-full p-4 rounded-lg shadow-md focus:outline-none"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
              type="password"
              placeholder="Password"
              className="text-start w-full p-4 rounded-lg shadow-md focus:outline-none "
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button
              style={{ background: "#02337B" }}
              className="text-center text-white rounded-lg text-lg w-full p-3 "
              onClick={() => {
                log();
                navigate('/dashboard');
              }}
            >
              Sign In
            </button>
            <div className="flex justify-end items-end">
              <h2 style={{ color: "#02337B" }} className=" font-bold ">
                Forget Password ?
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
