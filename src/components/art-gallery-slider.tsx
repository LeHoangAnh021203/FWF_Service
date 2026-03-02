"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArtworkCard } from "./artwork-card"
import { NavigationDots } from "./navigation-dots"
import { artworks } from "./data/artwork"
import { useSliderNavigation } from "./hooks/use-slider-navigation"
import { useSliderDrag } from "./hooks/use-slider-drag"
import { useColorExtraction, useCurrentColors } from "./hooks/use-color-extraction"
import { useIsMobile } from "./hooks/use-mobile"

const BASIC_IMAGE_PATHS = ["/images/glowrex.png", "/images/revital.png", "/images/acne.jpg", "/images/pdrn.png"]

type ServiceTab = "extra" | "basic"

export function ArtGallerySlider() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    const [activeTab, setActiveTab] = useState<ServiceTab>("extra")

    const activeArtworks = useMemo(() => {
        if (activeTab === "basic") {
            return artworks.filter((item) => BASIC_IMAGE_PATHS.includes(item.image))
        }
        return artworks.filter((item) => !BASIC_IMAGE_PATHS.includes(item.image))
    }, [activeTab])

    const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
        totalSlides: activeArtworks.length,
        enableKeyboard: true,
    })

    const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrev,
    })

    useEffect(() => {
        goToSlide(0)
    }, [activeTab, goToSlide])

    const colors = useColorExtraction(activeArtworks)
    const currentColors = useCurrentColors(colors, activeArtworks, activeArtworks[currentIndex]?.id)
    const slideWidth = isMobile ? 432 : 564
    const [c1, c2, c3] = currentColors

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Animated ambient background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(ellipse at 50% 40%, ${c1}99 0%, transparent 62%),
              radial-gradient(ellipse at 20% 80%, ${c2}88 0%, transparent 64%),
              radial-gradient(ellipse at 85% 20%, ${c3}88 0%, transparent 66%),
              linear-gradient(160deg, ${c1}3d 0%, ${c2}33 45%, ${c3}2e 80%, ${c1}24 100%)
            `,
                    }}
                />
            </AnimatePresence>

            {/* Blur overlay */}
            <div className="absolute inset-0 " />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
                        <button
                            type="button"
                            onClick={() => setActiveTab("extra")}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                activeTab === "extra" ? "bg-[#ff6a36] text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                            Dịch vụ cộng thêm
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("basic")}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                activeTab === "basic" ? "bg-[#ff6a36] text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                            Dịch vụ cơ bản
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
                >
                    <span className="text-sm text-white/60">{String(currentIndex + 1).padStart(2, "0")}</span>
                    <span className="text-white/30">/</span>
                    <span className="text-sm text-white/40">{String(artworks.length).padStart(2, "0")}</span>
                </motion.div>
            </header>

            {/* Slider */}
            <div
                ref={sliderRef}
                className="relative flex h-full w-full cursor-grab items-center active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <motion.div
                    className="flex items-center gap-8 px-[calc(50vw-200px)] md:gap-16 md:px-[calc(50vw-250px)]"
                    animate={{
                        x: -currentIndex * slideWidth + dragX,
                    }}
                    transition={isDragging ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                    {activeArtworks.map((artwork, index) => (
                        <ArtworkCard
                            key={artwork.id}
                            artwork={artwork}
                            isActive={index === currentIndex}
                            dragOffset={dragX}
                            index={index}
                            currentIndex={currentIndex}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Navigation dots */}
            <NavigationDots total={activeArtworks.length} current={currentIndex} onSelect={goToSlide} colors={currentColors} />

            {/* Keyboard hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-8 hidden items-center gap-3 text-white/30 md:flex"
            >
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs">←</kbd>
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs">→</kbd>
                <span className="text-xs">lướt hoặc bấm mũi tên để xem thêm</span>
            </motion.div>
        </div>
    )
}
