import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Signup clicked");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Success:", res.data);

      return navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-[1fr_1.2fr]">
            {/* Left Section - Hidden on Mobile */}
            <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-purple-950/60 via-indigo-950/40 to-zinc-900 border-r border-zinc-800">
              <h1 className="text-4xl font-bold text-white leading-tight">
                Join
                <br />
                deVTinder <span className="inline-block">🚀</span>
              </h1>

              <p className="mt-6 text-lg text-zinc-400 leading-8">
                Create your profile, connect with developers, and collaborate on
                exciting projects around the world.
              </p>

              <div className="mt-10 flex gap-4">
                <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                <div className="h-4 w-4 rounded-full bg-pink-500"></div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center p-5 sm:p-6">
              {/* Heading */}
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-lg text-zinc-400">
                  Enter your details to get started
                </p>
              </div>

              {/* Form */}
              <form className="mt-2 space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-lg text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-lg text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

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
                    placeholder="Create a password"
                    className="w-full rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-lg text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30"
                  onClick={handleSignup}
                >
                  Create Account
                </button>
              </form>

              {/* Divider */}
              <div className="my-3 flex items-center">
                <div className="h-px flex-1 bg-zinc-800"></div>

                <span className="px-4 text-zinc-500">OR</span>

                <div className="h-px flex-1 bg-zinc-800"></div>
              </div>

              {/* Login Redirect */}
              <button
                type="button"
                className="w-full rounded-2xl border border-zinc-700 py-4 text-lg font-medium text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
