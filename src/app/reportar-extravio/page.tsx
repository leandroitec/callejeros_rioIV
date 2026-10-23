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
import { Button } from '@/components/ui/Button';

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
    if (isSubmitting) return; // Prevención del Problema del Alien (doble click por impaciencia)

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
        {/* Selector de Tipo de Reporte (Touch Target Gigante h-14 / min-h-[56px]) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Tipo de Situación
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setReportType('EXTRAVIO')}
              className={`p-3.5 rounded-2xl font-heading font-extrabold text-sm sm:text-base text-center border-2 transition-all min-h-[56px] h-14 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 dark:focus-visible:ring-offset-slate-900 active:scale-98 disabled:opacity-70 ${
                reportType === 'EXTRAVIO'
                  ? 'bg-red-600 text-white border-red-600 shadow-md scale-101'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-400 dark:border-slate-500 hover:border-slate-600'
              }`}
              aria-pressed={reportType === 'EXTRAVIO'}
            >
              <span>🚨 Perdí mi Mascota</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setReportType('AVISTAMIENTO')}
              className={`p-3.5 rounded-2xl font-heading font-extrabold text-sm sm:text-base text-center border-2 transition-all min-h-[56px] h-14 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-offset-slate-900 active:scale-98 disabled:opacity-70 ${
                reportType === 'AVISTAMIENTO'
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md scale-101'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-400 dark:border-slate-500 hover:border-slate-600'
              }`}
              aria-pressed={reportType === 'AVISTAMIENTO'}
            >
              <span>👀 Vi un Animal Perdido</span>
            </button>
          </div>
        </div>

        {/* Carga de Imagen con Foco Nuclear DCU (Elemento visualmente más grande del formulario para el Rescatista Ocasional) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Foto del Animal</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold">(Dato más crucial)</span>
            </label>
            {imagePreview && (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                ✓ Foto cargada
              </span>
            )}
          </div>

          {imagePreview ? (
            /* Previsualización que reemplaza exactamente el contenedor de subida (Mapeo Natural 1:1) */
            <div className="relative w-full h-72 sm:h-84 rounded-3xl overflow-hidden border-3 border-orange-500 shadow-lg group">
              <img
                src={imagePreview}
                alt="Vista previa de la foto del animal extraviado"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 flex items-end justify-between p-4 sm:p-6">
                <label
                  htmlFor="pet-image"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 text-sm font-extrabold shadow-lg cursor-pointer hover:bg-slate-100 hover:scale-105 transition-all min-h-[52px] focus-within:ring-2 focus-within:ring-orange-500"
                >
                  <Camera className="w-5 h-5 text-orange-600" />
                  <span>Cambiar Foto</span>
                  <input
                    id="pet-image"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    disabled={isSubmitting}
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setImagePreview(null)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold shadow-lg transition-all hover:scale-105 min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
                  aria-label="Quitar foto seleccionada"
                >
                  <X className="w-5 h-5" />
                  <span>Quitar</span>
                </button>
              </div>
            </div>
          ) : (
            /* Área inicial de carga: elemento visualmente más grande del formulario para uso rápido con una sola mano bajo el sol */
            <label
              htmlFor="pet-image"
              className="relative flex flex-col items-center justify-center p-8 sm:p-12 min-h-[290px] sm:min-h-[330px] border-3 border-dashed border-orange-400 dark:border-orange-500 bg-orange-50/70 dark:bg-orange-950/25 hover:bg-orange-100/70 dark:hover:bg-orange-950/40 rounded-3xl cursor-pointer transition-all group focus-within:ring-4 focus-within:ring-orange-500 active:scale-[0.99] text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-orange-500 text-white shadow-xl shadow-orange-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <span className="block text-lg sm:text-xl font-heading font-extrabold text-slate-900 dark:text-white">
                TOCÁ ACÁ PARA TOMAR FOTO O SUBIR
              </span>
              <span className="block text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-sm mt-1.5 leading-relaxed">
                La foto es el dato más crucial para que la comunidad de Río Cuarto reconozca al animal al instante.
              </span>
              <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-200/90 dark:bg-orange-900/60 text-orange-900 dark:text-orange-100 text-xs font-bold">
                <span>📸 Cámara directa o galería</span>
              </div>
              <input
                id="pet-image"
                type="file"
                accept="image/*"
                capture="environment"
                disabled={isSubmitting}
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          )}
        </div>

        {/* Nombre del animal o descripción rápida (Touch target gigante h-14, borde de alto contraste border-slate-400) */}
        <div>
          <label
            htmlFor="pet-name"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Nombre de la Mascota / Referencia
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              id="pet-name"
              name="petName"
              type="text"
              required
              disabled={isSubmitting}
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
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all min-h-[56px] h-14 ${
                touched.petName && errors.petName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
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

        {/* Barrio de Río Cuarto (Touch target gigante h-14, borde de alto contraste border-slate-400) */}
        <div>
          <label
            htmlFor="neighborhood"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Barrio / Zona de Río Cuarto
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <select
              id="neighborhood"
              name="neighborhood"
              required
              disabled={isSubmitting}
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
              className={`w-full pl-12 pr-11 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white focus:outline-none transition-all min-h-[56px] h-14 appearance-none cursor-pointer ${
                touched.neighborhood && errors.neighborhood
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
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
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
          </div>
          {touched.neighborhood && errors.neighborhood && (
            <p id="neighborhood-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.neighborhood}</span>
            </p>
          )}
        </div>

        {/* Teléfono de Contacto (Touch target gigante h-14, borde de alto contraste border-slate-400) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Teléfono de Contacto (WhatsApp)
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              id="contact-phone"
              name="contactPhone"
              type="tel"
              autoComplete="tel"
              required
              disabled={isSubmitting}
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
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all min-h-[56px] h-14 ${
                touched.contactPhone && errors.contactPhone
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                  : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
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

        {/* Descripción Breve (Borde de alto contraste border-slate-400) */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Descripción y Rasgos Particulares
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            disabled={isSubmitting}
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
            className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all min-h-[110px] ${
              touched.description && errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 dark:border-red-500'
                : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'
            }`}
          />
          {touched.description && errors.description && (
            <p id="description-error" role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Botón de Envío y Botón Cancelar (Prevención de Errores DCU / Problema del Alien) */}
        <div className="space-y-4 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            loadingText="Publicando reporte en Río Cuarto..."
            className="w-full text-base sm:text-lg uppercase tracking-wider"
          >
            Publicar Reporte de Extravío
          </Button>

          {/* Botón Secundario Ghost (Separado para evitar toques accidentales con una sola mano) */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl px-6 py-3 transition-colors min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
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
