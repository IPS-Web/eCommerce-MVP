'use client';

import { products, categories } from '@/lib/data';
import ProductCatalog from '@/components/products/product-catalog';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

export default function ProductsPage() {
  const { language } = useSettings();
  const t = translations[language];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">{t.products.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t.products.subtitle}
        </p>
      </header>
      <ProductCatalog products={products} categories={categories} />
    </div>
  );
}
