'use client';
import { CartProvider } from "./cart-context";
import { SettingsProvider } from "./settings-context";

// A single provider to wrap all other providers
export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <SettingsProvider>
                {children}
            </SettingsProvider>
        </CartProvider>
    )
}
