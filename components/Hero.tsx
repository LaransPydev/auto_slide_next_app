"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Gauge,
    Monitor,
    Maximize,
    TrendingUp,
    ArrowRight,
    PlayCircle,
    Smartphone,
    Activity
} from "lucide-react";

const SPECS = [
    {
        id: "speed",
        label: "20 km/h",
        sub: "max",
        icon: <Gauge size={24} />,
    },
    {
        id: "screen",
        label: '21.5"',
        sub: "w/BT",
        icon: <Monitor size={24} />,
    },
    {
        id: "surface",
        label: "Large",
        sub: "Running Surface",
        icon: <Maximize size={24} />,
    },
    {
        id: "incline",
        label: "15",
        sub: "Incline Levels",
        icon: <TrendingUp size={24} />,
    },
];

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
}

function VideoPlayer({ src, onEnded, className = "" }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={`w-full h-full object-contain drop-shadow-2xl ${className}`}
            autoPlay
            muted
            playsInline
            loop
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

    // Auto-slider logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [activeModel, handleNext]);

    return (
        <section className="relative w-full h-[95vh] bg-[#E0E7FF] overflow-hidden flex flex-col items-center">

            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Discover Our Treadmills Specific Model
            </h1>

            {/* Model Selector Tabs */}
            <div className="flex items-center  bg-[#d5dbe9]/40 backdrop-blur-md rounded-full mb-2 border border-white/20">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeModel === model.id
                            ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                            : "text-gray-600 hover:text-gray-900 border border-transparent"
                            }`}
                    >
                        {model.label}
                    </button>
                ))}
            </div>
            {/* Main Content Area */}
            <div className="flex-1 w-full relative flex items-center justify-center">

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 lg:left-0 text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block z-10"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-4 lg:right-0 text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block z-10"
                >
                    <ChevronRight size={32} />
                </button>


                {/* Product Image */}
                <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/pro.webm"
                                        className="scale-125 -translate-y-6"
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="/videos/row.webm"
                                        className="scale-125 -translate-y-20 md:-translate-y-32 xl:-translate-y-50"
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="/videos/bike.webm"
                                        className="scale-100 -translate-y-12 translate-x-15"
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-100 -translate-y-4"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - Single Row Layout */}
            <div className="w-full max-w-[1400px] flex flex-col xl:flex-row items-center  mb-120">

                {/* Left: Rating & Name */}
                <div className="flex flex-col items-center xl:items-start min-w-[200px]">
                    <div className="flex items-center text-yellow-400">
                        <div className="flex gap-0.5">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" className="text-gray-400/50" />
                        </div>
                        <span className="text-gray-900 font-bold text-sm mt-0.5">670</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{MODELS.find(m => m.id === activeModel)?.label}</h2>
                </div>

                {/* Center: Specs Bar */}
                <div className="flex-1 h-[95px] w-full xl:w-auto overflow-x-auto no-scrollbar flex justify-center">
                    <div className="flex items-center justify-center px-6 py-2 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-white/60">

                        {activeModel === "gym-pro" ? (
                            // sGym Pro Specs
                            <div className="flex h-100px items-center gap-8 md:gap-16 min-w-max">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-md px-3 py-2 min-h-[64px] flex flex-col items-center justify-center">
                                            {/* Bracket Cuts */}
                                            <div className="absolute top-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>

                                            <span className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-1">21.5"</span>
                                            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide leading-none">with</span>
                                            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide leading-none">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Folding Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-lg px-4 py-2 min-h-[64px] flex flex-col items-center justify-between">
                                            <div className="absolute top-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>

                                            <div className="flex flex-col items-center leading-none mb-1.5">
                                                <span className="text-[9px] font-bold text-gray-600">Folding</span>
                                                <span className="text-[9px] font-bold text-gray-600">Function</span>
                                            </div>
                                            {/* Custom Folding Icon */}
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
                                                <path d="M6 3V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M6 13L16 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M11 13L18 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* App Spec */}
                                <div className="flex items-center justify-center min-w-[100px]">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-lg px-3 py-2 min-h-[64px] flex flex-col items-center justify-center">
                                            <div className="absolute top-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[20%] right-[20%] h-[2px] bg-white z-10"></div>

                                            <div className="relative mb-1.5">
                                                <Smartphone size={22} className="text-gray-900" strokeWidth={1.5} />
                                                <Activity size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 fill-white" />
                                            </div>
                                            <div className="flex flex-col items-center leading-none">
                                                <span className="text-[8px] font-bold text-gray-600">Fitness app</span>
                                                <span className="text-[8px] font-bold text-gray-600">compatible</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <div className="flex items-center gap-8 md:gap-16 min-w-max">
                                {/* Screen Spec (Row) */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-md px-2 py-0.5">
                                            {/* Bracket Cuts */}
                                            <div className="absolute top-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>

                                            <span className="text-3xl font-black text-gray-900 tracking-tighter">21.5"</span>
                                            <div className="absolute -bottom-4 w-full text-center">
                                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">with</span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-600 mt-4">Sportstech Live</span>
                                    </div>
                                </div>

                                {/* Workout Video Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-lg px-4 py-2">
                                            <div className="absolute top-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <PlayCircle size={24} className="text-gray-900 fill-gray-900/20" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex flex-col items-center mt-3 leading-tight">
                                            <span className="text-[9px] font-bold text-gray-600">Workout</span>
                                            <span className="text-[9px] font-bold text-gray-600">Video</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fitness App Spec */}
                                <div className="flex items-center justify-center min-w-[100px]">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-lg px-4 py-2">
                                            <div className="absolute top-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <div className="relative">
                                                <Smartphone size={24} className="text-gray-900" strokeWidth={1.5} />
                                                <Activity size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 fill-white" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center mt-3 leading-tight">
                                            <span className="text-[9px] font-bold text-gray-600">Fitness app</span>
                                            <span className="text-[9px] font-bold text-gray-600">compatible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Default Treadmill Specs
                            <div className="flex items-center justify-between gap-6 md:gap-12 min-w-max">
                                {/* Speed Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-start relative px-2">
                                        {/* Top Line */}
                                        <div className="w-[120%] h-0.5 bg-gray-900 absolute -top-1 left-0"></div>

                                        <div className="flex items-baseline gap-1 relative z-10">
                                            <span className="text-4xl font-black text-gray-900 tracking-tighter">20</span>
                                            <div className="flex flex-col leading-none">
                                                <span className="text-[10px] font-bold text-gray-600">km/h</span>
                                                <span className="text-[9px] font-black text-white bg-black px-1 py-[1px] rounded-[1px]">MAX</span>
                                            </div>
                                        </div>

                                        {/* Bottom Line */}
                                        <div className="w-[120%] h-0.5 bg-gray-900 absolute -bottom-1 right-0"></div>
                                        {/* Decor lines */}
                                        <div className="w-[100%] h-[1px] bg-gray-400 absolute -top-2 left-6"></div>
                                    </div>
                                </div>

                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[120px] pb-4 border-r border-gray-300/60 pr-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative border-2 border-gray-900 rounded-md px-2 py-0.5">
                                            {/* Bracket Cuts */}
                                            <div className="absolute top-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>
                                            <div className="absolute bottom-[-2px] left-[25%] right-[25%] h-[2px] bg-white z-10"></div>

                                            <span className="text-3xl font-black text-gray-900 tracking-tighter">21.5"</span>
                                            <div className="absolute -bottom-4 w-full text-center">
                                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">with</span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-600 mt-4">Sportstech Live</span>
                                    </div>
                                </div>

                                {/* Surface Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-8">
                                    <div className="relative flex flex-col items-center justify-center pt-1">
                                        <svg width="60" height="35" viewBox="0 0 70 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
                                            <path d="M18 5H52L62 40H8L18 5Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
                                            <path d="M15 12L13 16" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M55 12L57 16" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                                            <span className="text-[9px] font-bold text-gray-800 leading-none">Large</span>
                                            <span className="text-[9px] font-bold text-gray-800 leading-none my-[1px]">Running</span>
                                            <span className="text-[9px] font-bold text-gray-800 leading-none">Surface</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Incline Spec */}
                                <div className="flex items-center justify-center min-w-[100px]">
                                    <div className="flex items-end gap-1.5">
                                        <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">15</span>
                                        <div className="flex flex-col justify-end pb-0.5 gap-0.5">
                                            <div className="flex items-end gap-[2px] h-5 mb-0.5">
                                                <div className="w-[3px] h-[30%] bg-gray-900 rounded-[1px]"></div>
                                                <div className="w-[3px] h-[45%] bg-gray-900 rounded-[1px]"></div>
                                                <div className="w-[3px] h-[60%] bg-gray-900 rounded-[1px]"></div>
                                                <div className="w-[3px] h-[75%] bg-gray-900 rounded-[1px]"></div>
                                                <div className="w-[3px] h-[90%] bg-gray-900 rounded-[1px]"></div>
                                                <div className="w-[3px] h-[100%] bg-gray-900 rounded-[1px]"></div>
                                            </div>
                                            <div className="flex flex-col leading-none">
                                                <span className="text-[9px] font-bold text-gray-600">Incline</span>
                                                <span className="text-[9px] font-bold text-gray-600">Levels</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex justify-end min-w-[200px]">
                    <button className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-black text-white pl-8 pr-6 py-3.5 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                        Discover more
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div >
        </section >
    );
}
