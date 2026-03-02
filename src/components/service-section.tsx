import Image from "next/image";

const spriteImage =
  "https://facewashfox.com/wp-content/uploads/2024/06/dich-vu.png";

const serviceCards = [
  {
    offset: 0,
    translateX: "0%",

    alt: "Lieu trinh rua mat chuyen sau",
  },
  {
    offset: 1,
    translateX: "-34%",

    alt: "Dai su thuong hieu Face Wash Fox",
  },
  {
    offset: 2,
    translateX: "-68%",

    alt: "Doi ngu ky thuat vien Face Wash Fox",
  },
];

export default function ServiceSection() {
  return (
    <main className="mx-auto grid min-h-fit w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-7 py-8 md:px-8 md:py-10 lg:min-h-dvh lg:grid-cols-[minmax(250px,370px)_1fr] lg:gap-[clamp(1.2rem,2.8vw,3rem)] lg:px-[clamp(1rem,3vw,3rem)]">


      <section className="grid gap-5 lg:gap-6">
        <h1 className="max-w-full text-[clamp(2.05rem,8.4vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.03em] lg:max-w-[10ch]">
          Dịch vụ cung cấp
        </h1>
        <p className="max-w-[31ch] text-[clamp(1.05rem,5.1vw,1.95rem)] text-muted lg:max-w-[50ch]">
          Những liệu trình rửa mặt chuyên sâu được chúng tôi nghiên cứu và phát triển không ngừng để phục vụ cho hàng triệu khách hàng Việt Nam
        </p>
        <a
          href="#combo-love"
          className="mt-3 inline-flex items-center gap-2 text-[clamp(1.1rem,1.3vw,1.35rem)] font-bold text-accent no-underline"
          aria-label="Kham pha dich vu ngay"
        >
          Khám Phá Ngay <span aria-hidden>→</span>
        </a>
      </section>

      <section
        className="grid grid-cols-3 items-end gap-3 md:gap-4 xl:grid-cols-3 xl:gap-7"
        aria-label="Thu vien hinh anh dich vu"
      >
        {serviceCards.map((card) => (
          <article key={card.offset} className="relative rounded-card">
            <div
              className={`absolute inset-[0.65rem_-0.45rem_-0.45rem_0.45rem] z-0 rounded-card md:inset-[1rem_-0.75rem_-0.75rem_0.75rem] lg:inset-[2rem_-1.6rem_-1.6rem_1.6rem] `}
            />
            <div className="relative z-10 aspect-[1183/1618] w-full overflow-hidden rounded-card">
              <Image
                src={spriteImage}
                alt={card.alt}
                width={3548}
                height={1618}
                priority={false}
                className="block h-auto w-[306%] max-w-none"
                style={{ transform: `translateX(${card.translateX})` }}
              />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
