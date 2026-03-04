"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationDots } from "./navigation-dots"
import { useSliderNavigation } from "./hooks/use-slider-navigation"
import { useSliderDrag } from "./hooks/use-slider-drag"
import { useIsMobile } from "./hooks/use-mobile"

type ServiceTab = "extra" | "basic"
type ExtraServiceCardData = {
    id: string
    name: string
    subtitle: string
    foxiePrice: number
    listedPrice: number
    comparePrice: number
}

const EXTRA_SERVICE_CARDS: ExtraServiceCardData[] = [
    { id: "extra-1", name: "Cấp ẩm", subtitle: "Cryo", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-2", name: "Sáng da", subtitle: "Lumiglow", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-3", name: "Săn chắc da", subtitle: "Gymming", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-4", name: "Chăm sóc mắt", subtitle: "Eye-revive", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-5", name: "Chăm sóc cổ", subtitle: "Neck care", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-6", name: "Sạch sâu vùng mũi", subtitle: "Acne Nose Detox", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
]

type BasicServiceCardData = {
    id: string
    order: number
    name: string
    subtitle: string
    durationVi: string
    durationEn: string
    foxiePrice: number
    listedPrice: number
    comparePrice: number
    under12Note?: string
}

const BASIC_SERVICE_CARDS: BasicServiceCardData[] = [
    {
        id: "basic-1",
        order: 1,
        name: "Rửa mặt công nghệ Hydra Facial",
        subtitle: "Aqua Peel Cleanse",
        durationVi: "30 PHÚT",
        durationEn: "30 Minutes",
        foxiePrice: 199000,
        listedPrice: 299000,
        comparePrice: 599000,
        under12Note: "Dưới 12 tuổi - Under 12",
    },
    {
        id: "basic-2",
        order: 2,
        name: "Làm sạch sâu và cải thiện lỗ chân lông",
        subtitle: "Deep Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 339000,
        listedPrice: 489000,
        comparePrice: 999000,
    },
    {
        id: "basic-3",
        order: 3,
        name: "Cấp ẩm, căng bóng và tràn đầy sức sống",
        subtitle: "Cryo Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-4",
        order: 4,
        name: "Làm sáng và cải thiện màu da, giảm đốm nâu",
        subtitle: "Lumiglow Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-5",
        order: 5,
        name: "Làm tăng đàn hồi, săn chắc và thư giãn da",
        subtitle: "Gymming Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-6",
        order: 6,
        name: "Chăm sóc da mắt và làm giảm nếp nhăn mắt",
        subtitle: "Eye-revive Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 999000,
    },
]

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`

export function ArtGallerySlider() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    const [activeTab, setActiveTab] = useState<ServiceTab>("extra")

    const totalSlides = activeTab === "basic" ? BASIC_SERVICE_CARDS.length : EXTRA_SERVICE_CARDS.length

    const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
        totalSlides,
        enableKeyboard: true,
    })

    const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrev,
    })

    useEffect(() => {
        goToSlide(0)
    }, [activeTab, goToSlide])

    const currentColors = ["#f7931a", "#ff6a36", "#ffd28a"]
    const slideWidth = isMobile ? 336 : 396
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
                    <span className="text-sm text-white/40">{String(totalSlides).padStart(2, "0")}</span>
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
                    {activeTab === "basic"
                        ? BASIC_SERVICE_CARDS.map((item, index) => (
                            <BasicServiceInfoCard
                                key={item.id}
                                item={item}
                                isActive={index === currentIndex}
                                dragOffset={dragX}
                                index={index}
                                currentIndex={currentIndex}
                            />
                        ))
                        : EXTRA_SERVICE_CARDS.map((item, index) => (
                            <ExtraServicePriceCard
                                key={item.id}
                                item={item}
                                isActive={index === currentIndex}
                                dragOffset={dragX}
                                index={index}
                                currentIndex={currentIndex}
                            />
                        ))}
                </motion.div>
            </div>

            {/* Navigation dots */}
            <NavigationDots total={totalSlides} current={currentIndex} onSelect={goToSlide} colors={currentColors} />

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

interface ExtraServicePriceCardProps {
    item: ExtraServiceCardData
    isActive: boolean
    dragOffset: number
    index: number
    currentIndex: number
}

function ExtraServicePriceCard({ item, isActive, dragOffset, index, currentIndex }: ExtraServicePriceCardProps) {
    const distance = index - currentIndex
    const parallaxOffset = dragOffset * (0.1 * (distance + 1))

    return (
        <motion.article
            className="relative flex-shrink-0"
            animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.62,
                rotateY: distance * 4,
            }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{ x: parallaxOffset }}
        >
            <div className="w-[300px] rounded-[24px] border border-white/60 bg-[#ececec] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.28)] md:w-[332px]">
                <h3 className="text-[52px] font-extrabold leading-none text-[#212121] md:text-[56px]">{item.name}</h3>
                <p className="mt-1 text-[22px] leading-none text-[#333333]/80 md:text-[24px]">{item.subtitle}</p>

                <div className="mt-3 border-t-[3px] border-[#272727] pt-2">
                    <p className="text-right text-[16px] font-bold leading-none text-[#d1937a] line-through md:text-[18px]">
                        {formatPrice(item.comparePrice)}
                    </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                        <p className="text-[18px] font-extrabold leading-tight text-[#191919] md:text-[19px]">Giá thẻ Foxie</p>
                        <p className="text-[12px] leading-none text-[#1f1f1f]/75 md:text-[13px]">Foxie Card&apos;s point</p>
                        <p className="mt-1 whitespace-nowrap text-[18px] font-extrabold leading-none text-[#19b6bf] md:text-[20px]">
                            {formatPrice(item.foxiePrice)}
                        </p>
                    </div>
                    <div className="min-w-0 text-right">
                        <p className="text-[18px] font-extrabold leading-tight text-[#191919] md:text-[19px]">Giá niêm yết</p>
                        <p className="text-[12px] leading-none text-[#1f1f1f]/75 md:text-[13px]">Listed price</p>
                        <p className="mt-1 whitespace-nowrap text-[18px] font-extrabold leading-none text-[#f7941d] md:text-[20px]">
                            {formatPrice(item.listedPrice)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

interface BasicServiceInfoCardProps {
    item: BasicServiceCardData
    isActive: boolean
    dragOffset: number
    index: number
    currentIndex: number
}

function BasicServiceInfoCard({ item, isActive, dragOffset, index, currentIndex }: BasicServiceInfoCardProps) {
    const distance = index - currentIndex
    const parallaxOffset = dragOffset * (0.1 * (distance + 1))

    return (
        <motion.article
            className="relative flex-shrink-0"
            animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.62,
                rotateY: distance * 4,
            }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{ x: parallaxOffset }}
        >
            <div className="w-[300px] rounded-[24px] border border-white/60 bg-[#ececec] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.28)] md:w-[332px]">
                <div className="mb-3 flex items-start gap-3 border-b border-black/25 pb-2">
                    <div className="rounded-lg border-2 border-[#f7931a] px-2 py-0.5 text-lg font-extrabold text-[#f7931a]">
                        {item.order}
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-extrabold uppercase leading-tight text-[#202020]">{item.name}</h3>
                        {item.under12Note ? (
                            <p className="text-xs font-semibold text-[#2fb8c0]">{item.under12Note}</p>
                        ) : null}
                        <p className="text-sm text-black/75">{item.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
                    <div className="border-r border-black/25 pr-3 text-center">
                        <p className="text-xl font-extrabold leading-none">{item.durationVi}</p>
                        <p className="text-sm text-black/80">{item.durationEn}</p>
                    </div>
                    <div className="min-w-0">
                        <div className="mb-1 text-right text-xs font-bold leading-none text-[#d1937a] line-through md:text-sm">
                            {formatPrice(item.comparePrice)}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold text-black/80 md:text-xs">Giá Foxie</p>
                                <p className="whitespace-nowrap text-[15px] font-extrabold leading-none text-[#19b6bf] md:text-[12px]">
                                    {formatPrice(item.foxiePrice)}
                                </p>
                            </div>
                            <div className="min-w-0 text-right">
                                <p className="text-[11px] font-bold text-black/80 md:text-xs">Giá niêm yết</p>
                                <p className="whitespace-nowrap text-[15px] font-extrabold leading-none text-[#f7941d] md:text-[12px]">
                                    {formatPrice(item.listedPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
