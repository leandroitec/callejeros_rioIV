import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Columna 1: Brand & Misión */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-orange-400">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo Callejeros Río IV"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Callejeros <span className="text-orange-500">Río IV</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Red comunitaria de adopción responsable y alerta temprana de animales perdidos para los barrios de la ciudad de Río Cuarto.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
                aria-label="Instagram de Callejeros Río IV"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400"
                aria-label="Facebook de Callejeros Río IV"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Adopción & Rescate */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-base">
              Adopción & Rescate
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/adopciones" className="hover:text-orange-400 transition-colors">
                  Mascotas en Adopción
                </Link>
              </li>
              <li>
                <Link href="/reportar-extravio" className="hover:text-orange-400 transition-colors">
                  Reportar Extravío
                </Link>
              </li>
              <li>
                <Link href="/adopcion-responsable" className="hover:text-orange-400 transition-colors">
                  Requisitos de Adopción
                </Link>
              </li>
              <li>
                <Link href="/#mapa" className="hover:text-orange-400 transition-colors">
                  Zonas y Barrios Activos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Solidaridad */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-base">
              Colaboración
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/padrinos" className="hover:text-cyan-400 transition-colors">
                  Padrinos y Madrinas
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="hover:text-cyan-400 transition-colors">
                  Tienda Solidaria
                </Link>
              </li>
              <li>
                <Link href="/#donaciones" className="hover:text-cyan-400 transition-colors">
                  Donación de Insumos
                </Link>
              </li>
              <li>
                <Link href="/#eventos" className="hover:text-cyan-400 transition-colors">
                  Eventos Benéficos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Local */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-base">
              Río Cuarto, Córdoba
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Parque Sarmiento, Plaza Roca y barrios</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contacto@callejerosrioiv.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guardia Comunitaria: (358) 400-0000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Callejeros Río IV. Proyecto Comunitario Abierto.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>para la comunidad de Río Cuarto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
