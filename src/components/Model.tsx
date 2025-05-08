"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { yellowImg } from "../utils"
import * as THREE from "three"
import ModelView from "./ModelView"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models } from "../constants"
import { animateWithGsapTimeline } from "../utils/animations"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ModelData {
  title: string
  color: string[]
  img: string
}

function Model() {
  const [size] = useState("small")
  const [activeView, setActiveView] = useState(1) // Track which view is active: 1 or 2

  const [model, setModel] = useState<ModelData>({
    title: "iPhone 15 Series in Natural Titanium",
    color: ["#8F8A81", "#FFE789", "#6F6C64"],
    img: yellowImg,
  })

  const cameraControlSmall = useRef(null)
  const cameraControlLarge = useRef(null)

  const small = useRef<THREE.Group>(new THREE.Group())
  const large = useRef<THREE.Group>(new THREE.Group())

  const [smallRotation, setSmallRotation] = useState<number>(0)
  const [largeRotation, setLargeRotation] = useState<number>(0)

  const [isAnimating, setIsAnimating] = useState(false)

  // Function to handle slider navigation
  const handleSlideChange = (direction: "next" | "prev") => {
    if (isAnimating) return // Prevent clicking during animation

    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        setActiveView(direction === "next" ? 2 : 1)
      },
    })

    if (direction === "next" && activeView === 1) {
      // Slide view1 out to the left and bring view2 in from the right
      tl.to("#view1", {
        xPercent: -100,
        duration: 1,
        ease: "power2.inOut",
      })
      tl.to(
        "#view2",
        {
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "<",
      )
    } else if (direction === "prev" && activeView === 2) {
      // Slide view2 out to the right and bring view1 in from the left
      tl.to("#view2", {
        xPercent: 100,
        duration: 1,
        ease: "power2.inOut",
      })
      tl.to(
        "#view1",
        {
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "<",
      )
    }
  }

  useEffect(() => {
    // Initialize positions
    gsap.set("#view1", { xPercent: 0 })
    gsap.set("#view2", { xPercent: 100 }) // Start off-screen to the right
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()

    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      })
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
    })
  }, [])

  return (
    <section className="sm:py-32 py-20 sm:px-10 px-5">
      <div className="mx-auto max-w-screen-xl">
        <h1
          id="heading"
          className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
        >
          Take A Closer Look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* Slider navigation buttons */}
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 flex flex-col gap-4">
              <button
                onClick={() => handleSlideChange("prev")}
                disabled={activeView === 1 || isAnimating}
                className={`p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm transition-opacity ${activeView === 1 || isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-zinc-700"}`}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => handleSlideChange("next")}
                disabled={activeView === 2 || isAnimating}
                className={`p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm transition-opacity ${activeView === 2 || isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-zinc-700"}`}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Slider indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all ${activeView === 1 ? "bg-white w-6" : "bg-white/50"}`}
                onClick={() => !isAnimating && activeView !== 1 && handleSlideChange("prev")}
              ></div>
              <div
                className={`w-2 h-2 rounded-full transition-all ${activeView === 2 ? "bg-white w-6" : "bg-white/50"}`}
                onClick={() => !isAnimating && activeView !== 2 && handleSlideChange("next")}
              ></div>
            </div>

            <div id="view1" className="absolute inset-0">
              <ModelView
                index={1}
                groupRef={small}
                gsapType="view1"
                controlRef={cameraControlSmall}
                setRotationState={setSmallRotation}
                item={model}
                size={size}
              />
            </div>

            <div id="view2" className="absolute inset-0">
              <ModelView
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={cameraControlLarge}
                setRotationState={setLargeRotation}
                item={model}
                size={size}
              />
            </div>

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root") || undefined}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm text-center font-light">{model.title}</p>

            <div className="flex justify-center items-center mt-4">
              <ul className="flex items-center justify-center px-3 py-3 rounded-full bg-zinc-800 backdrop-blur">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              {/* <div className="flex items-center justify-center p-1 rounded-full bg-zinc-900 backdrop-blur ml-3 gap-1 cursor-pointer transition-all">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="w-10 h-10 text-sm flex justify-center items-center rounded-full transition-all"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
