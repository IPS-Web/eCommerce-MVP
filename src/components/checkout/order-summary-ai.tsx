'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { summarizeOrder, type OrderSummaryInput } from '@/ai/flows/order-summarization';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';

function SummarySkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    )
}

export default function OrderSummaryAI() {
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const { language } = useSettings();
  const t = translations[language];

  useEffect(() => {
    const orderDataString = searchParams.get('order');

    if (orderDataString) {
      try {
        const orderData: OrderSummaryInput = JSON.parse(orderDataString);
        startTransition(async () => {
          try {
            const result = await summarizeOrder(orderData);
            setSummary(result.summary);
          } catch (e) {
            console.error(e);
            setError(t.ai.summaryError);
          }
        });
      } catch (e) {
        console.error(e);
        setError(t.ai.readError);
      }
    } else {
        setError(t.ai.noData);
    }
  }, [searchParams, t]);

  if (isPending) {
    return <SummarySkeleton />;
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
  }

  return <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>;
}
