import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo,smallHeroVideo } from "../utils"
import { useState } from "react"

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth <760 ? smallHeroVideo:heroVideo);
  
  useGSAP(() => {
    gsap.to('#hero',{
      opacity: 1,
      delay: 0.8,
      ease:'power2.inOut'
    })
  },[])
  return (
    <section className="w-full h-[calc(100vh-60px)] bg-black relative">
      <div className="h-5/6 w-full flex justify-center items-center flex-col">
        <h1 id="hero" className=" text-center font-semibold text-3xl text-gray-100 opacity-0 max-md:mb-10  max-sm:mt-10">Apple Iphone 15 Series</h1>
        <div className="md:w-10/12 w-9/12">
        <video autoPlay muted playsInline={true} key={videoSrc}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        </div>
      </div>
    </section>
  )
}

export default Hero