'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { language } = useSettings();
  const t = translations[language];

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          className="h-10 w-16 text-center border-0 focus-visible:ring-0"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
          aria-label={t.products.quantity}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        size="lg"
        onClick={handleAddToCart}
        className="flex-grow bg-accent hover:bg-accent/90"
        disabled={product.availability !== 'In Stock'}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.availability === 'In Stock' ? t.products.addToCart : t.products.outOfStock}
      </Button>
    </div>
  );
}
