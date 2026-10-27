import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import ResultsPage from "./ResultsPage.jsx";
import GuestDataPage from "./GuestDataPage.jsx";
import PaymentPage from "./PaymentPage.jsx";
import ConfirmationPage from "./ConfirmationPage.jsx";
import PropertyDetailPage from "./PropertyDetailPage.jsx";
import SiteHeader from "./SiteHeader.jsx";
import OffersPage from "./OffersPage.jsx";
import PublishPropertyPage from "./PublishPropertyPage.jsx";
import LoginPage from "./LoginPage.jsx";
import CustomerRegisterPage from "./CustomerRegisterPage.jsx";
import OwnerLoginPage from "./OwnerLoginPage.jsx";
import CustomerAccountPage from "./CustomerAccountPage.jsx";
import OwnerExtranetPage from "./OwnerExtranetPage.jsx";
import SiteFooter from "./SiteFooter.jsx";

const BANNERS = [
  "/PHDesk-BBVA-1920x426-7abecf7ede42.jpg",
  "/PAGINA_WEB_BANNERS_20261001180653.jpg",
];

const TEXT = {
  es: {
    deals: "Ofertas",
    publish: "Publica tu propiedad",
    help: "Ayuda",
    signIn: "Iniciar sesión",
    destination: "Destino, zona o nombre de la propiedad",
    destinationPlaceholder: "¿A dónde quieres ir?",
    stayType: "Tipo de estancia",
    hourly: "Por horas",
    fullNight: "Noche completa",
    checkIn: "Entrada",
    checkOut: "Salida",
    dates: "Fecha",
    entryTime: "Hora de ingreso",
    duration: "Duración",
    guests: "Huéspedes",
    search: "Buscar",
    available: "Estancias disponibles",
    subtitle: "Encuentra opciones flexibles para tu próxima estancia.",
  },
  en: {
    deals: "Deals",
    publish: "List your property",
    help: "Help",
    signIn: "Sign in",
    destination: "Destination, area or property name",
    destinationPlaceholder: "Where do you want to go?",
    stayType: "Stay type",
    hourly: "By the hour",
    fullNight: "Full night",
    checkIn: "Check-in",
    checkOut: "Check-out",
    dates: "Date",
    entryTime: "Check-in time",
    duration: "Duration",
    guests: "Guests",
    search: "Search",
    available: "Available stays",
    subtitle: "Find flexible options for your next stay.",
  },
};

const DESTINATION_OPTIONS = [
  { title: "Ciudad de México", subtitle: "Ciudad de México, México", type: "city" },
  { title: "Polanco", subtitle: "Miguel Hidalgo, Ciudad de México", type: "area" },
  { title: "Centro Histórico", subtitle: "Cuauhtémoc, Ciudad de México", type: "area" },
  { title: "Tlalpan", subtitle: "Ciudad de México, México", type: "area" },
  { title: "Oriente", subtitle: "Ciudad de México, México", type: "area" },
  { title: "QuickRooms Platinum Polanco", subtitle: "Polanco, Ciudad de México", type: "hotel" },
  { title: "Hotel Boutique Centro 24", subtitle: "Centro Histórico, Ciudad de México", type: "hotel" },
  { title: "Royal Steam Tlalpan", subtitle: "Tlalpan, Ciudad de México", type: "hotel" },
  { title: "Motel Eclipse Oriente", subtitle: "Oriente, Ciudad de México", type: "hotel" },
];

