"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, MinusIcon, X } from "lucide-react";
import useSharedCart from "../hooks/use-shared-cart";
import CommingSoon from "./comming-soon";

const formatVnd = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

export default function FloatingCart() {
  const { cartItems, customerPhone, setCustomerPhone, changeQuantity, removeItem } = useSharedCart();
  const [open, setOpen] = useState(false);
  const [isCommingSoonOpen, setIsCommingSoonOpen] = useState(false);

  const items = useMemo(() => Object.values(cartItems), [cartItems]);
  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCommingSoonOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[130]">
      {open ? (
        <div className="mb-3 w-[320px] rounded-2xl border border-white/10 bg-[#151515]/95 p-3 text-white shadow-2xl backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold">Giỏ hàng của bạn</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 p-1 text-white/80 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {items.length === 0 ? (
              <p className="text-sm text-white/60">Chưa có sản phẩm nào.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold leading-tight">{item.name}</p>
                      <p className="text-[11px] text-[#ffb699]">{formatVnd(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] text-white/60 hover:text-white"
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-1 py-1">
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.id, -1)}
                        className="grid h-6 w-6 place-items-center rounded-full bg-white/10"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="min-w-6 text-center text-xs">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.id, 1)}
                        className="grid h-6 w-6 place-items-center rounded-full bg-white/10"
                      >
                        <span className="text-xs font-semibold leading-none">+</span>
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-[#ffb699]">
                      {formatVnd(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <input
              type="tel"
              placeholder="Nhập số điện thoại để xác nhận"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#ff6a36]"
            />
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-white/70">Tổng tạm tính</span>
              <span className="font-semibold text-[#ffb699]">{formatVnd(totalAmount)}</span>
            </div>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckout}
              className="mt-3 h-10 w-full rounded-lg bg-[#ff6a36] text-sm font-semibold text-white transition hover:bg-[#f45c28] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-14 items-center gap-2 rounded-full border border-white/20 bg-[#ff6a36] px-4 text-white shadow-xl transition hover:bg-[#f45c28]"
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#ff6a36]">
          {totalCount}
        </span>
      </button>

      <CommingSoon open={isCommingSoonOpen} onClose={() => setIsCommingSoonOpen(false)} />
    </div>
  );
}
