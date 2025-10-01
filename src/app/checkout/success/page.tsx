'use client';

import { Suspense } from 'react';
import OrderSummaryAI from '@/components/checkout/order-summary-ai';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

function SummarySkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}

export default function CheckoutSuccessPage() {
  const { language } = useSettings();
  const t = translations[language];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16 text-center">
      <Card className="bg-card/80">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent mb-4">
            <CheckCircle className="h-10 w-10 text-accent-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">{t.success.title}</CardTitle>
          <CardDescription className="text-lg">
            {t.success.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left p-6 pt-0">
            <div className="bg-background/50 p-6 rounded-lg border">
                <Suspense fallback={<SummarySkeleton />}>
                    <OrderSummaryAI />
                </Suspense>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
