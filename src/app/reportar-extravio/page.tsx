'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Camera,
  MapPin,
  Phone,
  User,
  ChevronLeft,
  ChevronDown,
  AlertCircle,
  X,
} from 'lucide-react';
import { SuccessModal } from '@/components/modals/SuccessModal';

export default function ReportarExtravioPage() {
  const [reportType, setReportType] = useState<'EXTRAVIO' | 'AVISTAMIENTO'>('EXTRAVIO');
  const [petName, setPetName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [touched, setTouched] = useState({
    petName: false,
    neighborhood: false,
    contactPhone: false,
    description: false,
  });
  const [errors, setErrors] = useState<{
    petName?: string;
    neighborhood?: string;
    contactPhone?: string;
    description?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const neighborhoods = [
    'Parque Sarmiento',
    'Banda Norte',
    'Centro / Plaza Roca',
    'Alberdi',
    'Castelli',
    'Bimaco',
    'Río Limay',
    'Golf Club',
    'Fénix',
    'Universidad / Ruta 36',
    'Otro barrio de Río Cuarto',
  ];

  const validatePetName = (val: string) => {
    if (!val.trim()) return 'El nombre o referencia del animal es obligatorio.';
    if (val.trim().length < 2) return 'Ingresá al menos 2 caracteres.';
    return undefined;
  };

  const validateNeighborhood = (val: string) => {
    if (!val.trim()) return 'Por favor, seleccioná el barrio de Río Cuarto donde ocurrió.';
    return undefined;
  };

  const validateContactPhone = (val: string) => {
    if (!val.trim()) return 'El teléfono de contacto es obligatorio.';
    const digitsOnly = val.replace(/\D/g, '');
    if (digitsOnly.length < 7) return 'Ingresá un número de teléfono válido (ej: 358 154 123456).';
    return undefined;
  };

  const validateDescription = (val: string) => {
    if (!val.trim()) return 'La descripción es obligatoria.';
    if (val.trim().length < 10) return 'Por favor detallá al menos 10 caracteres (color, collar, etc.).';
    return undefined;
  };

  const handleBlur = (field: 'petName' | 'neighborhood' | 'contactPhone' | 'description') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'petName') setErrors((prev) => ({ ...prev, petName: validatePetName(petName) }));
    else if (field === 'neighborhood') setErrors((prev) => ({ ...prev, neighborhood: validateNeighborhood(neighborhood) }));
    else if (field === 'contactPhone') setErrors((prev) => ({ ...prev, contactPhone: validateContactPhone(contactPhone) }));
    else if (field === 'description') setErrors((prev) => ({ ...prev, description: validateDescription(description) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameErr = validatePetName(petName);
    const neighErr = validateNeighborhood(neighborhood);
    const phoneErr = validateContactPhone(contactPhone);
    const descErr = validateDescription(description);

    setTouched({
      petName: true,
      neighborhood: true,
      contactPhone: true,
      description: true,
    });
    setErrors({
      petName: nameErr,
      neighborhood: neighErr,
      contactPhone: phoneErr,
      description: descErr,
    });

    if (nameErr || neighErr || phoneErr || descErr) {
      if (nameErr) document.getElementById('pet-name')?.focus();
      else if (neighErr) document.getElementById('neighborhood')?.focus();
      else if (phoneErr) document.getElementById('contact-phone')?.focus();
      else if (descErr) document.getElementById('description')?.focus();
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
    setPetName('');
    setNeighborhood('');
    setContactPhone('');
    setDescription('');
    setTouched({
      petName: false,
      neighborhood: false,
      contactPhone: false,
      description: false,
    });
    setImagePreview(null);
  };

  return (
    <section aria-labelledby="report-title" className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Barra superior con volver */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
          aria-label="Volver a la portada"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            Alerta Comunitaria
          </span>
          <h1 id="report-title" className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Reportar Extravío
          </h1>
        </div>
      </div>

      {/* Banner de ayuda rápida mobile */}
      <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-red-900 dark:text-red-200 leading-relaxed">
          <strong>¿Perdiste a tu mascota o viste un animal en peligro?</strong> Completá este formulario en 1 minuto. Se difundirá de inmediato en las redes y mapa de Río Cuarto.
        </p>
      </div>

      {/* Formulario Asíncrono */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-6"
      >
        {/* Selector de Tipo de Reporte (Gestalt: Proximidad) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Tipo de Situación
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setReportType('EXTRAVIO')}
              className={`p-3 rounded-2xl font-heading font-bold text-xs sm:text-sm text-center border-2 transition-all min-h-[48px] flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 dark:focus-visible:ring-offset-slate-900 ${
                reportType === 'EXTRAVIO'
                  ? 'bg-red-600 text-white border-red-600 shadow-md scale-102'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
              aria-pressed={reportType === 'EXTRAVIO'}
            >
              <span>🚨 Perdí mi Mascota</span>
            </button>

            <button
              type="button"
              onClick={() => setReportType('AVISTAMIENTO')}
              className={`p-3 rounded-2xl font-heading font-bold text-xs sm:text-sm text-center border-2 transition-all min-h-[48px] flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-offset-slate-900 ${
                reportType === 'AVISTAMIENTO'
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md scale-102'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
              aria-pressed={reportType === 'AVISTAMIENTO'}
            >
              <span>👀 Vi un Animal Perdido</span>
            </button>
          </div>
        </div>

        {/* Nombre del animal o descripción rápida (Gestalt: Proximidad directa label-input) */}
        <div>
          <label
            htmlFor="pet-name"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
          >
            Nombre de la Mascota / Referencia
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="pet-name"
              name="petName"
              type="text"
              required
              aria-required="true"
              aria-invalid={touched.petName && !!errors.petName ? 'true' : 'false'}
              aria-describedby={touched.petName && errors.petName ? 'pet-name-error' : undefined}
              value={petName}
              onBlur={() => handleBlur('petName')}
              onChange={(e) => {
                setPetName(e.target.value);
                if (touched.petName) {
                  setErrors((prev) => ({ ...prev, petName: validatePetName(e.target.value) }));
                }
              }}
              placeholder="Ej: Manchita, o 'Perro negro con collar rojo'"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[48px] ${
                touched.petName && errors.petName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            />
          </div>
          {touched.petName && errors.petName && (
            <p id="pet-name-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.petName}</span>
            </p>
          )}
        </div>

        {/* Barrio de Río Cuarto (Gestalt: Proximidad directa label-select) */}
        <div>
          <label
            htmlFor="neighborhood"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
          >
            Barrio / Zona de Río Cuarto
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="neighborhood"
              name="neighborhood"
              required
              aria-required="true"
              aria-invalid={touched.neighborhood && !!errors.neighborhood ? 'true' : 'false'}
              aria-describedby={touched.neighborhood && errors.neighborhood ? 'neighborhood-error' : undefined}
              value={neighborhood}
              onBlur={() => handleBlur('neighborhood')}
              onChange={(e) => {
                setNeighborhood(e.target.value);
                if (touched.neighborhood) {
                  setErrors((prev) => ({ ...prev, neighborhood: validateNeighborhood(e.target.value) }));
                }
              }}
              className={`w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white focus:outline-none transition-all min-h-[48px] appearance-none cursor-pointer ${
                touched.neighborhood && errors.neighborhood
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            >
              <option value="" disabled>
                Seleccionar barrio de Río Cuarto...
              </option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {touched.neighborhood && errors.neighborhood && (
            <p id="neighborhood-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.neighborhood}</span>
            </p>
          )}
        </div>

        {/* Teléfono de Contacto (Gestalt: Proximidad directa label-input) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
          >
            Teléfono de Contacto (WhatsApp)
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="contact-phone"
              name="contactPhone"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={touched.contactPhone && !!errors.contactPhone ? 'true' : 'false'}
              aria-describedby={touched.contactPhone && errors.contactPhone ? 'contact-phone-error' : undefined}
              value={contactPhone}
              onBlur={() => handleBlur('contactPhone')}
              onChange={(e) => {
                setContactPhone(e.target.value);
                if (touched.contactPhone) {
                  setErrors((prev) => ({ ...prev, contactPhone: validateContactPhone(e.target.value) }));
                }
              }}
              placeholder="Ej: 358 154 123456"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[48px] ${
                touched.contactPhone && errors.contactPhone
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
              }`}
            />
          </div>
          {touched.contactPhone && errors.contactPhone && (
            <p id="contact-phone-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.contactPhone}</span>
            </p>
          )}
        </div>

        {/* Carga de Imagen con Mapeo Natural 1:1 (Gestalt: Proximidad) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Foto del Animal (Crucial para reconocimiento)
            </label>
            {imagePreview && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Foto cargada
              </span>
            )}
          </div>

          {imagePreview ? (
            /* Previsualización que reemplaza exactamente el contenedor de subida (Mapeo Natural) */
            <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-orange-500 shadow-md group">
              <img
                src={imagePreview}
                alt="Vista previa de la foto del animal extraviado"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 flex items-end justify-between p-4">
                <label
                  htmlFor="pet-image"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-bold shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all focus-within:ring-2 focus-within:ring-orange-500"
                >
                  <Camera className="w-4 h-4 text-orange-600" />
                  <span>Cambiar Foto</span>
                  <input
                    id="pet-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold shadow-md transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  aria-label="Quitar foto seleccionada"
                >
                  <X className="w-4 h-4" />
                  <span>Quitar</span>
                </button>
              </div>
            </div>
          ) : (
            /* Área inicial de carga con el mismo tamaño espacial */
            <label
              htmlFor="pet-image"
              className="relative flex flex-col items-center justify-center p-8 sm:p-10 h-64 sm:h-72 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-orange-500 dark:hover:border-orange-500 transition-all group focus-within:ring-2 focus-within:ring-orange-600"
            >
              <div className="flex flex-col items-center gap-3 text-center text-slate-500 dark:text-slate-400">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center group-hover:scale-110 shadow-sm transition-transform">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                    Tocá para tomar una foto o subir desde tu celular
                  </span>
                  <span className="block text-xs text-slate-400 mt-1">Formatos JPG o PNG hasta 5MB</span>
                </div>
              </div>
              <input
                id="pet-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          )}
        </div>

        {/* Descripción Breve (Gestalt: Proximidad directa label-textarea) */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
          >
            Descripción y Rasgos Particulares
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            aria-required="true"
            aria-invalid={touched.description && !!errors.description ? 'true' : 'false'}
            aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
            value={description}
            onBlur={() => handleBlur('description')}
            onChange={(e) => {
              setDescription(e.target.value);
              if (touched.description) {
                setErrors((prev) => ({ ...prev, description: validateDescription(e.target.value) }));
              }
            }}
            placeholder="Color de pelaje, tamaño, si lleva collar o placa, comportamiento tímido/asustadizo, etc."
            className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
              touched.description && errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500'
            }`}
          />
          {touched.description && errors.description && (
            <p id="description-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Botón de Envío y Botón Cancelar (Detector de Frustraciones: Jerarquía Visual y Separación) */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl font-heading font-extrabold text-base bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:scale-95 text-white shadow-md shadow-orange-500/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publicando reporte en Río Cuarto...</span>
              </>
            ) : (
              <span>Publicar Reporte de Extravío</span>
            )}
          </button>

          {/* Botón Secundario Ghost (Separado para evitar toques accidentales) */}
          <div className="text-center pt-1">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-xl px-4 py-2.5 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Cancelar y volver al inicio
            </Link>
          </div>
        </div>
      </form>

      {/* MODAL DE ÉXITO SUPERPUESTO (Figma: Modal de Confirmación) */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Reporte publicado con éxito!"
        message="Reporte publicado con éxito. ¡Gracias por ayudar a los callejeritos de Río Cuarto! Ya se encuentra visible para toda la comunidad."
        actionText="Ver Catálogo de Adopciones"
        actionHref="/adopciones"
      />
    </section>
  );
}
