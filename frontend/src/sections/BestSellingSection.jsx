import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchBestSellers, addToCart } from "../api/api";
import { useAuth } from "../context/AuthContext";

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

.book-card img {
  transition: transform .7s ease;
}

.book-card:hover img {
  transform: scale(1.04);
}

.book-card {
  transition: transform .4s ease;
}

.book-card:hover {
  transform: translateY(-4px);
}
`;

const ANIM_CLASSES = ["anim-2", "anim-3", "anim-4", "anim-5"];

function SkeletonCard({ index }) {
  return (
    <div className={`${ANIM_CLASSES[index]} animate-pulse`}>
      <div className="aspect-[3/4] bg-neutral-200 mb-5" />

      <div className="space-y-3">
        <div className="h-2 bg-neutral-200 w-16" />
        <div className="h-5 bg-neutral-200 w-40" />
        <div className="h-3 bg-neutral-200 w-24" />
        <div className="h-4 bg-neutral-200 w-14" />
      </div>
    </div>
  );
}

export default function TrendingBooks() {
  const [added, setAdded] = useState({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bestSellers"],
    queryFn: () => fetchBestSellers(4),
    staleTime: 5 * 60 * 1000,
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId) => addToCart(productId, 1),

    onSuccess: (_, productId) => {
      setAdded((prev) => ({
        ...prev,
        [productId]: true,
      }));

      setTimeout(() => {
        setAdded((prev) => ({
          ...prev,
          [productId]: false,
        }));
      }, 2000);

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      if (error?.response?.status === 401) {
        navigate("/auth/login");
      }
    },
  });

  const handleAddToCart = (productId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    addToCartMutation.mutate(productId);
  };

  return (
    <>
      <style>{styles}</style>

      <section className="bg-[#f6f3ef] py-10 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* HEADER */}
          <div className="anim-1 text-center mb-16">
            <h2
              className="text-[#1d1b19] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem,5vw,4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Trending This Week
            </h2>

            <p className="text-[#7c746d] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Curated selections from our editors that are capturing the
              imagination of our readers worldwide.
            </p>
          </div>

          {/* LOADING */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          )}

          {/* ERROR */}
          {isError && (
            <div className="text-center py-20">
              <p
                className="text-[#7c746d] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                }}
              >
                Unable to load trending books.
              </p>

              <button
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["bestSellers"],
                  })
                }
                className="border border-[#cfc5bc] px-8 h-11 uppercase tracking-[0.25em] text-xs hover:bg-[#ece6df] transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* BOOK GRID */}
          {!isLoading && !isError && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className={`book-card ${ANIM_CLASSES[index]} shadow hover:shadow-xl p-4`}
                  >
                    {/* IMAGE */}
                    <div
                      className="relative overflow-hidden mb-5 cursor-pointer bg-[#ebe5df]"
                      style={{
                        aspectRatio: "3/4",
                      }}
                      onClick={() => navigate(`/shop/${product._id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* CATEGORY */}
                    <p className="uppercase tracking-[0.22em] text-[9px] text-[#9c8f85] mb-2">
                      {product.category || "Historical Fiction"}
                    </p>

                    {/* TITLE */}
                    <h3
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="cursor-pointer text-[#1d1b19] leading-snug hover:text-[#6e6259] transition mb-1"
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
                      {product.brand || "Marcus Thorne"}
                    </p>

                    {/* PRICE + BUTTON */}
                    <div className="flex items-center justify-between">
                      <p className="text-[#1d1b19] text-sm font-medium">
                        ${product.price?.toFixed(2)}
                      </p>

                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={addToCartMutation.isPending}
                        className={`btn bg-gray-200  text-[9px] uppercase tracking-[0.22em] border-b transition ${
                          added[product._id]
                            ? "text-[#1d1b19] border-[#1d1b19]"
                            : "text-[#8d8178] border-transparent hover:border-[#8d8178]"
                        }`}
                      >
                        {added[product._id] ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM LINK */}
              <div className="anim-5 text-center mt-16">
                <button
                  onClick={() => navigate("/shop")}
                  className="uppercase tracking-[0.3em] text-[10px] text-[#5f554d] border-b border-[#b9ada3] hover:text-[#1d1b19] transition"
                >
                  Explore the Full Catalog
                </button>
              </div>
            </>
          )}

          {/* EMPTY */}
          {!isLoading && !isError && products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg shadow hover:shadow-lg transition">
              <p
                className="text-[#7c746d]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                }}
              >
                No books available yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
