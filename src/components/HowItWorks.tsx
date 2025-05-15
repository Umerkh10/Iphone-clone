import { useGSAP } from "@gsap/react"
import "../App.css"
import { chipImg, frameImg, frameVideo } from "../utils"
import gsap from "gsap"
import { useRef } from "react"

function HowItWorks() {
    const videoRef = useRef(null)

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            duration: 2,
            scale: 2,
            ease: "power4.inOut"
        })
        gsap.from('.g-fadein', {
            scrollTrigger: {
                trigger: '.g-fadein',
                start: '20% bottom'
            },
            opacity: 0,
            duration: 1,
            scale: 1,
            ease: "circ.inOut"
        })
        gsap.fromTo(".animate-text",
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: ".animate-text",
                    start: "top 5%",
                    toggleActions: "play none none none",
                },
            },
        )
    }, [])
    return (
        <section className="sm:py-32 py-20 sm:px-10 px-5">
            <div className="mx-auto screen-max-width">
                <div id="chip" className="flex justify-center items-center w-full my-20">
                    <img src={chipImg} width={180} height={180} alt="" />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-6xl font-semibold text-center  capitalize"> A17 Pro Chip. <br /> A monster win for gaming</h2>
                    <p className="text-zinc-700 font-semibold text-xl md:text-2xl py-10 text-center">It's here. The biggest redesign in the history of Apple GPUs.</p>
                </div>

                <div className="mt-10 md:mt-20 mb-14">
                    <div className="relative h-full flex justify-center items-center">
                        <div className="overflow-hidden">
                            <img src={frameImg} className="bg-transparent relative z-10" alt="" />

                        </div>
                        <div className="absolute w-[95%] h-[90%] rounded-[56px] overflow-hidden">
                            <video className="pointer-events-none" playsInline muted autoPlay preload="none" ref={videoRef} src={frameVideo} typeof='video/mp4'></video>
                        </div>
                    </div>
                    <p className="text-zinc-700 text-center text-xl font-semibold mt-3">Honkai Star Rail</p>
                </div>

                <div className="flex md:flex-row flex-col justify-between items-center mx-auto gap-16 mt-10">
                    <div className=" flex flex-col items-center justify-center ">
                        <p className="text-zinc-500 max-w-md text-base  font-semibold animate-text">
                            A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                            <span className="text-white">
                                {" "}
                                Best graphic performance by far
                            </span>
                        </p>
                        <p className="text-zinc-500 max-w-md text-base  font-semibold animate-text ">
                            Mobile {' '}
                            <span className="text-white">
                                {" "} games will look and feel so imersive{' '}
                            </span>
                            with incredibly detailed enviroments and characters
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center items-center flex-col g-fadein">
                        <p className="text-gray-600 text-xl font-normal md:font-semibold">New</p>
                        <p className="text-white text-3xl md:text-5xl font-normal md:font-semibold my-2">Pro-class GPU</p>
                        <p className="text-gray-600 text-xl font-normal md:font-semibold">with 6 cores</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HowItWorks