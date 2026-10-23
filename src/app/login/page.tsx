'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuccessModal } from '@/components/organisms/SuccessModal';
import { Button } from '@/components/atoms/Button';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [noticeModal, setNoticeModal] = useState<{ title: string; message: string } | null>(null);

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'El correo electrónico es obligatorio.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val.trim())) return 'Ingresá un correo electrónico válido (ej. tu_email@ejemplo.com).';
    return undefined;
  };

  const validatePassword = (val: string) => {
    if (!val) return 'La contraseña es obligatoria.';
    if (val.length < 6) return 'La contraseña debe contener al menos 6 caracteres.';
    return undefined;
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      const error = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: error }));
    } else {
      const error = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevención del Problema del Alien (evitar envíos duplicados)

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) {
      if (emailErr) {
        document.getElementById('login-email')?.focus();
      } else if (passErr) {
        document.getElementById('login-password')?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 600);
  };

  return (
    <section aria-labelledby="login-title" className="w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Botón Volver (Figma: <) */}
      <Link
        href="/"
        className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
        aria-label="Volver a la página principal"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      <div className="space-y-2 text-center sm:text-left">
        <h1 id="login-title" className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
          Iniciar sesión
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ingresá a tu cuenta de Callejeros Río IV para gestionar tus reportes y adopciones.
        </p>
      </div>

      {/* Formulario Login (Figma Wireframe 1: Loguin) */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-6"
      >
        {/* Email Input (Gestalt: Proximidad estrecha label-input con separación amplia entre campos) */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
              aria-describedby={touched.email && errors.email ? 'login-email-error' : undefined}
              value={email}
              onBlur={() => handleBlur('email')}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                }
              }}
              placeholder="tu_email@ejemplo.com"
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all min-h-[56px] h-14 ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
              }`}
            />
          </div>
          {touched.email && errors.email && (
            <p id="login-email-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Input (Gestalt: Proximidad directa label-input y mb-6 hacia el botón de acción) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Contraseña
            </label>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                setNoticeModal({
                  title: 'Recuperación de Contraseña',
                  message: email
                    ? `Enviamos un enlace seguro de restablecimiento a ${email}. Revisá tu casilla de correo o la carpeta de spam.`
                    : 'Ingresá tu correo electrónico en el campo superior para que podamos enviarte el enlace de restablecimiento.',
                })
              }
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded disabled:opacity-50"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={touched.password && !!errors.password ? 'true' : 'false'}
              aria-describedby={touched.password && errors.password ? 'login-password-error' : undefined}
              value={password}
              onBlur={() => handleBlur('password')}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                }
              }}
              placeholder="••••••••••••"
              className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all min-h-[56px] h-14 ${
                touched.password && errors.password
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
              }`}
            />
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded disabled:opacity-50"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p id="login-password-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Botón Primario: Login (Prevención de Errores DCU / Problema del Alien: Disabled + Opacity-70 + Spinner) */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          loadingText="Iniciando sesión..."
          leftIcon={<LogIn className="w-5 h-5" />}
          className="w-full uppercase tracking-wider text-sm sm:text-base"
        >
          Iniciar Sesión
        </Button>

        {/* Enlace hacia Registro */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="font-bold text-orange-600 dark:text-orange-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded">
              Registrate
            </Link>
          </p>
        </div>

        {/* Divisor */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
          <span className="bg-white dark:bg-slate-800 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
            Ingresá con ...
          </span>
        </div>

        {/* Botones Sociales (Figma: GOOGLE / FACEBOOK) */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              setNoticeModal({
                title: 'Ingreso con Google',
                message: 'La autenticación rápida con cuenta de Google se habilitará próximamente. Mientras tanto, podés iniciar sesión con tu correo electrónico y contraseña.',
              })
            }
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
          >
            GOOGLE
          </button>
          <button
            type="button"
            onClick={() =>
              setNoticeModal({
                title: 'Ingreso con Facebook',
                message: 'La vinculación con Facebook estará disponible en la próxima actualización. Por favor ingresá directamente con tu correo electrónico y contraseña.',
              })
            }
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-xs transition-all min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-offset-slate-900"
          >
            FACEBOOK
          </button>
        </div>
      </form>

      {/* FEEDBACK VISUAL INMEDIATO (Modal de Confirmación) */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          router.push('/');
        }}
        title="¡Bienvenido de nuevo!"
        message="Iniciaste sesión correctamente. Ya podés postularte para adoptar, seguir tus reportes y sumarte como voluntario o padrino."
        actionText="Ir al Inicio"
        actionHref="/"
        variant="orange"
      />

      {/* Modal de Aviso Informativo */}
      <SuccessModal
        isOpen={!!noticeModal}
        onClose={() => setNoticeModal(null)}
        title={noticeModal?.title || ''}
        message={noticeModal?.message || ''}
        actionText="Entendido"
        actionHref="/login"
        variant="orange"
      />
    </section>
  );
}
