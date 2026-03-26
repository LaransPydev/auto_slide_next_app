"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MODELS = [
    { id: "pro",     label: "sTread Pro" },
    { id: "row",     label: "sRow"       },
    { id: "bike",    label: "sBike"      },
    { id: "gym-pro", label: "sGym Pro"   },
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
                videoRef.current.play().catch(() => {});
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

    return (
        <section
            className="overflow-hidden relative w-full h-full flex flex-col items-center"
            style={{ background: 'radial-gradient(66.64% 166.82% at 50% 0%, #e4e4f3ff 0%, #babffcff 100%)' }}
        >
            {/* ━━━ 1. HEADER ━━━ */}
            <div className="pt-3 h-[8%]">
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl text-gray-900 text-center px-4 sm:px-0"
                    style={{ fontFamily: "var(--font-sohne), Söhne, sans-serif", fontWeight: 600 }}
                >
                    Discover Our Premium Model
                </h1>
            </div>

            {/* ━━━ 2. MODEL SELECTOR TABS ━━━ */}
            <div className="h-[7%]">
                <div className="flex items-center justify-center p-1 gap-1 bg-[#EBECFB]/30 backdrop-blur-md rounded-full border border-white/20 mx-4 sm:mx-0 h-full">
                    {MODELS.map((model) => (
                        <button
                            key={model.id}
                            onClick={() => setActiveModel(model.id)}
                            className={`px-4 sm:px-8 h-full flex items-center justify-center rounded-full transition-all duration-300 ${
                                activeModel === model.id
                                    ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                                    : "text-gray-600 hover:text-gray-900 border border-[#2b59c3]/0"
                            }`}
                            style={{
                                fontFamily: "var(--font-sohne), Söhne, sans-serif",
                                fontWeight: 500,
                                letterSpacing: "-0.1px",
                            }}
                        >
                            <span className="text-[14px] sm:text-[16px] leading-[28px] whitespace-nowrap">{model.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ━━━ 3. PRODUCT AREA ━━━ */}
            <div className="w-full relative flex items-center justify-center h-[74%]">

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

                {/* Product Video Slider */}
                <div className="h-full overflow-hidden">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/pro.webm"
                                        className="scale-130 -translate-y-4"
                                        isActive={activeModel === "pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="/videos/row.webm"
                                        className="scale-140 -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === "row"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="/videos/bike.webm"
                                        className="scale-150 -translate-y-4 md:scale-110 md:-translate-y-6"
                                        isActive={activeModel === "bike"}
                                        onEnded={handleNext}
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-108 -translate-y-6"
                                        isActive={activeModel === "gym-pro"}
                                        onEnded={handleNext}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ━━━ 4. BOTTOM INFO BAR (SVG) ━━━ */}
            <div className="flex-shrink-0 flex justify-center px-3 sm:px-4 pb-3 sm:pb-4 lg:pb-5 h-[14%] w-[85%] lg:w-[75%]">
                <div className="relative w-full h-full">
                    <img
                        key={activeModel}
                        src={`/specs/bar-${activeModel}.svg`}
                        alt={`${MODELS.find(m => m.id === activeModel)?.label} specs`}
                        className="w-full h-full object-contain object-left"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
}
