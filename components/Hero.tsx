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

/* ─── Spec icon wrapper with optional right divider ─── */
function SpecItem({ children, showDivider = true }: { children: React.ReactNode; showDivider?: boolean }) {
    return (
        <div
            className={`flex items-center justify-center w-[55px] sm:w-[65px] lg:w-[78px] h-[40px] sm:h-[46px] lg:h-[52px] flex-shrink-0
                ${showDivider ? "border-r border-black/50" : ""}`}
        >
            {children}
        </div>
    );
}

/* ─── Specs bar content by model ─── */
function SpecsContent({ activeModel }: { activeModel: string }) {
    if (activeModel === "gym-pro") {
        return (
            <>
                <SpecItem><ScreenSpecIcon /></SpecItem>
                <SpecItem><PracticalCablePullSpecIcon /></SpecItem>
                <SpecItem><FoldingFunctionSpecIcon /></SpecItem>
                <SpecItem showDivider={false}><ElectricMotorSpecIcon /></SpecItem>
            </>
        );
    }
    if (activeModel === "row" || activeModel === "bike") {
        return (
            <>
                <SpecItem><ScreenSpecIcon /></SpecItem>
                <SpecItem><MagneticBrakeSpecIcon /></SpecItem>
                <SpecItem><RotatingDisplaySpecIcon /></SpecItem>
                <SpecItem showDivider={false}><WorkoutVideoSpecIcon /></SpecItem>
            </>
        );
    }
    // Default: treadmill specs
    return (
        <>
            <SpecItem><ScreenSpecIcon /></SpecItem>
            <SpecItem><SpeedSpecIcon /></SpecItem>
            <SpecItem><InclineSpecIcon /></SpecItem>
            <SpecItem showDivider={false}><WorkoutVideoSpecIcon /></SpecItem>
        </>
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
            <div className=" pt-3 h-[8%]">
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl text-gray-900 text-center px-4 sm:px-0"
                    style={{ fontFamily: "var(--font-sohne), Söhne, sans-serif", fontWeight: 600 }}
                >
                    Discover Our Premium Model
                </h1>
            </div>

            {/* ━━━ 2. MODEL SELECTOR TABS ━━━ */}
            <div className="h-[6%]">
                <div className="flex items-center justify-center p-1 gap-1 bg-[#FFFFFF]/30 backdrop-blur-md rounded-full border border-white/20 mx-4 sm:mx-0 h-full ">
                    {MODELS.map((model) => (
                        <button
                            key={model.id}
                            onClick={() => setActiveModel(model.id)}
                            className={`px-4 sm:px-8 h-full flex items-center justify-center rounded-full transition-all duration-300 ${activeModel === model.id
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

            {/* ━━━ 3. PRODUCT AREA (takes all remaining space) ━━━ */}
            <div className=" w-full relative flex items-center justify-center h-[74%]">

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
                <div className="h-full">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/pro.webm"
                                        className="scale-120 -translate-y-4"
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

            {/* ━━━ 4. BOTTOM INFO BAR ━━━ */}
            <div className="flex-shrink-0  flex justify-center px-3 sm:px-4 pb-3 sm:pb-4 lg:pb-5 h-[14%] w-[65%]">
                <div className="w-full h-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 lg:py-0 bg-white/60 backdrop-blur rounded-[20px] sm:rounded-[24px] flex flex-col lg:flex-row items-center justify-between border border-white/40 shadow-sm gap-3 lg:gap-0">

                    {/* ── LEFT: Rating / Name / Price ── */}
                    <div className="flex flex-col sm:flex-row items-center h-full gap-2 sm:gap-0 w-full lg:w-auto text-center sm:text-left flex-shrink-0 w-[20%]">

                        {/* Rating & Name */}
                        <div className="flex flex-col items-center sm:items-start justify-center min-w-[90px] sm:min-w-[110px]">
                            <div className="flex items-center">
                                <div className="flex gap-[2px]">
                                    {[1,2,3,4].map(i => <Star key={i} size={13} fill="#DABC09" stroke="#DABC09" strokeWidth={1} />)}
                                    <Star size={13} fill="transparent" stroke="#222222" strokeWidth={1} />
                                </div>
                                <span className="text-[#1E1E1E] font-bold text-[11px] ml-1.5 mt-0.5 tracking-tight">610</span>
                            </div>
                            <h2 className="text-[18px] sm:text-[22px] lg:text-[26px] leading-[1.1] font-black text-[#1E1E1E] tracking-tight mt-0.5">
                                {MODELS.find(m => m.id === activeModel)?.label}
                            </h2>
                        </div>
                    </div>
                    <div className="hidden  sm:block w-[0.6px] h-[48px] bg-[#929292] mx-3 lg:mx-4">
                    </div>
                    
                    <div className=" items-center sm:items-start justify-center gap-2 sm:gap-0">
                            <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-1 sm:gap-2">
                                <span className="text-[#828282] line-through text-[11px] font-medium hidden sm:inline-block">2.299,00 €</span>
                                <span className="bg-[#376F7B] text-white text-[9px] font-bold px-2 py-[2px] rounded-full tracking-wide whitespace-nowrap">SPARE HEUTE 400 €</span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-[16px] sm:text-[20px] lg:text-[24px] leading-none font-black text-[#1E1E1E]">1.899,00 €</span>
                                <span className="text-[#1D1D1B]/60 text-[9px] font-medium ml-0.5 whitespace-nowrap">VAT included.</span>
                            </div>
                        </div>
                    {/* ── CENTER: Specs Bar ── */}
                    <div className="w-[50%] flex justify-center items-center h-full">
                        <div className="flex items-center justify-center w-full gap-[10px] sm:gap-[14px] lg:gap-[50px] rounded-[20px] sm:rounded-[24px] border border-black/50 bg-transparent h-[90%]">
                            <SpecsContent activeModel={activeModel} />
                        </div>
                    </div>

                    {/* ── RIGHT: CTA Button ── */}
                    <div className="w-[174px] flex justify-center lg:justify-end lg:h-full items-center w-full lg:w-auto flex-shrink">
                        <button className="group flex items-center justify-center  sm:w-auto px-5 sm:px-6 h-[40px] sm:h-[42px] lg:h-[40px] bg-[#1E1E1E] hover:bg-black text-white rounded-full font-medium text-[13px] sm:text-[14px] transition-all whitespace-nowrap">
                            Discover {MODELS.find(m => m.id === activeModel)?.label}
                            <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
