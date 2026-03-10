"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { branches } from "./data/branches";

const centerImage =
  "https://facewashfox.com/wp-content/uploads/2023/12/web-img-03-1-1.png";

const leftStandards = [
  {
    title: "Quy trình khép kín",
    subtitle: "& hiệu quả",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/quy-trinh-service.png",
    color: "from-cyan-400/20 to-cyan-500/10",
  },
  {
    title: "Mỹ phẩm cao cấp và",
    subtitle: "định lượng rõ ràng",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/cao-cap-service.png",
    color: "from-lime-400/20 to-lime-500/10",
  },
  {
    title: "Thiết bị công nghệ đổi",
    subtitle: "mới & tiên tiến",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/thiet-bi-service.png",
    color: "from-pink-300/20 to-pink-400/10",
  },
  {
    title: "Thông tin rõ ràng và",
    subtitle: "minh bạch",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/thong-tin-service.png",
    color: "from-orange-300/20 to-orange-400/10",
  },
];

const rightStandards = [
  {
    title: "Nhân viên thân thiện",
    subtitle: "& chuyên nghiệp",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/nhan-vien-service.png",
    color: "from-sky-400/20 to-sky-500/10",
  },
  {
    title: "Giá cả công khai",
    subtitle: "",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/gia-ca-service.png",
    color: "from-amber-300/20 to-amber-400/10",
  },
  {
    title: "Nhanh chóng tiết",
    subtitle: "kiệm thời gian",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/nhanh-service.png",
    color: "from-yellow-300/20 to-yellow-400/10",
  },
  {
    title: "Chất lượng cao",
    subtitle: "",
    icon: "https://facewashfox.com/wp-content/uploads/2023/12/chat-luong-service.png",
    color: "from-violet-300/20 to-violet-400/10",
  },
];

type StandardItem = {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
};

