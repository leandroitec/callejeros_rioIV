'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronLeft, Plus, Minus, Trash2, X, Check, Heart } from 'lucide-react';
import { SuccessModal } from '@/components/organisms/SuccessModal';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import { Button } from '@/components/atoms/Button';

interface Product {
  id: string;
  name: string;
  priceNum: number;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function TiendaPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState('');

  const products: Product[] = [
    {
      id: 'prod-1',
      name: 'Chapita Identificatoria con QR',
      priceNum: 4500,
      price: '$4.500',
      category: 'Seguridad',
      description: 'Acero inoxidable grabado con código QR que abre la ficha de tu mascota al escanearse.',
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-2',
      name: 'Correa Reflectiva de Paseo',
      priceNum: 8200,
      price: '$8.200',
      category: 'Paseo',
      description: 'Cinta reforzada de 2 metros con costuras reflectivas para paseos nocturnos seguros.',
      imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-3',
      name: 'Remera Oficial Callejeros Río IV',
      priceNum: 14000,
      price: '$14.000',
      category: 'Merchandising',
      description: 'Algodón peinado premium 100% con ilustración serigráfica de perro y gato en corazón.',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'prod-4',
      name: 'Colchón Térmico Antidesgarro',
      priceNum: 18500,
      price: '$18.500',
      category: 'Descanso',
      description: 'Funda impermeable lavable y relleno de vellón siliconado de alta densidad.',
      imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.product.priceNum * item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setLastAddedProduct(product.name);
    setIsSuccessModalOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setIsCheckoutSuccessOpen(true);
    setCartItems([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Migas de Pan (Breadcrumbs - Arquitectura de Información) */}
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Cómo Ayudar', href: '/#donaciones' },
          { label: 'Tienda Solidaria' },
        ]}
      />

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

        {/* Carrito de compras Interactivo (Botón accesible con badge) */}
        <button
          type="button"
          onClick={() => setIsCartModalOpen(true)}
          className="relative p-3 px-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 min-h-[48px] active:scale-95"
          aria-label={`Ver carrito solidario con ${totalCartCount} artículos`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Carrito ({totalCartCount})
          </span>
        </button>
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
                onClick={() => handleAddToCart(product)}
                className="w-full btn-primary min-h-[48px] text-xs font-heading font-bold gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir al Carrito</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* MODAL DEL CARRITO SOLIDARIO INTERACTIVO */}
      {isCartModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
                <h2 id="cart-title" className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                  Carrito Solidario
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartModalOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/60 rounded-full flex items-center justify-center mx-auto text-orange-600">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Tu carrito solidario todavía está vacío
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Agregá productos como chapitas, correas o remeras para colaborar con los rescates en Río Cuarto.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                        {item.product.name}
                      </h4>
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                        ${(item.product.priceNum * item.quantity).toLocaleString('es-AR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          aria-label={`Restar una unidad de ${item.product.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          aria-label={`Sumar una unidad de ${item.product.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        aria-label={`Eliminar ${item.product.name} del carrito`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-base font-extrabold text-slate-900 dark:text-white">
                  <span>Total Solidario:</span>
                  <span className="text-xl text-orange-600 dark:text-orange-400 font-heading">
                    ${totalCartPrice.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Coordinamos el pago (transferencia o efectivo) y entrega en punto céntrico de Río Cuarto o envío a domicilio.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCheckout}
                    className="flex-1 uppercase tracking-wider text-xs"
                  >
                    Confirmar Pedido Solidario
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCartItems([])}
                    className="text-xs"
                  >
                    Vaciar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de agregado al carrito */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Producto agregado al carrito!"
        message={`"${lastAddedProduct}" fue añadido al carrito solidario. ¡Gracias por colaborar con los animales de Río Cuarto!`}
        actionText="Ver Mi Carrito"
        actionHref="#cart"
      />

      {/* Modal de confirmación de pedido finalizado */}
      <SuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        title="¡Muchas gracias por tu compra solidaria!"
        message="Registramos tu pedido con éxito. Nuestro equipo voluntario te contactará por WhatsApp en las próximas horas para coordinar el retiro o envío en Río Cuarto."
        actionText="Volver a la Tienda"
        actionHref="/tienda"
      />
    </div>
  );
}
