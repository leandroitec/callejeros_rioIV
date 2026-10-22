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

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    // Escuchar tecla escape para cerrar el menú lateral
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
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
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-slate-800 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-lg group"
            aria-label="Ir a la página principal de Callejeros Río IV"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm">
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
              className="text-slate-800 dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Inicio
            </Link>
            <Link
              href="/adopciones"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Mascotas en Adopción
            </Link>
            <Link
              href="/reportar-extravio"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Reportar Extravío
            </Link>
            <Link
              href="/padrinos"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
            >
              Padrinos y Madrinas
            </Link>
            <Link
              href="/tienda"
              className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 rounded-md py-1 px-2"
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
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Campana de Notificaciones (Modelo Mental: Ícono Universal + Etiqueta Explícita) */}
            <button
              type="button"
              onClick={() => setHasNotifications(!hasNotifications)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5"
              aria-label="Ver alertas y notificaciones recientes de Río Cuarto"
            >
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                {hasNotifications && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-slate-700 dark:text-slate-300">
                Alertas
              </span>
            </button>

            {/* Botón Login/Perfil (Patrón Z: Ancla Superior Derecha en móvil y desktop) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-h-[40px] sm:min-h-[44px]"
              aria-label="Iniciar sesión o ver perfil"
            >
              <User className="w-4 h-4" />
              <span className="hidden min-[380px]:inline">Ingresar</span>
            </Link>

            {/* Botón Menú Hamburguesa (Figma: Hamburguesa navbar NoRegis) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="p-2.5 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER LATERAL (Menú Hamburguesa - Mapeo 1:1 de Wireframe Figma) */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-50 transition-visibility duration-300 ${
          isDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isDrawerOpen}
      >
        {/* Backdrop Oscuro */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Panel Deslizante Drawer */}
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
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Cerrar menú de navegación"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de Secciones Agrupadas (Figma Wireframe 1) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            {/* Acceso Rápido: Inicio (Home en /) */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-heading font-bold text-sm hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all min-h-[48px] border border-orange-200/60 dark:border-orange-800/40"
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span>Inicio (Home)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-orange-500" />
              </Link>
            </div>

            {/* Grupo 1: Adopta un Callejero (Modelos Mentales: Ícono + Etiqueta Explícita) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                <PawPrint className="w-4 h-4 text-orange-500" />
                <span>Adopta un Callejero</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1">
                <Link
                  href="/adopciones"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <PawPrint className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Adoptar Mascota</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/reportar-extravio"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <HeartHandshake className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Publicar en Adopción</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/reportar-extravio"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-red-500 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-red-600 dark:text-red-400 font-semibold">Reportar Extravío</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </Link>
              </div>
            </div>

            {/* Grupo 2: Noticias */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                <Newspaper className="w-4 h-4 text-cyan-500" />
                <span>Noticias y Comunidad</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5">
                <Link
                  href="/#eventos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-cyan-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Newspaper className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>Eventos Benéficos y Noticias</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Grupo 3: Información */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span>Información</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1">
                <Link
                  href="/#quienes-somos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Quiénes Somos</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/adopcion-responsable"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Guía de Adopción Responsable</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Grupo 4: Quiero Colaborar (Modelos Mentales: Ícono + Etiqueta Explícita) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span>Quiero Colaborar</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-1.5 space-y-1">
                <Link
                  href="/#donaciones"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Donaciones Económicas</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/padrinos"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Apadrinar Tratamiento</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/tienda"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Tienda Solidaria</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Grupo 5: Registrarse / Conectar Cuenta */}
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 rounded-2xl">
              <h4 className="font-heading font-bold text-sm text-orange-900 dark:text-orange-200">
                Registrate en Callejeros
              </h4>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1 mb-3">
                Conectá tu cuenta para hacer seguimiento de tus reportes y adoptar con mayor agilidad.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/registro"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-sm transition-all min-h-[40px] flex items-center justify-center"
                >
                  Crear Cuenta
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-100 transition-all min-h-[40px] flex items-center justify-center"
                >
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

          {/* Footer del Drawer */}
          <div className="p-4 border-t border-neutral-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Callejeros Río IV • Comunidad y Adopción
          </div>
        </aside>
      </div>
    </>
  );
}
