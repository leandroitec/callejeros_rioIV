'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronLeft, Check, Plus, Heart } from 'lucide-react';
import { SuccessModal } from '@/components/modals/SuccessModal';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function TiendaPage() {
  const [cartCount, setCartCount] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState('');

  const products: Product[] = [
    {
      id: 'prod-1',
      name: 'Chapita Identificatoria con QR',
      price: '$4.500',
      category: 'Seguridad',
      description: 'Acero inoxidable grabado con código QR que abre la ficha de tu mascota al escanearse.',
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-2',
      name: 'Correa Reflectiva de Paseo',
      price: '$8.200',
      category: 'Paseo',
      description: 'Cinta reforzada de 2 metros con costuras reflectivas para paseos nocturnos seguros.',
      imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-3',
      name: 'Remera Oficial Callejeros Río IV',
      price: '$14.000',
      category: 'Merchandising',
      description: 'Algodón peinado premium 100% con ilustración serigráfica de perro y gato en corazón.',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-4',
      name: 'Colchón Térmico Antidesgarro',
      price: '$18.500',
      category: 'Descanso',
      description: 'Funda impermeable lavable y relleno de vellón siliconado de alta densidad.',
      imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleAddToCart = (productName: string) => {
    setCartCount(cartCount + 1);
    setLastAddedProduct(productName);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Barra superior */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
            aria-label="Volver al inicio"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Fondos Benéficos
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Tienda Solidaria
            </h1>
          </div>
        </div>

        {/* Carrito de compras (Modelo Mental: Ícono Universal + Etiqueta Explícita) */}
        <div className="relative p-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Carrito: {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
          </span>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl">
            100% de las ganancias se destinan a rescates
          </h2>
          <p className="text-xs sm:text-sm text-orange-100">
            Comprando productos para tu compañero, financiás vacunas y castraciones comunitarias en Río Cuarto.
          </p>
        </div>
      </div>

      {/* Grilla de Productos con Affordance Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                {product.category}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {product.description}
                </p>
                <div className="pt-2 text-xl font-extrabold text-orange-600 dark:text-orange-400 font-heading">
                  {product.price}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(product.name)}
                className="w-full btn-primary min-h-[48px] text-xs font-heading font-bold gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir al Carrito</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Producto agregado al carrito!"
        message={`"${lastAddedProduct}" fue añadido al carrito solidario. ¡Gracias por colaborar con los animales de Río Cuarto!`}
        actionText="Seguir Comprando"
        actionHref="/tienda"
      />
    </div>
  );
}
