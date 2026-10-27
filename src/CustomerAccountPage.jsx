import React, { useMemo, useState } from "react";
import { CalendarCheck2, Download, Edit3, KeyRound, Mail, Moon, Phone, Printer, Save, UserRound, X } from "lucide-react";

const SAMPLE_RESERVATIONS = [
  { id: "QR-982731", property: "QuickRooms Platinum Polanco", room: "Suite Jacuzzi", date: "28 oct 2026", time: "18:00", status: "Confirmada", total: "$1,090 MXN" },
  { id: "QR-771205", property: "Hotel Boutique Centro 24", room: "Suite Romántica", date: "12 sep 2026", time: "20:00", status: "Completada", total: "$760 MXN" },
];

export default function CustomerAccountPage({ user, onUpdateUser }) {
  if (!user) return null;
  const [editing, setEditing] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profile, setProfile] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
  const activeReservations = useMemo(() => SAMPLE_RESERVATIONS.filter((r) => r.status === "Confirmada"), []);
  const saveProfile = () => { onUpdateUser?.({ ...user, ...profile }); setEditing(false); };

  return <main className="mx-auto max-w-[1180px] px-5 py-10 text-[#131A2F]">
    <section className="rounded-3xl bg-[#1C2541] p-7 text-white md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-sm font-black uppercase tracking-[.16em] text-[#E94584]">Mi QuickRooms</p><h1 className="mt-2 text-3xl font-black">Hola, {user.name}</h1><p className="mt-2 text-white/60">Membresía {user.membership || "QR-DEMO-1001"}</p></div><div className="rounded-2xl bg-white/10 px-6 py-4"><p className="text-xs text-white/60">Nivel</p><p className="font-black">Miembro QuickRooms</p></div></div>
    </section>

    <section className="mt-6 grid gap-5 md:grid-cols-3">
      <Metric icon={Moon} title="Lunas disponibles" value={`${user.lunas ?? 0}`} subtitle="Puntos para futuras compras" accent />
      <Metric icon={CalendarCheck2} title="Reservaciones activas" value={String(activeReservations.length)} subtitle="Reservas pendientes de disfrutar" />
      <Metric icon={UserRound} title="Mi membresía" value={user.membership || "QR-DEMO-1001"} subtitle="Identificador de cliente" />
    </section>

    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#1C2541]/10 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#E94584]">Reservaciones</p><h2 className="mt-1 text-2xl font-black">Mis reservaciones</h2></div><span className="rounded-full bg-[#F3F5F9] px-4 py-2 text-xs font-black">{SAMPLE_RESERVATIONS.length} registros</span></div>
      <div className="mt-5 space-y-4">{SAMPLE_RESERVATIONS.map((reservation) => <ReservationRow key={reservation.id} reservation={reservation} />)}</div>
    </section>

    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#1C2541]/10 md:p-7">
      <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#E94584]">Perfil</p><h2 className="mt-1 text-2xl font-black">Actualización de datos</h2></div><button onClick={() => setEditing(!editing)} className="flex items-center gap-2 rounded-xl border-2 border-[#1C2541] px-4 py-2.5 font-black">{editing ? <X size={17}/> : <Edit3 size={17}/>} {editing ? "Cancelar" : "Editar datos"}</button></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2"><ProfileField icon={UserRound} label="Nombre" value={profile.name} disabled={!editing} onChange={(v)=>setProfile(p=>({...p,name:v}))}/><ProfileField icon={Mail} label="Correo" value={profile.email} disabled={!editing} onChange={(v)=>setProfile(p=>({...p,email:v}))}/><ProfileField icon={Phone} label="Teléfono" value={profile.phone} disabled={!editing} onChange={(v)=>setProfile(p=>({...p,phone:v}))}/></div>
      {editing && <button onClick={saveProfile} className="mt-5 flex items-center gap-2 rounded-xl bg-[#E94584] px-5 py-3 font-black text-white"><Save size={18}/>Guardar cambios</button>}
    </section>

    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#1C2541]/10 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#E94584]">Seguridad</p><h2 className="mt-1 text-2xl font-black">Actualizar contraseña</h2><p className="mt-2 text-sm text-[#1C2541]/55">Usa al menos 8 caracteres. Para producción, la validación debe realizarse en el backend y la contraseña nunca debe almacenarse en texto plano.</p></div><button onClick={() => { setPasswordOpen(!passwordOpen); setPasswordMessage(""); }} className="flex items-center gap-2 rounded-xl bg-[#1C2541] px-4 py-2.5 font-black text-white"><KeyRound size={17}/>{passwordOpen ? "Cerrar" : "Cambiar contraseña"}</button></div>
      {passwordOpen && <form onSubmit={(e) => { e.preventDefault(); if (passwords.next.length < 8) return setPasswordMessage("La nueva contraseña debe tener mínimo 8 caracteres."); if (passwords.next !== passwords.confirm) return setPasswordMessage("La confirmación no coincide con la nueva contraseña."); setPasswordMessage("Contraseña actualizada en el prototipo. La actualización real requiere el backend de autenticación."); setPasswords({ current: "", next: "", confirm: "" }); }} className="mt-6 grid gap-4 md:grid-cols-3">
        <PasswordInput label="Contraseña actual" value={passwords.current} onChange={(v)=>setPasswords(p=>({...p,current:v}))}/><PasswordInput label="Nueva contraseña" value={passwords.next} onChange={(v)=>setPasswords(p=>({...p,next:v}))}/><PasswordInput label="Confirmar contraseña" value={passwords.confirm} onChange={(v)=>setPasswords(p=>({...p,confirm:v}))}/><button className="md:col-span-3 flex items-center justify-center gap-2 rounded-xl bg-[#E94584] px-5 py-3 font-black text-white"><Save size={18}/>Actualizar contraseña</button>{passwordMessage && <p className="md:col-span-3 rounded-xl bg-[#F3F5F9] p-4 text-sm font-bold">{passwordMessage}</p>}
      </form>}
    </section>
  </main>;
}
function Metric({icon:Icon,title,value,subtitle,accent}){return <article className={`rounded-3xl p-6 shadow-sm ${accent?"bg-[#E94584] text-white":"bg-white ring-1 ring-[#1C2541]/10"}`}><Icon size={30} className={accent?"text-white":"text-[#E94584]"}/><p className={`mt-4 text-sm font-bold ${accent?"text-white/75":"text-[#1C2541]/55"}`}>{title}</p><p className="mt-1 text-3xl font-black">{value}</p><p className={`mt-2 text-xs ${accent?"text-white/70":"text-[#1C2541]/45"}`}>{subtitle}</p></article>}
function ReservationRow({reservation}){const reprint=()=>window.open(`/QuickRooms-Comprobante-Reservacion.pdf#${reservation.id}`,"_blank");return <article className="grid gap-4 rounded-2xl border border-[#1C2541]/10 p-5 lg:grid-cols-[1fr_auto]"><div><div className="flex flex-wrap items-center gap-2"><b className="text-lg">{reservation.property}</b><span className={`rounded-full px-2.5 py-1 text-xs font-black ${reservation.status==="Confirmada"?"bg-emerald-100 text-emerald-700":"bg-[#F3F5F9] text-[#1C2541]/60"}`}>{reservation.status}</span></div><p className="mt-1 text-sm text-[#1C2541]/55">{reservation.room} · {reservation.date} · {reservation.time}</p><p className="mt-2 text-xs font-black text-[#E94584]">Clave {reservation.id}</p><p className="mt-1 font-black">{reservation.total}</p></div><div className="flex flex-wrap items-center gap-2"><button onClick={reprint} className="flex items-center gap-2 rounded-xl bg-[#1C2541] px-4 py-2.5 text-sm font-black text-white"><Printer size={16}/>Reimprimir</button><a href="/QuickRooms-Comprobante-Reservacion.pdf" download className="flex items-center gap-2 rounded-xl bg-[#E94584] px-4 py-2.5 text-sm font-black text-white"><Download size={16}/>PDF</a></div></article>}
function ProfileField({icon:Icon,label,value,disabled,onChange}){return <label><span className="mb-2 block text-sm font-black">{label}</span><span className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${disabled?"bg-[#F3F5F9] border-transparent":"bg-white border-[#E94584]"}`}><Icon size={18} className="text-[#1C2541]/40"/><input disabled={disabled} value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-transparent outline-none disabled:text-[#1C2541]/65"/></span></label>}

function PasswordInput({label,value,onChange}){return <label><span className="mb-2 block text-sm font-black">{label}</span><span className="flex items-center gap-2 rounded-xl border border-[#1C2541]/20 px-4 py-3 focus-within:border-[#E94584]"><KeyRound size={18} className="text-[#1C2541]/40"/><input required type="password" value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-transparent outline-none" autoComplete="new-password"/></span></label>}
