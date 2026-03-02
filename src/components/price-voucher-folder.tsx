"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import confetti from "@/components/lib/confetti"
import { projects as initialProjects, type Project } from "@/lib/data"
import { ProjectFolder } from "@/components/project-folder"
import { motion } from "framer-motion"
import { Toaster } from "./ui/sonner"
import { ShoppingCart } from "lucide-react"
import OptionsSelector, { type VoucherDetail } from "./options-selector"
import CommingSoon from "./ui/comming-soon"
import useSharedCart, { type SharedCartItem } from "./hooks/use-shared-cart"

const PRICE_MENU_PDF = "/menu/bang-gia-tong-a4-ver-4.pdf"
const MENU_TARGET_TITLE = "Bảng Giá Dịch Vụ Nhà Fox"
const FOXIE_TARGET_TITLE = "Thẻ Thành Viên Foxie"
const SERVICE_GROUPS = [
    {
        id: "popular-combo",
        title: "Combo được ưa chuộng nhất",
        items: [
            { id: "popular-1", name: "Sạch sâu + Cấp ẩm", price: 549000 },
            { id: "popular-2", name: "Sạch sâu + Cấp ẩm + Sáng da", price: 579000 },
            { id: "popular-3", name: "Sạch sâu + Cấp ẩm + Săn chắc", price: 579000 },
            { id: "popular-4", name: "Sạch sâu + Săn chắc da + Chăm sóc mắt + Sáng da", price: 769000 },
            { id: "popular-5", name: "Sạch sâu + Săn chắc da + Chăm sóc mắt + Cấp ẩm", price: 769000 },
            { id: "popular-6", name: "Sạch sâu + Săn chắc da + Săn da", price: 769000 },
            { id: "popular-7", name: "Sạch sâu + Chăm sóc da mụn", price: 579000 },
            { id: "popular-8", name: "Sạch sâu + Làm dịu và chăm sóc da nhạy cảm", price: 599000 },
            { id: "popular-9", name: "Sạch sâu + Cấp ẩm + Sáng da + Săn chắc da + Chăm sóc mắt", price: 959000 },
        ],
    },
    {
        id: "deep-combo",
        title: "Combo chuyên sâu",
        items: [
            { id: "deep-1", name: "MS Brightening Therapy", price: 999000 },
            { id: "deep-2", name: "MS PDRN Mesotherapy", price: 999000 },
            { id: "deep-3", name: "Peel da dịu nhẹ Lumi Peel PRO", price: 2290000 },
            { id: "deep-4", name: "Vi điểm dưỡng sáng Glow Calming PRO", price: 2290000 },
            { id: "deep-5", name: "Vi điểm phục hồi PDRN Concentrate", price: 2290000 },
            { id: "deep-6", name: "Vi điểm nâng cao Hyal Power Boost PRO", price: 999000 },
        ],
    },
    {
        id: "extra-services",
        title: "Dịch vụ cộng thêm",
        items: [
            { id: "extra-1", name: "Cryo", price: 599000 },
            { id: "extra-2", name: "Lumiglow", price: 599000 },
            { id: "extra-3", name: "Gymming", price: 599000 },
            { id: "extra-4", name: "Eye-revive", price: 599000 },
            { id: "extra-5", name: "Neck care", price: 599000 },
            { id: "extra-6", name: "Acne nose detox", price: 599000 },
        ],
    },
    {
        id: "basic-services",
        title: "Dịch vụ cơ bản",
        items: [
            { id: "basic-1", name: "Glowrex Brightening Therapy", price: 299000 },
            { id: "basic-2", name: "Revital Boost Therapy", price: 349000 },
            { id: "basic-3", name: "Acne Rescue Therapy", price: 329000 },
            { id: "basic-4", name: "PDRN Recovery Therapy", price: 399000 },
        ],
    },
]
const SERVICE_OPTIONS = SERVICE_GROUPS.flatMap((group) => group.items)
const formatVnd = (value: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)

