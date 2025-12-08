import React, { useState } from "react";
import login from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { registerUser } from "../../Service/auth.js";
import { useSpinner } from "../../Context/SpinnerContext.jsx";
import { useNavigate } from "react-router";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const[error,setErrors] = useState('')
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

  async function Register(e) {
    e.preventDefault();
    
    if (!userData.name.trim()){
      setErrors('Name is required')
      return
    }

    if (!userData.email.trim()){
      setErrors('Email is required')
      return
    } else if(!/\S+@\S+\.\S+/.test(userData.email))
    {
      setErrors('Enter a valid email')
      return
    }
    

    
    if (!userData.password.trim()){ 
      setErrors("Password is required");
      return
    }
    else if (userData.password.length < 6){
      setErrors("Password must be at least 6 characters");
      return
    } 

    showSpinner();
    try {
      const data = await registerUser(userData);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.user.name);
      window.dispatchEvent(new Event("user-changed"));
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors(error?.response?.data?.message || "unknown Error")
    } finally {
      hideSpinner();
    }
  }

  return (
    <>
      <div className="flex mt-10 justify-evenly">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <img src={logo} alt="FootAura Logo" className="h-20 object-fill" />
          <h1 className="mt-5 text-2xl font-bold mb-4 text-black">
            Create Your Account
          </h1>
          <form
            className="flex flex-col items-center w-full space-y-4"
            onSubmit={Register}
          >
            <input
              className="w-[400px] text-lg p-3 rounded-2xl bg-blue-100"
              type="text"
              placeholder="Username"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />

            <input
              className="w-[400px] text-lg p-3 rounded-2xl bg-blue-100"
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <input
              className="w-[400px] text-lg p-3 rounded-2xl bg-blue-100"
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
             {error && <p className="text-danger ">{error}</p>}
            <button
              type="submit"
              className="w-[400px] bg-blue-600 text-white text-lg py-3 rounded-2xl hover:bg-blue-700"
            >
              Register
            </button>
          </form>
          <div className="mt-4">
            <Link
              to="/login"
              className="text-sm text-blue-600 text-base hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        <div className="w-[50%] h-[100px] flex justify-start items-center mt-30">
          <img className="w-[450px]" src={login} alt="login" />
        </div>
      </div>
      <div
        class="absolute bottom-0 right-0 w-[80%] h-72 bg-blue-600 
        [clip-path:ellipse(80%_45%_at_100%_100%)] -z-10"
      ></div>
    </>
  );
}
