import React, { useState } from "react";
import { KeyRound, Mail, UserRound, Building2, Moon, HelpCircle } from "lucide-react";

export default function LoginPage({ onCustomerLogin, onCustomerRegister, onOwnerLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  return <main className="min-h-screen bg-[#F3F5F9] px-5 py-10 text-[#131A2F]">
    <div className="mx-auto max-w-[1100px]">
      <section className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#1C2541]/10 lg:grid-cols-[1fr_420px]">
        <div className="bg-[#1C2541] p-8 text-white md:p-12">
          <img src="/Logo.png" alt="QuickRooms" className="h-20 w-20 rounded-3xl"/>
          <h1 className="mt-6 text-4xl font-black">Bienvenido de nuevo</h1>
          <p className="mt-3 max-w-lg text-white/70">Inicia sesión para consultar tus reservas, administrar tu membresía QuickRooms y acumular Lunas en tus compras.</p>
          <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5"><Moon className="text-[#E94584]"/><p className="mt-3 font-black">Programa Lunas</p><p className="mt-1 text-sm text-white/65">Tu cuenta de cliente estará preparada para mostrar membresía, saldo y movimientos de recompensas.</p></div>
        </div>
        <div className="p-7 md:p-9">
          <div className="flex items-center gap-2"><UserRound className="text-[#E94584]"/><h2 className="text-2xl font-black">Inicio de sesión</h2></div>
          {!forgot ? <form onSubmit={(e)=>{e.preventDefault();onCustomerLogin?.({email,password})}} className="mt-6 space-y-4">
            <Field label="Usuario o correo" icon={Mail}><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full bg-transparent outline-none"/></Field>
            <Field label="Contraseña" icon={KeyRound}><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent outline-none"/></Field>
            <button className="w-full rounded-xl bg-[#E94584] px-5 py-3.5 font-black text-white">Iniciar sesión</button>
            <button type="button" onClick={()=>setForgot(true)} className="w-full text-sm font-black text-[#E94584]">Olvidé mi contraseña</button>
          </form> : <div className="mt-6"><p className="text-sm leading-6 text-[#1C2541]/65">Ingresa el correo asociado a tu cuenta. Este prototipo deja preparado el flujo de recuperación.</p><Field label="Correo" icon={Mail}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-transparent outline-none"/></Field><button onClick={()=>setForgot(false)} className="mt-4 w-full rounded-xl bg-[#E94584] px-5 py-3.5 font-black text-white">Solicitar recuperación</button></div>}
          <div className="my-7 h-px bg-[#1C2541]/10"/>
          <p className="text-center text-sm font-black">¿Aún no tienes cuenta?</p>
          <button onClick={onCustomerRegister} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1C2541] px-5 py-3 font-black text-[#1C2541]"><Moon size={18}/>Registrarme como cliente</button>
          <button onClick={onOwnerLogin} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C2541] px-5 py-3 font-black text-white"><Building2 size={18}/>Soy propietario</button>
          <a href="mailto:ventas@quick-rooms.com" className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-[#1C2541]/60"><HelpCircle size={16}/>Asistencia: ventas@quick-rooms.com</a>
        </div>
      </section>
    </div>
  </main>;
}
function Field({label,icon:Icon,children}){return <label className="block"><span className="mb-2 block text-sm font-black">{label}</span><span className="flex items-center gap-2 rounded-xl border border-[#1C2541]/20 px-4 py-3 focus-within:border-[#E94584]"><Icon size={18} className="text-[#1C2541]/40"/>{children}</span></label>}
