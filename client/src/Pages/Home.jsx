import React from "react";
import HeroSection from "../Components/HeroSection";
import LightRays from "../Components/LightRays";
import FeaturesSection from "../Components/FeaturesSection";
import SolveAndEarn from "../Components/SolveAndEarn";
import FeedbackSection from "../Components/FeedbackSection";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function Home() {
  return (
    <>
    <Navbar/>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        <HeroSection />
      </div>
      <FeaturesSection />
      <SolveAndEarn/>
      <FeedbackSection/>
      <Footer/>
    </>
  );
}
