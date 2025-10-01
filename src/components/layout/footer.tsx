'use client';

import { useSettings } from "@/hooks/use-settings";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useSettings();
  const t = translations[language];

    return (
      <footer className="bg-card border-t">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} eCommerce MVP. {t.footer.rights}
          </p>
        </div>
      </footer>
    );
  }
  