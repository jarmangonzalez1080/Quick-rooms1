import React, { useState } from "react";
import { Building2, Mail, MapPin, MessageCircle, Phone, Send, UserRound } from "lucide-react";

export default function PublishPropertyPage() {
  const [form, setForm] = useState({
    propertyName: "", propertyType: "Motel", city: "Ciudad de México", address: "", rooms: "",
    contactName: "", position: "", email: "", phone: "", notes: "",
  });
  const [ready, setReady] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const emailBody = encodeURIComponent([
    `Nombre de la propiedad: ${form.propertyName}`, `Tipo: ${form.propertyType}`, `Ciudad: ${form.city}`,
    `Dirección: ${form.address}`, `Habitaciones: ${form.rooms}`, `Contacto: ${form.contactName}`,
    `Cargo: ${form.position}`, `Email: ${form.email}`, `Teléfono: ${form.phone}`, `Comentarios: ${form.notes}`,
  ].join("\n"));
  return <main className="min-h-screen bg-[#F3F5F9] text-[#131A2F]">
    <section className="bg-[#1C2541] px-5 py-10 text-white"><div className="mx-auto max-w-[1100px]"><Building2 className="text-[#E94584]" size={34}/><h1 className="mt-3 text-4xl font-black">Publica tu propiedad en QuickRooms</h1><p className="mt-3 max-w-2xl text-white/70">Comparte los datos de tu propiedad y nuestro equipo comercial podrá dar seguimiento al proceso de alta.</p></div></section>
    <form onSubmit={(e)=>{e.preventDefault();setReady(true)}} className="mx-auto my-8 max-w-[1100px] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#1C2541]/10 md:p-8">
      <Section icon={Building2} title="Datos de la propiedad">
        <Input label="Nombre de la propiedad" value={form.propertyName} onChange={v=>update("propertyName",v)} required />
        <Select label="Tipo de propiedad" value={form.propertyType} onChange={v=>update("propertyType",v)} options={["Motel","Hotel","Hotel boutique","Suites","Otro"]}/>
        <Input label="Ciudad" value={form.city} onChange={v=>update("city",v)} required />
        <Input label="Número de habitaciones" type="number" value={form.rooms} onChange={v=>update("rooms",v)} required />
        <div className="md:col-span-2"><Input label="Dirección" value={form.address} onChange={v=>update("address",v)} required icon={MapPin}/></div>
      </Section>
      <Section icon={UserRound} title="Contacto del dueño o gerente comercial">
        <Input label="Nombre completo" value={form.contactName} onChange={v=>update("contactName",v)} required />
        <Input label="Cargo" value={form.position} onChange={v=>update("position",v)} required />
        <Input label="Correo electrónico" type="email" value={form.email} onChange={v=>update("email",v)} required icon={Mail}/>
        <Input label="Teléfono" type="tel" value={form.phone} onChange={v=>update("phone",v)} required icon={Phone}/>
        <label className="md:col-span-2"><span className="mb-2 block text-sm font-black">Comentarios adicionales</span><textarea value={form.notes} onChange={e=>update("notes",e.target.value)} rows={4} className="w-full rounded-xl border border-[#1C2541]/20 px-4 py-3 outline-none focus:border-[#E94584]" placeholder="Cuéntanos sobre amenidades, horarios o necesidades comerciales."/></label>
      </Section>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <a href="https://wa.me/525565181856" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#1C2541] px-5 py-3.5 font-black text-white"><MessageCircle size={19}/>Contactar por WhatsApp</a>
        <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#E94584] px-5 py-3.5 font-black text-white"><Send size={18}/>Enviar solicitud</button>
      </div>
      {ready && <div className="mt-5 rounded-2xl bg-[#F3F5F9] p-5"><p className="font-black">Solicitud lista para envío</p><p className="mt-1 text-sm text-[#1C2541]/60">En este prototipo, el botón abre tu aplicación de correo con los datos capturados. En producción deberá enviarse mediante una API del backend.</p><a href={`mailto:ventas@quick-rooms.com?subject=${encodeURIComponent(`Nueva propiedad - ${form.propertyName}`)}&body=${emailBody}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#E94584] px-5 py-3 font-black text-white"><Mail size={18}/>Enviar a ventas@quick-rooms.com</a></div>}
      <p className="mt-5 text-center text-xs text-[#1C2541]/50">Contacto comercial: 55 6518 1856 · ventas@quick-rooms.com</p>
    </form>
  </main>;
}
function Section({icon:Icon,title,children}){return <section className="mt-3 border-b border-[#1C2541]/10 pb-7 last:border-0"><div className="mb-5 flex items-center gap-2"><Icon className="text-[#E94584]"/><h2 className="text-xl font-black">{title}</h2></div><div className="grid gap-4 md:grid-cols-2">{children}</div></section>}
function Input({label,value,onChange,type="text",required,icon:Icon}){return <label><span className="mb-2 block text-sm font-black">{label}{required&&<span className="text-[#E94584]"> *</span>}</span><span className="relative block">{Icon&&<Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C2541]/40"/>}<input required={required} type={type} value={value} onChange={e=>onChange(e.target.value)} className={`w-full rounded-xl border border-[#1C2541]/20 px-4 py-3 outline-none focus:border-[#E94584] ${Icon?"pl-10":""}`}/></span></label>}
function Select({label,value,onChange,options}){return <label><span className="mb-2 block text-sm font-black">{label}</span><select value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-[#1C2541]/20 bg-white px-4 py-3 outline-none focus:border-[#E94584]">{options.map(o=><option key={o}>{o}</option>)}</select></label>}
