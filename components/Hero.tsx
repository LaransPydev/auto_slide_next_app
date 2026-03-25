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
            className="relative w-full overflow-hidden flex flex-col items-center pt-3 h-full"
            style={{ background: 'radial-gradient(66.64% 166.82% at 50% 0%, #e4e4f3ff 0%, #babffcff 100%)' }}
        >
            {/* Header */}
            <h1
                className="text-3xl md:text-4xl text-gray-900 text-center mb-4 h-[4%]"
                style={{ fontFamily: "var(--font-sohne), Söhne, sans-serif", fontWeight: 600 }}
            >
                Discover Our Premium Model
            </h1>

            {/* Model Selector Tabs */}
            <div className="flex items-center justify-center p-1 h-[6%] bg-[#FFFFFF]/30 backdrop-blur-md rounded-full border border-white/20 ">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`px-8 h-full flex items-center justify-center rounded-full transition-all duration-300 ${activeModel === model.id
                            ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                            : "text-gray-600 hover:text-gray-900 border border-[#2b59c3]/0"
                            }`}
                        style={{
                            fontFamily: "var(--font-sohne), Söhne, sans-serif",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "28px",
                            letterSpacing: "-0.1px",
                        }}
                    >
                        {model.label}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="h-[71%] w-full relative flex items-center justify-center ">

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
                                        className="scale-150 "
                                        isActive={activeModel === "pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="/videos/row.webm"
                                        className="scale-160  -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === "row"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="/videos/bike.webm"
                                        className="scale-125"
                                        isActive={activeModel === "bike"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-125"
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
            <div className="absolute bottom-10 lg:bottom-12 mx-auto left-0 right-0 w-full max-w-[1164px] h-auto lg:h-[90px] px-6 lg:px-8 py-2 lg:py-0 bg-[#FFFFFF99]/60 backdrop-blur-md rounded-[24px] flex flex-col lg:flex-row items-center justify-between z-30 border border-white/40 shadow-sm">

                {/* Left: Rating, Name & Price */}
                <div className="flex items-center h-full gap-5">
                    {/* Rating & Name */}
                    <div className="flex flex-col items-start justify-center min-w-[120px]">
                        <div className="flex items-center">
                            <div className="flex gap-[2px]">
                                {[1,2,3,4].map(i => <Star key={i} size={14} fill="#DABC09" stroke="#DABC09" strokeWidth={1} />)}
                                <Star size={14} fill="transparent" stroke="#4B5563" strokeWidth={1.5} />
                            </div>
                            <span className="text-gray-900 font-bold text-[11px] ml-1.5 mt-0.5 tracking-tight">610</span>
                        </div>
                        <h2 className="text-[26px] leading-[1.1] font-black text-[#1E1E1E] tracking-tight mt-1">{MODELS.find(m => m.id === activeModel)?.label}</h2>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden lg:block w-[1px] h-[48px] bg-[#929292] opacity-60 mx-[2px]"></div>

                    {/* Price Block */}
                    <div className="hidden lg:flex flex-col items-start justify-center">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[#828282] line-through text-[11px] font-medium">2.299,00 €</span>
                            <span className="bg-[#376F7B] text-white text-[9px] font-bold px-2 py-[2px] rounded-full tracking-wide">SPARE HEUTE 400 €</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-[24px] leading-none font-black text-[#1E1E1E]">1.899,00 €</span>
                            <span className="text-[#1E1E1E]/60 text-[9px] font-medium ml-1">VAT included.</span>
                        </div>
                    </div>
                </div>

                {/* Center: Specs Bar (nested outline pill) */}
                <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar flex justify-center items-center h-full lg:mx-6 mt-6 lg:mt-0">
                    <div className="flex items-center justify-between p-[11.76px] rounded-[24px] border border-black/50 bg-transparent w-[460px] h-[75px] shrink-0">

                            {activeModel === "gym-pro" ? (
                            // sGym Pro Specs
                            <div className="flex items-center justify-between w-full h-full gap-2">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Practical cable Pull Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <PracticalCablePullSpecIcon />
                                </div>

                                {/* Folding Function Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <div className="relative w-full h-full flex flex-col items-center justify-center">

                                        {/* Folding Icon */}
                                            <FoldingFunctionSpecIcon />

                                      
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ElectricMotorSpecIcon />
                                </div>
                                </div>
                            </div>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <div className="flex items-center justify-between w-full h-full gap-2">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Magnetic Brake Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <MagneticBrakeSpecIcon />
                                </div>

                                {/* Rotating Display Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <RotatingDisplaySpecIcon />
                                </div>

                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <WorkoutVideoSpecIcon />
                                </div>
                            </div>

                        ) : (
                            // Default Treadmill Specs
                            <div className="flex items-center justify-between w-full h-full gap-2">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <ScreenSpecIcon />
                                </div>

                                {/* Speed Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <SpeedSpecIcon />
                                </div>

                                {/* Incline Spec */}
                                <div className="flex items-center justify-center w-[78px] h-[52px] relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-[27px] after:bg-black after:opacity-50">
                                    <InclineSpecIcon />
                                </div>

                                <div className="flex items-center justify-center w-[78px] h-[52px]">
                                    <WorkoutVideoSpecIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex justify-end lg:h-full items-center mt-6 lg:mt-0">
                    <button className="group flex items-center justify-center w-[175px] h-[40px] bg-[#1E1E1E] hover:bg-black text-white rounded-full font-bold text-[13px] transition-all whitespace-nowrap">
                        Discover {MODELS.find(m => m.id === activeModel)?.label}
                        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div >
        </section >
    );
}
