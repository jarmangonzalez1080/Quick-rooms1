import React, { useMemo, useState } from "react";
import { ChevronDown, Heart, MapPin, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Wifi, Car, Star } from "lucide-react";

const PRICE_MIN = 350;
const PRICE_MAX = 1600;

const HOTELS = [
  { id: 1, name: "QuickRooms Platinum Polanco", zone: "Polanco, CDMX", area: "Polanco", rating: 9.4, reviews: 684, price: 1090, oldPrice: 1290, hours: 6, badges: ["Jacuzzi", "WiFi", "Check-in discreto"], preferences: ["Cancelación gratuita", "Garaje privado", "Check-in discreto", "WiFi"], trip: ["Sólo adultos", "LGBT Friendly"], accessibility: ["Elevador", "Estacionamiento con acceso para sillas de rueda"], amenities: ["Jacuzzi", "Alberca privada", "Smart TV", "Iluminación ambiental", "WiFi", "Minibar"], beds: ["King size"], color: "from-[#0D142B] to-[#26365D]" },
  { id: 2, name: "Hotel Boutique Centro 24", zone: "Centro Histórico, CDMX", area: "Centro", rating: 8.8, reviews: 316, price: 760, oldPrice: 920, hours: 5, badges: ["Alberca privada", "Spa", "WiFi"], preferences: ["Cancelación gratuita", "Check-in discreto", "WiFi"], trip: ["Sólo adultos", "LGBT Friendly"], accessibility: ["Elevador", "Baño para persona con discapacidad"], amenities: ["Alberca privada", "Tubo de pole dance", "Habitación temática", "Smart TV", "Iluminación RGB"], beds: ["Queen size", "Cama redonda"], color: "from-[#1C2541] to-[#E94584]" },
  { id: 3, name: "Motel Eclipse Oriente", zone: "Oriente, CDMX", area: "Oriente", rating: 8.6, reviews: 201, price: 540, oldPrice: 650, hours: 6, badges: ["Jacuzzi", "Vapor", "WiFi"], preferences: ["Garaje privado", "WiFi"], trip: ["Familiar", "Pet Friendly"], accessibility: ["Accesibilidad general para personas con discapacidad"], amenities: ["Jacuzzi", "Vapor privado", "Sauna", "Smart TV", "Garaje privado"], beds: ["Matrimonial", "Cama en forma de corazón"], color: "from-[#16203D] to-[#39486F]" },
  { id: 4, name: "Suites Tlalpan Signature", zone: "Tlalpan, CDMX", area: "Tlalpan", rating: 9.3, reviews: 512, price: 860, oldPrice: 1040, hours: 8, badges: ["Alberca", "Check-in discreto", "Garaje privado"], preferences: ["Cancelación gratuita", "Garaje privado", "Check-in discreto"], trip: ["Familiar", "LGBT Friendly"], accessibility: ["Elevador", "Regadera para persona con discapacidad", "Accesibilidad general para personas con discapacidad"], amenities: ["Alberca climatizada", "Regadera tipo lluvia", "Smart TV", "Aire acondicionado", "Minibar"], beds: ["Dos matrimoniales"], color: "from-[#10182F] to-[#E94584]" },
  { id: 5, name: "Urban Love Polanco", zone: "Polanco, CDMX", area: "Polanco", rating: 9.0, reviews: 274, price: 980, oldPrice: 1190, hours: 6, badges: ["Alberca privada", "Jacuzzi", "Temático"], preferences: ["Garaje privado", "Check-in discreto", "WiFi"], trip: ["Sólo adultos", "LGBT Friendly"], accessibility: ["Elevador"], amenities: ["Alberca privada", "Jacuzzi", "Potro decorativo", "Columpio decorativo", "Habitación temática", "Iluminación RGB"], beds: ["King size", "Cama redonda"], color: "from-[#1C2541] to-[#34466F]" },
  { id: 6, name: "Velvet Rooms Centro", zone: "Centro, CDMX", area: "Centro", rating: 8.9, reviews: 348, price: 720, oldPrice: 890, hours: 5, badges: ["Bar", "Tubo de pole dance", "Check-in discreto"], preferences: ["Cancelación gratuita", "Check-in discreto", "WiFi"], trip: ["Sólo adultos"], accessibility: [], amenities: ["Tubo de pole dance", "Habitación temática", "Sistema de sonido / Bluetooth", "Iluminación ambiental", "Minibar"], beds: ["Queen size", "Cama de agua"], color: "from-[#161D36] to-[#6F3155]" },
  { id: 7, name: "Family Suites Oriente", zone: "Oriente, CDMX", area: "Oriente", rating: 8.4, reviews: 165, price: 610, oldPrice: 720, hours: 8, badges: ["Pet Friendly", "Restaurante", "WiFi"], preferences: ["Cancelación gratuita", "Garaje privado", "WiFi"], trip: ["Familiar", "Pet Friendly"], accessibility: ["Estacionamiento con acceso para sillas de rueda", "Baño para persona con discapacidad", "Regadera para persona con discapacidad", "Accesibilidad general para personas con discapacidad"], amenities: ["Smart TV", "Aire acondicionado", "WiFi", "Cafetera", "Balcón"], beds: ["Dos Queen size"], color: "from-[#17213D] to-[#355079]" },
  { id: 8, name: "Royal Steam Tlalpan", zone: "Tlalpan, CDMX", area: "Tlalpan", rating: 9.2, reviews: 429, price: 940, oldPrice: 1120, hours: 6, badges: ["Vapor", "Sauna turco", "Jacuzzi"], preferences: ["Garaje privado", "Check-in discreto", "WiFi"], trip: ["Sólo adultos", "LGBT Friendly"], accessibility: ["Elevador"], amenities: ["Jacuzzi", "Vapor privado", "Sauna", "Potro decorativo", "Iluminación ambiental", "Smart TV"], beds: ["King size", "Cama con dosel"], color: "from-[#111936] to-[#4A2A50]" },
];
const GROUPS = {
  trip: ["Familiar", "Sólo adultos", "LGBT Friendly", "Pet Friendly"],
  accessibility: ["Elevador", "Estacionamiento con acceso para sillas de rueda", "Baño para persona con discapacidad", "Regadera para persona con discapacidad", "Accesibilidad general para personas con discapacidad"],
  amenityCategories: {
    "Agua y relajación": ["Jacuzzi", "Tina de hidromasaje", "Alberca privada", "Alberca climatizada", "Vapor privado", "Sauna", "Regadera tipo lluvia", "Tina independiente"],
    "Entretenimiento y ambiente": ["Smart TV", "Pantalla grande", "Proyector", "Sistema de sonido / Bluetooth", "Karaoke", "Iluminación ambiental", "Iluminación RGB", "Espejos decorativos", "Habitación temática"],
    "Equipamiento especial": ["Tubo de pole dance", "Columpio decorativo", "Potro decorativo", "Plataforma / cama elevada"],
    "Comodidad": ["Aire acondicionado", "Calefacción", "WiFi", "Frigobar", "Minibar", "Cafetera", "Servicio a la habitación", "Terraza privada", "Balcón", "Chimenea"],
  },
  beds: [
    "King size", "Queen size", "Matrimonial", "Dos matrimoniales", "Dos Queen size",
    "Cama redonda", "Cama en forma de corazón", "Cama de agua", "Cama con dosel", "Cama elevada / plataforma", "Cama ajustable"
  ],
  areas: ["Polanco", "Centro", "Oriente", "Tlalpan"],
};

