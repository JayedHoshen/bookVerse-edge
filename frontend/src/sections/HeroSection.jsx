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

.anim-1 {
  animation: fadeUp 0.8s 0.1s ease both;
}

.anim-2 {
  animation: fadeUp 0.8s 0.3s ease both;
}

.anim-3 {
  animation: fadeUp 0.8s 0.5s ease both;
}

.anim-4 {
  animation: fadeUp 0.8s 0.7s ease both;
}
`;

export default function HeroSection() {
  return (
    <>
      <style>{styles}</style>

      <section className="bg-[#f6f3ef] py-10 md:py-14 overflow-hidden ">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            {/* LEFT CONTENT */}
            <div className="anim-1 bg-[#f6f3ef] p-7 md:p-10 relative h-full flex flex-col justify-center shadow hover:shadow-2xl">
              {/* TOP LABEL */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="uppercase text-[10px] tracking-[0.28em] text-[#8b7d74]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Book of the Month
                </span>

                <div className="w-14 h-[1px] bg-[#b8aaa0]" />
              </div>

              {/* TITLE */}
              <h1
                className="anim-2 text-[#1d1b19] leading-none mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.6rem, 5vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                The Silent Archival of Lost Echoes
              </h1>

              {/* AUTHOR */}
              <p
                className="anim-3 text-[#7d7269] text-sm mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                by Elena Sterling
              </p>

              {/* DESCRIPTION */}
              <p
                className="anim-3 text-[#5c544d] leading-relaxed text-sm md:text-[15px] max-w-md mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                A hauntingly beautiful exploration of memory and the objects we
                leave behind. Sterling’s latest masterpiece redefined the
                contemporary literary landscape this season.
              </p>

              {/* BUTTONS */}
              <div className="anim-4 flex flex-wrap items-center gap-3">
                {/* PRIMARY BUTTON */}
                <button
                  className="px-7 h-11 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#1d2430",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Explore the Title →
                </button>

                {/* SECONDARY BUTTON */}
                <button
                  className="px-7 h-11 border text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#ebe5df] hover:-translate-y-0.5"
                  style={{
                    borderColor: "#cfc5bc",
                    color: "#6b625a",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    background: "transparent",
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="anim-2 flex justify-center lg:justify-end h-full ">
              <div className="relative  bg-[#f6f3ef] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-full flex items-center justify-center">
                {/* BACKGROUND TEXTURE */}
                <div
                  className="absolute inset-0 opacity-40 shadow hover:shadow-2xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(0,0,0,0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(0,0,0,0.03) 25%, transparent 25%)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* BOOK IMAGE */}
                <img
                  src="Hero.png"
                  alt="Book Cover"
                  className="relative z-10 w-[220px] md:w-[280px] lg:w-[320px] object-cover  shadow hover:shadow-xl"
                />

                {/* SOFT SHADOW */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-black/10 blur-2xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
