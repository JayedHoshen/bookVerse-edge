import React from "react";
import { Home, RefreshCw } from "lucide-react";
import { Link } from "react-router";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fadeUp .8s ease both;
}
`;

export default function ErrorPage({
  code = "404",
  title = "Page Not Found",
  message = "Sorry, the page you're looking for doesn't exist or has been moved.",
  showHomeButton = true,
}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-[#0F0F0F] overflow-hidden relative flex items-center justify-center px-6 py-16">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E7D7B7]/10 blur-[140px] rounded-full" />

        {/* GRID TEXTURE */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl w-full text-center fade-up">
          {/* TOP LABEL */}
          <div className="mb-6">
            <span className="uppercase tracking-[0.4em] text-[11px] text-[#E7D7B7]">
              BookVerse Archive
            </span>
          </div>

          {/* HUGE CODE */}
          <h1
            className="leading-none text-[#E7D7B7]/90"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "clamp(8rem, 22vw, 18rem)",
              letterSpacing: "-0.08em",
            }}
          >
            {code}
          </h1>

          {/* TITLE */}
          <h2
            className="text-white mt-2 mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h2>

          {/* MESSAGE */}
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            {message}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {/* HOME BUTTON */}
            {showHomeButton && (
              <Link
                to="/"
                className="group h-14 px-10 rounded-full bg-[#E7D7B7] text-black flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:-translate-y-1 hover:bg-[#d7c19b]"
              >
                <Home className="w-4 h-4" />

                <span>Back to Home</span>
              </Link>
            )}

            {/* REFRESH BUTTON */}
            <button
              onClick={handleRefresh}
              className="group h-14 px-10 rounded-full border border-neutral-700 text-[#E7D7B7] flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:border-[#E7D7B7] hover:bg-[#171717]"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />

              <span>Try Again</span>
            </button>
          </div>

          {/* BOTTOM QUOTE */}
          <div className="mt-20 border-t border-neutral-800 pt-8">
            <p
              className="text-[#E7D7B7]/70 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
              }}
            >
              “Not all those who wander are lost.”
            </p>

            <span className="block mt-3 text-[10px] uppercase tracking-[0.35em] text-neutral-600">
              — J.R.R. Tolkien
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
