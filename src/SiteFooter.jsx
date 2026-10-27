import React from "react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#111936] px-5 py-7 text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3"><img src="/Logo.png" alt="QuickRooms" className="h-10 w-10 rounded-xl" /><img src="/Name%20update.png" alt="QuickRooms" className="h-8" /></div>
        <div className="flex items-center gap-3"><SocialLink href="https://www.facebook.com/share/1KEP2V6rNT/" label="Facebook">f</SocialLink><SocialLink href="https://www.instagram.com/quickrooms.com_" label="Instagram">◎</SocialLink><SocialLink href="https://x.com/QuickRoooms1" label="X">X</SocialLink><SocialLink href="https://www.tiktok.com/@quickrooms1" label="TikTok">♪</SocialLink></div>
        <p className="text-xs text-white/55">© 2026 QuickRooms. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 font-black hover:bg-[#E94584]">{children}</a>; }
