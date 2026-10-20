'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuccessModal } from '@/components/modals/SuccessModal';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Botón Volver (Figma: <) */}
      <Link
        href="/"
        className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
        aria-label="Volver a la página principal"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
          Registrate
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unite a la comunidad de Callejeros Río IV para adoptar, reportar y colaborar.
        </p>
      </div>

      {/* Formulario Registro (Figma Wireframe 1: Register) */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-4">
        {/* Full Name Input (Figma: User Icon) */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-name"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Nombre Completo
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="register-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej: Alt Efe Cuatro"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all min-h-[48px]"
            />
          </div>
        </div>

        {/* Email Input (Figma: Mail Icon) */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="register-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alt_f4@mail.com"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all min-h-[48px]"
            />
          </div>
        </div>

        {/* Password Input (Figma: Lock Icon + Eye) */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all min-h-[48px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Inputs de Código OTP (Verificación de Seguridad Comunitaria) */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-orange-500" />
              <span>Código OTP de Verificación</span>
            </span>
            <span className="text-[11px] text-slate-400">(Opcional demo)</span>
          </div>
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {otpCode.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>
        </div>

        {/* Botón Primario: Register (Figma) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl font-heading font-extrabold text-sm uppercase tracking-wide bg-slate-900 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-md active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 mt-2"
        >
          {isSubmitting ? 'Registrando...' : 'Register'}
        </button>

        {/* Enlace hacia Login */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>

        {/* Divisor */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
          <span className="bg-white dark:bg-slate-800 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
            Registrate con ...
          </span>
        </div>

        {/* Botones Sociales (Figma: GOOGLE / FACEBOOK) */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => alert('Registro con Google en desarrollo')}
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            GOOGLE
          </button>
          <button
            type="button"
            onClick={() => alert('Registro con Facebook en desarrollo')}
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            FACEBOOK
          </button>
        </div>
      </form>

      {/* MODAL DE CONFIRMACIÓN DE REGISTRO */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          router.push('/');
        }}
        title="¡Bienvenido a Callejeros Río IV!"
        message="Tu cuenta fue creada exitosamente. Ya podés postularte para adoptar, seguir tus reportes y sumarte como voluntario o padrino."
        actionText="Ir al Inicio"
        actionHref="/"
      />
    </div>
  );
}
