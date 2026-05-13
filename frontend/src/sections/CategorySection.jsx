import { Link } from "react-router-dom";

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

.anim-1 { animation: fadeUp .7s .1s ease both; }
.anim-2 { animation: fadeUp .7s .2s ease both; }
.anim-3 { animation: fadeUp .7s .3s ease both; }
.anim-4 { animation: fadeUp .7s .4s ease both; }
.anim-5 { animation: fadeUp .7s .5s ease both; }

.category-card img {
  transition: transform .7s ease;
}

.category-card:hover img {
  transform: scale(1.06);
}
`;

const CATEGORIES = [
  {
    name: "Fiction",
    category: "FICTION",
    desc: "1,240 Titles",
    image: "/images/category_1.png",
    anim: "anim-2",
  },
  {
    name: "History",
    category: "HISTORY",
    desc: "842 Titles",
    image: "/images/category_2.png",
    anim: "anim-3",
  },
  {
    name: "Art & Design",
    category: "ART",
    desc: "512 Titles",
    image: "/images/category_3.png",
    anim: "anim-4",
  },
  {
    name: "Philosophy",
    category: "PHILOSOPHY",
    desc: "430 Titles",
    image: "/images/category_4.png",
    anim: "anim-5",
  },
  {
    name: "Poetry & Letters",
    category: "POETRY",
    desc: "315 Titles",
    image: "/images/category_5.png",
    anim: "anim-5",
  },
];

export default function CategorySection() {
  return (
    <>
      <style>{styles}</style>

      <section className="bg-[#f6f3ef] py-14 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* HEADER */}
          <div className="anim-1 flex items-center justify-between mb-8">
            <h2
              className="text-[#1d1b19]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Popular Categories
            </h2>

            <Link
              to="/shop"
              className="uppercase text-[14px] tracking-[0.28em] text-[#1d1b19]"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              View All Genres
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {/* LEFT LARGE */}
            <Link
              to={`/shop?category=${CATEGORIES[0].category}`}
              className={`category-card ${CATEGORIES[0].anim} relative overflow-hidden col-span-12 md:col-span-6 h-[220px] md:h-[260px]  rounded-2xl`}
            >
              <img
                src={CATEGORIES[0].image}
                alt={CATEGORIES[0].name}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 z-10">
                <h3
                  className="text-white "
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  }}
                >
                  {CATEGORIES[0].name}
                </h3>

                <p className="text-neutral-300 text-sm mt-1">
                  {CATEGORIES[0].desc}
                </p>
              </div>
            </Link>

            {/* TOP RIGHT */}
            <Link
              to={`/shop?category=${CATEGORIES[1].category}`}
              className={`category-card ${CATEGORIES[1].anim} relative overflow-hidden col-span-8 md:col-span-4 h-[220px] md:h-[260px] rounded-2xl`}
            >
              <img
                src={CATEGORIES[1].image}
                alt={CATEGORIES[1].name}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 z-10">
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.2rem, 2vw, 1.7rem)",
                  }}
                >
                  {CATEGORIES[1].name}
                </h3>

                <p className="text-neutral-300 text-sm mt-1">
                  {CATEGORIES[1].desc}
                </p>
              </div>
            </Link>

            {/* SMALL CARD */}
            <Link
              to={`/shop?category=${CATEGORIES[2].category}`}
              className={`category-card ${CATEGORIES[2].anim} relative overflow-hidden col-span-4 md:col-span-2 h-[220px] md:h-[260px] rounded-2xl`}
            >
              <img
                src={CATEGORIES[2].image}
                alt={CATEGORIES[2].name}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10">
                <h3
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  }}
                >
                  Art & Design
                </h3>

                <p className="text-neutral-300 text-xs mt-1">512 Titles</p>
              </div>
            </Link>

            {/* BOTTOM LEFT */}
            <Link
              to={`/shop?category=${CATEGORIES[3].category}`}
              className={`category-card ${CATEGORIES[3].anim} relative overflow-hidden col-span-4 md:col-span-3 h-[160px] md:h-[190px] rounded-2xl`}
            >
              <img
                src={CATEGORIES[3].image}
                alt={CATEGORIES[3].name}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10">
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  {CATEGORIES[3].name}
                </h3>

                <p className="text-neutral-300 text-xs mt-1">
                  {CATEGORIES[3].desc}
                </p>
              </div>
            </Link>

            {/* BOTTOM LARGE */}
            <Link
              to={`/shop?category=${CATEGORIES[4].category}`}
              className={`category-card ${CATEGORIES[4].anim} relative overflow-hidden col-span-8 md:col-span-9 h-[160px] md:h-[190px] rounded-2xl`}
            >
              <img
                src={CATEGORIES[4].image}
                alt={CATEGORIES[4].name}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 z-10">
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                  }}
                >
                  {CATEGORIES[4].name}
                </h3>

                <p className="text-neutral-300 text-sm mt-1">
                  {CATEGORIES[4].desc}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