const CLOSED_SERVICE_GROUPS: Record<string, boolean> = {
    "popular-combo": false,
    "deep-combo": false,
    "extra-services": false,
    "basic-services": false,
}

export default function ClipsPage() {
    const [newProjects, setNewProjects] = useState<(Project & { isNew?: boolean; isVisible?: boolean })[]>([])
    const [projects, setProjects] = useState(initialProjects)
    const animatingRef = useRef(false)
    const mainRef = useRef<HTMLElement>(null)
    const [activeModal, setActiveModal] = useState<"menu" | "foxie" | null>(null)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [serviceQuantities, setServiceQuantities] = useState<Record<string, number>>({})
    const [openServiceGroups, setOpenServiceGroups] =
        useState<Record<string, boolean>>(CLOSED_SERVICE_GROUPS)
    const { cartItems, customerPhone, setCustomerPhone, addItem, changeQuantity, removeItem } = useSharedCart()
    const [isCommingSoonOpen, setIsCommingSoonOpen] = useState(false)

    useEffect(() => {
        const hasNewInvisible = newProjects.some((p) => p.isNew && !p.isVisible)
        if (hasNewInvisible && !animatingRef.current) {
            animatingRef.current = true
            const timer = setTimeout(() => {
                setNewProjects((prev) => prev.map((p) => (p.isNew && !p.isVisible ? { ...p, isVisible: true } : p)))
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [newProjects])

    useEffect(() => {
        const hasVisibleNew = newProjects.some((p) => p.isNew && p.isVisible)
        if (hasVisibleNew) {
            const timer = setTimeout(() => {
                setNewProjects((prev) => prev.map((p) => ({ ...p, isNew: false })))
                animatingRef.current = false
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [newProjects])

    const allProjects = useMemo(() => {
        return [...newProjects, ...projects]
    }, [newProjects, projects])

    const handleRemoveFolder = useCallback((projectId: string) => {
        // Remove immediately - the exit animation is already handled in DefaultProject
        setNewProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
        setProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
    }, [])

    const handleFolderClick = useCallback((project: Project) => {
        if (project.title === MENU_TARGET_TITLE) {
            setActiveModal("menu")
            setOpenServiceGroups(CLOSED_SERVICE_GROUPS)
        }
        if (project.title === FOXIE_TARGET_TITLE) {
            setActiveModal("foxie")
        }
    }, [])

    const selectedCartItems = useMemo(() => Object.values(cartItems), [cartItems])
    const totalCartAmount = useMemo(
        () => selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [selectedCartItems],
    )
    const totalCartCount = useMemo(
        () => selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
        [selectedCartItems],
    )

    const addToCart = useCallback((item: SharedCartItem) => {
        addItem(item)
        setIsCartOpen(true)
    }, [addItem])

    const updateServiceQuantity = (id: string, delta: number) => {
        setServiceQuantities((prev) => {
            const current = prev[id] ?? 1
            return {
                ...prev,
                [id]: Math.max(1, current + delta),
            }
        })
    }

    const addServiceToCart = (id: string) => {
        const service = SERVICE_OPTIONS.find((option) => option.id === id)
        if (!service) return

        const quantity = serviceQuantities[id] ?? 1
        addToCart({
            id: `service-${service.id}`,
            name: service.name,
            price: service.price,
            quantity,
            type: "service",
        })
    }

    const toggleServiceGroup = (groupId: string) => {
        setOpenServiceGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }))
    }

    const handleAddVoucherToCart = (item: VoucherDetail) => {
        addToCart({
            id: `voucher-${item.id}`,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: "voucher",
        })
    }

    const handleCartQuantityChange = (id: string, delta: number) => {
        changeQuantity(id, delta)
    }

    const removeCartItem = (id: string) => {
        removeItem(id)
    }

    const handleCheckout = () => {
        if (selectedCartItems.length === 0) return

        setIsCommingSoonOpen(true)
    }

    useEffect(() => {
        if (!activeModal) return

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveModal(null)
                setIsCartOpen(false)
            }
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [activeModal])

    const handleRenameProject = useCallback((projectId: string, newTitle: string) => {
        setNewProjects((prev) =>
            prev.map((p) => (String(p.id) === projectId ? { ...p, title: newTitle } : p))
        )
        setProjects((prev) =>
            prev.map((p) => (String(p.id) === projectId ? { ...p, title: newTitle } : p))
        )
    }, [])

    return (
        <div className="h-auto bg-[#191919]">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#1A1A1A",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        borderRadius: "12px",
                    },
                }}
            />

            <div
                className="transition-all duration-700 ease-out"
                style={{
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                }}
            >
                <main ref={mainRef} className="h-auto p-4 pt-12 sm:p-6 sm:pt-14 md:p-8 md:pt-16">
                    <div className="mx-auto w-full max-w-[288px] sm:max-w-[600px] lg:max-w-[912px]">
                        <div className="flex items-center justify-between h-12 mb-6">
                            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">Bảng Giá và Voucher</h1>
                            <button
                                className="text-sm font-medium text-black rounded-full hover:bg-white/90 transition-colors py-1.5 bg-card-foreground px-3 whitespace-nowrap"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const x = (rect.left + rect.width / 2) / window.innerWidth
                                    const y = (rect.top + rect.height / 2) / window.innerHeight

                                    const colors = ["#ffffff", "#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3"]

                                    // First burst - subtle and elegant
                                    confetti({
                                        particleCount: 40,
                                        spread: 50,
                                        origin: { x, y },
                                        colors,
                                        startVelocity: 20,
                                        gravity: 0.6,
                                        scalar: 0.8,
                                        drift: 0,
                                        ticks: 150,
                                        shapes: ["circle"],
                                        disableForReducedMotion: true,
                                    })

                                    // Delayed second burst - slightly wider
                                    setTimeout(() => {
                                        confetti({
                                            particleCount: 25,
                                            spread: 70,
                                            origin: { x, y: y - 0.05 },
                                            colors,
                                            startVelocity: 15,
                                            gravity: 0.5,
                                            scalar: 0.6,
                                            drift: 0,
                                            ticks: 120,
                                            shapes: ["circle"],
                                            disableForReducedMotion: true,
                                        })
                                    }, 100)
                                }}
                            >
                                Start Trial
                            </button>
                        </div>

                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                            {allProjects.map((project, idx) => {
                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: Math.min(idx * 0.03, 0.3),
                                            ease: [0.32, 0.72, 0, 1],
                                            layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
                                        }}
                                    >
                                        <ProjectFolder
                                            project={project}
                                            index={idx}
                                            onRemove={() => handleRemoveFolder(String(project.id))}
                                            onCancel={() => handleRemoveFolder(String(project.id))}
                                            onClick={handleFolderClick}
                                            onRename={(newTitle) => handleRenameProject(String(project.id), newTitle)}
                                        />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </main>
            </div>

            {activeModal === "menu" ? (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => {
                        setActiveModal(null)
                        setIsCartOpen(false)
                    }}
                >
                    <div
                        className="relative grid h-[95vh] w-full max-w-[1300px] overflow-hidden rounded-2xl border border-white/10 bg-[#121212] md:h-[min(92vh,820px)] md:grid-cols-[1.5fr_1fr]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20"
                            onClick={() => setActiveModal(null)}
                        >
                            Đóng
                        </button>

                        <div className="h-full min-h-[260px] border-b border-white/10 md:min-h-0 md:border-b-0 md:border-r">
                            <iframe
                                title="Bang gia dich vu Nha Fox"
                                src={`${PRICE_MENU_PDF}#toolbar=0&navpanes=0&scrollbar=1`}
                                className="h-full w-full"
                            />
                        </div>

                        <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden p-5 text-white md:p-6">
                            <h2 className="pr-16 text-xl font-bold">Chọn dịch vụ</h2>
                            <p className="text-sm text-white/70">
                                Xem đầy đủ bảng giá bên trái, chọn số lượng và thêm vào giỏ hàng.
                            </p>

                            <div className="mt-1 min-h-0 flex-1 space-y-3 overflow-y-auto pb-2 pr-1">
                                {SERVICE_GROUPS.map((group) => (
                                    <div key={group.id} className="space-y-3">
                                        <button
                                            type="button"
                                            onClick={() => toggleServiceGroup(group.id)}
                                            className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left"
                                        >
                                            <span className="text-sm font-semibold uppercase tracking-wide text-white/85">
                                                {group.title}
                                            </span>
                                            <span
                                                className={`text-sm text-white/70 transition-transform ${
                                                    openServiceGroups[group.id] ? "rotate-180" : ""
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </button>

                                        {openServiceGroups[group.id] ? (
                                            <div className="space-y-3">
                                                {group.items.map((option) => (
                                                    <div
                                                        key={option.id}
                                                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                                                    >
                                                        <div className="mb-3 flex items-center justify-between gap-3">
                                                            <span className="text-sm">{option.name}</span>
                                                            <span className="text-sm font-semibold text-[#ffb699]">
                                                                {formatVnd(option.price)}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                                                                <button
                                                                    type="button"
                                                                    className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                    onClick={() => updateServiceQuantity(option.id, -1)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="min-w-6 text-center text-sm">
                                                                    {serviceQuantities[option.id] ?? 1}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                    onClick={() => updateServiceQuantity(option.id, 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => addServiceToCart(option.id)}
                                                                className="rounded-lg bg-[#ff6a36] px-4 py-2 text-xs font-semibold text-white hover:bg-[#f45c28]"
                                                            >
                                                                Thêm vào giỏ
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(true)}
                                className="relative mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff6a36] text-sm font-semibold text-white shadow-lg hover:bg-[#f45c28]"
                            >
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-[#ff6a36]/35 animate-ping" />
                                <span
                                    className="pointer-events-none absolute inset-0 rounded-full bg-[#ff6a36]/25 animate-ping"
                                    style={{ animationDelay: "450ms" }}
                                />
                                <ShoppingCart className="h-5 w-5" />
                                <span>Mở giỏ hàng</span>
                                {totalCartCount > 0 ? (
                                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#ff6a36]">
                                        {totalCartCount}
                                    </span>
                                ) : null}
                            </button>
                        </div>

                        {isCartOpen ? (
                            <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/45 p-4 md:items-center">
                                <div className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-[#151515] p-4 text-white md:p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Giỏ hàng</h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsCartOpen(false)}
                                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20"
                                        >
                                            Tiếp tục mua sắm
                                        </button>
                                    </div>

                                    <div className="max-h-[300px] space-y-3 overflow-y-auto pr-1">
                                        {selectedCartItems.length === 0 ? (
                                            <p className="text-sm text-white/50">Chưa có sản phẩm nào trong giỏ.</p>
                                        ) : (
                                            selectedCartItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-semibold">{item.name}</p>
                                                            <p className="text-xs text-[#ffb699]">
                                                                {formatVnd(item.price)} / {item.type === "service" ? "dịch vụ" : "voucher"}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCartItem(item.id)}
                                                            className="text-xs text-white/60 hover:text-white"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                                                            <button
                                                                type="button"
                                                                className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                onClick={() => handleCartQuantityChange(item.id, -1)}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="min-w-6 text-center text-sm">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                onClick={() => handleCartQuantityChange(item.id, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="text-sm font-semibold text-[#ffb699]">
                                                            {formatVnd(item.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <input
                                        type="tel"
                                        placeholder="Nhập số điện thoại để xác nhận"
                                        value={customerPhone}
                                        onChange={(event) => setCustomerPhone(event.target.value)}
                                        className="mt-4 h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/40 focus:border-[#ff6a36]"
                                    />

                                    <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                                            <span>Tạm tính</span>
                                            <span>{formatVnd(totalCartAmount)}</span>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={selectedCartItems.length === 0}
                                            onClick={handleCheckout}
                                            className="h-11 w-full rounded-lg bg-[#ff6a36] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Tiến hành thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
            {activeModal === "foxie" ? (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => {
                        setActiveModal(null)
                        setIsCartOpen(false)
                    }}
                >
                    <div
                        className="relative h-[min(92vh,860px)] w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/10 bg-[#121212]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20"
                            onClick={() => {
                                setActiveModal(null)
                                setIsCartOpen(false)
                            }}
                        >
                            Đóng
                        </button>

                        <div className="grid h-full gap-5 overflow-hidden p-5 md:grid-cols-[1.3fr_1fr] md:p-6">
                            <div className="min-h-0">
                                <h2 className="mb-2 text-xl font-bold text-white">Chọn voucher Foxie</h2>
                                <p className="mb-4 text-sm text-white/70">
                                    Chọn voucher bạn muốn mua. Có thể chọn nhiều voucher trong một lần thanh toán.
                                </p>
                                <OptionsSelector onAddToCart={handleAddVoucherToCart} />
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => setIsCartOpen((prev) => !prev)}
                                    className="relative z-20 flex h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-[#ff6a36] px-4 text-sm font-semibold text-white shadow-lg hover:bg-[#f45c28]"
                                >
                                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[#ff6a36]/35 animate-ping" />
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-full bg-[#ff6a36]/25 animate-ping"
                                        style={{ animationDelay: "450ms" }}
                                    />
                                    <ShoppingCart className="h-5 w-5" />

                                    {totalCartCount > 0 ? (
                                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#ff6a36]">
                                            {totalCartCount}
                                        </span>
                                    ) : null}
                                </button>
                            </div>
                        </div>

                        {isCartOpen ? (
                            <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/45 p-4 md:items-center">
                                <div className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-[#151515] p-4 text-white md:p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Giỏ hàng </h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsCartOpen(false)}
                                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20"
                                        >
                                            Tiếp tục mua sắm
                                        </button>
                                    </div>

                                    <div className="max-h-[300px] space-y-3 overflow-y-auto pr-1">
                                        {selectedCartItems.length === 0 ? (
                                            <p className="text-sm text-white/50">Chưa có sản phẩm nào trong giỏ.</p>
                                        ) : (
                                            selectedCartItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-semibold">{item.name}</p>
                                                            <p className="text-xs text-[#ffb699]">
                                                                {formatVnd(item.price)} / {item.type === "service" ? "dịch vụ" : "voucher"}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCartItem(item.id)}
                                                            className="text-xs text-white/60 hover:text-white"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                                                            <button
                                                                type="button"
                                                                className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                onClick={() => handleCartQuantityChange(item.id, -1)}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="min-w-6 text-center text-sm">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="h-7 w-7 rounded-full bg-white/10 text-sm"
                                                                onClick={() => handleCartQuantityChange(item.id, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="text-sm font-semibold text-[#ffb699]">
                                                            {formatVnd(item.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <input
                                        type="tel"
                                        placeholder="Nhập số điện thoại để xác nhận"
                                        value={customerPhone}
                                        onChange={(event) => setCustomerPhone(event.target.value)}
                                        className="mt-4 h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/40 focus:border-[#ff6a36]"
                                    />

                                    <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                                            <span>Tạm tính</span>
                                            <span>{formatVnd(totalCartAmount)}</span>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={selectedCartItems.length === 0}
                                            onClick={handleCheckout}
                                            className="h-11 w-full rounded-lg bg-[#ff6a36] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}

            <CommingSoon open={isCommingSoonOpen} onClose={() => setIsCommingSoonOpen(false)} />
        </div>
    )
}
