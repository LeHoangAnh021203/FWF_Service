"use client";

import { useMemo, useState } from "react";
import { useIsMobile } from "./ui/use-mobile";

const appItems = [
  {
    id: "facebook",
    href: "https://www.facebook.com/facewashfox",
    color: "bg-[#1877F2]",
    label: "Facebook",
  },
  {
    id: "zalo",
    href: "https://zalo.me/352472932154112250",
    color: "bg-white",
    label: "Zalo",
  },

  {
    id: "phone",
    href: "tel:088 986 66 66",
    color: "bg-[#22c55e]",
    label: "Hotline",
  },
  {
    id: "youtube",
    href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2F%40facewashfox%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEyR3dQYUJTVUhKd3o3TFRyZ3NydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR56ZwMV_etfaMAM4zsfVZ2c1HDwyXV4Y3kOxjkUYT6JAzREuJqu9K4IUAo2YQ_aem_V0dwizVcte4pqbBLXEubGg&h=AT5Tembs28CG8fU068DKr4Aeht5DUHLPXgUvBSEn1iEtc_MrUQ6oczuvnh8mo8FCukmhtLUPczF72NT-zRtu3oLJjkKf79UC-yW-6GPBcCF7nkKUQxWAHIj-5grj_HkLY-vtWru8z8_RiArGLhRLQ-LvkQ",
    color: "bg-[#ef4444]",
    label: "YouTube",
  },
  {
    id: "instagram",
    href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Ffacewashfox%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEyR3dQYUJTVUhKd3o3TFRyZ3NydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7_JzX660szs7JbStPp7BYS_jNWb8TAwLLdI6r_QR7rp2rp_QK6YvIy7vcABw_aem_VEDsCV_kSNDuGDojegpvPg&h=AT4Mpv_ifdSkS2gEQjf012lNfwx_-kP9ugs0gYFdcIgJ-8MHE-WB9dyC-xyYvyh5Pud3DTvIhO7YYetwFVbjNaZ_iNOmSaO9SFRb34dZapulXjpEUHnFCvNhB8gsjvZQVBrpsdEw-kE6GKfY0T-P7wY_kw",
    color: "bg-[#a855f7]",
    label: "Instagram",
  },
];

function AppIcon({ id }: { id: string }) {
  switch (id) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7h2.3l.3-2.7h-2.6V9.6c0-.8.2-1.3 1.4-1.3H16V5.9c-.2 0-.9-.1-1.8-.1-1.8 0-3 .9-3 3.1v2.4H9v2.7h2.3v7h2.2Z" />
        </svg>
      );
    case "zalo":
      return (
        <img
          src="https://i.pinimg.com/1200x/4b/a5/7a/4ba57a41c5d31caaefef977fd59b9003.jpg"
          alt="Zalo"
          className="h-5 w-5 rounded-full object-cover"
        />
      );
    case "website":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19 19.5 19.5 0 0 1 5 12.8 19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.8 2.8a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 5.9 5.9l1.4-1.3a2 2 0 0 1 2.1-.4c.9.4 1.8.7 2.8.8A2 2 0 0 1 22 16.9Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2A34 34 0 0 0 12 4.8c-2.8 0-5.2.1-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12c0 1.7.1 3.4.4 4.8a2.8 2.8 0 0 0 2 2 34 34 0 0 0 7.6.4c2.8 0 5.2-.1 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12c0-1.7-.1-3.4-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 10h10M7 14h6" />
          <path d="M4 4h16v16H4z" />
        </svg>
      );
  }
}

export default function FloatingAppMenu() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const positions = useMemo(() => {
    // Always fan toward top-left so icons stay inside viewport.
    const radius = isMobile ? 108 : 136;
    const startDeg = isMobile ? -178 : -172;
    const endDeg = isMobile ? -102 : -92;
    const step = (endDeg - startDeg) / Math.max(appItems.length - 1, 1);

    return appItems.map((_, index) => {
      const angle = ((startDeg + step * index) * Math.PI) / 180;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, [isMobile]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[120] md:bottom-8 md:right-8">
      {appItems.map((item, index) => {
        const pos = positions[index];
        return (
          <a
            key={item.id}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={item.label}
            className={`pointer-events-auto absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 md:h-12 md:w-12 ${item.color} ${open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-50 opacity-0"
              }`}
            style={{
              transform: open
                ? `translate(${pos.x}px, ${pos.y}px)`
                : "translate(0px, 0px)",
              transitionDelay: open ? `${index * 35}ms` : "0ms",
            }}
          >
            <AppIcon id={item.id} />
          </a>
        );
      })}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Dong menu app" : "Mo menu app"}
        className="pointer-events-auto relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition hover:scale-105"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
