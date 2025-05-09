"use client"

import { useGSAP } from "@gsap/react"
import "../App.css"
import { explore1Img, explore2Img, exploreVideo } from "../utils"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Features() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Simplified GSAP setup
  useGSAP(() => {
    // ===== VIDEO ANIMATION =====
    // Simple video fade in and play/pause on scroll
    gsap.fromTo(
      "#explorevideo",
      { opacity: 0.7 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#explorevideo",
          start: "top 85%",
          toggleActions: "play pause restart none",
          onEnter: () => videoRef.current?.play(),
          onEnterBack: () => videoRef.current?.play(),
          onLeave: () => videoRef.current?.pause(),
          onLeaveBack: () => videoRef.current?.pause(),
        },
      },
    )

    // ===== TITLE ANIMATION =====
    // Animate the main title when scrolled into view
    gsap.fromTo(
      "#features-title",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#features-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    )

    // ===== IMAGE ANIMATIONS =====
    // Scale images from 2x to 1x over 4 seconds when scrolled into view
    gsap.fromTo(
      ".image-grow",
      { scale: 2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 4, 
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".image-grow",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    )

    // ===== TEXT ANIMATIONS =====
    // Animate paragraphs from bottom to their position
    gsap.fromTo(
      ".animate-text",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".animate-text",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    )

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="h-full bg-black relative overflow-hidden sm:py-32 py-20 sm:px-10 px-5">
      <div className="mx-auto screen-max-width">
        {/* Title Section */}
        <div className="mb-12 w-full">
          <h1 id="features-title" className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium">
            Explore The Full Story
          </h1>
        </div>

        {/* Subtitle Section */}
        <div className="mt-32 mb-12 lg:pl-40 px-10">
          <h2 className="text-4xl lg:text-7xl font-semibold">iPhone</h2>
          <h2 className="text-4xl lg:text-7xl font-semibold capitalize">Forged in titanium</h2>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="flex justify-center items-center flex-col sm:px-10">
            {/* Video Section */}
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="explorevideo"
                className="w-full h-full object-center object-cover rounded-xl"
                preload="none"
                muted
                ref={videoRef}
                loop
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              {/* Images Section */}
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img || "/placeholder.svg"}
                    alt="titanium"
                    className="w-full h-full object-cover object-center rounded-xl image-grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img || "/placeholder.svg"}
                    alt="titanium"
                    className="w-full h-full object-cover object-center rounded-xl image-grow"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full flex justify-center items-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-zinc-500 max-w-md text-base md:text-xl font-semibold animate-text">
                    The iPhone 15 Pro redefines performance and elegance with
                    <span className="text-white">
                      {" "}
                      its aerospace-grade titanium design and the powerful A17 Pro chip.
                    </span>
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center mt-4">
                  <p className="text-zinc-500 max-w-md text-base md:text-xl font-semibold animate-text">
                    From immersive gaming to pro-level photography, it delivers breakthrough capabilities in a
                    remarkably light and durable form. With advanced camera features, all-day battery life, and USB‑C
                    connectivity,
                    <span className="text-white">
                      {" "}
                      the iPhone 15 Pro is built for those who expect more from their smartphone.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
