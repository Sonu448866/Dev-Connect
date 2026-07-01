import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login clicked");

    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Success:", res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          {/* Left Section - Hidden on Mobile */}
          <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-purple-950/60 via-indigo-950/40 to-zinc-900 border-r border-zinc-800">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Welcome
              <br />
              Developers <span className="inline-block">👋</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-400 leading-8">
              Connect with developers, make friends, and build amazing projects
              together on deVTinder.
            </p>

            <div className="mt-10 flex gap-4">
              <div className="h-4 w-4 rounded-full bg-purple-500"></div>
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              <div className="h-4 w-4 rounded-full bg-pink-500"></div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center  p-6 sm:p-8 ">
            {/* Heading */}
            <div>
              <h2 className="text-3xl font-bold text-white">Sign In</h2>

              <p className="mt-2 text-lg text-zinc-400">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form className="mt-5 space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-lg text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-lg text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center">
              <div className="h-px flex-1 bg-zinc-800"></div>

              <span className="px-4 text-zinc-500">OR</span>

              <div className="h-px flex-1 bg-zinc-800"></div>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              className="w-full rounded-2xl border border-zinc-700 py-4 text-lg font-medium text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white"
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
