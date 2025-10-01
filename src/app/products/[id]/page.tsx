'use client';

import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AddToCart from '@/components/products/add-to-cart';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';
import { usePrice } from '@/hooks/use-price';
import { useParams } from 'next/navigation';

type ProductTranslations = keyof (typeof translations)['en']['products'];

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { language } = useSettings();
  const t = translations[language];
  const { formatPrice } = usePrice();
  
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    // In a real app, this should probably use the notFound() function from next/navigation
    // but that makes it a server component, and we need client for hooks.
    return <div>Product not found</div>;
  }

  const productImage = PlaceHolderImages.find((img) => img.id === product.image);
  const productName = t.products[product.name as ProductTranslations] || product.name;
  const productDescription = t.products[product.description as ProductTranslations] || product.description;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-w-1 aspect-h-1">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={productName}
              data-ai-hint={productImage.imageHint}
              width={800}
              height={800}
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          )}
        </div>
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2">{productName}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} {t.products.reviews})</span>
            <Separator orientation="vertical" className="h-6" />
            <Badge variant={product.availability === 'In Stock' ? 'default' : 'destructive'} className="bg-accent text-accent-foreground">
              {product.availability === 'In Stock' ? t.products.addToCart : t.products.outOfStock}
            </Badge>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">{productDescription}</p>
          <p className="text-4xl font-bold text-primary mt-6">{formatPrice(product.price)}</p>
          
          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold font-headline mb-4">{t.products.specifications}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
