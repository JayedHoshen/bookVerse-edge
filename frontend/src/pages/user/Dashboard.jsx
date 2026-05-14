import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
  BookOpen,
  Package,
  BarChart3,
  Clock3,
  LogOut,
  ShoppingBag,
  User2,
  CheckCircle2,
  Truck,
  XCircle,
  ChevronRight,
  Bell,
  Star,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";

import {
  logoutUser,
  fetchOrders,
  fetchMyReviews,
  fetchMyReadingProgress,
  fetchReadingStats,
  updateReadingProgress,
  createReview,
  getCurrentUser,
} from "../../api/api";

import { useAuth } from "../../context/AuthContext";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');

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

@keyframes glow {
  0% {
    opacity: .6;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: .6;
  }
}

.anim-1 { animation: fadeUp .7s .1s ease both; }
.anim-2 { animation: fadeUp .7s .2s ease both; }
.anim-3 { animation: fadeUp .7s .3s ease both; }

.glow {
  animation: glow 4s ease infinite;
}

body {
  background: #f6f3ef;
}
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");

  const { data: ordersResponse, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchOrders,
  });

  const { data: reviewsResponse, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: fetchMyReviews,
  });

  const { data: readingProgressResponse, isLoading: isProgressLoading } =
    useQuery({
      queryKey: ["myReadingProgress"],
      queryFn: fetchMyReadingProgress,
    });

  const { data: readingStatsResponse, isLoading: isStatsLoading } = useQuery({
    queryKey: ["readingStats"],
    queryFn: fetchReadingStats,
  });

  const myOrders = ordersResponse?.data || [];
  const myReviews = reviewsResponse?.data || [];
  const readingProgress = readingProgressResponse?.data || [];
  const readingStats = readingStatsResponse?.data || {
    totalBooks: 0,
    completedBooks: 0,
    readingBooks: 0,
    totalPagesRead: 0,
    averageProgress: 0,
  };

  // LOGOUT
  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      logout();

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      sessionStorage.clear();

      navigate("/auth/login", {
        replace: true,
      });
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const currentBook = myOrders?.[0]?.items?.[0];

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-[#f6f3ef] overflow-hidden relative">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-[#d8c8b5]/20 blur-[120px] rounded-full glow" />

        <div className="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] bg-[#d8c8b5]/20 blur-[120px] rounded-full glow" />

        <div className="grid xl:grid-cols-[280px_1fr] min-h-screen relative z-10">
          {/* SIDEBAR */}
          <aside className="border-r border-[#e5ddd5] bg-[#f4f1ec]/90 backdrop-blur-xl">
            {/* USER */}
            <div className="px-8 py-8 border-b border-[#e5ddd5]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1d2430] text-white flex items-center justify-center shadow-lg">
                  <User2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-[#1d2430] font-medium">
                    {user?.username || user?.email}
                  </h3>

                  <p className="text-sm text-[#8d8178]">Premium Bibliophile</p>
                </div>
              </div>
            </div>

            {/* NAV */}
            <div className="p-5 space-y-2">
              <button
                onClick={() => setActiveSection("overview")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "overview"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="w-4 h-4 text-[#1d2430]" />

                  <span className="text-sm font-medium text-[#1d2430]">
                    Overview
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#8d8178]" />
              </button>

              <button
                onClick={() => setActiveSection("profile")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "profile"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <User2 className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">Profile</span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>

              <button
                onClick={() => setActiveSection("orders")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "orders"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <Package className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">Order History</span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>

              <button
                onClick={() => setActiveSection("library")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "library"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <ShoppingBag className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">My Library</span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>

              <button
                onClick={() => setActiveSection("progress")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "progress"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <Target className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">
                    Reading Progress
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>

              <button
                onClick={() => setActiveSection("analytics")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "analytics"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <BarChart3 className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">Analytics</span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>

              <button
                onClick={() => setActiveSection("reviews")}
                className={`group w-full flex items-center justify-between ${
                  activeSection === "reviews"
                    ? "bg-white border border-[#ddd4cb]"
                    : "hover:bg-white"
                } px-5 py-4 transition`}
              >
                <div className="flex items-center gap-4">
                  <Star className="w-4 h-4 text-[#7c746d]" />

                  <span className="text-sm text-[#5f5852]">My Reviews</span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#c0b6ac]" />
              </button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex flex-col">
            {/* TOPBAR */}
            <div className="h-24 border-b border-[#e5ddd5] bg-[#f6f3ef]/80 backdrop-blur-xl px-6 md:px-10 flex items-center justify-between">
              {/* LEFT */}
              <div>
                <p className="uppercase tracking-[0.18em] text-[10px] text-[#8d8178] mb-2">
                  Welcome Back
                </p>

                <h2
                  className="text-[#1d2430]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "2.8rem",
                    lineHeight: 1,
                  }}
                >
                  Reading Dashboard
                </h2>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-5">
                {/* NOTIFICATION */}
                <button className="w-11 h-11 border border-[#ddd4cb] bg-white flex items-center justify-center shadow-sm hover:shadow-md transition">
                  <Bell className="w-4 h-4 text-[#5f5852]" />
                </button>

                {/* CART */}
                <button
                  onClick={() => navigate("/user/cart")}
                  className="w-11 h-11 border border-[#ddd4cb] bg-white flex items-center justify-center shadow-sm hover:shadow-md transition"
                >
                  <ShoppingBag className="w-4 h-4 text-[#5f5852]" />
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-11 h-11 border border-[#ddd4cb] bg-white flex items-center justify-center shadow-sm hover:shadow-md transition"
                >
                  {logoutMutation.isPending ? (
                    <span className="text-[10px] text-[#8d8178]">...</span>
                  ) : (
                    <LogOut className="w-4 h-4 text-[#5f5852]" />
                  )}
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 p-6 md:p-10">
              <div className="grid 2xl:grid-cols-[1.2fr_.8fr] gap-10">
                {/* LEFT */}
                <div>
                  {/* CURRENT READING */}
                  <div className="anim-1 bg-white border border-[#e5ddd5] shadow-[0_20px_60px_rgba(20,20,20,0.04)] p-8 mb-10">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <p className="uppercase tracking-[0.18em] text-[10px] text-[#8d8178] mb-2">
                          Current Reading
                        </p>

                        <h3
                          className="text-[#1d2430]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: "2.5rem",
                          }}
                        >
                          Literary Journey
                        </h3>
                      </div>

                      <button className="text-sm text-[#9b6d63] hover:underline">
                        View Full Library
                      </button>
                    </div>

                    <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-center">
                      {/* IMAGE */}
                      <div className="bg-[#ebe5df] p-6 shadow-xl">
                        <img
                          src={
                            currentBook?.product?.image ||
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600"
                          }
                          alt=""
                          className="w-full h-[360px] object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div>
                        <p className="uppercase tracking-[0.2em] text-[10px] text-[#c97863] mb-4">
                          Active Now
                        </p>

                        <h2
                          className="text-[#1d2430] leading-none mb-5"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: "clamp(3rem,5vw,5rem)",
                          }}
                        >
                          {currentBook?.product?.name ||
                            "The Architecture of Happiness"}
                        </h2>

                        <p className="text-[#7c746d] text-sm mb-8">
                          by {currentBook?.product?.brand || "Alain de Botton"}
                        </p>

                        <p className="text-[#5f5852] leading-relaxed mb-10 max-w-xl">
                          Explore timeless perspectives and ideas through your
                          curated reading experience on BookVerse.
                        </p>

                        {/* PROGRESS */}
                        <div className="mb-10">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-[#5f5852]">
                              Reading Progress
                            </p>

                            <p className="text-sm text-[#8d8178]">68%</p>
                          </div>

                          <div className="h-[7px] bg-[#ece4db] overflow-hidden">
                            <div className="h-full w-[68%] bg-[#1d2430]" />
                          </div>
                        </div>

                        <button className="h-14 px-10 bg-[#1d2430] text-white uppercase tracking-[0.22em] text-[10px] hover:bg-[#2b3547] transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                          Continue Reading
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RECENT ORDERS */}
                  <div className="anim-2">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="uppercase tracking-[0.18em] text-[10px] text-[#8d8178] mb-2">
                          Purchase Activity
                        </p>

                        <h3
                          className="text-[#1d2430]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: "2.2rem",
                          }}
                        >
                          Recent Orders
                        </h3>
                      </div>

                      <Clock3 className="w-5 h-5 text-[#8d8178]" />
                    </div>

                    <div className="bg-white border border-[#e5ddd5] shadow-[0_20px_60px_rgba(20,20,20,0.04)] overflow-hidden">
                      {myOrders.slice(0, 5).map((order) => {
                        let statusColor = "text-[#7c746d]";

                        let statusIcon = <Clock3 className="w-4 h-4" />;

                        if (order.status === "DELIVERED") {
                          statusColor = "text-emerald-600";

                          statusIcon = <CheckCircle2 className="w-4 h-4" />;
                        }

                        if (order.status === "SHIPPED") {
                          statusColor = "text-blue-600";

                          statusIcon = <Truck className="w-4 h-4" />;
                        }

                        if (order.status === "CANCELLED") {
                          statusColor = "text-red-500";

                          statusIcon = <XCircle className="w-4 h-4" />;
                        }

                        return (
                          <div
                            key={order._id}
                            className="grid md:grid-cols-[1.4fr_.8fr_.8fr_.5fr] gap-5 items-center px-6 py-6 border-b border-[#f0e8df]"
                          >
                            {/* ITEM */}
                            <div className="flex items-center gap-5">
                              <div className="w-16 h-20 bg-[#ebe5df] overflow-hidden shadow-md">
                                <img
                                  src={order?.items?.[0]?.product?.image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div>
                                <h4 className="text-[#1d2430] font-medium mb-1">
                                  {order?.items?.[0]?.product?.name}
                                </h4>

                                <p className="text-sm text-[#8d8178]">
                                  Premium Edition
                                </p>
                              </div>
                            </div>

                            {/* DATE */}
                            <p className="text-sm text-[#5f5852]">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>

                            {/* STATUS */}
                            <div
                              className={`flex items-center gap-2 text-xs uppercase tracking-[0.16em] ${statusColor}`}
                            >
                              {statusIcon}

                              <span>{order.status}</span>
                            </div>

                            {/* PRICE */}
                            <p className="text-[#1d2430] font-semibold">
                              ${order.totalAmount?.toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-8">
                  {/* FEATURED */}
                  <div className="anim-2 bg-white border border-[#e5ddd5] shadow-[0_20px_60px_rgba(20,20,20,0.04)] p-7">
                    <p className="uppercase tracking-[0.18em] text-[10px] text-[#8d8178] mb-4">
                      Recommended Read
                    </p>

                    <div className="flex gap-6">
                      <div className="w-28 bg-[#ebe5df] overflow-hidden shadow-lg shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3
                          className="text-[#1d2430] mb-3"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: "2.3rem",
                          }}
                        >
                          Meditations
                        </h3>

                        <p className="text-sm text-[#8d8178] mb-5">
                          Marcus Aurelius
                        </p>

                        <div className="h-[6px] bg-[#ece4db] mb-5">
                          <div className="h-full w-[23%] bg-[#1d2430]" />
                        </div>

                        <p className="text-sm italic leading-relaxed text-[#5f5852]">
                          “The happiness of your life depends upon the quality
                          of your thoughts.”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* REVIEWS */}
                  <div className="anim-3">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="uppercase tracking-[0.18em] text-[10px] text-[#8d8178] mb-2">
                          Personal Notes
                        </p>

                        <h3
                          className="text-[#1d2430]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: "2.2rem",
                          }}
                        >
                          My Reviews
                        </h3>
                      </div>

                      <button className="text-sm text-[#9b6d63] hover:underline">
                        Write Review
                      </button>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-white border border-[#e5ddd5] shadow-[0_20px_60px_rgba(20,20,20,0.04)] p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-[#1d2430] font-medium">
                            The Overstory
                          </h4>

                          <span className="text-xs text-[#8d8178]">
                            2 days ago
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed text-[#5f5852]">
                          A magnificent and deeply reflective narrative about
                          interconnected lives, nature, and human emotion.
                        </p>
                      </div>

                      <div className="bg-white border border-[#e5ddd5] shadow-[0_20px_60px_rgba(20,20,20,0.04)] p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-[#1d2430] font-medium">Circe</h4>

                          <span className="text-xs text-[#8d8178]">
                            1 week ago
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed text-[#5f5852]">
                          Beautifully written, emotionally rich, and
                          unforgettable in its storytelling and atmosphere.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
