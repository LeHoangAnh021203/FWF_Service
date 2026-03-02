"use client"

import type { CSSProperties } from "react"
import { useIsMobile } from "./use-mobile"

type CommingSoonProps = {
    open: boolean
    onClose: () => void
}

type GodRaysProps = {
    colorBack: string
    colors: string[]
    colorBloom: string
    offsetX: number
    offsetY: number
    intensity: number
    spotty: number
    midSize: number
    midIntensity: number
    density: number
    bloom: number
    speed: number
    scale: number
    frame: number
    style?: CSSProperties
}

const HERO_COLORS = {
    gradientLight: "#2A1306",
    gradientMid: "#130A03",
    gradientDark: "#050505",
}

function GodRays(props: GodRaysProps) {
    const { style, colors, colorBloom } = props

    return (
        <div
            style={{
                ...style,
                background: `radial-gradient(circle at 20% 15%, ${colors[0]}66 0%, transparent 35%), radial-gradient(circle at 75% 20%, ${colors[2]}55 0%, transparent 40%), radial-gradient(circle at 50% 0%, ${colorBloom}55 0%, transparent 55%)`,
                filter: "blur(28px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
            }}
        />
    )
}

export default function CommingSoon({ open, onClose }: CommingSoonProps) {
    const isMobile = useIsMobile()

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 backdrop-blur-sm">
            {
                isMobile ? (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(180deg, ${HERO_COLORS.gradientLight} 0%, ${HERO_COLORS.gradientMid} 45%, ${HERO_COLORS.gradientDark} 100%)`,
                        }}
                    />
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at top, ${HERO_COLORS.gradientLight} 0%, ${HERO_COLORS.gradientMid} 45%, ${HERO_COLORS.gradientDark} 100%)`,
                        }}
                    >
                        <GodRays
                            colorBack="#00000000"
                            colors={["#FFF4E6", "#FFDCC2", "#FFB48A", "#FF8F4C"]}
                            colorBloom="#FFEAD6"
                            offsetX={0.85}
                            offsetY={-1}
                            intensity={1}
                            spotty={0.45}
                            midSize={10}
                            midIntensity={0}
                            density={0.12}
                            bloom={0.15}
                            speed={1}
                            scale={1.6}
                            frame={3332042.8159981333}
                            style={{
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                left: 0,
                                top: 0,
                            }}
                        />
                    </div>
                )
            }

            <div className="absolute inset-0 bg-black/45 opacity-1" />

            <div className="relative z-10 w-full max-w-[560px] rounded-2xl border border-white/10 bg-[#111111]/20 p-6 text-center text-white md:p-8">
                <img src="/logo/logo.png" alt="Face Wash Fox" className="mx-auto mb-3 h-12 w-auto object-contain" />
                <h2 className="text-3xl font-bold md:text-4xl">Comming Soon</h2>
                <p className="mx-auto mt-3 max-w-[420px] text-sm text-white/70 md:text-base">
                    Tính năng đang được hoàn thiện. Vui lòng quay lại sau hoặc liên hệ fanpage để được hỗ trợ đặt lịch nhanh nhé!!!.
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 h-11 rounded-lg bg-[#ff6a36] px-6 font-semibold text-white hover:bg-[#f45c28]"
                >
                    Quay lại
                </button>
            </div>
        </div>
    )
}
