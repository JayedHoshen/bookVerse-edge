"use client";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

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

.anim-1 { animation: fadeUp .6s .1s ease both; }
.anim-2 { animation: fadeUp .6s .2s ease both; }
.anim-3 { animation: fadeUp .6s .3s ease both; }

.product-card img {
  transition: transform .8s ease;
}

.product-card:hover img {
  transform: scale(1.04);
}

.product-card {
  transition: transform .4s ease;
}

.product-card:hover {
  transform: translateY(-3px);
}
`;

const CATEGORIES = ["FICTION", "CLASSIC", "PHILOSOPHY", "POETRY", "ART"];

const AUTHORS = ["Joan Didion", "Albert Camus", "Virginia Woolf"];

const SORT_OPTIONS = [
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [checkedCats, setCheckedCats] = useState([]);
  const [priceMax, setPriceMax] = useState(150);
  const [sort, setSort] = useState("Newest First");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 6;

  const urlCategory = searchParams.get("category");

  useEffect(() => {
    if (urlCategory) {
      setCheckedCats([urlCategory]);
    } else {
      setCheckedCats([]);
    }
  }, [urlCategory]);

  const categoryParam = checkedCats.length ? checkedCats.join("|") : undefined;

  const sortParam =
    sort === "Price: Low to High"
      ? "priceAsc"
      : sort === "Price: High to Low"
        ? "priceDesc"
        : "newest";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryParam, priceMax, sortParam, currentPage],

    queryFn: () =>
      fetchProducts({
        category: categoryParam,
        maxPrice: priceMax,
        sort: sortParam,
        page: currentPage,
        limit,
      }),

    keepPreviousData: true,
  });

  const products = data?.products || data || [];

  const totalPages =
    data?.totalPages || Math.ceil((data?.total || 0) / limit) || 1;

  const toggleCat = (cat) => {
    const newCats = checkedCats.includes(cat) ? [] : [cat];

    setCheckedCats(newCats);
    setCurrentPage(1);

    if (newCats.length > 0) {
      setSearchParams({
        category: newCats[0],
      });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setCheckedCats([]);
    setPriceMax(150);
    setSort("Newest First");
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSortOpen(false);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center">
        <p className="text-[#7c746d] text-lg">Loading catalog...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center">
        <p className="text-[#7c746d] text-lg">Failed to load catalog.</p>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-[#f6f3ef] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
          {/* TOP */}
          <div className="anim-1 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            {/* LEFT */}
            <div className="mx-auto">
              <h1
                className="text-[#1d1b19] leading-none mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.6rem,5vw,4.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Curated Catalog
              </h1>

              <p className="text-[#7c746d] text-base">
                Showing {products.length} titles from independent presses
              </p>
            </div>

            {/* SORT */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-3 border-b border-[#c9beb3] pb-2 text-sm text-[#5e554d]"
              >
                <span className="uppercase tracking-[0.2em] text-[10px]">
                  Sort By
                </span>

                <span className="btn">{sort}</span>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-10 w-64 bg-white border border-[#e4dbd2] shadow-xl z-50">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSortChange(opt)}
                      className={`w-full text-left px-5 py-4 text-sm hover:bg-[#f3ede7] transition ${
                        sort === opt ? "bg-[#f3ede7]" : ""
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* SIDEBAR */}
            <aside className="lg:w-62 shrink-0 anim-2">
              {/* GENRE */}
              <div className="mb-12">
                <h3 className="uppercase tracking-[0.25em] text-[10px] text-[#8d8178] mb-5">
                  Genre
                </h3>

                <div className="space-y-4">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checkedCats.includes(cat)}
                        onChange={() => toggleCat(cat)}
                        className="w-4 h-4 accent-[#1d1b19]"
                      />

                      <span className="text-sm text-[#3d3834]">
                        {cat === "FICTION"
                          ? "Contemporary Fiction"
                          : cat === "CLASSIC"
                            ? "Classic Literature"
                            : cat === "PHILOSOPHY"
                              ? "Philosophy & Essays"
                              : cat === "POETRY"
                                ? "Poetry"
                                : "Art & Design"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AUTHORS */}
              <div className="mb-12">
                <h3 className="uppercase tracking-[0.25em] text-[10px] text-[#8d8178] mb-5">
                  Authors
                </h3>

                <div className="space-y-4">
                  {AUTHORS.map((author) => (
                    <button
                      key={author}
                      className="block text-sm text-[#3d3834] hover:text-black hover:bg-gray-100 transition"
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <div className="mb-12">
                <h3 className="uppercase tracking-[0.25em] text-[10px] text-[#8d8178] mb-5">
                  Price Range
                </h3>

                <input
                  type="range"
                  min={10}
                  max={150}
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#1d1b19]"
                />

                <div className="flex justify-between mt-3 text-xs text-[#8d8178]">
                  <span>$10</span>
                  <span>${priceMax}</span>
                </div>
              </div>

              {/* CLEAR */}
              <button
                onClick={clearFilters}
                className="btn uppercase tracking-[0.25em] text-[10px] border-b border-[#b8aca0] text-[#5f554d] hover:text-black transition"
              >
                Clear All Filters
              </button>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    to={`/shop/${product._id}`}
                    className={`product-card anim-3 shadow hover:shadow-xl p-4 rounded-2xl `}
                  >
                    {/* IMAGE */}
                    <div
                      className="overflow-hidden bg-[#ebe5df] mb-5 rounded-t-xl"
                      style={{
                        aspectRatio: "3/4",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>

                    {/* TITLE */}
                    <h3
                      className="text-[#1d1b19] leading-snug mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        fontSize: "clamp(1.1rem,2vw,1.6rem)",
                      }}
                    >
                      {product.name}
                    </h3>

                    {/* AUTHOR */}
                    <p className="text-[#7c746d] text-sm mb-3">
                      {product.brand || "Hafez Jayed"}
                    </p>

                    {/* PRICE + CATEGORY */}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[#1d1b19] text-sm font-medium">
                        ${product.price}
                      </p>

                      <span className="bg-[#ebe5df] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#6f655d]">
                        {product.category || "Fiction"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* EMPTY */}
              {products.length === 0 && (
                <div className="flex items-center justify-center px-6 bg-white rounded-2xl p-4 shadow">
                  <div className="relative text-center max-w-xl">
                    {/* SOFT GLOW */}
                    <div className="absolute inset-0 flex justify-center ">
                      <div className="w-72 h-72 bg-[#20242b] blur-[100px] rounded-full animate-ping" />
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10">
                      {/* ICON */}
                      <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 rounded-full border border-[#d8cdc3] bg-[#f1ebe4] flex items-center justify-center shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-[#d18851]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6l4 2"
                            />
                            <circle cx="12" cy="12" r="9" />
                          </svg>
                        </div>
                      </div>

                      {/* TITLE */}
                      <h2
                        className="text-[#1d1b19] mb-4 leading-none"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          fontSize: "clamp(2.5rem,5vw,4rem)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        No Books Found
                      </h2>

                      {/* DESCRIPTION */}
                      <p className="text-[#7c746d] leading-relaxed max-w-md mx-auto text-sm md:text-base mb-8">
                        We couldn't find any titles matching your current
                        filters. Try adjusting your categories or explore the
                        complete literary collection.
                      </p>

                      {/* BUTTON */}
                      <button
                        onClick={clearFilters}
                        className="h-12 px-8 bg-[#1d2430] text-white uppercase tracking-[0.22em] text-[10px] hover:bg-[#2b3547] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Explore All Books
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-20">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="text-[#7c746d] hover:text-black transition disabled:opacity-30"
                  >
                    <FaLessThan />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 text-sm transition ${
                          currentPage === page
                            ? "bg-[#1d2430] text-white"
                            : "text-[#5e554d] hover:bg-[#e7dfd7]"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="text-[#7c746d] hover:text-black transition disabled:opacity-30"
                  >
                    <FaGreaterThan />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
