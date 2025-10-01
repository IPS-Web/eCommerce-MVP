'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';
import { usePrice } from '@/hooks/use-price';

type ProductTranslations = keyof (typeof translations)['en']['products'];

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const { language } = useSettings();
  const t = translations[language];
  const { formatPrice } = usePrice();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">{t.cart.title}</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">{t.cart.empty.title}</h2>
          <p className="mt-2 text-muted-foreground">{t.cart.empty.subtitle}</p>
          <Button asChild className="mt-6">
            <Link href="/products">{t.cart.empty.cta}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemImage = PlaceHolderImages.find((img) => img.id === item.image);
              const itemName = t.products[item.name as ProductTranslations] || item.name;
              return (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden">
                    {itemImage && (
                      <Image
                        src={itemImage.imageUrl}
                        alt={itemName}
                        data-ai-hint={itemImage.imageHint}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow ml-4">
                    <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">{itemName}</Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-lg font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" value={item.quantity} readOnly className="h-8 w-12 text-center p-0 border-0 focus-visible:ring-0" />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">{t.cart.removeItem}</span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t.cart.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal} ({cartCount} {t.cart.items})</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cart.shipping}</span>
                  <span>{t.cart.free}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t.cart.total}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/checkout">{t.cart.checkout}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
