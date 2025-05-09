import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo,smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"
import '../App.css'

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth <760 ? smallHeroVideo:heroVideo);

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet)
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  },[])
  
  useGSAP(() => {
    gsap.to('#hero',{
      opacity: 1,
      delay: 1.5,
      ease:'power2.inOut'
    }),
    gsap.to('#cta',{
      opacity:1,
      translateY:'-50',
      ease:'sine.inOut',
      delay:'1.5'
    })
  },[])
  return (
    <section className="w-full h-[calc(100vh-60px)] bg-black relative mx-auto screen-max-width">
      <div className="h-5/6 w-full flex justify-center items-center flex-col ">
        <h1 id="hero" className=" text-center font-bold md:text-3xl text-xl text-zinc-300 opacity-0 max-md:mb-10  max-sm:mt-10">Apple Series 15</h1>
        <div className="md:w-10/12 w-9/12">
        <video autoPlay muted playsInline={true} key={videoSrc}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col translate-y-20 items-center opacity-0">
        <a href="#highlights" className="px-5 py-2 rounded-3xl bg-blue-500 my-5 hover:bg-blue-600 border border-transparent hover:border hover:text-blue hover:border-blue">Buy</a>
        <p className="text-xl font-medium">From $199 per month to $999</p>
      </div>
    </section>
  )
}

export default Hero