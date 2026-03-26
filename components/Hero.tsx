"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ScreenSpecIcon, SpeedSpecIcon, InclineSpecIcon, MagneticBrakeSpecIcon, RotatingDisplaySpecIcon, FoldingFunctionSpecIcon, PracticalCablePullSpecIcon, ElectricMotorSpecIcon, WorkoutVideoSpecIcon } from './SpecIcons';
import {
    ChevronLeft,
    ChevronRight,
    Star} from "lucide-react";

const MODELS = [
    { id: "pro", label: "sTread Pro" },
    { id: "row", label: "sRow" },
    { id: "bike", label: "sBike" },
    { id: "gym-pro", label: "sGym Pro" },
];

interface VideoPlayerProps {
    src: string;
    onEnded?: () => void;
    className?: string;
    isActive?: boolean;
}

function VideoPlayer({ src, onEnded, className = "", isActive = false }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [src, isActive]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={`w-full h-full object-contain ${className}`}
            muted
            playsInline
            onEnded={onEnded}
        />
    );
}

export function Hero() {
    const [activeModel, setActiveModel] = useState("pro");

    const handleNext = useCallback(() => {
        setActiveModel((current) => {
            const currentIndex = MODELS.findIndex((m) => m.id === current);
            const nextIndex = (currentIndex + 1) % MODELS.length;
            return MODELS[nextIndex].id;
        });
    }, []);

    const handlePrev = useCallback(() => {
        setActiveModel((current) => {
            const currentIndex = MODELS.findIndex((m) => m.id === current);
            const prevIndex = (currentIndex - 1 + MODELS.length) % MODELS.length;
            return MODELS[prevIndex].id;
        });
    }, []);

    // Auto-slider logic replaced by video onEnded callback

    return (
        <section
            className="relative w-screen overflow-hidden flex flex-col items-center pt-3 h-screen"
            style={{ background: 'radial-gradient(66.64% 166.82% at 50% 0%, #e4e4f3ff 0%, #babffcff 100%)' }}
        >
            {/* Header */}
            <h1
                className="text-2xl sm:text-3xl md:text-4xl text-gray-900 text-center mb-4 h-[3vh] px-4 sm:px-0"
                style={{ fontFamily: "var(--font-sohne), Söhne, sans-serif", fontWeight: 600 }}
            >
                Discover Our Premium Model
            </h1>

            {/* Model Selector Tabs */}
            <div className="flex items-center justify-center p-1 h-[6vh] gap-2 sm:gap-1 bg-[#FFFFFF]/30 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/20 mx-4 sm:mx-0">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`px-4 sm:px-8 py-2 sm:py-0 h-full flex items-center justify-center rounded-full transition-all duration-300 ${activeModel === model.id
                            ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                            : "text-gray-600 hover:text-gray-900 border border-[#2b59c3]/0"
                            }`}
                        style={{
                            fontFamily: "var(--font-sohne), Söhne, sans-serif",
                            fontWeight: 500,
                            letterSpacing: "-0.1px",
                        }}
                    >
                        <span className="text-[14px] sm:text-[16px] leading-[1.2] sm:leading-[28px] whitespace-nowrap">{model.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="h-[71vh] w-full relative flex items-center justify-center ">

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between w-full max-w-6xl mx-auto px-4 pointer-events-none z-10">
                    <button
                        onClick={handlePrev}
                        className="pointer-events-auto text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="pointer-events-auto text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>


                {/* Product Image */}
                <div className="relative h-[90%] w-full min-h-0 ">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/pro.webm"
                                        className="scale-120 -translate-y-4 "
                                        isActive={activeModel === "pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="/videos/row.webm"
                                        className="scale-130 -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === "row"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="/videos/bike.webm"
                                        className="scale-130 -translate-y-4 md:scale-100 md:-translate-y-6"
                                        isActive={activeModel === "bike"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-100 -translate-y-6"
                                        isActive={activeModel === "gym-pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - Glass Pill Layout */}
            <div className=" w-[60vw] h-[11vh] px-4 bg-[#FFFFFF99]/60 backdrop-blur-md rounded-[24px] flex flex-col lg:flex-row items-center justify-between border border-white/40 shadow-sm gap-4 lg:gap-0">

                {/* Left: Rating, Name & Price */}
                <div className="flex flex-col sm:flex-row items-center lg:h-full gap-2 sm:gap-5 w-full lg:w-auto text-center sm:text-left">
                    {/* Rating & Name */}
                    <div className="flex flex-col items-center sm:items-start justify-center min-w-[120px]">
                        <div className="flex items-center">
                            <div className="flex gap-[2px]">
                                {[1,2,3,4].map(i => <Star key={i} size={14} fill="#DABC09" stroke="#DABC09" strokeWidth={1} />)}
                                <Star size={14} fill="transparent" stroke="#4B5563" strokeWidth={1.5} />
                            </div>
                            <span className="text-gray-900 font-bold text-[11px] ml-1.5 mt-0.5 tracking-tight">610</span>
                        </div>
                        <h2 className="text-[22px] sm:text-[26px] leading-[1.1] font-black text-[#1E1E1E] tracking-tight mt-1">{MODELS.find(m => m.id === activeModel)?.label}</h2>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden lg:block w-[1px] h-[48px] bg-[#929292] opacity-60 mx-[2px]"></div>

                    {/* Price Block */}
                    <div className="flex sm:flex-col h- items-center sm:items-start justify-center gap-2 sm:gap-0">
                        <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-1 sm:gap-2 sm:mb-0.5">
                            <span className="text-[#828282] line-through text-[11px] font-medium hidden sm:inline-block">2.299,00 €</span>
                            <span className="bg-[#376F7B] text-white text-[9px] font-bold px-2 py-[2px] rounded-full tracking-wide">SPARE HEUTE 400 €</span>
                        </div>
                        <div className="flex items-baseline gap-1 sm:mt-0.5">
                            <span className="text-[20px] sm:text-[24px] leading-none font-black text-[#1E1E1E]">1.899,00 €</span>
                            <span className="text-[#1E1E1E]/60 text-[9px] font-medium ml-1">VAT included.</span>
                        </div>
                    </div>
                </div>

                {/* Center: Specs Bar (nested outline pill) */}
                <div className="flex w-[1164px] lg:w-auto justify-start sm:justify-center items-center h-[90px]">
                    <div className="flex items-center justify-between p-[11.76px] px-[20px] rounded-[24px] border-[1px] border-black/50 bg-transparent w-[460px] h-[80%] opacity-100">

                            {activeModel === "gym-pro" ? (
                            // sGym Pro Specs
                            <>
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Practical cable Pull Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <PracticalCablePullSpecIcon />
                                </div>

                                {/* Folding Function Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <FoldingFunctionSpecIcon />
                                </div>

                                {/* Electric Motor Spec (Last item, no divider needed) */}
                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <ElectricMotorSpecIcon />
                                </div>
                            </>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <>
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Magnetic Brake Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <MagneticBrakeSpecIcon />
                                </div>

                                {/* Rotating Display Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <RotatingDisplaySpecIcon />
                                </div>

                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <WorkoutVideoSpecIcon />
                                </div>
                            </>

                        ) : (
                            // Default Treadmill Specs
                            <>
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Speed Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <SpeedSpecIcon />
                                </div>

                                {/* Incline Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:-right-[14px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <InclineSpecIcon />
                                </div>

                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <WorkoutVideoSpecIcon />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex justify-center lg:justify-end lg:h-full items-center w-full lg:w-auto">
                    <button className="group flex items-center justify-center w-[220px] lg:w-[175px] h-[48px] lg:h-[40px] bg-[#1E1E1E] hover:bg-black text-white rounded-full font-bold text-[14px] lg:text-[13px] transition-all whitespace-nowrap">
                        Discover {MODELS.find(m => m.id === activeModel)?.label}
                        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div >
        </section >
    );
}
