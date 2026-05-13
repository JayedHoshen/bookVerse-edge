import React from "react";
import HeroSection from "../sections/HeroSection";
import CategorySection from "../sections/CategorySection";
import BestSellers from "../sections/BestSellingSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <BestSellers />
    </div>
  );
};

export default Home;
