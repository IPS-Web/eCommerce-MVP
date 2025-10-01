'use client';

import type { Product } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import ProductCard from './product-card';
import { Search } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

type ProductTranslations = keyof (typeof translations)['en']['products'];
type CategoryTranslations = keyof (typeof translations)['en']['categories'];

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('relevance');
  const { language } = useSettings();
  const t = translations[language];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const productName = t.products[product.name as ProductTranslations] || product.name;
      const productDescription = t.products[product.description as ProductTranslations] || product.description;
      const productCategory = t.categories[product.category.toLowerCase() as CategoryTranslations] || product.category;
      
      const searchableText = `${productName} ${productDescription} ${productCategory}`.toLowerCase();
      
      return searchableText.includes(searchTerm.toLowerCase());
    });

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category));
    }

    switch (sortOption) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, searchTerm, selectedCategories, sortOption, t]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="sticky top-20">
          <h2 className="text-2xl font-bold mb-4 font-headline">{t.products.filters}</h2>
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.products.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Accordion type="single" collapsible defaultValue="category" className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="text-lg font-semibold">{t.products.category}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {t.categories[category.toLowerCase() as CategoryTranslations] || category}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </aside>

      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{filteredAndSortedProducts.length} {t.products.results}</p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.products.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">{t.products.relevance}</SelectItem>
              <SelectItem value="price-asc">{t.products.priceAsc}</SelectItem>
              <SelectItem value="price-desc">{t.products.priceDesc}</SelectItem>
              <SelectItem value="rating">{t.products.topRated}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold">{t.products.noProducts}</h3>
            <p className="text-muted-foreground mt-2">{t.products.adjustFilters}</p>
          </div>
        )}
      </main>
    </div>
  );
}
