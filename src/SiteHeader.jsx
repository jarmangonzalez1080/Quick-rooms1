import React from "react";
import { CircleHelp } from "lucide-react";

export default function SiteHeader({ language = "es", currency = "MXN", setLanguage, setCurrency, onHome, onOffers, onPublish, onLogin, user }) {
  const english = language === "en";
  return (
    <header className="sticky top-0 z-[100] bg-[#111936] text-white shadow-lg">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-3">
        <button type="button" onClick={onHome} className="flex items-center gap-3 text-left">
          <img src="/Logo.png" alt="QuickRooms" className="h-11 w-11 rounded-xl object-cover" />
          <img src="/Name%20update.png" alt="QuickRooms" className="h-10 w-auto max-w-[220px] object-contain" />
        </button>
        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-semibold md:gap-4">
          <button type="button" onClick={onOffers} className="hidden hover:text-[#E94584] md:inline">{english ? "Deals" : "Ofertas"}</button>
          <button type="button" onClick={onPublish} className="hidden hover:text-[#E94584] md:inline">{english ? "List your property" : "Publica tu propiedad"}</button>
          <button type="button" onClick={onLogin} className="hidden hover:text-[#E94584] md:inline">{user ? user.name : (english ? "Sign in" : "Iniciar sesión")}</button>
          <select aria-label={english ? "Language" : "Idioma"} value={language} onChange={(event) => setLanguage?.(event.target.value)} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none">
            <option className="text-black" value="es">ES</option>
            <option className="text-black" value="en">EN</option>
          </select>
          <select aria-label={english ? "Currency" : "Moneda"} value={currency} onChange={(event) => setCurrency?.(event.target.value)} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none">
            <option className="text-black" value="MXN">MXN</option>
            <option className="text-black" value="USD">USD</option>
          </select>
          <button type="button" className="flex items-center gap-1.5 rounded-lg px-2 py-2 hover:bg-white/10 hover:text-[#E94584]"><CircleHelp size={17}/><span className="hidden sm:inline">{english ? "Help" : "Ayuda"}</span></button>
        </nav>
      </div>
    </header>
  );
}
