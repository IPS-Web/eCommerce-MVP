'use client';

import Image from 'next/image';
import Link from 'next/link';

import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/product-card';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const { language } = useSettings();
  const t = translations[language];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] md:h-[60vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
            {t.home.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            {t.home.hero.subtitle}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">{t.home.hero.cta}</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">{t.home.featuredProducts}</h2 >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
