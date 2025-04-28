import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState<any[]>([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;


    useGSAP(() =>{
        gsap.to('#video' ,{
            scrollTrigger:{
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd , videoId])

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause();
            } else {
                startPlay && videoRef.current[videoId]?.play()
            }
        }

    }, [startPlay, videoId, isPlaying, loadedData])
    
    const handleLoadedMetadata =(i:any , e:any) => setLoadedData ((pre) => [...pre, e])

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: (() => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !=currentProgress) {
                        currentProgress = progress;
                        
                        gsap.to(videoDivRef.current[videoId],{
                            width: window.innerWidth < 760
                            ? '10vw'
                            : window.innerWidth < 1200
                            ? '10vw'
                            : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                }),

                onComplete: (() => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId],{
                            width: '12px'
                        })
                        gsap.to(span[videoId],{
                            backgroundColor: '#afafaf'
                        })
                    }
                }),
            })

            if (videoId === 0) {
                anim.restart()
            }
        }

    }, [videoId, startPlay])

    const handleProcess = (type: string, i: number) => {
        switch (type) {
            case 'video-end':
                setVideo((pre) => ({ ...pre, isEnd: true , videoId: i+1 }));
                break;
            case 'video-last':
                setVideo((pre) => ({...pre, isLastVideo:true}));
                break;
            case 'video-reset':
                setVideo((pre) => ({...pre, isLastVideo:false, videoId:0}));
                break;
            case 'play':
                setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}));
                break;

            default:
                return video
        }
    };

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
                            <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                                <video id="video" playsInline={true} preload="auto" muted
                                    ref={(el) => { videoRef.current[i] = el; }}
                                    onPlay={() => { setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true })) }}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(i,e)}>
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="md:text-2xl text-xl font-medium"> {text} </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex justify-center items-center mt-10">
                <div className="flex justify-center items-center py-5 px-7 bg-zinc-800 backdrop-blur-md rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span key={i} ref={(el) => { videoDivRef.current[i] = el; }}
                            className="mx-2 w-3 h-3 bg-gray-500 rounded-full relative cursor-pointer">
                            <span className="absolute h-full w-full rounded-full" ref={(el) => { videoSpanRef.current[i] = el; }}>   </span>
                        </span>
                    ))}
                </div>
                <button className="ml-4 p-4 rounded-full bg-gray-700 backdrop-blur-md flex justify-center items-center">
                    <img 
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                        onClick={() => 
                            isLastVideo 
                                ? handleProcess('video-reset', 0) 
                                : (!isPlaying 
                                    ? handleProcess('play', videoId) 
                                    : handleProcess('pause', videoId)
                                )
                        } 
                    />
                </button>
            </div>


        </>
    )
}

export default VideoCarousel