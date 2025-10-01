'use client';

import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import type { OrderSummaryInput } from '@/ai/flows/order-summarization';
import { useSettings } from '@/hooks/use-settings';
import { translations } from '@/lib/translations';
import { usePrice } from '@/hooks/use-price';

type ProductTranslations = keyof (typeof translations)['en']['products'];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  city: z.string().min(2, 'City must be at least 2 characters.'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters.'),
  country: z.string().min(2, 'Country is required.'),
  paymentMethod: z.enum(['card', 'paypal'], { required_error: 'Please select a payment method.' }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { language } = useSettings();
  const t = translations[language];
  const { formatPrice } = usePrice();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/products');
    }
  }, [cartItems, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      zip: '',
      country: '',
      paymentMethod: 'card',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const orderDetails: OrderSummaryInput = {
      items: cartItems.map(item => {
        const itemName = t.products[item.name as ProductTranslations] || item.name;
        return {
          name: itemName,
          quantity: item.quantity,
          price: item.price,
        }
      }),
      shippingAddress: `${values.name}, ${values.address}, ${values.city}, ${values.zip}, ${values.country}`,
      paymentMethod: values.paymentMethod === 'card' ? 'Credit Card' : 'PayPal',
      orderTotal: cartTotal,
    };
    
    clearCart();
    router.push(`/checkout/success?order=${encodeURIComponent(JSON.stringify(orderDetails))}`);
  }

  if (cartItems.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">{t.checkout.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader><CardTitle>{t.checkout.shippingAddress}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>{t.checkout.fullName}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>{t.checkout.address}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>{t.checkout.city}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="zip" render={({ field }) => (
                      <FormItem><FormLabel>{t.checkout.zip}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem><FormLabel>{t.checkout.country}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>{t.checkout.paymentMethod}</CardTitle></CardHeader>
                <CardContent>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="card" /></FormControl>
                            <FormLabel className="font-normal">{t.checkout.creditCard}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="paypal" /></FormControl>
                            <FormLabel className="font-normal">{t.checkout.paypal}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t.checkout.placingOrder : `${t.checkout.placeOrder}: ${formatPrice(cartTotal)}`}
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader><CardTitle>{t.checkout.yourOrder}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => {
                  const itemName = t.products[item.name as ProductTranslations] || item.name;
                  return (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{itemName} <span className="text-muted-foreground">x{item.quantity}</span></span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  )
                })}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t.cart.total}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
