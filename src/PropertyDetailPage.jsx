import React, { useMemo, useState } from "react";
import { ArrowLeft, Bath, BedDouble, Car, Check, Clock3, Heart, MapPin, ShieldCheck, Sparkles, Star, Users, Wifi, X } from "lucide-react";
import SiteFooter from "./SiteFooter.jsx";

const ROOM_TYPES = [
  { id: "standard", name: "Habitación Deluxe", beds: "1 King size", capacity: 2, priceFactor: 1, stock: 4, description: "Una habitación amplia para estancias flexibles, con enfoque en comodidad, privacidad y relajación.", entertainment: ["Smart TV", "WiFi"], special: ["Jacuzzi"], amenities: ["Jacuzzi", "Smart TV", "WiFi", "Aire acondicionado"], options: ["Pago en propiedad", "Cancelación gratuita"] },
  { id: "romantic", name: "Suite Romántica", beds: "1 cama redonda", capacity: 2, priceFactor: 1.22, stock: 2, description: "Suite con diseño distintivo, iluminación ambiental y equipamiento pensado para una estancia privada y cómoda.", entertainment: ["Smart TV", "Iluminación ambiental"], special: ["Jacuzzi", "Espejos decorativos"], amenities: ["Jacuzzi", "Iluminación ambiental", "Espejos decorativos", "Minibar"], options: ["Reserva inmediata", "Pago en propiedad"] },
  { id: "experience", name: "Suite Experience", beds: "1 King size", capacity: 2, priceFactor: 1.38, stock: 2, description: "Suite de experiencia con equipamiento especial, audio e iluminación configurable dentro de la habitación.", entertainment: ["Sistema de sonido / Bluetooth", "Iluminación RGB"], special: ["Tubo de pole dance", "Jacuzzi"], amenities: ["Tubo de pole dance", "Jacuzzi", "Sistema de sonido / Bluetooth", "Iluminación RGB"], options: ["Reserva inmediata", "Cancelación gratuita"] },
  { id: "double", name: "Habitación Doble", beds: "2 camas matrimoniales", capacity: 4, priceFactor: 1.3, stock: 3, description: "Habitación de mayor capacidad con dos camas matrimoniales y amenidades esenciales para estancias compartidas.", entertainment: ["Smart TV", "WiFi"], special: ["Regadera tipo lluvia"], amenities: ["Smart TV", "WiFi", "Aire acondicionado", "Regadera tipo lluvia"], options: ["Pago en propiedad", "Cancelación gratuita"] },
];