type BranchDistance = {
  id: number;
  distanceKm: number;
};

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function getDistanceKm(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
) {
  const earthRadiusKm = 6371;
  const dLat = toRad(toLat - fromLat);
  const dLng = toRad(toLng - fromLng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(fromLat)) *
      Math.cos(toRad(toLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function StandardRow({
  item,
  reverse = false,
}: {
  item: StandardItem;
  reverse?: boolean;
}) {
  return (
    <article className={`flex ${reverse ? "justify-start lg:justify-end" : "justify-start lg:justify-end"}`}>
      <img
        src={item.icon}
        alt={`${item.title} ${item.subtitle}`.trim()}
        className="h-auto w-full max-w-[320px] object-contain"
      />
    </article>
  );
}

export default function ServiceStandard() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<number>(
    branches[0]?.id ?? 0,
  );
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [distanceByBranchId, setDistanceByBranchId] = useState<
    Record<number, number>
  >({});

  const nearestBranch = useMemo(() => {
    const distances: BranchDistance[] = Object.entries(distanceByBranchId).map(
      ([id, distanceKm]) => ({
        id: Number(id),
        distanceKm,
      }),
    );
    distances.sort((a, b) => a.distanceKm - b.distanceKm);
    return distances[0];
  }, [distanceByBranchId]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? null,
    [selectedBranchId],
  );

  const handleDetectNearestBranch = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Thiết bị không hỗ trợ định vị vị trí.");
      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nextDistances = branches.reduce<Record<number, number>>(
          (acc, branch) => {
            acc[branch.id] = getDistanceKm(
              latitude,
              longitude,
              branch.lat,
              branch.lng,
            );
            return acc;
          },
          {},
        );
        const nearest = Object.entries(nextDistances).sort(
          (a, b) => a[1] - b[1],
        )[0];

        setDistanceByBranchId(nextDistances);
        if (nearest) {
          setSelectedBranchId(Number(nearest[0]));
        }
        setIsLocating(false);
      },
      (error) => {
        const errorMessageByCode: Record<number, string> = {
          1: "Bạn chưa cấp quyền truy cập vị trí.",
          2: "Không thể xác định vị trí hiện tại.",
          3: "Hết thời gian lấy vị trí. Vui lòng thử lại.",
        };
        setLocationError(
          errorMessageByCode[error.code] ?? "Định vị thất bại. Vui lòng thử lại.",
        );
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  useEffect(() => {
    handleDetectNearestBranch();
  }, [handleDetectNearestBranch]);

  const handleSubmitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!fullName.trim()) {
      setSubmitError("Vui lòng nhập họ và tên.");
      return;
    }

    if (!phone.trim()) {
      setSubmitError("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!selectedBranch) {
      setSubmitError("Vui lòng chọn chi nhánh.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: note.trim(),
          branchName: selectedBranch.name,
          branchCity: selectedBranch.city,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Không thể gửi đăng ký lúc này.");
      }

      setSubmitSuccess("Đặt lịch thành công. Chúng tôi sẽ liên hệ bạn sớm.");
      setFullName("");
      setPhone("");
      setEmail("");
      setNote("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Đã có lỗi xảy ra. Vui lòng thử lại.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#f3f3f3] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <header className="mx-auto mb-10 max-w-[1200px] text-center md:mb-16">
          <h2 className="text-[clamp(2rem,3.4vw,4rem)] font-extrabold uppercase tracking-tight text-[#121212]">
            Tiêu Chuẩn Dịch Vụ
          </h2>
          <p className="mx-auto mt-4 max-w-[1200px] text-[clamp(1rem,1.4vw,1.6rem)] leading-relaxed text-[#6a6a6a]">
            Face Wash Fox luôn đặt trải nghiệm của khách hàng lên hàng đầu và chúng tôi
            chỉ tập trung vào một việc duy nhất đó là làm sạch: “Da đẹp bắt đầu từ việc
            rửa mặt”
          </p>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(420px,620px)_1fr] lg:gap-10">
          <div className="grid gap-8 lg:gap-12">
            {leftStandards.map((item) => (
              <StandardRow key={item.icon} item={item} />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <img
              src={centerImage}
              alt="Tieu chuan dich vu Face Wash Fox"
              className="h-auto w-full max-w-[620px] object-contain"
            />
          </div>

          <div className="grid gap-8 lg:gap-12">
            {rightStandards.map((item) => (
              <StandardRow key={item.icon} item={item} reverse />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[920px] rounded-[28px] bg-[#f4eef5] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:mt-16 md:p-10">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#f04b9a] to-[#7c3aed] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-11 w-11"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
          </div>

          <h3 className="mt-6 text-center text-[clamp(2rem,3.4vw,3.3rem)] font-extrabold text-[#0f172a]">
            Đặt lịch tư vấn miễn phí
          </h3>
          <p className="mt-2 text-center text-[clamp(1.1rem,1.8vw,1.8rem)] text-[#4b5563]">
            Điền thông tin để nhận tư vấn từ chuyên gia
          </p>

          <form className="mt-8 space-y-6 md:mt-10" onSubmit={handleSubmitBooking}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="mb-2 block text-[1.05rem] font-semibold text-[#374151]">
                  Họ và tên *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Nhập họ và tên"
                  required
                  className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="mb-2 block text-[1.05rem] font-semibold text-[#374151]">
                  Số điện thoại *
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Nhập số điện thoại"
                  required
                  className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="mb-2 block text-[1.05rem] font-semibold text-[#374151]">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Nhập email"
                className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="booking-branch" className="text-[1.05rem] font-semibold text-[#374151]">
                  Chi nhánh gần nhất
                </label>
                <button
                  type="button"
                  onClick={handleDetectNearestBranch}
                  className="text-[1.05rem] text-[#0369a1] underline underline-offset-2"
                >
                  {isLocating ? "Đang dò vị trí..." : "Dò vị trí để gợi ý"}
                </button>
              </div>
              <select
                id="booking-branch"
                className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none focus:border-[#a855f7]/50 md:text-[1.15rem]"
                value={selectedBranchId}
                onChange={(event) => setSelectedBranchId(Number(event.target.value))}
              >
                {branches.map((branch) => {
                  const distance = distanceByBranchId[branch.id];
                  return (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                      {typeof distance === "number"
                        ? ` — ${distance.toFixed(1)} km`
                        : ""}
                    </option>
                  );
                })}
              </select>
              {locationError ? (
                <p className="mt-2 text-[0.95rem] text-[#dc2626]">{locationError}</p>
              ) : null}
              {nearestBranch ? (
                <p className="mt-2 text-[0.95rem] text-[#0f766e]">
                  Đã gợi ý chi nhánh gần nhất ({nearestBranch.distanceKm.toFixed(1)} km).
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="booking-note" className="mb-2 block text-[1.05rem] font-semibold text-[#374151]">
                Ghi chú
              </label>
              <textarea
                id="booking-note"
                rows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Mô tả tình trạng da hoặc yêu cầu đặc biệt..."
                className="w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 py-4 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
              />
            </div>

            {submitError ? (
              <p className="text-[0.95rem] text-[#dc2626]">{submitError}</p>
            ) : null}
            {submitSuccess ? (
              <p className="text-[0.95rem] text-[#0f766e]">{submitSuccess}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-16 w-full rounded-[14px] bg-gradient-to-r from-[#f04b9a] to-[#7c3aed] px-8 text-[1.35rem] font-extrabold text-white transition-opacity hover:opacity-90 md:text-[1.65rem]"
            >
              {isSubmitting
                ? "Đang gửi thông tin..."
                : "Đặt lịch ngay - Miễn phí tư vấn"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
