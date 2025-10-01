'use client';

import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { usePrice } from '@/hooks/use-price';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

interface ProductCardProps {
  product: Product;
}

type ProductTranslations = keyof (typeof translations)['en']['products'];

export default function ProductCard({ product }: ProductCardProps) {
  const productImage = PlaceHolderImages.find((img) => img.id === product.image);
  const { formatPrice } = usePrice();
  const { language } = useSettings();
  const t = translations[language];

  const productName = t.products[product.name as ProductTranslations] || product.name;
  const productDescription = t.products[product.description as ProductTranslations] || product.description;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg h-full">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-w-3 aspect-h-2 w-full">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={productName}
                data-ai-hint={productImage.imageHint}
                width={600}
                height={400}
                className="object-cover"
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Badge variant="secondary" className="mb-2 w-fit">{product.category}</Badge>
        <CardTitle className="text-lg leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {productName}
          </Link>
        </CardTitle>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">
          {productDescription}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviews} {t.products.reviews})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
        <Button asChild variant="outline">
          <Link href={`/products/${product.id}`}>{t.products.viewDetails}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
