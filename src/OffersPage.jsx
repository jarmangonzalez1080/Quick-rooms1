import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard, Percent, MapPin, ArrowRight } from "lucide-react";

const BANK_OFFERS = [
  {
    id: "bbva-msi",
    title: "Hasta 24 meses sin intereses",
    bank: "BBVA",
    banner: "/PHDesk-BBVA-1920x426-7abecf7ede42.jpg",
    minimum: "$5,000 MXN",
    terms: "3, 6, 9, 12, 18 y 24 MSI",
  },
  {
    id: "temporada-msi",
    title: "Promociones bancarias QuickRooms",
    bank: "Bancos participantes",
    banner: "/PAGINA_WEB_BANNERS_20261001180653.jpg",
    minimum: "$3,500 MXN",
    terms: "3, 6, 9, 12, 18 y 21 MSI",
  },
];

const DEFAULT_PROPERTIES = [
  { id: 4, name: "Motel Eclipse Oriente", zone: "Oriente, CDMX", price: 540, oldPrice: 890, discount: 39, color: "from-[#16203D] to-[#39486F]", badges: ["Jacuzzi", "Vapor", "WiFi"] },
  { id: 3, name: "Royal Steam Tlalpan", zone: "Tlalpan, CDMX", price: 940, oldPrice: 1490, discount: 37, color: "from-[#111936] to-[#4A2A50]", badges: ["Vapor", "Sauna", "Jacuzzi"] },
  { id: 2, name: "Hotel Boutique Centro 24", zone: "Centro, CDMX", price: 760, oldPrice: 1190, discount: 36, color: "from-[#1C2541] to-[#714063]", badges: ["Alberca privada", "Spa", "Rooftop"] },
  { id: 6, name: "Tlalpan Private Pool", zone: "Tlalpan, CDMX", price: 1280, oldPrice: 1990, discount: 36, color: "from-[#121A34] to-[#B3356E]", badges: ["Alberca privada", "Spa", "Garaje privado"] },
];

export default function OffersPage({
  properties = DEFAULT_PROPERTIES,
  formatMoney = (value) => `$${value.toLocaleString("es-MX")} MXN`,
  onSelectProperty,
}) {
  const [slide, setSlide] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const currentOffer = BANK_OFFERS[slide];
  const discounted = [...properties].sort((a, b) => (b.discount || 0) - (a.discount || 0));

  return (
    <main className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
      <section className="bg-[#1C2541] px-5 py-10 text-white">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#E94584]">QuickRooms Deals</p>
          <h1 className="mt-2 text-4xl font-black">Ofertas para disfrutar más y pagar mejor</h1>
          <p className="mt-3 max-w-2xl text-white/65">Promociones bancarias, meses sin intereses y propiedades con descuentos destacados.</p>
        </div>
      </section>

      <section className="relative mx-auto h-[260px] max-w-[1920px] overflow-hidden bg-[#111936] md:h-[430px]">
        <button type="button" onClick={() => setSelectedOffer(currentOffer)} className="h-full w-full">
          <img src={currentOffer.banner} alt={currentOffer.title} className="h-full w-full object-cover" />
        </button>
        <button type="button" onClick={() => setSlide((slide - 1 + BANK_OFFERS.length) % BANK_OFFERS.length)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#111936]/80 text-white"><ChevronLeft /></button>
        <button type="button" onClick={() => setSlide((slide + 1) % BANK_OFFERS.length)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#111936]/80 text-white"><ChevronRight /></button>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#E94584]">Beneficios bancarios</p><h2 className="mt-2 text-3xl font-black">Meses sin intereses y promociones</h2></div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {BANK_OFFERS.map((offer) => (
            <button key={offer.id} type="button" onClick={() => setSelectedOffer(offer)} className="overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-[#1C2541]/10 transition hover:-translate-y-1 hover:shadow-lg">
              <img src={offer.banner} alt={offer.title} className="h-44 w-full object-cover" />
              <div className="p-5"><div className="flex items-center gap-2 text-[#E94584]"><CreditCard size={19}/><b>{offer.bank}</b></div><h3 className="mt-2 text-xl font-black">{offer.title}</h3><p className="mt-2 text-sm text-[#1C2541]/55">Compra mínima desde {offer.minimum}</p><span className="mt-4 inline-flex items-center gap-1 font-black text-[#E94584]">Ver condiciones <ArrowRight size={16}/></span></div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-14">
        <p className="text-xs font-black uppercase tracking-[.18em] text-[#E94584]">Top descuentos</p>
        <h2 className="mt-2 text-3xl font-black">Propiedades con los descuentos más altos</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {discounted.map((property) => (
            <article key={property.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#1C2541]/10">
              <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${property.color}`}><img src="/Logo.png" alt="" className="h-24 w-24 rounded-3xl opacity-20"/><span className="absolute left-3 top-3 rounded-full bg-[#E94584] px-3 py-1 text-sm font-black text-white">-{property.discount}%</span></div>
              <div className="p-5"><h3 className="text-lg font-black">{property.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-[#1C2541]/55"><MapPin size={14}/>{property.zone}</p><div className="mt-3 flex flex-wrap gap-2">{property.badges?.slice(0,3).map((badge)=><span key={badge} className="rounded-full bg-[#F3F5F9] px-2 py-1 text-xs font-bold">{badge}</span>)}</div><p className="mt-5 text-xs text-[#1C2541]/40 line-through">{formatMoney(property.oldPrice)}</p><p className="text-2xl font-black">{formatMoney(property.price)}</p><button type="button" onClick={() => onSelectProperty?.(property)} className="mt-4 w-full rounded-xl bg-[#E94584] px-4 py-3 font-black text-white">Ver propiedad</button></div>
            </article>
          ))}
        </div>
      </section>

      {selectedOffer && (
        <div className="fixed inset-0 z-[150] grid place-items-center bg-[#111936]/70 p-4" onMouseDown={() => setSelectedOffer(null)}>
          <div className="w-full max-w-[680px] overflow-hidden rounded-3xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <img src={selectedOffer.banner} alt="" className="h-48 w-full object-cover" />
            <div className="p-6"><button type="button" onClick={() => setSelectedOffer(null)} className="float-right text-sm font-black text-[#E94584]">Cerrar</button><Percent className="text-[#E94584]"/><h2 className="mt-3 text-2xl font-black">{selectedOffer.title}</h2><p className="mt-1 font-bold text-[#1C2541]/60">{selectedOffer.bank}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#F3F5F9] p-4"><small className="font-black text-[#1C2541]/45">COMPRA MÍNIMA</small><p className="mt-1 font-black">{selectedOffer.minimum}</p></div><div className="rounded-2xl bg-[#F3F5F9] p-4"><small className="font-black text-[#1C2541]/45">PLAZOS</small><p className="mt-1 font-black">{selectedOffer.terms}</p></div></div><p className="mt-5 text-sm leading-6 text-[#1C2541]/65">La promoción final depende del banco emisor, tarjeta participante, vigencia y monto de compra. Las condiciones definitivas deberán validarse antes del pago.</p></div>
          </div>
        </div>
      )}
    </main>
  );
}
