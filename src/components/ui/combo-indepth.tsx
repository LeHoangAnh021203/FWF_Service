"use client";

import Image from "next/image";
import { useState } from "react";
import useSharedCart from "../hooks/use-shared-cart";

type ComboIndepthItem = {
  serviceId: string;
  image: string;
  title: string;
  subtitle: string;
  foxiePrice: number;
  listedPrice: number;
  oldPrice: number;
  liked?: boolean;
};

const comboIndepthItems: ComboIndepthItem[] = [
  {
    serviceId: "deep-1",
    image: "/Intensive/MS Bri.png",
    title: "MS brightening",
    subtitle: "Brightening Mesotherapy",
    foxiePrice: 999000,
    listedPrice: 1490000,
    oldPrice: 2990000,
    liked: true,
  },
  {
    serviceId: "deep-2",
    image: "/Intensive/MS PDRN.png",
    title: "MS PDRN",
    subtitle: "PDRN Mesotherapy",
    foxiePrice: 999000,
    listedPrice: 1490000,
    oldPrice: 2990000,
  },
  // {
  //   serviceId: "deep-3",
  //   image: "/Intensive/Peel da.png",
  //   title: "Peel da dịu nhẹ",
  //   subtitle: "Lumi Peel PRO",
  //   foxiePrice: 2290000,
  //   listedPrice: 2990000,
  //   oldPrice: 5490000,
  // },
  // {
  //   serviceId: "deep-4",
  //   image: "/Intensive/ADAPT BANNER-17.png",
  //   title: "Vi điểm dưỡng sáng Glow Calming PRO",
  //   subtitle: "Glow Calming Therapy PRO",
  //   foxiePrice: 2290000,
  //   listedPrice: 2990000,
  //   oldPrice: 4990000,
  // },
  // {
  //   serviceId: "deep-5",
  //   image: "/Intensive/Vi diêm PDRN.png",
  //   title: "Vi điểm phục hồi PDRN Concentrate",
  //   subtitle: "PDRN Concentrate Revitalize PRO",
  //   foxiePrice: 2290000,
  //   listedPrice: 2990000,
  //   oldPrice: 5990000,
  //   liked: true,
  // },
  // {
  //   serviceId: "deep-6",
  //   image: "/Intensive/ADAPT BANNER-10.png",
  //   title: "Vi điểm nâng cao Hyal Power Boost PRO",
  //   subtitle: "Hyal Power Boost PRO",
  //   foxiePrice: 999000,
  //   listedPrice: 1590000,
  //   oldPrice: 2749000,
  // },
];

const formatPrice = (value: number) => `${value.toLocaleString("en-US")}đ`;

export default function ComboIndepth() {
  const { addItem } = useSharedCart();
  const [selectedItem, setSelectedItem] = useState<ComboIndepthItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openAddCartModal = (item: ComboIndepthItem) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const closeAddCartModal = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (!selectedItem) return;

    addItem({
      id: `service-${selectedItem.serviceId}`,
      name: selectedItem.title,
      price: selectedItem.foxiePrice,
      quantity,
      type: "service",
    });

    closeAddCartModal();
  };

  return (
    <section className="w-full bg-[#f7941d] px-4 pb-8 pt-2 md:px-8 md:pb-10">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-4 flex items-end gap-3 text-white md:mb-6">
          <h2 className="text-3xl font-extrabold uppercase leading-none md:text-5xl pt-5">Combo chuyên sâu</h2>
          <p className="pb-1 text-2xl font-medium md:text-4xl">Intensive packages</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comboIndepthItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group overflow-hidden rounded-[22px] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)] md:rounded-[24px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <div className="absolute right-2 top-2 z-10 min-w-9 rounded-full border-2 border-white bg-[#ff6a36] px-2.5 py-1 text-center text-xs font-extrabold text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] md:right-3 md:top-3 md:min-w-10 md:px-3 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

              {item.liked ? (
                  <div className="absolute left-2 top-2 z-10 grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] md:left-3 md:top-3 md:h-11 md:w-11">
                  <Image
                    src="/images/Cao like@4x.png"
                    alt="Like icon"
                      width={34}
                      height={34}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
              ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-300 md:translate-y-6 md:p-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-3 text-white backdrop-blur-[1px] md:bg-black/20 md:p-4">
                    <p className="text-[11px] leading-tight text-white/85 md:text-sm">{item.subtitle}</p>
                    <h3 className="mt-1 text-[16px] font-extrabold leading-tight md:text-[20px]">{item.title}</h3>

                    <div className="mt-2 grid grid-cols-2 gap-2.5 leading-tight md:mt-3 md:gap-4">
                      <div>
                        <p className="text-[10px] font-semibold text-white/70 md:text-xs">Giá thẻ Foxie</p>
                        <p className="text-[10px] text-white/60 md:text-xs">Foxie Card&apos;s point</p>
                        <p className="mt-1 text-[16px] font-extrabold leading-none text-[#ffb699] md:text-[20px]">
                          {formatPrice(item.foxiePrice)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[12px] font-bold text-white/65 line-through md:text-[10px]">{formatPrice(item.oldPrice)}</p>
                        <p className="text-[10px] font-semibold text-white/70 md:text-xs">Giá niêm yết</p>
                        <p className="text-[10px] text-white/60 md:text-xs">Listed price</p>
                        <p className="mt-1 text-[14px] font-extrabold leading-none text-[#ffd08c] md:text-[15px]">
                          {formatPrice(item.listedPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-2 md:mt-3">
                      <button
                        type="button"
                        className="pointer-events-auto rounded-full border border-white/45 bg-white/12 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 md:text-sm"
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        aria-label="Them vao gio hang"
                        onClick={() => openAddCartModal(item)}
                        className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-white/45 bg-[#ff6a36] text-white transition hover:bg-[#f45c28] md:h-10 md:w-10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 md:h-5 md:w-5"
                        >
                          <circle cx="9" cy="20" r="1" />
                          <circle cx="17" cy="20" r="1" />
                          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-5 text-white">
            <h3 className="text-lg font-semibold">Thêm vào giỏ hàng</h3>
            <p className="mt-1 text-sm text-white/70">{selectedItem.title}</p>
            <p className="mt-2 text-sm text-[#ffb699]">{formatPrice(selectedItem.foxiePrice)}</p>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-sm">Số lượng</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="h-8 w-8 rounded-full bg-white/10"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="h-8 w-8 rounded-full bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeAddCartModal}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmAddToCart}
                className="rounded-full bg-[#ff6a36] px-5 py-2 text-sm font-semibold text-white hover:bg-[#f45c28]"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
