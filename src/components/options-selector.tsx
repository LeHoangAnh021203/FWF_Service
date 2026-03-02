"use client"

import { useMemo, useState } from "react"

export type VoucherDetail = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type VoucherOption = Omit<VoucherDetail, "quantity"> & {
  background: string
}

interface OptionsSelectorProps {
  onAddToCart?: (item: VoucherDetail) => void
}

const voucherOptions: VoucherOption[] = [
  { id: "foxie-7", name: "Foxie Crystal 80 triệu", price: 80000000, background: "/voucher thu gon/Thẻ foxie new-02.png", image: "/voucher/Asset 7@4x.png" },
  { id: "foxie-6", name: "Foxie Platinum 50 triệu", price: 50000000, background: "/voucher thu gon/Thẻ foxie new-03.png", image: "/voucher/Asset 6@4x.png" },
  { id: "foxie-5", name: "Foxie Diamond 30 triệu", price: 30000000, background: "/voucher thu gon/Thẻ foxie new-04.png", image: "/voucher/Asset 5@4x.png" },
  { id: "foxie-4", name: "Foxie Gold 20 triệu", price: 20000000, background: "/voucher thu gon/Thẻ foxie new-05.png", image: "/voucher/Asset 4@4x.png" },
  { id: "foxie-3", name: "Foxie Silver 10 triệu", price: 10000000, background: "/voucher thu gon/Thẻ foxie new-06.png", image: "/voucher/Asset 3@4x.png" },
  { id: "foxie-2", name: "Foxie Bronze 5 triệu", price: 5000000, background: "/voucher thu gon/Thẻ foxie new-07.png", image: "/voucher/Asset 2@4x.png" },
  { id: "foxie-1", name: "Foxie Iron 3 triệu", price: 3000000, background: "/voucher thu gon/Thẻ foxie new-08.png", image: "/voucher/Asset 1@4x.png" },
  { id: "foxie-8", name: "Foxie Crown 100 triệu", price: 100000000, background: "/voucher thu gon/Thẻ foxie new-09.png", image: "/voucher/Asset 8@4x.png" },
]

const formatVnd = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)

const styles = `
  .options-container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 68vh;
    min-height: 620px;
    width: 100%;
  }

  .options-wrapper {
    display: flex;
    align-items: stretch;
    overflow: hidden;
    min-width: 980px;
    max-width: 1780px;
    width: calc(100% - 40px);
    height: 620px;
  }

  .option-item {
    position: relative;
    overflow: hidden;
    min-width: 74px;
    margin: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
    border-radius: 36px;
    flex-grow: 1;
  }

  .option-item.active {
    flex-grow: 10000;
    max-width: 980px;
    margin: 0;
    border-radius: 46px;
  }

  .inactive-options {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .options-container {
      padding: 20px;
      height: auto;
      min-height: 70vh;
    }

    .options-wrapper {
      flex-direction: column;
      min-width: auto;
      max-width: none;
      width: 100%;
      height: auto;
      align-items: center;
      overflow: visible;
    }

    .option-item.active {
      display: block;
      width: min(92vw, 430px);
      max-width: 430px;
      height: auto;
      aspect-ratio: 9 / 16;
      margin: 0 auto 30px;
      border-radius: 25px;
      flex-grow: 0;
      background-size: cover !important;
      background-position: center;
      background-repeat: no-repeat;
    }

    .option-item:not(.active) {
      display: none;
    }

    .inactive-options {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 14px;
      width: 100%;
      max-width: 520px;
    }

    .inactive-option {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      overflow: hidden;
    }
  }
`

export default function OptionsSelector({ onAddToCart }: OptionsSelectorProps) {
  const [activeOptionId, setActiveOptionId] = useState(voucherOptions[0].id)
  const [detailOpen, setDetailOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const activeOption = useMemo(
    () => voucherOptions.find((option) => option.id === activeOptionId) ?? voucherOptions[0],
    [activeOptionId],
  )

  const openDetail = () => {
    setQuantity(1)
    setDetailOpen(true)
  }

  const addToCart = () => {
    onAddToCart?.({ ...activeOption, quantity })
    setDetailOpen(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="options-container">
        <div className="options-wrapper">
          {voucherOptions.map((option) => (
            <div
              key={option.id}
              className={`option-item ${activeOptionId === option.id ? "active" : ""}`}
              style={{ backgroundImage: `url("${encodeURI(option.background)}")` }}
              onClick={() => setActiveOptionId(option.id)}
            >
              {activeOptionId === option.id ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      openDetail()
                    }}
                    className="rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-[#111] shadow-lg hover:bg-white"
                  >
                    Chi tiết
                  </button>
                </div>
              ) : null}
            </div>
          ))}

          <div className="inactive-options">
            {voucherOptions
              .filter((option) => option.id !== activeOptionId)
              .map((option) => (
                <div
                  key={option.id}
                  className="inactive-option"
                  style={{ backgroundImage: `url("${encodeURI(option.background)}")` }}
                  onClick={() => setActiveOptionId(option.id)}
                />
              ))}
          </div>
        </div>
      </div>

      {detailOpen ? (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setDetailOpen(false)}
        >
          <div
            className="w-full max-w-[980px] overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-4 text-white md:grid md:grid-cols-[1.2fr_1fr] md:gap-5 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeOption.image}
              alt={activeOption.name}
              className="h-auto w-full rounded-xl border border-white/10 bg-black/20 object-contain"
            />

            <div className="mt-4 flex flex-col gap-4 md:mt-0">
              <h3 className="text-xl font-bold">{activeOption.name}</h3>
              <p className="text-lg font-semibold text-[#ffb699]">{formatVnd(activeOption.price)}</p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">Số lượng</span>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full bg-white/10 text-lg"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full bg-white/10 text-lg"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="text-sm text-white/60">Tạm tính: {formatVnd(activeOption.price * quantity)}</p>

              <button
                type="button"
                className="mt-auto h-11 rounded-lg bg-[#ff6a36] font-semibold text-white hover:bg-[#f45c28]"
                onClick={addToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