export default function PropertyDetailPage({ hotel, search = {}, language = "es", formatMoney = (v) => `$${v} MXN`, onBack, onReserve }) {
  const english = language === "en";
  const [tab, setTab] = useState("property");
  const [favorite, setFavorite] = useState(false);
  const [detailRoomId, setDetailRoomId] = useState(null);
  const [showDemandNotice, setShowDemandNotice] = useState(false);
  const rooms = useMemo(() => ROOM_TYPES.map((room) => ({ ...room, price: Math.round((hotel?.price || 850) * room.priceFactor) })), [hotel]);
  const stayLabel = search.stayType === "hourly" ? `${search.stayDuration || 2} ${english ? "hours" : "horas"}` : (english ? "Full night" : "Noche completa");
  const tabs = [
    ["property", english ? "About the property" : "Acerca de la propiedad"],
    ["amenities", english ? "Property amenities" : "Amenidades de la propiedad"],
    ["rooms", english ? "Rooms" : "Habitaciones"],
    ["additional", english ? "Additional information" : "Información adicional"],
    ["reviews", english ? "Reviews" : "Opiniones"],
  ];

  const scrollToSection = (sectionId) => {
    setTab(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  React.useEffect(() => {
    const demandTimer = window.setTimeout(() => setShowDemandNotice(true), 30000);
    return () => window.clearTimeout(demandTimer);
  }, []);

  React.useEffect(() => {
    const sectionIds = tabs.map(([value]) => value);
    const updateActiveSection = () => {
      const marker = 245;
      let current = sectionIds[0];
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element && element.getBoundingClientRect().top <= marker) current = sectionId;
      }
      setTab(current);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [english]);

  return <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
    <header className="border-b border-[#1C2541]/10 bg-white/95">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-black text-[#1C2541]"><ArrowLeft size={17}/>{english ? "Back to results" : "Volver a resultados"}</button>
        <button type="button" onClick={() => setFavorite((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-[#1C2541]/15 bg-white"><Heart size={20} className={favorite ? "fill-[#E94584] text-[#E94584]" : "text-[#1C2541]"}/></button>
      </div>
      <nav className="fixed inset-x-0 top-[154px] z-[85] flex gap-3 overflow-x-auto border-y border-[#1C2541]/10 bg-white/95 px-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))] py-3 shadow-md backdrop-blur">{tabs.map(([value,label]) => <button type="button" key={value} onClick={() => scrollToSection(value)} className={`whitespace-nowrap rounded-xl border-2 px-4 py-2.5 text-sm font-black transition-all ${tab===value?"border-[#E94584] bg-transparent text-[#E94584] shadow-sm":"border-[#1C2541] bg-transparent text-[#1C2541] hover:border-[#E94584] hover:text-[#E94584]"}`}>{label}</button>)}</nav>
    </header>
    <div className="h-[66px]" aria-hidden="true" />

    <main className="mx-auto max-w-[1440px] px-4 py-6">
      <button type="button" onClick={onBack} className="mb-4 text-sm font-bold text-[#3563FF]">← {english ? "See all stays" : "Ver todas las estancias"}</button>
      <section className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
        <div className={`relative min-h-[330px] overflow-hidden rounded-3xl bg-gradient-to-br ${hotel?.color || "from-[#111936] to-[#E94584]"} md:col-span-2 md:row-span-2`}><img src="/Logo.png" alt="" className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-3xl opacity-20"/><span className="absolute bottom-4 left-4 rounded-xl bg-black/55 px-3 py-2 text-sm font-black text-white">QuickRooms Select</span></div>
        {[1,2,3,4].map((i)=><div key={i} className={`relative min-h-[160px] overflow-hidden rounded-3xl bg-gradient-to-br ${hotel?.color || "from-[#1C2541] to-[#39486F]"} opacity-${i === 4 ? "80" : "90"}`}><div className="absolute inset-0 bg-white/5"/>{i===4&&<span className="absolute bottom-3 right-3 rounded-xl bg-[#111936] px-3 py-2 text-xs font-black text-white">{english?"View photos":"Ver fotos"}</span>}</div>)}
      </section>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
        <div><div className="flex items-center gap-2"><span className="rounded-lg bg-[#111936] px-2 py-1 text-sm font-black text-white">{hotel?.rating || 9.0}</span><span className="text-sm font-bold">{hotel?.reviews || 250} {english?"reviews":"opiniones"}</span></div><h1 className="mt-3 text-3xl font-black">{hotel?.name || "QuickRooms Select"}</h1><p className="mt-2 flex items-center gap-1 text-sm text-[#1C2541]/60"><MapPin size={15}/>{hotel?.zone || search.destination || "Ciudad de México"}</p></div>
        <div className="rounded-2xl bg-white p-4 text-right shadow-sm ring-1 ring-[#1C2541]/10"><p className="text-xs font-bold text-[#1C2541]/50">{english?"Your search":"Tu búsqueda"}</p><p className="mt-1 font-black">{stayLabel}</p><p className="text-sm text-[#1C2541]/60">{search.adults || 2} {english?"guests":"huéspedes"} · {search.rooms || 1} {english?"room":"habitación"}</p></div>
      </div>

      <div className="space-y-12 pb-12">
        <div id="property" className="scroll-mt-[230px]"><PropertyInfo hotel={hotel} english={english}/></div>
        <div id="amenities" className="scroll-mt-[230px]"><Amenities english={english}/></div>
        <div id="rooms" className="scroll-mt-[230px]"><RoomsSection rooms={rooms} search={search} formatMoney={formatMoney} english={english} detailRoomId={detailRoomId} setDetailRoomId={setDetailRoomId} onReserve={onReserve}/></div>
        <div id="additional" className="scroll-mt-[230px]"><Policies english={english}/></div>
        <div id="reviews" className="scroll-mt-[230px]"><Reviews hotel={hotel} english={english}/></div>
      </div>
    </main>

    {showDemandNotice && <div className="fixed bottom-5 right-5 z-[95] w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-white/20 bg-[#E94584] p-4 text-white shadow-2xl">
      <button type="button" onClick={() => setShowDemandNotice(false)} aria-label={english ? "Close notice" : "Cerrar aviso"} className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[#1C2541]/20 text-white hover:bg-[#1C2541]/35"><X size={15}/></button>
      <div className="pr-8">
        <div className="flex items-center gap-2"><Users size={18} className="text-white"/><p className="text-sm font-black">{english ? "This property is getting attention" : "Esta propiedad está generando interés"}</p></div>
        <p className="mt-2 text-sm font-semibold leading-5 text-white/90">{english ? "Availability can change quickly. If this option works for you, reserve soon to secure the current availability." : "La disponibilidad puede cambiar rápidamente. Si esta opción te funciona, reserva pronto para asegurar la disponibilidad actual."}</p>
      </div>
    </div>}

    <SiteFooter />
  </div>;
}

function RoomsSection({ rooms, search, formatMoney, english, detailRoomId, setDetailRoomId, onReserve }) {
  const durations = [2, 4, 6, 8, 12];
  const requestedDuration = Number(search.stayDuration) || 2;
  const availableDurations = durations.filter((hours) => hours >= requestedDuration);
  return <section className="mt-8"><div className="mb-4"><h2 className="text-2xl font-black">{english?"Choose your room":"Elige tu habitación"}</h2><p className="mt-1 text-sm text-[#1C2541]/55">{english?"Review each room first, then choose an available duration and booking option.":"Revisa primero los detalles de cada habitación y después elige una duración y opción de reserva disponible."}</p></div>
    <div className="space-y-4">{rooms.map((room) => {
      const expanded = detailRoomId === room.id;
      return <article key={room.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#1C2541]/10">
        <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_260px]">
          <div className="relative min-h-[210px] bg-gradient-to-br from-[#111936] to-[#39486F]"><img src="/Logo.png" alt="" className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl opacity-20"/><span className="absolute left-3 top-3 rounded-lg bg-white px-2 py-1 text-xs font-black">{room.stock} {english?"available":"disponibles"}</span></div>
          <div className="p-5"><h3 className="text-xl font-black">{room.name}</h3><div className="mt-2 flex flex-wrap gap-4 text-sm text-[#1C2541]/65"><span className="flex items-center gap-1"><BedDouble size={16}/>{room.beds}</span><span className="flex items-center gap-1"><Users size={16}/>{english?`Up to ${room.capacity}`:`Hasta ${room.capacity} huéspedes`}</span></div><div className="mt-4 flex flex-wrap gap-2">{room.amenities.slice(0,4).map((a)=><span key={a} className="rounded-full bg-[#F3F5F9] px-3 py-1 text-xs font-bold">{a}</span>)}</div></div>
          <div className="flex flex-col justify-between border-t border-[#1C2541]/10 bg-[#1C2541] p-5 text-white lg:border-l lg:border-t-0"><div><p className="text-xs font-bold text-white/60">{english?"From":"Desde"}</p><p className="mt-1 text-2xl font-black text-white">{formatMoney(room.price)}</p></div><button type="button" onClick={() => setDetailRoomId(expanded ? null : room.id)} className="mt-5 rounded-xl bg-[#E94584] px-4 py-3 font-black text-white shadow transition hover:brightness-95">{expanded ? (english?"Hide room details":"Ocultar detalles") : (english?"Room details":"Detalles de habitación")}</button></div>
        </div>

        {expanded && <div className="border-t border-[#1C2541]/10 bg-white p-5 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div>
              <h4 className="text-lg font-black">{english?"About this room":"Acerca de esta habitación"}</h4>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#1C2541]/65">{room.description}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailGroup icon={BedDouble} title={english?"Bed & capacity":"Cama y capacidad"} items={[room.beds, english?`Up to ${room.capacity} guests`:`Hasta ${room.capacity} huéspedes`]}/>
                <DetailGroup icon={Sparkles} title={english?"Special equipment":"Equipamiento especial"} items={room.special}/>
                <DetailGroup icon={Wifi} title={english?"Entertainment":"Entretenimiento"} items={room.entertainment}/>
                <DetailGroup icon={Bath} title={english?"Room amenities":"Amenidades"} items={room.amenities}/>
              </div>
            </div>
            <div className="rounded-2xl bg-[#1C2541] p-5 text-white shadow-sm ring-1 ring-[#1C2541]/10">
              <h4 className="font-black text-white">{english?"Available booking options":"Opciones de reservación disponibles"}</h4>
              {search.stayType === "hourly" ? <div className="mt-4 space-y-3">{availableDurations.map((hours) => {
                const price = Math.round(room.price * (hours / 6) * (hours === 12 ? 0.92 : 1));
                return <div key={hours} className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 p-3"><div><p className="font-black">{hours} {english?"hours":"horas"}</p><p className="mt-1 inline-flex rounded-full bg-[#1FA45B] px-2 py-1 text-[11px] font-black text-white shadow-sm">{english?"Available · Instant confirmation":"Disponible · Confirmación inmediata"}</p></div><div className="text-right"><p className="font-black">{formatMoney(price)}</p><button type="button" onClick={() => onReserve?.({...room, selectedDuration: hours, selectedPrice: price})} className="mt-1 rounded-lg bg-[#E94584] px-3 py-2 text-xs font-black text-white">{english?"Reserve":"Reservar"}</button></div></div>;
              })}<div className="mt-4 rounded-xl border border-[#E94584]/40 bg-[#E94584]/10 px-4 py-3 text-center"><p className="text-base font-black text-[#FF6FA3]">{english?"Stay longer, save more":"Quédate más, ahorra más"}</p><p className="mt-1 text-xs font-bold text-white/75">{english?"Choose a longer stay and unlock special QuickRooms hourly rates.":"Elige una estancia más larga y aprovecha tarifas especiales de QuickRooms por hora."}</p></div></div> : <div className="flex min-h-[210px] flex-col items-center justify-center py-5"><button type="button" onClick={() => onReserve?.({...room, bookingOption:"full-night", selectedPrice: room.price})} className="w-full rounded-xl bg-[#E94584] px-4 py-3 text-sm font-black text-white shadow transition hover:brightness-95">{english?"Reserve now":"Reserva ahora"}</button><div className="mt-4 w-full rounded-xl border border-[#E94584]/40 bg-[#E94584]/10 px-4 py-3 text-center"><p className="text-base font-black text-[#FF6FA3]">{english?"Save up to 37% today":"Ahorra hasta 37% hoy"}</p><p className="mt-1 text-xs font-bold text-white/75">{english?"Limited-time QuickRooms rate. Book now to secure this price.":"Tarifa QuickRooms por tiempo limitado. Reserva ahora para asegurar este precio."}</p></div></div>}
            </div>
          </div>
        </div>}
      </article>;
    })}</div>
  </section>;
}

function DetailGroup({ icon: Icon, title, items = [] }) { return <div className="rounded-2xl bg-[#1C2541] p-4 text-white shadow-sm ring-1 ring-[#1C2541]/10"><div className="flex items-center gap-2"><Icon size={18} className="text-[#E94584]"/><h5 className="text-sm font-black text-white">{title}</h5></div><div className="mt-3 space-y-2">{items.map((item)=><p key={item} className="flex items-start gap-2 text-sm text-white/80"><Check size={14} className="mt-0.5 shrink-0 text-[#267A4A]"/>{item}</p>)}</div></div>; }
function BookingOption({ label, note, price, formatMoney, onClick, english }) { return <div className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="font-black">{label}</p><p className="mt-1 inline-flex rounded-full bg-[#1FA45B] px-2 py-1 text-[11px] font-black text-white shadow-sm">{note}</p><div className="mt-3 flex items-end justify-between gap-3"><p className="text-lg font-black">{formatMoney(price)}</p><button type="button" onClick={onClick} className="rounded-lg bg-[#E94584] px-3 py-2 text-xs font-black text-white">{english?"Reserve":"Reservar"}</button></div></div>; }

function PropertyInfo({ hotel, english }) { return <section className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]"><div className="rounded-3xl bg-white p-6 ring-1 ring-[#1C2541]/10"><h2 className="text-2xl font-black">{english?"About the property":"Acerca de la propiedad"}</h2><p className="mt-4 leading-7 text-[#1C2541]/70">{english?"A property selected by QuickRooms for flexible short stays and overnight bookings, with private spaces, clear rates and room-level availability.":`${hotel?.name || "Esta propiedad"} forma parte de la selección QuickRooms para estancias flexibles por horas y noche completa. Aquí puedes revisar las características de la propiedad, privacidad, servicios y disponibilidad real por tipo de habitación antes de continuar.`}</p></div><div className="rounded-3xl bg-[#111936] p-6 text-white"><ShieldCheck className="text-[#E94584]"/><h3 className="mt-3 text-lg font-black">{english?"QuickRooms booking":"Reserva QuickRooms"}</h3><p className="mt-2 text-sm text-white/70">{english?"Room, duration and booking conditions are shown before checkout.":"Tipo de habitación, duración y condiciones de reserva visibles antes de pagar."}</p></div></section>; }
function Amenities({ english }) { const groups=[[Bath,english?"Water & relaxation":"Agua y relajación",["Jacuzzi","Alberca privada","Vapor privado","Sauna","Regadera tipo lluvia"]],[Sparkles,english?"Room experience":"Experiencia en habitación",["Iluminación ambiental","Smart TV","Sistema de sonido / Bluetooth","Habitación temática","Tubo de pole dance"]],[Wifi,english?"Comfort":"Comodidad",["WiFi","Aire acondicionado","Minibar","Servicio a la habitación"]],[Car,english?"Privacy & access":"Privacidad y acceso",["Garaje privado","Check-in discreto","Acceso privado"]]]; return <section className="mt-8"><h2 className="text-2xl font-black">{english?"Property amenities":"Amenidades de la propiedad"}</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{groups.map(([Icon,title,items])=><div key={title} className="rounded-3xl bg-[#1C2541] p-5 text-white shadow-sm ring-1 ring-[#1C2541]/10"><div className="flex items-center gap-2"><Icon size={20} className="text-[#E94584]"/><h3 className="font-black text-white">{title}</h3></div><div className="mt-4 grid gap-2">{items.map(i=><p key={i} className="flex items-center gap-2 text-sm text-white/85"><Check size={15} className="text-[#E94584]"/>{i}</p>)}</div></div>)}</div></section>; }
function Policies({ english }) { return <section className="mt-8 space-y-4"><h2 className="text-2xl font-black">{english?"Additional information":"Información adicional"}</h2>{[["Check-in", english?"Identification may be requested. Check-in conditions depend on the selected room and rate.":"Puede solicitarse identificación. Las condiciones de ingreso dependen de la habitación y tarifa seleccionadas."],[english?"Cancellation":"Cancelación",english?"Cancellation rules are shown for each room option before reservation.":"Las reglas de cancelación se muestran por opción de habitación antes de reservar."],[english?"Payment":"Pago",english?"Available payment methods may include online payment or payment at the property.":"Según la tarifa, puede haber pago en línea o pago en la propiedad."]].map(([t,d])=><div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-[#1C2541]/10"><h3 className="font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-[#1C2541]/65">{d}</p></div>)}</section>; }
function Reviews({ hotel, english }) { return <section className="mt-8"><h2 className="text-2xl font-black">{english?"Customer reviews":"Opiniones de clientes"}</h2><div className="mt-4 rounded-3xl bg-[#1C2541] p-6 text-white shadow-sm ring-1 ring-[#1C2541]/10"><div className="flex items-center gap-4"><span className="rounded-xl bg-[#E94584] px-3 py-2 text-2xl font-black text-white shadow-sm">{hotel?.rating || 9.0}</span><div><p className="font-black">{english?"Excellent":"Excelente"}</p><p className="text-sm text-white/65">{hotel?.reviews || 250} {english?"verified reviews":"opiniones verificadas"}</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-2">{["Limpieza","Privacidad","Comodidad","Atención","Servicios","Relación calidad-precio"].map((label,i)=><div key={label}><div className="flex justify-between text-xs font-bold text-white"><span>{label}</span><span>{(8.7+i*.15).toFixed(1)}</span></div><div className="mt-1 h-2 rounded-full bg-white/15"><div className="h-2 rounded-full bg-[#E94584]" style={{width:`${87+i*1.5}%`}}/></div></div>)}</div></div></section>; }

