import React from "react";
import login from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { Form, Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useSpinner } from "../../Context/SpinnerContext";
import { loginUser } from "../../Service/auth";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState("");
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!userData.email.trim()) {
      setErrors("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setErrors("Enter a valid email");
      return;
    }

    showSpinner();
    try {
      const data = await loginUser(userData);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.user.name);
      window.dispatchEvent(new Event("user-changed"));
      navigate("/");
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data?.message || "unknown Error")
    } finally {
      hideSpinner();
    }
  }

  return (
    <>
      <div className="flex mt-15 justify-evenly">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <img src={logo} alt="FootAura Logo" className="h-20 object-fill" />
          <h1 className="mt-5 text-2xl font-bold mb-4 text-black">
            Login to Your Account
          </h1>
          <form
            className="flex flex-col items-center w-[80%]"
            onSubmit={handleLogin}
          >
            <input
              className="w-[400px] text-xl  p-3 mb-4 rounded-2xl bg-blue-100"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <input
              className="w-[400px] text-xl  p-3 mb-4 rounded-2xl bg-blue-100"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {error && <p className="text-danger ">{error}</p>}
            <button
              type="submit"
              className="w-[400px] bg-blue-600 text-white text-xl px-4 py-2 rounded-2xl hover:bg-blue-700 w-[80%]"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <Link
              to="/register"
              className="text-sm text-blue-600 text-base hover:underline"
            >
              Create Account?
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
