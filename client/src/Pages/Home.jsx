import React, { useEffect } from "react";
import HeroSection from "../Components/HeroSection";
import LightRays from "../Components/LightRays";
import FeaturesSection from "../Components/FeaturesSection";
import SolveAndEarn from "../Components/SolveAndEarn";
import FeedbackSection from "../Components/FeedbackSection";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet";
import InfiniteScroll from "../Components/InfiniteScroll";
import Lenis from "@studio-freight/lenis";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>TaskTribe – Student Collaboration Platform</title>
        <meta
          name="description"
          content="TaskTribe is a student-only platform to post academic tasks, collaborate, clear doubts, and build campus networks."
        />
      </Helmet>

      <Navbar />
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
      <SolveAndEarn />
      <FeedbackSection />
      <Footer />
    </>
  );
}
