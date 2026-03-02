"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import useSharedCart from "./hooks/use-shared-cart";

type VoucherCard = {
    id: string;
    name: string;
    price: number;
    image: string;
};

const voucherCards: VoucherCard[] = [
    { id: "foxie-crown", name: "Foxie Crown 100 triệu", price: 100000000, image: "/voucher/Asset 2@4x.png" },
    { id: "foxie-crystal", name: "Foxie Crystal 80 triệu", price: 80000000, image: "/voucher/Asset 1@4x.png" },
    { id: "foxie-platinum", name: "Foxie Platinum 50 triệu", price: 50000000, image: "/voucher/Asset 3@4x.png" },
    { id: "foxie-diamond", name: "Foxie Diamond 30 triệu", price: 30000000, image: "/voucher/Asset 4@4x.png" },
    { id: "foxie-gold", name: "Foxie Gold 20 triệu", price: 20000000, image: "/voucher/Asset 8@4x.png" },
    { id: "foxie-silver", name: "Foxie Silver 10 triệu", price: 10000000, image: "/voucher/Asset 7@4x.png" },
    { id: "foxie-bronze", name: "Foxie Bronze 5 triệu", price: 5000000, image: "/voucher/Asset 6@4x.png" },
    { id: "foxie-iron", name: "Foxie Iron 1.5 triệu", price: 3000000, image: "/voucher/Asset 5@4x.png" },
];

const formatVnd = (value: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

export default function VoucherSection() {
    const { addItem } = useSharedCart();
    const [quantities, setQuantities] = useState<Record<string, number>>(
        Object.fromEntries(voucherCards.map((voucher) => [voucher.id, 1]))
    );

    const totalPreview = useMemo(
        () =>
            voucherCards.reduce((sum, voucher) => {
                const quantity = quantities[voucher.id] ?? 1;
                return sum + voucher.price * quantity;
            }, 0),
        [quantities]
    );

    const updateQuantity = (id: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] ?? 1) + delta),
        }));
    };

    const handleAddVoucher = (voucher: VoucherCard) => {
        const quantity = quantities[voucher.id] ?? 1;
        addItem({
            id: `voucher-${voucher.id}`,
            name: voucher.name,
            price: voucher.price,
            quantity,
            type: "voucher",
        });
    };

    return (
        <section className="w-full bg-[#f7e0c7] px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-7 text-center md:mb-10">
                    <h2 className="text-3xl font-extrabold uppercase leading-tight text-[#f05b2a] md:text-6xl">
                        Thẻ Thành Viên Foxie
                    </h2>
                    <p className="mt-1 text-2xl font-bold uppercase text-[#f05b2a] md:mt-2 md:text-4xl">
                        Nhận ngay ưu đãi độc quyền
                    </p>
                    <p className="mx-auto mt-3 max-w-4xl text-sm font-medium text-[#222] md:mt-4 md:text-2xl">
                        Được sử dụng tất cả dịch vụ với giá thẻ Foxie <span className="font-bold">tiết kiệm đến 35%</span> so với giá
                        niêm yết. <span className="font-bold">Thẻ có thể chia sẻ hoặc dùng chung với bạn bè và người thân</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {voucherCards.map((voucher, index) => (
            <div
              key={voucher.id}
              className="group relative aspect-[2986/2340] overflow-hidden rounded-3xl bg-[#f4dcc2] shadow-sm"
            >
              <Image
                src={voucher.image}
                alt={voucher.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 4}
              />

                            <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute inset-x-3 bottom-3 translate-y-0 rounded-2xl bg-black/75 p-2 text-white opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-semibold text-[#ffb699]">{formatVnd(voucher.price)}</p>
                                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-1 py-1">
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(voucher.id, -1)}
                                            className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-sm hover:bg-white/25"
                                        >
                                            -
                                        </button>
                                        <span className="min-w-6 text-center text-xs font-semibold">
                                            {quantities[voucher.id] ?? 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(voucher.id, 1)}
                                            className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-sm hover:bg-white/25"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleAddVoucher(voucher)}
                                    className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#ff6a36] text-sm font-semibold text-white hover:bg-[#f45c28]"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
