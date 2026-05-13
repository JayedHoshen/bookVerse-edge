import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { signupUser } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-12px);
  }

  100% {
    transform: translateY(0px);
  }
}

.anim-1 { animation: fadeUp .7s .1s ease both; }
.anim-2 { animation: fadeUp .7s .2s ease both; }
.anim-3 { animation: fadeUp .7s .3s ease both; }
.anim-4 { animation: fadeUp .7s .4s ease both; }

.float {
  animation: float 7s ease-in-out infinite;
}

input::placeholder {
  color: #b8aea5;
}

input:focus {
  outline: none;
}

.input-group {
  transition: all .3s ease;
}

.input-group:focus-within {
  transform: translateY(-2px);
}
`;

export default function Signup() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const signupMutation = useMutation({
    mutationFn: signupUser,

    onSuccess: (data) => {
      login(data.user);
      navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    signupMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-[#f6f3ef] overflow-hidden relative flex flex-col">
        {/* GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#d7c6b2]/20 blur-[100px] rounded-full" />

        <div className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] bg-[#d7c6b2]/20 blur-[100px] rounded-full" />

        {/* FLOATING BOOKS */}
        <div className="absolute left-[-70px] top-24 opacity-40 rotate-[-12deg] hidden lg:block float">
          <img src="/images/book-stack-left.png" alt="" className="w-[260px]" />
        </div>

        <div className="absolute right-[-40px] bottom-16 opacity-40 rotate-[7deg] hidden lg:block float">
          <img
            src="/images/book-stack-right.png"
            alt=""
            className="w-[280px]"
          />
        </div>

        {/* TOP NAV */}
        <div className="relative z-20 w-full px-5 md:px-10 pt-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* BACK HOME */}
            <Link
              to="/"
              className="group inline-flex items-center gap-3 text-[#1d2430] hover:opacity-70 transition"
            >
              <div className="w-10 h-10 rounded-full border border-[#d9d0c7] flex items-center justify-center bg-white/70 backdrop-blur-sm group-hover:bg-[#1d2430] group-hover:text-white transition-all duration-300">
                <ArrowLeft className="w-4 h-4" />
              </div>

              <span className="uppercase tracking-[0.2em] text-[11px]">
                Back Home
              </span>
            </Link>

            {/* LOGO */}
            <Link to="/" className="hidden md:block">
              <h1
                className="text-[#1d2430]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "2rem",
                }}
              >
                BookVerse
              </h1>
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1 flex items-center justify-center px-5 py-8">
          <div className="w-full max-w-md">
            {/* CARD */}
            <div
              className="anim-2 relative backdrop-blur-xl px-8 md:px-12 py-6 overflow-hidden shadow hover:shadow-xl rounded-2xl"
              style={{
                boxShadow: "0 30px 80px rgba(30,30,30,0.08)",
              }}
            >
              {/* CARD GLOW */}
              <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] bg-[#e6d7c3]/30 blur-[80px] rounded-full" />

              {/* HEADER */}
              <div className="relative z-10 text-center mb-10 anim-1">
                <p className="uppercase tracking-[0.28em] text-[10px] text-[#8d8178] mb-4">
                  Begin Your Literary Journey
                </p>

                <h2
                  className="text-[#1d1b19] mb-5"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.8rem,5vw,4rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Create Account
                </h2>

                <p className="text-[#7c746d] text-sm leading-relaxed max-w-xs mx-auto">
                  Join BookVerse and build your personal collection of timeless
                  literary works.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                {/* USERNAME */}
                <div className="input-group anim-3">
                  <label className="block uppercase tracking-[0.2em] text-[10px] text-[#8d8178] mb-4">
                    Username
                  </label>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. literarysoul"
                    className="w-full bg-transparent border-b border-[#d7cdc3] h-12 text-[#1d1b19] text-sm p-2 rounded-xl"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="input-group anim-3">
                  <label className="block uppercase tracking-[0.2em] text-[10px] text-[#8d8178] mb-4">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@bookverse.com"
                    className="w-full bg-transparent border-b border-[#d7cdc3] h-12 text-[#1d1b19] text-sm p-2 rounded-xl"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="input-group anim-3">
                  <div className="flex items-center justify-between mb-4">
                    <label className="uppercase tracking-[0.2em] text-[10px] text-[#8d8178]">
                      Password
                    </label>

                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#9b6d63]">
                      Minimum 8 Characters
                    </p>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent border-b border-[#d7cdc3] h-12 pr-12 text-[#1d1b19] text-sm p-2 rounded-xl"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8d8178] hover:text-[#1d2430] transition"
                    >
                      {showPass ? (
                        <EyeOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Eye className="w-4 h-4 mr-2" />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS */}
                <div className="anim-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 accent-[#1d2430]"
                    required
                  />

                  <p className="text-sm leading-relaxed text-[#7c746d]">
                    I agree to the Terms of Service and Privacy Policy.
                  </p>
                </div>

                {/* BUTTON */}
                <div className="anim-4 pt-2">
                  <button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="group relative overflow-hidden w-full h-14 bg-[#1d2430] text-white uppercase tracking-[0.24em] text-[10px] hover:bg-[#283347] transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
                  >
                    <span className="relative z-10">
                      {signupMutation.isPending
                        ? "Creating Account..."
                        : "Create Account"}
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
                  </button>
                </div>

                {/* ERROR */}
                {signupMutation.isError && (
                  <p className="text-sm text-red-500 text-center">
                    {signupMutation.error?.response?.data?.message ||
                      signupMutation.error?.message}
                  </p>
                )}
              </form>

              {/* DIVIDER */}
              <div className="relative z-10 my-10 border-t border-[#ebe2d8]" />

              {/* LOGIN */}
              <div className="relative z-10 text-center anim-4">
                <p className="text-[#7c746d] text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-[#1d2430] font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[#e7dfd7] py-6 px-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] uppercase tracking-[0.18em] text-[#8d8178]">
            <p className="text-[#1d2430]">BookVerse</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#">Terms of Service</a>

              <span>/</span>

              <a href="#">Privacy Policy</a>

              <span>/</span>

              <a href="#">Contact Us</a>

              <span>/</span>

              <a href="#">Instagram</a>
            </div>

            <p>&copy; 2026 BookVerse. Curated for the Bibliophile.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
