'use client';

import Link from 'next/link';
import { Package2, ShoppingCart, Globe, DollarSign, Euro } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

export default function Header() {
  const { cartCount } = useCart();
  const { language, setLanguage, currency, setCurrency } = useSettings();
  const t = translations[language];
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      const prevCartCount = parseInt(localStorage.getItem('cartCount') || '0', 10);
      if (cartCount > prevCartCount) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300); // Animation duration
        return () => clearTimeout(timer);
      }
    }
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);


  const navLinks = [
    { href: '/', label: t.header.home },
    { href: '/products', label: t.header.products },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">eCommerce MVP</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-foreground/60 transition-colors hover:text-foreground',
                pathname === link.href && 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Select Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t.header.language}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'es')}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {currency === 'usd' ? <DollarSign className="h-5 w-5" /> : <Euro className="h-5 w-5" />}
                <span className="sr-only">Select Currency</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t.header.currency}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as 'usd' | 'eur')}>
                <DropdownMenuRadioItem value="usd">USD ($)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="eur">EUR (€)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className={cn(
                    "absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs transition-transform",
                    isAnimating && "animate-bounce"
                  )}
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
