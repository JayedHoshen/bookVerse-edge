"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineMenu } from "react-icons/ai";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/api";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", path: "/" },

  { label: "Catalog", path: "/shop" },

  {
    label: "Fiction",
    category: "FICTION",
  },

  {
    label: "Philosophy",
    category: "PHILOSOPHY",
  },

  {
    label: "Poetry",
    category: "POETRY",
  },

  {
    label: "History",
    category: "CLASSIC",
  },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  // ACTIVE NAV SYNC
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const currentCategory = params.get("category");

    if (location.pathname === "/") {
      setActive("Home");
    } else if (location.pathname.includes("/dashboard")) {
      setActive("Dashboard");
    } else if (location.pathname.includes("/shop")) {
      if (currentCategory) {
        const matchedLink = NAV_LINKS.find(
          (link) => link.category === currentCategory,
        );

        if (matchedLink) {
          setActive(matchedLink.label);
        } else {
          setActive("Catalog");
        }
      } else {
        setActive("Catalog");
      }
    }
  }, [location]);

  // CATEGORY CLICK
  const handleCategoryClick = (label, category, path) => {
    setActive(label);
    setMenuOpen(false);

    // HOME
    if (label === "Home") {
      navigate("/");
      return;
    }

    // CATALOG
    if (label === "Catalog") {
      navigate("/shop");
      return;
    }

    // CATEGORY FILTERS
    if (category) {
      navigate(`/shop?category=${category}`, {
        replace: true,
      });
    }
  };

  const getDashboardPath = () => {
    if (!user) return "/auth/login";
    if (user.role === "admin") return "/admin/dashboard";
    return "/user/dashboard";
  };

  // DASHBOARD
  const handleDashboardClick = () => {
    navigate(getDashboardPath());
    setActive("Dashboard");
    setMenuOpen(false);
  };

  // CART
  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/user/cart");
    } else {
      navigate("/auth/login");
    }
  };

  // ACCOUNT
  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate(getDashboardPath());
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <>
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
          <ul className="hidden lg:flex items-center gap-4">
            {NAV_LINKS.map(({ label, category, path }) => (
              <li key={label}>
                <button
                  onClick={() => handleCategoryClick(label, category, path)}
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

            {/* DASHBOARD LINK */}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleDashboardClick}
                  className={`relative text-sm uppercase tracking-[0.25em] transition-all duration-300 ${
                    active === "Dashboard"
                      ? "text-[#E7D7B7]"
                      : "text-neutral-500 hover:text-neutral-200"
                  }`}
                >
                  Dashboard
                  {active === "Dashboard" && (
                    <span className="absolute left-0 -bottom-3 w-full h-[1px] bg-[#E7D7B7]" />
                  )}
                </button>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 md:gap-4">
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

              <FaCartShopping className="text-white text-xl" />
            </button>

            {/* ACCOUNT */}
            <button
              onClick={handleAccountClick}
              className="btn btn-circle btn-ghost border border-neutral-800 hover:border-[#E7D7B7] hover:bg-[#171717]"
            >
              <VscAccount className="text-white text-xl" />
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden btn btn-circle btn-ghost border border-neutral-800"
            >
              <AiOutlineMenu className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden border-t border-neutral-800 bg-[#111111]">
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, category, path }) => (
                <button
                  key={label}
                  onClick={() => handleCategoryClick(label, category, path)}
                  className={`text-left text-sm uppercase tracking-[0.2em] transition ${
                    active === label ? "text-[#E7D7B7]" : "text-neutral-500"
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* MOBILE DASHBOARD */}
              {isAuthenticated && (
                <button
                  onClick={handleDashboardClick}
                  className={`text-left text-sm uppercase tracking-[0.2em] transition ${
                    active === "Dashboard"
                      ? "text-[#E7D7B7]"
                      : "text-neutral-500"
                  }`}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