const HOME_HOTELS = [
  { name: "QuickRooms Platinum Polanco", zone: "Polanco, CDMX", price: 1090, badges: ["Jacuzzi", "WiFi", "Check-in discreto"], color: "from-[#111936] to-[#E94584]" },
  { name: "Hotel Boutique Centro 24", zone: "Centro, CDMX", price: 760, badges: ["Alberca privada", "Spa", "Rooftop"], color: "from-[#1C2541] to-[#714063]" },
  { name: "Royal Steam Tlalpan", zone: "Tlalpan, CDMX", price: 940, badges: ["Vapor", "Sauna turco", "Jacuzzi"], color: "from-[#111936] to-[#4A2A50]" },
  { name: "Motel Eclipse Oriente", zone: "Oriente, CDMX", price: 540, badges: ["Jacuzzi", "Vapor", "WiFi"], color: "from-[#16203D] to-[#39486F]" },
  { name: "Urban Love Polanco", zone: "Polanco, CDMX", price: 980, badges: ["Alberca privada", "Jacuzzi", "Temático"], color: "from-[#1C2541] to-[#34466F]" },
  { name: "Velvet Rooms Centro", zone: "Centro, CDMX", price: 720, badges: ["Bar", "Temático", "Check-in discreto"], color: "from-[#161D36] to-[#6F3155]" },
  { name: "Family Suites Oriente", zone: "Oriente, CDMX", price: 610, badges: ["Pet Friendly", "Restaurante", "WiFi"], color: "from-[#17213D] to-[#355079]" },
  { name: "Suites Tlalpan Signature", zone: "Tlalpan, CDMX", price: 860, badges: ["Alberca", "Garaje privado", "Spa"], color: "from-[#10182F] to-[#E94584]" },
  { name: "Lovers Rooftop Polanco", zone: "Polanco, CDMX", price: 1190, badges: ["Rooftop", "Bar", "Jacuzzi"], color: "from-[#10162E] to-[#7C2D58]" },
  { name: "Grand Love Centro", zone: "Centro, CDMX", price: 830, badges: ["Temático", "WiFi", "Spa"], color: "from-[#1A2240] to-[#E94584]" },
  { name: "Motel Nova Oriente", zone: "Oriente, CDMX", price: 650, badges: ["Garaje privado", "WiFi", "Vapor"], color: "from-[#18233E] to-[#3B527B]" },
  { name: "Tlalpan Private Pool", zone: "Tlalpan, CDMX", price: 1280, badges: ["Alberca privada", "Spa", "Check-in discreto"], color: "from-[#121A34] to-[#B3356E]" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [guestData, setGuestData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [language, setLanguage] = useState("es");
  const [currency, setCurrency] = useState("MXN");
  const [query, setQuery] = useState("Ciudad de México");
  const [stayType, setStayType] = useState("hourly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entryTime, setEntryTime] = useState(() => getNextAvailableHalfHour());
  const [stayDuration, setStayDuration] = useState(6);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childAges, setChildAges] = useState([]);
  const [roomConfigs, setRoomConfigs] = useState([{ adults: 2, children: 0, childAges: [] }]);
  const [activePill, setActivePill] = useState(null);
  const [isFloating, setIsFloating] = useState(false);
  const [banner, setBanner] = useState(0);

  const widgetRef = useRef(null);
  const destinationRef = useRef(null);
  const t = TEXT[language];

  useEffect(() => {
    const handleScroll = () => setIsFloating(window.scrollY > 72);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setActivePill(null);
      }
    };
    document.addEventListener("mousedown", handleOutside, true);
    return () => document.removeEventListener("mousedown", handleOutside, true);
  }, []);

  const formatMoney = (mxn) =>
    new Intl.NumberFormat(language === "es" ? "es-MX" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "MXN" ? 0 : 2,
    }).format(currency === "MXN" ? mxn : mxn / 18);

  const searchData = useMemo(
    () => ({ destination: query || t.destinationPlaceholder, stayType, startDate, endDate, entryTime, stayDuration, adults, children, childAges, rooms, roomConfigs }),
    [query, stayType, startDate, endDate, entryTime, stayDuration, adults, children, childAges, rooms, roomConfigs, t.destinationPlaceholder]
  );

  const go = (nextPage) => {
    setActivePill(null);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPropertyFromHome = (hotel) => {
    setSelectedHotel({ ...hotel, id: hotel.id ?? hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") });
    if (!query || query === t.destinationPlaceholder) setQuery(hotel.name);
    go("property-detail");
  };

  const openPill = (pill) => {
    setActivePill((current) => (current === pill ? null : pill));
    if (pill === "destination") {
      if (activePill !== "destination") setQuery("");
      setTimeout(() => destinationRef.current?.focus(), 0);
    }
  };

  if (page === "login") {
    return <div className="min-h-screen bg-[#F3F5F9]"><SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} /><LoginPage
      onCustomerLogin={({ email }) => { setCurrentUser({ role: "customer", name: email.split("@")[0] || "Cliente", email, membership: "QR-DEMO-1001", lunas: 1250 }); go("customer-account"); }}
      onCustomerRegister={() => go("customer-register")}
      onOwnerLogin={() => go("owner-login")}
    /><SiteFooter /></div>;
  }
  if (page === "customer-register") {
    return <div className="min-h-screen bg-[#F3F5F9]"><SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} /><CustomerRegisterPage onComplete={(data) => { setCurrentUser({ role: "customer", name: `${data.first} ${data.last}`.trim(), email: data.email, membership: data.membership, lunas: data.lunas, phone: data.phone }); go("customer-account"); }} /><SiteFooter /></div>;
  }
  if (page === "owner-login") {
    return <div className="min-h-screen bg-[#F3F5F9]"><SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} /><OwnerLoginPage onLogin={({ email }) => { setCurrentUser({ role: "owner", name: email.split("@")[0] || "Propietario", email }); go("owner-extranet"); }} onRegister={() => go("publish-property")} /><SiteFooter /></div>;
  }

  if (page === "customer-account") {
    return <div className="min-h-screen bg-[#F3F5F9]"><SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => go("customer-account")} user={currentUser} /><CustomerAccountPage user={currentUser} onUpdateUser={setCurrentUser} /><SiteFooter /></div>;
  }
  if (page === "owner-extranet") {
    return <div className="min-h-screen bg-[#F3F5F9]"><SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => go("owner-extranet")} user={currentUser} /><OwnerExtranetPage user={currentUser} /><SiteFooter /></div>;
  }

  if (page === "publish-property") {
    return (
      <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
        <SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} />
        <PublishPropertyPage />
        <SiteFooter />
      </div>
    );
  }

  if (page === "offers") {
    return (
      <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
        <SiteHeader
          language={language}
          currency={currency}
          setLanguage={setLanguage}
          setCurrency={setCurrency}
          onHome={() => go("home")}
          onOffers={() => go("offers")}
          onPublish={() => go("publish-property")}
          onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")}
          user={currentUser}
        />
        <OffersPage
          formatMoney={formatMoney}
          onSelectProperty={(property) => {
            setSelectedHotel({
              ...property,
              id: property.id ?? property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            });
            setQuery(property.name);
            go("property-detail");
          }}
        />
        <SiteFooter />
      </div>
    );
  }

  if (page === "results") {
    return (
      <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
        <SiteHeader
          language={language}
          currency={currency}
          setLanguage={setLanguage}
          setCurrency={setCurrency}
          onHome={() => go("home")}
          onOffers={() => go("offers")}
          onPublish={() => go("publish-property")}
          onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")}
          user={currentUser}
        />
      {isFloating && <div className="h-[86px]" aria-hidden="true" />}
      <section ref={widgetRef} className={`${isFloating ? "fixed inset-x-0 top-[68px]" : "relative"} z-[90] bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md`}>
        <div className={`mx-auto grid max-w-[1600px] auto-rows-[72px] items-stretch gap-2 md:grid-cols-2 ${stayType === "full-night" ? "xl:grid-cols-5" : "xl:grid-cols-8"}`}> 
          <div className={`relative h-full ${stayType === "full-night" ? "xl:col-span-1" : "xl:col-span-2"}`} onClick={() => openPill("destination")}>
            <Pill icon={MapPin} label={t.destination} active={activePill === "destination"}>
              <input ref={destinationRef} value={query} readOnly={activePill !== "destination"} onChange={(e) => setQuery(e.target.value)} placeholder={t.destinationPlaceholder} className="w-full bg-transparent text-sm font-black text-white outline-none placeholder:text-white/55" />
            </Pill>
            {activePill === "destination" && (
              <DestinationDropdown query={query} setQuery={setQuery} language={language} onSelect={(value) => { setQuery(value); setActivePill(null); }} />
            )}
          </div>

          <PillWrapper active={activePill === "stay"} onClick={() => openPill("stay")} icon={Clock3} label={t.stayType} value={stayType === "hourly" ? t.hourly : t.fullNight}>
            <DropdownCard>
              {[ ["hourly", t.hourly], ["full-night", t.fullNight] ].map(([value, label]) => (
                <OptionButton key={value} selected={stayType === value} onClick={() => { setStayType(value); setActivePill(null); }}>{label}</OptionButton>
              ))}
            </DropdownCard>
          </PillWrapper>

          <PillWrapper
            active={activePill === "dates"}
            onClick={() => openPill("dates")}
            icon={CalendarDays}
            label={t.dates}
            value={formatDateRange(startDate, endDate, stayType, language)}
          >
            <DateRangeCalendar
              stayType={stayType}
              startDate={startDate}
              endDate={endDate}
              language={language}
              onStartChange={(date) => {
                setStartDate(date);
                if (stayType === "hourly") setEndDate(date);
              }}
              onEndChange={setEndDate}
              onComplete={() => setActivePill(null)}
            />
          </PillWrapper>

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "time"} onClick={() => openPill("time")} icon={Clock3} label={t.entryTime} value={entryTime}>
              <TimeOptionsDropdown
                key={`time-options-${activePill}`}
                selectedTime={entryTime}
                language={language}
                onSelect={(time) => {
                  setEntryTime(time);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "duration"} onClick={() => openPill("duration")} icon={Clock3} label={t.duration} value={`${stayDuration} h`}>
              <DurationDropdown
                selectedDuration={stayDuration}
                language={language}
                onSelect={(hours) => {
                  setStayDuration(hours);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          <PillWrapper active={activePill === "guests"} onClick={() => openPill("guests")} icon={Users} label={t.guests} value={`${adults} ${language === "es" ? "adultos" : "adults"}, ${rooms} ${language === "es" ? (rooms === 1 ? "habitación" : "habitaciones") : (rooms === 1 ? "room" : "rooms")}`}>
            <GuestPopover
              adults={adults}
              children={children}
              rooms={rooms}
              childAges={childAges}
              roomConfigs={roomConfigs}
              setAdults={setAdults}
              setChildren={setChildren}
              setRooms={setRooms}
              setChildAges={setChildAges}
              setRoomConfigs={setRoomConfigs}
              language={language}
            />
          </PillWrapper>

          <button type="button" onClick={() => go("results")} className="flex h-full min-h-[72px] items-center justify-center gap-2 rounded-xl bg-[#E94584] px-7 font-black text-white hover:brightness-95">
            <Search size={18} /> {t.search}
          </button>
        </div>
      </section>
        <ResultsPage
          search={searchData}
          language={language}
          currency={currency}
          formatMoney={formatMoney}
          onBack={() => go("home")}
          onSelectHotel={(hotel) => {
            setSelectedHotel(hotel);
            go("property-detail");
          }}
        />
        <SiteFooter />
      </div>
    );
  }

  if (page === "property-detail") {
    return (
      <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
        <SiteHeader
          language={language}
          currency={currency}
          setLanguage={setLanguage}
          setCurrency={setCurrency}
          onHome={() => go("home")}
          onOffers={() => go("offers")}
          onPublish={() => go("publish-property")}
          onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")}
          user={currentUser}
        />
      <section ref={widgetRef} className={`${isFloating ? "fixed inset-x-0 top-[68px]" : "relative"} z-[90] bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md`}>
        <div className={`mx-auto grid max-w-[1600px] auto-rows-[72px] items-stretch gap-2 md:grid-cols-2 ${stayType === "full-night" ? "xl:grid-cols-5" : "xl:grid-cols-8"}`}> 
          <div className={`relative h-full ${stayType === "full-night" ? "xl:col-span-1" : "xl:col-span-2"}`} onClick={() => openPill("destination")}>
            <Pill icon={MapPin} label={t.destination} active={activePill === "destination"}>
              <input ref={destinationRef} value={query} readOnly={activePill !== "destination"} onChange={(e) => setQuery(e.target.value)} placeholder={t.destinationPlaceholder} className="w-full bg-transparent text-sm font-black text-white outline-none placeholder:text-white/55" />
            </Pill>
            {activePill === "destination" && (
              <DestinationDropdown query={query} setQuery={setQuery} language={language} onSelect={(value) => { setQuery(value); setActivePill(null); }} />
            )}
          </div>

          <PillWrapper active={activePill === "stay"} onClick={() => openPill("stay")} icon={Clock3} label={t.stayType} value={stayType === "hourly" ? t.hourly : t.fullNight}>
            <DropdownCard>
              {[ ["hourly", t.hourly], ["full-night", t.fullNight] ].map(([value, label]) => (
                <OptionButton key={value} selected={stayType === value} onClick={() => { setStayType(value); setActivePill(null); }}>{label}</OptionButton>
              ))}
            </DropdownCard>
          </PillWrapper>

          <PillWrapper
            active={activePill === "dates"}
            onClick={() => openPill("dates")}
            icon={CalendarDays}
            label={t.dates}
            value={formatDateRange(startDate, endDate, stayType, language)}
          >
            <DateRangeCalendar
              stayType={stayType}
              startDate={startDate}
              endDate={endDate}
              language={language}
              onStartChange={(date) => {
                setStartDate(date);
                if (stayType === "hourly") setEndDate(date);
              }}
              onEndChange={setEndDate}
              onComplete={() => setActivePill(null)}
            />
          </PillWrapper>

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "time"} onClick={() => openPill("time")} icon={Clock3} label={t.entryTime} value={entryTime}>
              <TimeOptionsDropdown
                key={`time-options-${activePill}`}
                selectedTime={entryTime}
                language={language}
                onSelect={(time) => {
                  setEntryTime(time);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "duration"} onClick={() => openPill("duration")} icon={Clock3} label={t.duration} value={`${stayDuration} h`}>
              <DurationDropdown
                selectedDuration={stayDuration}
                language={language}
                onSelect={(hours) => {
                  setStayDuration(hours);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          <PillWrapper active={activePill === "guests"} onClick={() => openPill("guests")} icon={Users} label={t.guests} value={`${adults} ${language === "es" ? "adultos" : "adults"}, ${rooms} ${language === "es" ? (rooms === 1 ? "habitación" : "habitaciones") : (rooms === 1 ? "room" : "rooms")}`}>
            <GuestPopover
              adults={adults}
              children={children}
              rooms={rooms}
              childAges={childAges}
              roomConfigs={roomConfigs}
              setAdults={setAdults}
              setChildren={setChildren}
              setRooms={setRooms}
              setChildAges={setChildAges}
              setRoomConfigs={setRoomConfigs}
              language={language}
            />
          </PillWrapper>

          <button type="button" onClick={() => { setActivePill(null); window.scrollTo({ top: widgetRef.current?.offsetTop ?? 0, behavior: "smooth" }); }} className="flex h-full min-h-[72px] items-center justify-center gap-2 rounded-xl bg-[#E94584] px-7 font-black text-white hover:brightness-95">
            <Search size={18} /> {language === "es" ? "Actualizar estancia" : "Update stay"}
          </button>
        </div>
      </section>
        <PropertyDetailPage
          hotel={selectedHotel}
          search={searchData}
          language={language}
          currency={currency}
          formatMoney={formatMoney}
          onBack={() => go("home")}
          onReserve={(room) => {
            setSelectedHotel((current) => ({ ...current, selectedRoom: room }));
            go("guest-data");
          }}
        />
      </div>
    );
  }

  if (page === "confirmation") {
    return (
      <div className="min-h-screen bg-[#F3F5F9]">
        <SiteHeader language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} />
        <ConfirmationPage hotel={selectedHotel} search={searchData} guestData={guestData} paymentData={paymentData} formatMoney={formatMoney} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} />
        <SiteFooter />
      </div>
    );
  }

  if (page === "payment") {
    return (
      <div className="min-h-screen bg-[#F3F5F9]">
        <SiteHeader language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} />
        <PaymentPage hotel={selectedHotel} search={searchData} guestData={guestData} language={language} currency={currency} formatMoney={formatMoney} onBack={() => go("guest-data")} onComplete={(payment) => { setPaymentData(payment); go("confirmation"); }} />
        <SiteFooter />
      </div>
    );
  }

  if (page === "guest-data") {
    return (
      <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
        <SiteHeader language={language} currency={currency} setLanguage={setLanguage} setCurrency={setCurrency} onHome={() => go("home")} onOffers={() => go("offers")} onPublish={() => go("publish-property")} onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")} />
        <GuestDataPage
          hotel={selectedHotel}
          search={searchData}
          language={language}
          currency={currency}
          formatMoney={formatMoney}
          onBack={() => go("property-detail")}
          onContinue={(data) => { setGuestData(data); go("payment"); }}
        />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
      <SiteHeader
        language={language}
        currency={currency}
        setLanguage={setLanguage}
        setCurrency={setCurrency}
        onHome={() => go("home")}
        onOffers={() => go("offers")}
        onPublish={() => go("publish-property")}
        onLogin={() => currentUser ? go(currentUser.role === "owner" ? "owner-extranet" : "customer-account") : go("login")}
        user={currentUser}
      />

      {isFloating && <div className="h-[86px]" aria-hidden="true" />}
      <section ref={widgetRef} className={`${isFloating ? "fixed inset-x-0 top-[68px]" : "relative"} z-[90] bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md`}>
        <div className={`mx-auto grid max-w-[1600px] auto-rows-[72px] items-stretch gap-2 md:grid-cols-2 ${stayType === "full-night" ? "xl:grid-cols-5" : "xl:grid-cols-8"}`}> 
          <div className={`relative h-full ${stayType === "full-night" ? "xl:col-span-1" : "xl:col-span-2"}`} onClick={() => openPill("destination")}>
            <Pill icon={MapPin} label={t.destination} active={activePill === "destination"}>
              <input ref={destinationRef} value={query} readOnly={activePill !== "destination"} onChange={(e) => setQuery(e.target.value)} placeholder={t.destinationPlaceholder} className="w-full bg-transparent text-sm font-black text-white outline-none placeholder:text-white/55" />
            </Pill>
            {activePill === "destination" && (
              <DestinationDropdown query={query} setQuery={setQuery} language={language} onSelect={(value) => { setQuery(value); setActivePill(null); }} />
            )}
          </div>

          <PillWrapper active={activePill === "stay"} onClick={() => openPill("stay")} icon={Clock3} label={t.stayType} value={stayType === "hourly" ? t.hourly : t.fullNight}>
            <DropdownCard>
              {[ ["hourly", t.hourly], ["full-night", t.fullNight] ].map(([value, label]) => (
                <OptionButton key={value} selected={stayType === value} onClick={() => { setStayType(value); setActivePill(null); }}>{label}</OptionButton>
              ))}
            </DropdownCard>
          </PillWrapper>

          <PillWrapper
            active={activePill === "dates"}
            onClick={() => openPill("dates")}
            icon={CalendarDays}
            label={t.dates}
            value={formatDateRange(startDate, endDate, stayType, language)}
          >
            <DateRangeCalendar
              stayType={stayType}
              startDate={startDate}
              endDate={endDate}
              language={language}
              onStartChange={(date) => {
                setStartDate(date);
                if (stayType === "hourly") setEndDate(date);
              }}
              onEndChange={setEndDate}
              onComplete={() => setActivePill(null)}
            />
          </PillWrapper>

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "time"} onClick={() => openPill("time")} icon={Clock3} label={t.entryTime} value={entryTime}>
              <TimeOptionsDropdown
                key={`time-options-${activePill}`}
                selectedTime={entryTime}
                language={language}
                onSelect={(time) => {
                  setEntryTime(time);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          {stayType === "hourly" && (
            <PillWrapper active={activePill === "duration"} onClick={() => openPill("duration")} icon={Clock3} label={t.duration} value={`${stayDuration} h`}>
              <DurationDropdown
                selectedDuration={stayDuration}
                language={language}
                onSelect={(hours) => {
                  setStayDuration(hours);
                  setActivePill(null);
                }}
              />
            </PillWrapper>
          )}

          <PillWrapper active={activePill === "guests"} onClick={() => openPill("guests")} icon={Users} label={t.guests} value={`${adults} ${language === "es" ? "adultos" : "adults"}, ${rooms} ${language === "es" ? (rooms === 1 ? "habitación" : "habitaciones") : (rooms === 1 ? "room" : "rooms")}`}>
            <GuestPopover
              adults={adults}
              children={children}
              rooms={rooms}
              childAges={childAges}
              roomConfigs={roomConfigs}
              setAdults={setAdults}
              setChildren={setChildren}
              setRooms={setRooms}
              setChildAges={setChildAges}
              setRoomConfigs={setRoomConfigs}
              language={language}
            />
          </PillWrapper>

          <button type="button" onClick={() => go("results")} className="flex h-full min-h-[72px] items-center justify-center gap-2 rounded-xl bg-[#E94584] px-7 font-black text-white hover:brightness-95">
            <Search size={18} /> {t.search}
          </button>
        </div>
      </section>

      <section className="relative mx-auto h-[260px] max-w-[1920px] overflow-hidden bg-[#111936] md:h-[430px]">
        <img src={BANNERS[banner]} alt="Promoción QuickRooms" className="h-full w-full object-cover" />
        <button type="button" onClick={() => setBanner((banner - 1 + BANNERS.length) % BANNERS.length)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#111936]/80 text-white"><ChevronLeft /></button>
        <button type="button" onClick={() => setBanner((banner + 1) % BANNERS.length)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#111936]/80 text-white"><ChevronRight /></button>
      </section>

      <main className="mx-auto max-w-[1280px] px-5 py-10">
        <p className="text-xs font-black uppercase tracking-[.18em] text-[#E94584]">QuickRooms</p>
        <h1 className="mt-2 text-3xl font-black">{t.available}</h1>
        <p className="mt-1 text-[#1C2541]/55">{t.subtitle}</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {HOME_HOTELS.map((hotel) => (
            <article key={hotel.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#1C2541]/10">
              <div className={`grid h-44 place-items-center bg-gradient-to-br ${hotel.color}`}><img src="/Logo.png" alt="" className="h-24 w-24 rounded-3xl opacity-25" /></div>
              <div className="p-5">
                <h2 className="text-xl font-black">{hotel.name}</h2>
                <p className="mt-1 text-sm text-[#1C2541]/55">{hotel.zone}</p>
                <div className="mt-3 flex flex-wrap gap-2">{hotel.badges.map((badge) => <span key={badge} className="rounded-full bg-[#F3F5F9] px-2.5 py-1 text-xs font-bold">{badge}</span>)}</div>
                <div className="mt-5 flex items-end justify-between"><strong className="text-2xl">{formatMoney(hotel.price)}</strong><button type="button" onClick={() => openPropertyFromHome(hotel)} className="rounded-xl bg-[#E94584] px-4 py-2.5 font-black text-white">{t.search}</button></div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function DateRangeCalendar({
  stayType,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onComplete,
  language = "es",
}) {
  const initialDate = startDate ? new Date(`${startDate}T00:00:00`) : new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [hoverDate, setHoverDate] = useState("");
  const secondMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);

  const handleSelect = (date) => {
    if (stayType === "hourly") {
      onStartChange(date);
      onEndChange(date);
      onComplete();
      return;
    }

    if (!selectingEnd) {
      onStartChange(date);
      onEndChange("");
      setHoverDate("");
      setSelectingEnd(true);
      return;
    }

    if (date <= startDate) {
      onStartChange(date);
      onEndChange("");
      setHoverDate("");
      return;
    }

    onEndChange(date);
    setHoverDate("");
    setSelectingEnd(false);
    onComplete();
  };

  return (
    <div className="absolute left-0 top-[66px] z-[100] w-[720px] max-w-[calc(100vw-32px)] rounded-[24px] bg-white p-5 text-black shadow-2xl ring-1 ring-[#1C2541]/10">
      <p className="mb-4 text-center text-sm font-bold text-[#1C2541]/60">
        {stayType === "hourly"
          ? (language === "es" ? "Selecciona la fecha de ingreso" : "Select the check-in date")
          : selectingEnd
            ? (language === "es" ? "Ahora selecciona la fecha de salida" : "Now select the check-out date")
            : (language === "es" ? "Selecciona la fecha de entrada" : "Select the check-in date")}
      </p>
      <div className="flex items-start gap-3">
        <button type="button" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))} className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-white text-xl shadow-sm">‹</button>
        <div className="grid flex-1 gap-6 md:grid-cols-2">
          <RangeCalendarMonth month={visibleMonth} startDate={startDate} endDate={endDate} hoverDate={hoverDate} selectingEnd={selectingEnd} onHover={setHoverDate} onSelect={handleSelect} language={language} />
          <div className="hidden md:block">
            <RangeCalendarMonth month={secondMonth} startDate={startDate} endDate={endDate} hoverDate={hoverDate} selectingEnd={selectingEnd} onHover={setHoverDate} onSelect={handleSelect} language={language} />
          </div>
        </div>
        <button type="button" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))} className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-white text-xl shadow-sm">›</button>
      </div>
    </div>
  );
}

function RangeCalendarMonth({ month, startDate, endDate, hoverDate, selectingEnd, onHover, onSelect, language }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const startOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, monthIndex, i + 1))];
  while (cells.length % 7) cells.push(null);
  const weekdays = language === "es" ? ["L", "M", "M", "J", "V", "S", "D"] : ["M", "T", "W", "T", "F", "S", "S"];
  const monthName = new Intl.DateTimeFormat(language === "es" ? "es-MX" : "en-US", { month: "long", year: "numeric" }).format(month);

  return (
    <div>
      <h3 className="mb-4 text-center font-black capitalize text-[#111936]">{monthName}</h3>
      <div className="mb-2 grid grid-cols-7">{weekdays.map((day, index) => <div key={`${day}-${index}`} className="py-1 text-center text-xs font-black text-[#1C2541]/45">{day}</div>)}</div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} className="aspect-square" />;
          const value = toInputDate(date);
          const disabled = date < today || (selectingEnd && startDate && value <= startDate);
          const previewEnd = selectingEnd && hoverDate && hoverDate > startDate ? hoverDate : "";
          const effectiveEnd = endDate || previewEnd;
          const isStart = value === startDate;
          const isEnd = Boolean(effectiveEnd && value === effectiveEnd);
          const inRange = Boolean(startDate && effectiveEnd && value > startDate && value < effectiveEnd);
          const selectedRange = isStart || isEnd || inRange;
          const isPreview = !endDate && Boolean(previewEnd) && (isEnd || inRange);

          return (
            <div
              key={value}
              className={`flex aspect-square items-center justify-center transition-colors ${
                selectedRange
                  ? `${isStart ? "rounded-l-full" : ""} ${isEnd ? "rounded-r-full" : ""}`
                  : ""
              }`}
              style={
                selectedRange
                  ? {
                      backgroundColor: isStart || isEnd
                        ? "#E94584"
                        : "rgba(28, 37, 65, 0.16)",
                    }
                  : undefined
              }
            >
              <button
                type="button"
                disabled={disabled}
                onMouseEnter={() => selectingEnd && !disabled && onHover(value)}
                onMouseLeave={() => selectingEnd && onHover("")}
                onFocus={() => selectingEnd && !disabled && onHover(value)}
                onClick={() => !disabled && onSelect(value)}
                className={`grid h-full w-full place-items-center text-sm font-bold transition-colors ${
                  isStart
                    ? "rounded-l-full text-white shadow-sm"
                    : isEnd
                      ? "rounded-r-full text-white shadow-sm"
                      : inRange
                        ? "text-[#1C2541]"
                        : disabled
                          ? "cursor-not-allowed text-[#1C2541]/20"
                          : "rounded-full text-[#303544] hover:bg-[#E94584]/10 hover:text-[#E94584]"
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DestinationDropdown({ query, setQuery, language, onSelect }) {
  const term = query.trim().toLowerCase();
  const filtered = DESTINATION_OPTIONS.filter((item) => !term || `${item.title} ${item.subtitle}`.toLowerCase().includes(term));
  return <div className="absolute left-0 top-[66px] z-[100] w-[650px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] bg-white text-black shadow-2xl ring-1 ring-[#1C2541]/10"><div className="p-4"><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={language === "es" ? "Destino, zona o nombre de la propiedad" : "Destination, area or property name"} className="w-full rounded-xl border border-[#3563FF] px-4 py-3 font-semibold outline-none" /></div><div className="max-h-[340px] overflow-y-auto px-4 pb-4">{filtered.map((item) => <button type="button" key={item.title} onClick={() => onSelect(item.title)} className="flex w-full items-start gap-3 border-b px-3 py-4 text-left hover:bg-[#F7F8FB]"><MapPin size={18} className="mt-1 shrink-0" /><span><b className="block">{item.title}</b><span className="text-sm text-[#6F7180]">{item.subtitle}</span></span></button>)}</div></div>;
}

function Pill({ icon: Icon, label, active, children }) { return <div className={`flex h-full min-h-[72px] w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-2 text-white shadow-sm transition-all ${active ? "border-[#E94584] bg-[#E94584] ring-2 ring-[#E94584]/20" : "border-[#1C2541] bg-[#1C2541] hover:brightness-110"}`}><Icon size={21} /><div className="min-w-0 flex-1"><span className="block text-xs font-bold text-white/70">{label}</span>{children}</div></div>; }
function PillWrapper({ icon: Icon, label, value, active, onClick, children }) { return <div className="relative h-full"><button type="button" onClick={onClick} className={`flex h-full min-h-[72px] w-full items-center gap-3 rounded-xl border px-4 py-2 text-left text-white shadow-sm transition-all ${active ? "border-[#E94584] bg-[#E94584] ring-2 ring-[#E94584]/20" : "border-[#1C2541] bg-[#1C2541] hover:brightness-110"}`}><Icon size={21} /><span className="min-w-0 flex-1"><span className="block text-xs font-bold text-white/70">{label}</span><span className="block truncate text-sm font-black text-white">{value}</span></span><ChevronDown size={16} /></button>{active && children}</div>; }
function DurationDropdown({ selectedDuration, onSelect, language = "es" }) {
  const options = [2, 4, 6, 8, 12];

  return (
    <div className="absolute left-0 top-[66px] z-[100] w-[220px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] bg-white text-black shadow-2xl ring-1 ring-[#1C2541]/10">
      <div className="border-b border-[#1C2541]/10 px-5 py-4">
        <p className="text-sm font-black text-[#111936]">
          {language === "es" ? "Duración de la estancia" : "Stay duration"}
        </p>
      </div>
      <div className="p-2">
        {options.map((hours) => (
          <button
            type="button"
            key={hours}
            onClick={() => onSelect(hours)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
              selectedDuration === hours
                ? "bg-[#E94584] text-white"
                : "text-[#1C2541] hover:bg-[#1C2541]/10"
            }`}
          >
            <span>{hours} h</span>
            {selectedDuration === hours && <span className="text-xs font-black">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function TimeOptionsDropdown({ selectedTime, onSelect, language = "es" }) {
  const options = buildTimeOptions();

  return (
    <div className="absolute left-0 top-[66px] z-[100] w-[260px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] bg-white text-black shadow-2xl ring-1 ring-[#1C2541]/10">
      <div className="border-b border-[#1C2541]/10 px-5 py-4">
        <p className="text-sm font-black text-[#111936]">
          {language === "es" ? "Selecciona la hora de ingreso" : "Select check-in time"}
        </p>
        <p className="mt-1 text-xs text-[#1C2541]/50">
          {language === "es" ? "Intervalos de 30 minutos" : "30-minute intervals"}
        </p>
      </div>
      <div className="max-h-[320px] overflow-y-auto p-2">
        {options.map((time) => (
          <button
            type="button"
            key={time}
            onClick={() => onSelect(time)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
              selectedTime === time
                ? "bg-[#E94584] text-white"
                : "text-[#1C2541] hover:bg-[#1C2541]/10"
            }`}
          >
            <span>{time}</span>
            {selectedTime === time && <span className="text-xs font-black">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function getNextAvailableHalfHour() {
  const now = new Date();
  const availableFrom = new Date(now.getTime() + 60 * 60 * 1000);

  availableFrom.setSeconds(0, 0);

  const minutes = availableFrom.getMinutes();

  if (minutes === 0 || minutes === 30) {
    // La hora ya coincide exactamente con un bloque de 30 minutos.
  } else if (minutes < 30) {
    availableFrom.setMinutes(30, 0, 0);
  } else {
    availableFrom.setHours(availableFrom.getHours() + 1, 0, 0, 0);
  }

  return `${String(availableFrom.getHours()).padStart(2, "0")}:${String(
    availableFrom.getMinutes()
  ).padStart(2, "0")}`;
}

function buildTimeOptions() {
  const [hour, minute] = getNextAvailableHalfHour().split(":").map(Number);
  const cursor = new Date();
  cursor.setHours(hour, minute, 0, 0);

  const options = [];

  for (let index = 0; index < 48; index += 1) {
    options.push(
      `${String(cursor.getHours()).padStart(2, "0")}:${String(
        cursor.getMinutes()
      ).padStart(2, "0")}`
    );

    cursor.setMinutes(cursor.getMinutes() + 30);
  }

  return options;
}

function DropdownCard({ children }) { return <div className="absolute left-0 top-[66px] z-[90] w-[300px] rounded-[24px] bg-white p-5 text-black shadow-2xl ring-1 ring-[#1C2541]/10">{children}</div>; }
function OptionButton({ selected, onClick, children }) { return <button type="button" onClick={onClick} className={`mb-2 w-full rounded-xl px-4 py-3 text-left text-sm font-bold ${selected ? "bg-[#E94584] text-white" : "bg-[#F3F5F9] text-black"}`}>{children}</button>; }
function GuestPopover({
  adults,
  children,
  rooms,
  childAges,
  roomConfigs,
  setAdults,
  setChildren,
  setRooms,
  setChildAges,
  setRoomConfigs,
  language,
}) {
  const es = language === "es";

  const updateSingleChildren = (nextChildren) => {
    setChildren(nextChildren);
    setChildAges((current) => resizeChildAges(current, nextChildren));
  };

  const updateRooms = (nextRooms) => {
    const safeRooms = Math.max(1, nextRooms);
    setRooms(safeRooms);

    setRoomConfigs((current) => {
      const baseFirstRoom = current[0] || {
        adults,
        children,
        childAges: resizeChildAges(childAges, children),
      };

      return Array.from({ length: safeRooms }, (_, index) => {
        if (index === 0 && rooms === 1) {
          return {
            adults,
            children,
            childAges: resizeChildAges(childAges, children),
          };
        }

        return current[index] || (index === 0 ? baseFirstRoom : {
          adults: 1,
          children: 0,
          childAges: [],
        });
      });
    });
  };

  const updateRoom = (index, patch) => {
    setRoomConfigs((current) => {
      const next = current.map((room) => ({ ...room, childAges: [...(room.childAges || [])] }));
      const room = next[index];
      const updated = { ...room, ...patch };

      if (Object.prototype.hasOwnProperty.call(patch, "children")) {
        updated.childAges = resizeChildAges(room.childAges || [], patch.children);
      }

      next[index] = updated;

      const totalAdults = next.reduce((sum, item) => sum + item.adults, 0);
      const totalChildren = next.reduce((sum, item) => sum + item.children, 0);
      setAdults(totalAdults);
      setChildren(totalChildren);
      setChildAges(next.flatMap((item) => item.childAges || []));

      return next;
    });
  };

  const updateRoomChildAge = (roomIndex, childIndex, age) => {
    setRoomConfigs((current) => {
      const next = current.map((room) => ({ ...room, childAges: [...(room.childAges || [])] }));
      next[roomIndex].childAges[childIndex] = age;
      setChildAges(next.flatMap((item) => item.childAges || []));
      return next;
    });
  };

  return (
    <div className="absolute right-0 top-[66px] z-[100] w-[430px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] bg-white text-black shadow-2xl ring-1 ring-[#1C2541]/10">
      <div className="max-h-[560px] overflow-y-auto p-6">
        <GuestRow
          label={es ? "Habitaciones" : "Rooms"}
          value={rooms}
          min={1}
          setValue={updateRooms}
        />

        {rooms === 1 ? (
          <div className="mt-5 border-t border-[#1C2541]/10 pt-5">
            <GuestRow
              label={es ? "Adultos" : "Adults"}
              sublabel={es ? "Desde 18 años" : "18 years and older"}
              value={adults}
              min={1}
              setValue={setAdults}
            />
            <GuestRow
              label={es ? "Menores" : "Children"}
              sublabel={es ? "Hasta 17 años" : "Up to 17 years"}
              value={children}
              min={0}
              setValue={updateSingleChildren}
            />
            {children > 0 && (
              <ChildAgesList
                ages={childAges}
                onChange={(index, age) => {
                  const next = resizeChildAges(childAges, children);
                  next[index] = age;
                  setChildAges(next);
                }}
                language={language}
              />
            )}
          </div>
        ) : (
          <div className="mt-5 space-y-4 border-t border-[#1C2541]/10 pt-5">
            {roomConfigs.slice(0, rooms).map((room, index) => (
              <div key={index} className="rounded-2xl bg-[#F7F8FB] p-4 ring-1 ring-[#1C2541]/8">
                <p className="mb-4 font-black text-[#111936]">
                  {es ? `Habitación ${index + 1}` : `Room ${index + 1}`}
                </p>
                <GuestRow
                  compact
                  label={es ? "Adultos" : "Adults"}
                  value={room.adults}
                  min={1}
                  setValue={(value) => updateRoom(index, { adults: value })}
                />
                <GuestRow
                  compact
                  label={es ? "Menores" : "Children"}
                  value={room.children}
                  min={0}
                  setValue={(value) => updateRoom(index, { children: value })}
                />
                {room.children > 0 && (
                  <ChildAgesList
                    ages={resizeChildAges(room.childAges || [], room.children)}
                    onChange={(childIndex, age) => updateRoomChildAge(index, childIndex, age)}
                    language={language}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChildAgesList({ ages, onChange, language }) {
  const es = language === "es";
  return (
    <div className="mt-4 space-y-3 rounded-2xl bg-white p-4 ring-1 ring-[#1C2541]/10">
      <p className="text-sm font-black text-[#111936]">
        {es ? "Edad de los menores" : "Children's ages"}
      </p>
      {ages.map((age, index) => (
        <label key={index} className="block">
          <span className="mb-1 block text-xs font-bold text-[#1C2541]/55">
            {es ? `Menor ${index + 1}` : `Child ${index + 1}`}
          </span>
          <select
            value={age}
            onChange={(event) => onChange(index, event.target.value)}
            className="w-full rounded-xl border border-[#1C2541]/15 bg-white px-4 py-3 text-sm font-bold text-[#1C2541] outline-none focus:border-[#E94584]"
          >
            <option value="">{es ? "Selecciona edad" : "Select age"}</option>
            <option value="under-1">{es ? "Menos de 1 año" : "Under 1 year"}</option>
            {Array.from({ length: 17 }, (_, ageValue) => ageValue + 1).map((ageValue) => (
              <option key={ageValue} value={String(ageValue)}>
                {ageValue} {es ? (ageValue === 1 ? "año" : "años") : (ageValue === 1 ? "year" : "years")}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

function GuestRow({ label, sublabel, value, min, setValue, compact = false }) {
  return (
    <div className={`${compact ? "mb-3" : "mb-5"} flex items-center justify-between gap-4 last:mb-0`}>
      <div>
        <b className="block">{label}</b>
        {sublabel && <span className="mt-1 block text-xs text-[#1C2541]/55">{sublabel}</span>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => setValue(Math.max(min, value - 1))}
          className="grid h-10 w-10 place-items-center rounded-full border text-xl disabled:border-transparent disabled:bg-gray-200 disabled:text-gray-400"
        >
          −
        </button>
        <span className="w-5 text-center font-bold">{value}</span>
        <button
          type="button"
          onClick={() => setValue(value + 1)}
          className="grid h-10 w-10 place-items-center rounded-full border text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

function resizeChildAges(current, count) {
  return Array.from({ length: count }, (_, index) => current[index] || "");
}

function SocialLink({ href, label, children }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 font-black hover:bg-[#E94584]">{children}</a>; }
function addDays(date, days) { const result = new Date(date); result.setDate(result.getDate() + days); return result; }
function toInputDate(date) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, "0"); const day = String(date.getDate()).padStart(2, "0"); return `${year}-${month}-${day}`; }
function formatDateRange(startDate, endDate, stayType, language) {
  if (!startDate) return language === "es" ? "Selecciona fecha" : "Select date";
  const start = formatDate(startDate, language);
  if (stayType === "hourly") return start;
  if (!endDate) return `${start} - ${language === "es" ? "Selecciona salida" : "Select check-out"}`;
  return `${start} - ${formatDate(endDate, language)}`;
}
function formatDate(value, language) { if (!value) return "-"; const [year, month, day] = value.split("-").map(Number); return new Intl.DateTimeFormat(language === "es" ? "es-MX" : "en-US", { day: "2-digit", month: "short" }).format(new Date(year, month - 1, day)); }
