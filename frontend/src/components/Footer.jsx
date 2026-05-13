const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap');
`;

const BRAND_LINKS = [
  "Sustainability",
  "Ingredients Glossary",
  "Shipping & Returns",
];

const SUPPORT_LINKS = ["Privacy Policy", "Contact"];

export default function Footer() {
  return (
    <>
      <style>{styles}</style>

      <footer className="border-t border-neutral-800 bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* LEFT SIDE */}
            <div className="space-y-8">
              {/* Logo */}
              <div>
                <h2
                  className="text-5xl md:text-6xl text-[#E7D7B7] leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  BookVerse
                </h2>

                <p className="mt-6 text-neutral-500 max-w-md leading-relaxed text-sm md:text-base">
                  Curated literary experiences for readers who value timeless
                  storytelling, elegant design, and the quiet beauty of the
                  written word.
                </p>
              </div>

              {/* Quote */}
              <div className="border-l border-[#E7D7B7]/30 pl-6">
                <p
                  className="text-[#E7D7B7] text-xl md:text-2xl italic leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  “A room without books is like a body without a soul.”
                </p>

                <span className="block mt-3 text-xs uppercase tracking-[0.3em] text-neutral-600">
                  — Cicero
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-2 gap-12 md:gap-20">
              {/* BRAND LINKS */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-[#E7D7B7] mb-8">
                  The Press
                </h3>

                <ul className="space-y-5">
                  {BRAND_LINKS.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 text-neutral-500 hover:text-[#E7D7B7] transition-all duration-300"
                      >
                        <span className="w-0 group-hover:w-4 h-[1px] bg-[#E7D7B7] transition-all duration-300" />

                        <span className="text-sm tracking-wide">{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUPPORT LINKS */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-[#E7D7B7] mb-8">
                  Support
                </h3>

                <ul className="space-y-5">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 text-neutral-500 hover:text-[#E7D7B7] transition-all duration-300"
                      >
                        <span className="w-0 group-hover:w-4 h-[1px] bg-[#E7D7B7] transition-all duration-300" />

                        <span className="text-sm tracking-wide">{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* COPYRIGHT */}
            <p className="text-neutral-600 text-sm tracking-wide">
              © 2026 BOOKVERSE. THE ART OF READING.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-6">
              {["Instagram", "Twitter", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs uppercase tracking-[0.25em] text-neutral-600 hover:text-[#E7D7B7] transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
