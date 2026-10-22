'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuccessModal } from '@/components/modals/SuccessModal';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFullName = (val: string) => {
    if (!val.trim()) return 'El nombre completo es obligatorio.';
    if (val.trim().length < 3) return 'Ingresá tu nombre completo (mínimo 3 caracteres).';
    return undefined;
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'El correo electrónico es obligatorio.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val.trim())) return 'Ingresá un correo electrónico válido (ej. alt_f4@mail.com).';
    return undefined;
  };

  const validatePassword = (val: string) => {
    if (!val) return 'La contraseña es obligatoria.';
    if (val.length < 6) return 'La contraseña debe contener al menos 6 caracteres.';
    return undefined;
  };

  const handleBlur = (field: 'fullName' | 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'fullName') {
      setErrors((prev) => ({ ...prev, fullName: validateFullName(fullName) }));
    } else if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

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
    const nameErr = validateFullName(fullName);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setTouched({ fullName: true, email: true, password: true });
    setErrors({ fullName: nameErr, email: emailErr, password: passErr });

    if (nameErr || emailErr || passErr) {
      if (nameErr) document.getElementById('register-name')?.focus();
      else if (emailErr) document.getElementById('register-email')?.focus();
      else if (passErr) document.getElementById('register-password')?.focus();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 700);
  };

  return (
    <section aria-labelledby="register-title" className="w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Botón Volver (Figma: <) */}
      <Link
        href="/"
        className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
        aria-label="Volver a la página principal"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      <div className="space-y-2 text-center sm:text-left">
        <h1 id="register-title" className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
          Registrate
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unite a la comunidad de Callejeros Río IV para adoptar, reportar y colaborar.
        </p>
      </div>

      {/* Formulario Registro (Figma Wireframe 1: Register) */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-4"
      >
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
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={touched.fullName && !!errors.fullName ? 'true' : 'false'}
              aria-describedby={touched.fullName && errors.fullName ? 'register-name-error' : undefined}
              value={fullName}
              onBlur={() => handleBlur('fullName')}
              onChange={(e) => {
                setFullName(e.target.value);
                if (touched.fullName) {
                  setErrors((prev) => ({ ...prev, fullName: validateFullName(e.target.value) }));
                }
              }}
              placeholder="Ej: Alt Efe Cuatro"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[48px] ${
                touched.fullName && errors.fullName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            />
          </div>
          {touched.fullName && errors.fullName && (
            <p id="register-name-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
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
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
              aria-describedby={touched.email && errors.email ? 'register-email-error' : undefined}
              value={email}
              onBlur={() => handleBlur('email')}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                }
              }}
              placeholder="alt_f4@mail.com"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[48px] ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            />
          </div>
          {touched.email && errors.email && (
            <p id="register-email-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
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
              autoComplete="new-password"
              required
              aria-required="true"
              aria-invalid={touched.password && !!errors.password ? 'true' : 'false'}
              aria-describedby={touched.password && errors.password ? 'register-password-error' : undefined}
              value={password}
              onBlur={() => handleBlur('password')}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                }
              }}
              placeholder="••••••••••••"
              className={`w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[48px] ${
                touched.password && errors.password
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p id="register-password-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
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
                inputMode="numeric"
                maxLength={1}
                aria-label={`Dígito ${idx + 1} del código de verificación`}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 min-h-[44px]"
              />
            ))}
          </div>
        </div>

        {/* Botón Primario: Register (Color Primario Naranja con Feedback Inmediato) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[50px] py-3.5 px-6 rounded-2xl font-heading font-extrabold text-sm uppercase tracking-wider bg-orange-600 hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 text-white shadow-lg shadow-orange-600/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creando tu cuenta...</span>
            </>
          ) : (
            <span>Crear Cuenta</span>
          )}
        </button>

        {/* Enlace hacia Login */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded">
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
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
          >
            GOOGLE
          </button>
          <button
            type="button"
            onClick={() => alert('Registro con Facebook en desarrollo')}
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-offset-slate-900"
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
        variant="orange"
      />
    </section>
  );
}
