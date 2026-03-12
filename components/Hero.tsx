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
        <section className="relative w-full h-screen bg-[#E0E7FF] overflow-hidden flex flex-col items-center pt-3 ">

            {/* Header */}
            <h1
                className="text-3xl md:text-4xl text-gray-900 text-center mb-4"
                style={{ fontFamily: "var(--font-sohne), Söhne, sans-serif", fontWeight: 600 }}
            >
                Discover Our Premium Specific Model
            </h1>

            {/* Model Selector Tabs */}
            <div className="flex items-center justify-center p-1 h-[56px] bg-[#FFFFFF]/30 backdrop-blur-md rounded-full border border-white/20">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`px-8 h-full flex items-center justify-center rounded-full transition-all duration-300 ${activeModel === model.id
                            ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                            : "text-gray-600 hover:text-gray-900 border border-transparent"
                            }`}
                        style={{
                            fontFamily: "var(--font-sohne), Söhne, sans-serif",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "28px",
                            letterSpacing: "-0.1px",
                            textAlign: "center"
                        }}
                    >
                        {model.label}
                    </button>
                ))}
            </div>
            {/* Main Content Area */}
            <div className="h-[720px] w-full relative flex items-center justify-center">

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
                <div className="relative h-[60vh] w-full min-h-0 ">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/pro.webm"
                                        className="scale-140 -translate-y-4"
                                        isActive={activeModel === "pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="/videos/row.webm"
                                        className="scale-160 -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === "row"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="/videos/bike.webm"
                                        className="scale-200 -translate-y-4 md:scale-100 md:-translate-y-6"
                                        isActive={activeModel === "bike"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-120 -translate-y-6"
                                        isActive={activeModel === "gym-pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - Flex Flow at Bottom */}
            <div className="w-full h-[70px] max-w-[1400px] flex flex-col lg:flex-row items-center justify-between ">


                {/* Left: Rating & Name */}
                <div className="flex flex-col items-center xl:items-start min-w-[200px]">
                    <div className="flex items-center">
                        <div className="flex gap-[2px]">
                            <Star size={18} fill="#D4AF37" stroke="#D4AF37" />
                            <Star size={18} fill="#D4AF37" stroke="#D4AF37" />
                            <Star size={18} fill="#D4AF37" stroke="#D4AF37" />
                            <Star size={18} fill="#D4AF37" stroke="#D4AF37" />
                            <Star size={18} fill="transparent" stroke="#4B5563" strokeWidth={1.5} />
                        </div>
                        <span className="text-gray-900 font-bold ml-1.5 mt-0.5">610</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{MODELS.find(m => m.id === activeModel)?.label}</h2>
                </div>

                {/* Center: Specs Bar */}
                <div className="flex-1 w-full lg:w-auto overflow-x-auto no-scrollbar flex justify-center">
                    <div className="flex items-center justify-center px-6 py-2 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-white/60">

                        {activeModel === "gym-pro" ? (
                            // sGym Pro Specs
                            <div className="flex items-center justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[9px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Practical cable Pull Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Cable Pull Icon */}
                                        <div className="mb-1">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 2H20" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M12 2V6" stroke="#111827" strokeWidth="1.5" />
                                                <rect x="7" y="6" width="10" height="6" rx="1.5" stroke="#111827" strokeWidth="1.5" />
                                                <path d="M12 12V14" stroke="#111827" strokeWidth="1.5" />
                                                <path d="M9 15C9 14.5 9.5 14 10 14H14C14.5 14 15 14.5 15 15V17C15 17.5 14.5 18 14 18H13L12.5 20C12 20.5 11.5 20.5 11 20H10C9.5 19.5 9 19 9 18V15Z" fill="#111827" />
                                                <path d="M9 16H15 M9 17.5H15 M9 19H13" stroke="white" strokeWidth="1" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Practical cable Pull</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Folding Function Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Folding Icon */}
                                        <div className="mb-1 flex items-center justify-center pt-1">
                                            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="17" width="26" height="3" rx="1" fill="#111827" />
                                                <path d="M26 15 A 4 4 0 0 1 34 19 H 26 Z" fill="#111827" />
                                                <rect x="2" y="14" width="4" height="6" fill="#111827" rx="1" />
                                                <rect x="4.5" y="3" width="2.5" height="12" fill="#111827" />
                                                <rect x="3" y="3" width="5.5" height="2" fill="#111827" rx="0.5" />
                                                <path d="M7 16 L23 10 L24 13 L8 19 Z" stroke="#111827" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                                                <path d="M5.5 10 L25 14" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Folding Function</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Electric Motors Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Motor Icon */}
                                        <div className="mb-0.5">
                                            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g transform="translate(1, 2)">
                                                    <rect x="8" y="2" width="14" height="16" rx="2" fill="#111827" />
                                                    <rect x="5" y="4" width="3" height="12" rx="1" fill="#111827" />
                                                    <rect x="2" y="8" width="3" height="4" fill="#111827" />
                                                    <rect x="0" y="9" width="3" height="2" fill="#111827" />
                                                    <path d="M22 2 C 26 2, 26 18, 22 18 Z" fill="#111827" />
                                                    <line x1="8" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5" />
                                                    <line x1="8" y1="10" x2="23" y2="10" stroke="white" strokeWidth="1.5" />
                                                    <line x1="8" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1.5" />
                                                    <circle cx="5" cy="10" r="1.5" fill="white" />
                                                </g>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-tight gap-[1px]">
                                            <span className="text-[9px] font-bold text-gray-600">60 kg Electric</span>
                                            <span className="text-[9px] font-bold text-gray-600">Motors</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <div className="flex items-center justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Magnetic Brake Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Magnetic Brake Icon */}
                                        <div className="mb-1">
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {/* Outer arcs */}
                                                <path d="M9 5 C4 8 4 20 9 23" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                                                <path d="M19 5 C24 8 24 20 19 23" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                                                
                                                {/* Flywheel solid body */}
                                                <circle cx="14" cy="14" r="5.5" fill="#111827" />
                                                
                                                {/* Center dot */}
                                                <circle cx="14" cy="14" r="1.5" fill="white" />
                                                
                                                {/* Minor holes in flywheel */}
                                                <circle cx="14" cy="10" r="0.8" fill="white" />
                                                <circle cx="14" cy="18" r="0.8" fill="white" />
                                                <circle cx="10" cy="14" r="0.8" fill="white" />
                                                <circle cx="18" cy="14" r="0.8" fill="white" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Magnetic brake</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rotating Display Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Display Icon */}
                                        <div className="mb-1 relative flex items-center justify-center">
                                            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="3" width="30" height="18" rx="3" stroke="#111827" strokeWidth="2.5" />
                                                {/* Text 360 */}
                                                <text x="17" y="14" fontSize="9" fontWeight="900" fill="#111827" textAnchor="middle">360°</text>
                                                {/* Curved arrow below 360 */}
                                                <path d="M10 15 C13 18 21 18 24 15" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                                <path d="M24 15 L22 13.5 M24 15 L24.5 17.5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Rotating Display</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Video Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-5 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Video Icon */}
                                        <div className="mb-1">
                                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 2.5H18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M7 5.5H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                                <rect x="2" y="8" width="22" height="13" rx="2" stroke="#111827" strokeWidth="2"/>
                                                <path d="M11 11.5L16 14.5L11 17.5V11.5Z" fill="#111827"/>
                                                
                                                {/* White cutout for person */}
                                                <circle cx="23" cy="18" r="3.5" fill="white" />
                                                <path d="M18 24 C18 20.5 19.5 19 23 19 C26.5 19 28 20.5 28 24" fill="white" />
                                                
                                                {/* Person silhouette */}
                                                <circle cx="23" cy="18" r="2.5" fill="#111827" />
                                                <path d="M19 24 C19 21.5 20.5 20.5 23 20.5 C25.5 20.5 27 21.5 27 24" fill="#111827" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Workout Video</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            // Default Treadmill Specs
                            <div className="flex items-center h-[75px] justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[9px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Speed Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-6">
                                    <div className="flex flex-col items-start gap-[2px]">
                                        {/* Top Lines */}
                                        <div className="flex flex-col gap-[3px] w-full items-start pl-2">
                                            <div className="w-[50px] h-[1.5px] bg-gray-900"></div>
                                            <div className="w-[70px] h-[1.5px] bg-gray-900 ml-4"></div>
                                        </div>

                                        <div className="flex items-end gap-1.5 my-0.5">
                                            <span className="text-4xl font-black text-gray-900 leading-[0.8] tracking-tight">20</span>
                                            <div className="flex flex-col justify-end leading-none gap-[2px] pb-[1px]">
                                                <span className="text-[10px] font-bold text-gray-600 leading-none">km/h</span>
                                                <div className="bg-black text-white px-1.5 py-[1px] rounded-[2px] text-[8px] font-black leading-none tracking-wide">MAX</div>
                                            </div>
                                        </div>

                                        {/* Bottom Lines */}
                                        <div className="flex flex-col gap-[3px] w-full items-end pr-2">
                                            <div className="w-[60px] h-[1.5px] bg-gray-900 mr-2"></div>
                                            <div className="w-[45px] h-[1.5px] bg-gray-900"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Incline Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="flex flex-col items-start pl-2">
                                        {/* Rising Bars */}
                                        <div className="flex items-end gap-[3px] h-5 mb-1 w-full pl-1">
                                            <div className="w-[2.5px] h-[25%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[35%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[45%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[55%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[65%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[75%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[85%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[100%] bg-black rounded-sm"></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl font-black text-gray-900 leading-none">15</span>
                                            <div className="flex flex-col leading-none gap-[1px]">
                                                <span className="text-[10px] font-bold text-gray-600">Incline</span>
                                                <span className="text-[10px] font-bold text-gray-600">Levels</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Video Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-5 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Video Icon */}
                                        <div className="mb-1">
                                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 2.5H18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M7 5.5H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                                <rect x="2" y="8" width="22" height="13" rx="2" stroke="#111827" strokeWidth="2"/>
                                                <path d="M11 11.5L16 14.5L11 17.5V11.5Z" fill="#111827"/>
                                                
                                                {/* White cutout for person */}
                                                <circle cx="23" cy="18" r="3.5" fill="white" />
                                                <path d="M18 24 C18 20.5 19.5 19 23 19 C26.5 19 28 20.5 28 24" fill="white" />
                                                
                                                {/* Person silhouette */}
                                                <circle cx="23" cy="18" r="2.5" fill="#111827" />
                                                <path d="M19 24 C19 21.5 20.5 20.5 23 20.5 C25.5 20.5 27 21.5 27 24" fill="#111827" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-600">Workout Video</span>
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
