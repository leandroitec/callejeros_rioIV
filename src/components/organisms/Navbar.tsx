'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  PawPrint,
  HeartHandshake,
  AlertTriangle,
  Info,
  CreditCard,
  User,
  Newspaper,
  ChevronRight,
  Users,
  ShieldCheck,
  Heart,
  ShoppingBag,
} from 'lucide-react';

/**
 * Organismo Navbar - Callejeros Río IV
 * Barra de navegación principal y Drawer lateral móvil estructurado por Card Sorting:
 * - Microinteracción Slide in/out: aside con transition-transform duration-300 ease-in-out
 * - Backdrop con transition-opacity duration-300
 * - Cumplimiento WCAG AA en contrastes, roles y navegación por teclado
 */
export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    // Escuchar tecla escape para cerrar el menú lateral y notificaciones
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsNotificationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-slate-800 transition-colors duration-300 ease-in-out">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-lg group"
            aria-label="Ir a la página principal de Callejeros Río IV"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.jpg"
                alt="Logo Callejeros Río IV - Perro y gato en abrazo solidario"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-orange-600 dark:text-orange-400 leading-tight">
                Callejeros
              </span>
              <span className="font-heading font-bold text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 tracking-wider">
                Río IV
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            <Link
              href="/"
              className="text-slate-800 dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Inicio
            </Link>
            <Link
              href="/adopciones"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Mascotas en Adopción
            </Link>
            <Link
              href="/reportar-extravio"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Reportar Extravío
            </Link>
            <Link
              href="/padrinos"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Padrinos y Madrinas
            </Link>
            <Link
              href="/tienda"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Tienda Solidaria
            </Link>
          </nav>

          {/* Controles de la Barra Superior */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle Dark Mode */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all duration-300 ease-in-out min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-label={isDark ? 'Activar modo claro para el día' : 'Activar modo oscuro para la noche'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" aria-hidden="true" />
              )}
            </button>

            {/* Campana de Notificaciones con Popover Interactivo */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all duration-300 ease-in-out min-w-[48px] min-h-[48px] flex items-center justify-center gap-2 active:scale-95"
                aria-label="Ver alertas de mascotas y avisos comunitarios de Río Cuarto"
                aria-expanded={isNotificationOpen}
              >
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
                  {hasNotifications && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="hidden lg:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                  Alertas
                </span>
              </button>

              {/* Popover flotante de Alertas */}
              {isNotificationOpen && (
                <div
                  role="region"
                  aria-label="Alertas comunitarias en vivo"
                  className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-600" />
                      <span>Alertas de Río Cuarto</span>
                    </h3>
                    <span className="text-[11px] font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full">
                      En vivo
                    </span>
                  </div>

                  <div className="py-2 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    <Link
                      href="/reportar-extravio"
                      onClick={() => setIsNotificationOpen(false)}
                      className="block py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl px-2 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-red-600 font-bold mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Mascota Perdida (Plaza Roca)</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Perro mestizo mediano con collar rojo visto hace 25 min en inmediaciones del centro.
                      </p>
                    </Link>

                    <Link
                      href="/adopcion-responsable"
                      onClick={() => setIsNotificationOpen(false)}
                      className="block py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl px-2 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-emerald-600 font-bold mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Campaña Gratuita en Alberdi</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Turnos de castración y vacunación antirrábica abiertos para este sábado.
                      </p>
                    </Link>

                    <Link
                      href="/padrinos"
                      onClick={() => setIsNotificationOpen(false)}
                      className="block py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl px-2 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-cyan-600 font-bold mb-0.5">
                        <Heart className="w-3.5 h-3.5" />
                        <span>Caso Urgente: Cthulhu</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Inició tratamiento traumatológico y necesita madrina/padrino para medicamentos.
                      </p>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setHasNotifications(false);
                        setIsNotificationOpen(false);
                      }}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      Marcar leídas
                    </button>
                    <Link
                      href="/reportar-extravio"
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      Ver reportes →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Botón Login/Perfil */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md transition-all duration-300 ease-in-out shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-h-[48px]"
              aria-label="Ingresar a mi cuenta o crear perfil vecinal"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              <span className="hidden min-[380px]:inline">Ingresar</span>
            </Link>

            {/* Botón Menú Hamburguesa */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="p-2.5 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all duration-300 ease-in-out min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
              aria-label="Abrir menú de navegación lateral"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER LATERAL (Menú Hamburguesa con Microinteracción Slide in/out) */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isDrawerOpen}
      >
        {/* Backdrop Oscuro con fade transition */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Panel Deslizante Drawer (Slide in/out suave desde la derecha) */}
        <aside
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header del Drawer */}
          <div className="p-4 border-b border-neutral-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Mi Perfil (Invitado)
                </span>
                <Link
                  href="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium"
                >
                  Iniciar sesión o registrarse
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-label="Cerrar menú de navegación lateral"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Lista de Secciones Agrupadas por Card Sorting */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Acceso Rápido: Inicio */}
            <div>
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-200 font-heading font-bold text-sm hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all duration-300 ease-in-out min-h-[48px] border border-orange-200/60 dark:border-orange-800/40 active:scale-98"
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                  <span>Inicio</span>
                </div>
                <ChevronRight className="w-4 h-4 text-orange-600" aria-hidden="true" />
              </Link>
            </div>

            {/* BLOQUE 1: Acciones Principales */}
            <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  <PawPrint className="w-4 h-4" aria-hidden="true" />
                  <span>Acciones Principales</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Urgencias y Adopción</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1 border border-slate-200/60 dark:border-slate-700/60">
                <Link
                  href="/adopciones"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <PawPrint className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />
                    <span>Mascotas en Adopción</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/reportar-extravio"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <HeartHandshake className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />
                    <span>Dar en Adopción Responsable</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/reportar-extravio"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-red-700 dark:text-red-300 hover:bg-white dark:hover:bg-slate-700 hover:text-red-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                    <span>Reportar Mascota Perdida o Vista</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-600" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* BLOQUE 2: Cómo Ayudar */}
            <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  <span>Cómo Ayudar</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Soporte Solidario</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1 border border-slate-200/60 dark:border-slate-700/60">
                <Link
                  href="/tienda"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                    <span>Tienda Solidaria</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/padrinos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                    <span>Padrinos y Madrinas</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/#donaciones"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                    <span>Aportar a Gastos Veterinarios</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* BLOQUE 3: Nosotros y Comunidad */}
            <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  <Info className="w-4 h-4" aria-hidden="true" />
                  <span>Nosotros y Comunidad</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Información y Guías</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1 border border-slate-200/60 dark:border-slate-700/60">
                <Link
                  href="/adopcion-responsable"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-amber-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>Conocer Requisitos de Adopción</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/#quienes-somos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-amber-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>Quiénes Somos</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
                <Link
                  href="/#eventos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 hover:text-amber-600 transition-all duration-200 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Newspaper className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>Eventos Benéficos y Noticias</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Grupo 4: Registrarse / Conectar Cuenta */}
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 rounded-2xl">
              <h4 className="font-heading font-bold text-sm text-orange-950 dark:text-orange-200">
                Registrate en Callejeros
              </h4>
              <p className="text-xs text-orange-800 dark:text-orange-300 mt-1 mb-3 leading-relaxed">
                Conectá tu cuenta para hacer seguimiento de tus reportes y adoptar con mayor agilidad.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/registro"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 text-center py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-sm transition-all duration-200 min-h-[48px] flex items-center justify-center"
                >
                  Crear Cuenta
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 text-center py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-orange-300 dark:border-orange-800 text-orange-800 dark:text-orange-200 hover:bg-orange-100 transition-all duration-200 min-h-[48px] flex items-center justify-center active:scale-95"
                >
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

          {/* Footer del Drawer */}
          <div className="p-4 border-t border-neutral-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
            Callejeros Río IV • Red Comunitaria y Adopción Responsable
          </div>
        </aside>
      </div>
    </>
  );
}