export default function ResultsPage({ search = {}, language = "es", formatMoney = (value) => `$${value} MXN`, onBack, onSelectHotel }) {
  const english = language === "en";
  const [sort, setSort] = useState("recommended");
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minRating, setMinRating] = useState(0);
  const [selected, setSelected] = useState({ preferences: [], trip: [], accessibility: [], amenities: [], beds: [], areas: [] });
  const [favorites, setFavorites] = useState([]);
  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const toggle = (group, value) => setSelected((current) => ({ ...current, [group]: current[group].includes(value) ? current[group].filter((item) => item !== value) : [...current[group], value] }));
  const clear = () => { setMinPrice(PRICE_MIN); setMaxPrice(PRICE_MAX); setMinRating(0); setSort("recommended"); setSelected({ preferences: [], trip: [], accessibility: [], amenities: [], beds: [], areas: [] }); };
  const results = useMemo(() => { let items = HOTELS.filter((hotel) => hotel.price >= minPrice && hotel.price <= maxPrice && hotel.rating >= minRating); ["preferences", "trip", "accessibility", "amenities", "beds"].forEach((group) => { if (selected[group].length) items = items.filter((hotel) => selected[group].some((value) => hotel[group].includes(value))); }); if (selected.areas.length) items = items.filter((hotel) => selected.areas.includes(hotel.area)); if (sort === "price") items = [...items].sort((a,b)=>a.price-b.price); if (sort === "rating") items=[...items].sort((a,b)=>b.rating-a.rating); return items; }, [minPrice,maxPrice,minRating,selected,sort]);
  return <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
    <section className="bg-gradient-to-br from-[#0C132A] via-[#111936] to-[#1C2541] px-4 py-7 text-white"><div className="mx-auto max-w-[1440px]"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black">{english ? "Stays that match your trip" : "Estancias para tu viaje"}</h1><p className="mt-1 text-sm text-white/65">{search.destination || "Ciudad de México"} · {search.adults || 2} {english ? "adults" : "adultos"} · {search.rooms || 1} {english ? "room" : "habitación"}</p></div><div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm"><ShieldCheck size={18} className="text-[#E94584]"/><b>{english ? "Secure booking" : "Reserva segura"}</b></div></div></div></section>
    <div className="mx-auto max-w-[1440px] px-4 pt-5"><button type="button" onClick={onBack} className="rounded-xl border border-[#1C2541]/15 bg-white px-4 py-2.5 text-sm font-black text-[#111936] shadow-sm hover:bg-[#F7F8FB]">{english ? "Back to home" : "Volver al inicio"}</button></div>
    <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-7 lg:grid-cols-[290px_minmax(0,1fr)]">
     <aside className="space-y-4"><div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#1C2541]/10"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2"><SlidersHorizontal size={18}/><b>{english ? "Filters" : "Filtros"}</b></div><button type="button" onClick={clear} className="flex items-center gap-1 text-xs font-black text-[#E94584]"><RotateCcw size={14}/>{english ? "Clear" : "Limpiar filtros"}</button></div><PriceHistogramFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            formatMoney={formatMoney}
            english={english}
          /><CategorizedAmenitiesFilter
            categories={GROUPS.amenityCategories}
            active={selected.amenities}
            onToggle={(v) => toggle("amenities", v)}
            english={english}
          />
          <FilterSection title={english ? "Customer rating" : "Valoración de clientes"}>
            <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#111936]">
              <input
                type="radio"
                name="rating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
                className="accent-[#E94584]"
              />
              {english ? "Any rating" : "Cualquier valoración"}
            </label>

            {[5, 4, 3].map((stars) => {
              const ratingThreshold = stars * 2;
              return (
                <label key={stars} className="mb-2.5 flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === ratingThreshold}
                    onChange={() => setMinRating(ratingThreshold)}
                    className="accent-[#E94584]"
                  />
                  <span className="flex items-center gap-0.5" aria-label={`${stars} ${english ? "stars" : "estrellas"}`}>
                    {Array.from({ length: stars }, (_, index) => (
                      <Star key={index} size={17} className="fill-[#E94584] text-[#E94584]" />
                    ))}
                  </span>
                </label>
              );
            })}

            {showMoreRatings && [2, 1].map((stars) => {
              const ratingThreshold = stars * 2;
              return (
                <label key={stars} className="mb-2.5 flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === ratingThreshold}
                    onChange={() => setMinRating(ratingThreshold)}
                    className="accent-[#E94584]"
                  />
                  <span className="flex items-center gap-0.5" aria-label={`${stars} ${english ? "stars" : "estrellas"}`}>
                    {Array.from({ length: stars }, (_, index) => (
                      <Star key={index} size={17} className="fill-[#E94584] text-[#E94584]" />
                    ))}
                  </span>
                </label>
              );
            })}

            <button
              type="button"
              onClick={() => setShowMoreRatings((current) => !current)}
              className="mt-2 text-sm font-black text-[#E94584] hover:underline"
            >
              {showMoreRatings
                ? (english ? "Show less" : "Ver menos")
                : (english ? "See more" : "Ver más")}
            </button>
          </FilterSection>
          <ExpandableCheckGroup title={english ? "Bed type" : "Tipo de cama"} values={GROUPS.beds} active={selected.beds} onToggle={(v) => toggle("beds", v)} initialCount={5} english={english} />
          <CheckGroup title={english?"Preferences":"Preferencias"} values={["Cancelación gratuita","Garaje privado","Check-in discreto","WiFi"]} active={selected.preferences} onToggle={(v)=>toggle("preferences",v)}/>
          <CheckGroup title="Tipo de viaje" values={GROUPS.trip} active={selected.trip} onToggle={(v)=>toggle("trip",v)}/>
          <CheckGroup title="Accesibilidad" values={GROUPS.accessibility} active={selected.accessibility} onToggle={(v)=>toggle("accessibility",v)}/>
          <CheckGroup title="Zonas" values={GROUPS.areas} active={selected.areas} onToggle={(v)=>toggle("areas",v)} last/></div></aside>
     <main><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-black">{results.length} {english?"stays found":"estancias encontradas"}</h2><p className="text-sm text-[#1C2541]/55">{english?"Select a property to continue":"Selecciona una propiedad para continuar"}</p></div><label className="flex items-center gap-2 rounded-xl border border-[#1C2541]/15 bg-white px-4 py-2 text-sm"><select value={sort} onChange={(e)=>setSort(e.target.value)} className="bg-transparent font-bold outline-none"><option value="recommended">{english?"Recommended":"Recomendados"}</option><option value="price">{english?"Lowest price":"Menor precio"}</option><option value="rating">{english?"Best rating":"Mejor valoración"}</option></select><ChevronDown size={16}/></label></div>
     {results.length===0?<div className="rounded-3xl bg-white p-14 text-center ring-1 ring-[#1C2541]/10"><Search className="mx-auto text-[#E94584]"/><h3 className="mt-3 text-xl font-black">No encontramos propiedades</h3><button type="button" onClick={clear} className="mt-5 rounded-xl bg-[#E94584] px-5 py-3 font-black text-white">Limpiar filtros</button></div>:<div className="space-y-4">{results.map((hotel)=><article key={hotel.id} className="grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#1C2541]/10 md:grid-cols-[250px_minmax(0,1fr)_220px]"><div className={`relative grid min-h-[220px] place-items-center bg-gradient-to-br ${hotel.color}`}><img src="/Logo.png" alt="" className="h-24 w-24 rounded-3xl opacity-20"/><span className="absolute left-3 top-3 rounded-lg bg-[#0C132A] px-2.5 py-1 text-xs font-bold text-white">QuickRooms Select</span><button type="button" onClick={()=>setFavorites((current)=>current.includes(hotel.id)?current.filter((id)=>id!==hotel.id):[...current,hotel.id])} className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"><Heart size={18} className={favorites.includes(hotel.id)?"fill-[#E94584] text-[#E94584]":""}/></button></div><div className="p-5"><h3 className="text-xl font-black">{hotel.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-[#1C2541]/55"><MapPin size={14}/>{hotel.zone}</p><div className="mt-3 flex flex-wrap gap-2">{hotel.badges.map((badge)=><span key={badge} className="rounded-full bg-[#F3F5F9] px-2.5 py-1 text-xs font-bold">{badge}</span>)}</div><div className="mt-5 flex items-center gap-2"><span className="rounded-lg bg-[#0C132A] px-2 py-1 text-sm font-black text-white">{hotel.rating}</span><b className="text-sm">{hotel.rating>=9?(english?"Exceptional":"Excepcional"):(english?"Very good":"Muy bueno")}</b><span className="text-xs text-[#1C2541]/50">({hotel.reviews})</span></div><div className="mt-6 flex gap-4 text-xs text-[#1C2541]/65">{hotel.preferences.includes("WiFi")&&<span className="flex items-center gap-1"><Wifi size={15}/>WiFi</span>}{hotel.preferences.includes("Garaje privado")&&<span className="flex items-center gap-1"><Car size={15}/>Garaje</span>}</div></div><div className="flex flex-col justify-between border-t border-[#1C2541]/10 bg-[#1C2541] p-5 text-white md:border-l md:border-t-0"><div className="text-right"><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-black text-[#FF7BAC]">{english?"Special offer":"Oferta especial"}</span><p className="mt-5 text-xs text-white/45 line-through">{formatMoney(hotel.oldPrice)}</p><p className="text-2xl font-black text-white">{formatMoney(hotel.price)}</p><p className="text-xs text-white/65">{english?`for ${hotel.hours} hours`:`por ${hotel.hours} horas`}</p></div><button type="button" onClick={()=>onSelectHotel?.(hotel)} className="mt-5 rounded-xl bg-[#E94584] px-4 py-3 font-black text-white shadow transition hover:brightness-95">{english?"See details":"Ver detalle"}</button></div></article>)}</div>}</main>
    </div>
  </div>;
}
function PriceHistogramFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice, formatMoney, english }) {
  const bars = [16, 54, 100, 88, 78, 46, 28, 22, 18, 24, 17, 23, 30, 20, 16, 17, 15, 20, 27, 22, 18, 15, 17, 13, 15, 8, 7, 5, 4, 11, 8, 9];
  const [dragging, setDragging] = useState(null);
  const trackRef = React.useRef(null);
  const minPct = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const priceFromPointer = (clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return PRICE_MIN;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = PRICE_MIN + pct * (PRICE_MAX - PRICE_MIN);
    return Math.round(raw / 50) * 50;
  };

  const moveHandle = (type, clientX) => {
    const next = priceFromPointer(clientX);
    if (type === "min") {
      setMinPrice(Math.max(PRICE_MIN, Math.min(next, maxPrice - 50)));
    } else {
      setMaxPrice(Math.min(PRICE_MAX, Math.max(next, minPrice + 50)));
    }
  };

  const startDrag = (type, event) => {
    event.preventDefault();
    setDragging(type);
    moveHandle(type, event.clientX);
  };

  React.useEffect(() => {
    if (!dragging) return undefined;
    const onMove = (event) => moveHandle(dragging, event.clientX);
    const onUp = () => setDragging(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, minPrice, maxPrice]);

  return (
    <div className="border-b border-[#1C2541]/10 py-5 first:pt-0">
      <h3 className="mb-4 text-sm font-black">{english ? "Price per night" : "Precio por noche"}</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-[#1C2541]/30 bg-white px-3 py-2.5">
          <span className="block text-xs font-bold text-[#1C2541]/60">{english ? "Minimum" : "Mínimo"}</span>
          <span className="mt-0.5 block truncate text-base font-black text-[#111936]">{formatMoney(minPrice)}</span>
        </div>
        <div className="rounded-xl border border-[#1C2541]/30 bg-white px-3 py-2.5">
          <span className="block text-xs font-bold text-[#1C2541]/60">{english ? "Maximum" : "Máximo"}</span>
          <span className="mt-0.5 block truncate text-base font-black text-[#111936]">{formatMoney(maxPrice)}</span>
        </div>
      </div>

      <div ref={trackRef} className="relative mt-5 h-[126px] touch-none select-none">
        <div className="absolute inset-x-0 bottom-4 flex h-[96px] items-end gap-[2px]">
          {bars.map((height, index) => {
            const barPct = (index / (bars.length - 1)) * 100;
            const active = barPct >= minPct && barPct <= maxPct;
            return <div key={index} className={`min-w-0 flex-1 rounded-t-full ${active ? "bg-[#1C2541]" : "bg-[#1C2541]/15"}`} style={{ height: `${height}%` }} />;
          })}
        </div>
        <div className="absolute inset-x-0 bottom-3 h-1 rounded-full bg-[#1C2541]/15" />
        <div className="absolute bottom-3 h-1 rounded-full bg-[#E94584]" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />

        <button
          type="button"
          aria-label={english ? "Move minimum price" : "Mover precio mínimo"}
          onPointerDown={(event) => startDrag("min", event)}
          className="absolute bottom-[1px] z-20 h-7 w-7 -translate-x-1/2 cursor-grab rounded-full bg-[#E94584] shadow-sm ring-2 ring-white active:cursor-grabbing"
          style={{ left: `${minPct}%` }}
        />
        <button
          type="button"
          aria-label={english ? "Move maximum price" : "Mover precio máximo"}
          onPointerDown={(event) => startDrag("max", event)}
          className="absolute bottom-[1px] z-20 h-7 w-7 -translate-x-1/2 cursor-grab rounded-full bg-[#E94584] shadow-sm ring-2 ring-white active:cursor-grabbing"
          style={{ left: `${maxPct}%` }}
        />
      </div>
    </div>
  );
}

function FilterSection({ title, children }) { return <div className="border-b border-[#1C2541]/10 py-5 first:pt-0"><h3 className="mb-3 text-sm font-black">{title}</h3>{children}</div>; }
function CategorizedAmenitiesFilter({ categories, active, onToggle, english }) {
  const [openCategories, setOpenCategories] = useState({
    "Agua y relajación": true,
    "Entretenimiento y ambiente": false,
    "Equipamiento especial": false,
    "Comodidad": false,
  });

  const labels = english
    ? {
        "Agua y relajación": "Water & relaxation",
        "Entretenimiento y ambiente": "Entertainment & ambience",
        "Equipamiento especial": "Special equipment",
        "Comodidad": "Comfort",
      }
    : {};

  return (
    <div className="border-b border-[#1C2541]/10 py-5">
      <h3 className="mb-3 text-sm font-black">{english ? "In-room amenities" : "Amenidades en la habitación"}</h3>
      <div className="space-y-2">
        {Object.entries(categories).map(([category, values]) => {
          const isOpen = Boolean(openCategories[category]);
          const selectedCount = values.filter((value) => active.includes(value)).length;
          return (
            <div key={category} className="overflow-hidden rounded-xl border border-[#1C2541]/10 bg-[#F8F9FB]">
              <button
                type="button"
                onClick={() => setOpenCategories((current) => ({ ...current, [category]: !current[category] }))}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
              >
                <span className="text-sm font-black text-[#111936]">{labels[category] || category}</span>
                <span className="flex items-center gap-2">
                  {selectedCount > 0 && <span className="rounded-full bg-[#E94584] px-2 py-0.5 text-[11px] font-black text-white">{selectedCount}</span>}
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>
              {isOpen && (
                <div className="space-y-2 border-t border-[#1C2541]/10 bg-white px-3 py-3">
                  {values.map((value) => (
                    <label key={value} className="flex cursor-pointer items-start gap-2 text-sm leading-snug">
                      <input type="checkbox" checked={active.includes(value)} onChange={() => onToggle(value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#E94584]" />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExpandableCheckGroup({ title, values, active, onToggle, initialCount = 5, english }) {
  const [expanded, setExpanded] = useState(false);
  const visibleValues = expanded ? values : values.slice(0, initialCount);
  return (
    <div className="border-b border-[#1C2541]/10 py-5">
      <h3 className="mb-3 text-sm font-black">{title}</h3>
      <div className="space-y-2.5">
        {visibleValues.map((value) => (
          <label key={value} className="flex cursor-pointer items-start gap-2 text-sm leading-snug">
            <input type="checkbox" checked={active.includes(value)} onChange={() => onToggle(value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#E94584]" />
            <span>{value}</span>
          </label>
        ))}
      </div>
      {values.length > initialCount && (
        <button type="button" onClick={() => setExpanded((current) => !current)} className="mt-3 text-sm font-black text-[#E94584] hover:underline">
          {expanded ? (english ? "Show less" : "Ver menos") : (english ? "See more" : "Ver más")}
        </button>
      )}
    </div>
  );
}

function CheckGroup({ title, values, active, onToggle, last }) { return <div className={last?"pt-5":"border-b border-[#1C2541]/10 py-5"}><h3 className="mb-3 text-sm font-black">{title}</h3><div className="space-y-2.5">{values.map((value)=><label key={value} className="flex cursor-pointer items-start gap-2 text-sm leading-snug"><input type="checkbox" checked={active.includes(value)} onChange={()=>onToggle(value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#E94584]"/><span>{value}</span></label>)}</div></div>; }
