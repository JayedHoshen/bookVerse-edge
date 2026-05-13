"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/api";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Catalog", category: null },
  { label: "Fiction", category: "FICTION" },
  { label: "Philosophy", category: "PHILOSOPHY" },
  { label: "Poetry", category: "POETRY" },
  { label: "History", category: "HISTORY" },
];

export default function Navbar() {
  const [active, setActive] = useState("Catalog");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = Boolean(user);

  const cartCount =
    cartData?.data?.items?.reduce((total, item) => total + item.quantity, 0) ||
    0;

  const handleCategoryClick = (label, category) => {
    setActive(label);
    setMenuOpen(false);

    if (category) {
      const dashboardPath =
        user?.role === "admin"
          ? "/admin/dashboard"
          : `/shop?category=${category}`;

      navigate(dashboardPath, { replace: true });
    } else {
      navigate("/shop", { replace: true });
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/cart");
      }
    } else {
      navigate("/auth/login");
    }
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      const dashboardPath =
        user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

      navigate(dashboardPath);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-[#0F0F0F]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl md:text-4xl tracking-wide text-[#E7D7B7]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            BookVerse
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(({ label, category }) => (
              <li key={label}>
                <button
                  onClick={() => handleCategoryClick(label, category)}
                  className={`relative text-sm uppercase tracking-[0.25em] transition-all duration-300 ${
                    active === label
                      ? "text-[#E7D7B7]"
                      : "text-neutral-500 hover:text-neutral-200"
                  }`}
                >
                  {label}

                  {active === label && (
                    <span className="absolute left-0 -bottom-3 w-full h-[1px] bg-[#E7D7B7]" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* SEARCH */}
            <button className="btn btn-circle btn-ghost border border-neutral-800 hover:border-[#E7D7B7] hover:bg-[#171717]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#E7D7B7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* CART */}
            <button
              onClick={handleCartClick}
              className="relative btn btn-circle btn-ghost border border-neutral-800 hover:border-[#E7D7B7] hover:bg-[#171717]"
            >
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E7D7B7] text-black text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#E7D7B7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
              </svg>
            </button>

            {/* ACCOUNT */}
            <button
              onClick={handleAccountClick}
              className="btn btn-circle btn-ghost border border-neutral-800 hover:border-[#E7D7B7] hover:bg-[#171717]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#E7D7B7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden btn btn-circle btn-ghost border border-neutral-800"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#E7D7B7]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#E7D7B7]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden border-t border-neutral-800 bg-[#111111]">
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, category }) => (
                <button
                  key={label}
                  onClick={() => handleCategoryClick(label, category)}
                  className={`text-left text-sm uppercase tracking-[0.2em] transition ${
                    active === label ? "text-[#E7D7B7]" : "text-neutral-500"
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="border-t border-neutral-800 pt-5 flex flex-col gap-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/auth/login");
                        setMenuOpen(false);
                      }}
                      className="btn rounded-full bg-[#E7D7B7] text-black border-none hover:bg-[#d9c49f]"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={() => {
                        navigate("/auth/signup");
                        setMenuOpen(false);
                      }}
                      className="btn btn-outline rounded-full border-neutral-700 text-[#E7D7B7]"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleCartClick();
                        setMenuOpen(false);
                      }}
                      className="btn rounded-full bg-[#E7D7B7] text-black border-none"
                    >
                      Cart ({cartCount})
                    </button>

                    <button
                      onClick={() => {
                        handleAccountClick();
                        setMenuOpen(false);
                      }}
                      className="btn btn-outline rounded-full border-neutral-700 text-[#E7D7B7]"
                    >
                      {user?.role === "admin"
                        ? "Admin Dashboard"
                        : "My Account"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
