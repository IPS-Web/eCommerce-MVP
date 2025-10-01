'use server';

/**
 * @fileOverview Generates a concise summary of order details using AI.
 *
 * - summarizeOrder - A function that summarizes order details.
 * - OrderSummaryInput - The input type for the summarizeOrder function.
 * - OrderSummaryOutput - The return type for the summarizeOrder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderSummaryInputSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().describe('Name of the product'),
      quantity: z.number().describe('Quantity of the product'),
      price: z.number().describe('Price of the product'),
    })
  ).describe('List of items in the order'),
  shippingAddress: z.string().describe('Shipping address for the order'),
  paymentMethod: z.string().describe('Payment method used for the order'),
  orderTotal: z.number().describe('Total amount of the order'),
});
export type OrderSummaryInput = z.infer<typeof OrderSummaryInputSchema>;

const OrderSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the order details.'),
});
export type OrderSummaryOutput = z.infer<typeof OrderSummaryOutputSchema>;

export async function summarizeOrder(input: OrderSummaryInput): Promise<OrderSummaryOutput> {
  return orderSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'orderSummaryPrompt',
  input: {schema: OrderSummaryInputSchema},
  output: {schema: OrderSummaryOutputSchema},
  prompt: `You are an AI assistant that summarizes order details for users.

  Summarize the following order information in a concise and user-friendly manner.
  Include the key details such as the number of items, total amount, shipping address and payment method.

  Items:{{#each items}}{{{quantity}}} x {{{name}}} at ${{{price}}} each {{/each}}
  Shipping Address: {{{shippingAddress}}}
  Payment Method: {{{paymentMethod}}}
  Order Total: ${{{orderTotal}}}
`,
});

const orderSummaryFlow = ai.defineFlow(
  {
    name: 'orderSummaryFlow',
    inputSchema: OrderSummaryInputSchema,
    outputSchema: OrderSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
