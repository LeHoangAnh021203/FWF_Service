"use client";

import { useState } from "react";
import CommingSoon from "./ui/comming-soon";

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
  const [isCommingSoonOpen, setIsCommingSoonOpen] = useState(false);

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

        <div className="mx-auto mt-12 w-full max-w-[920px] rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:mt-16 md:p-10">
          <h3 className="text-center text-[clamp(1.5rem,2vw,2.2rem)] font-extrabold uppercase text-[#151515]">
            Đặt Lịch Liền Tay, Nhận Ngay Ưu Đãi
          </h3>
          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row">
            <input
              type="tel"
              placeholder="Nhập SĐT để đặt lịch"
              className="h-14 flex-1 rounded-md border border-transparent bg-[#f2f2f2] px-5 text-[1.05rem] text-[#222] outline-none placeholder:text-[#9a9a9a] focus:border-[#ff6936]/30"
            />
            <button
              type="button"
              onClick={() => setIsCommingSoonOpen(true)}
              className="h-14 rounded-md bg-[#ff6936] px-10 text-[1.05rem] font-bold text-white transition-colors hover:bg-[#f45c28]"
            >
              Đặt Lịch
            </button>
          </div>
        </div>
      </div>

      <CommingSoon
        open={isCommingSoonOpen}
        onClose={() => setIsCommingSoonOpen(false)}
      />
    </section>
  );
}
