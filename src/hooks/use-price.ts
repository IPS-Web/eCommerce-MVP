import { useSettings } from './use-settings';

const CONVERSION_RATES = {
  usd: 1,
  eur: 0.93,
};

export const usePrice = () => {
  const { currency, language } = useSettings();

  const formatPrice = (priceInUsd: number) => {
    const rate = CONVERSION_RATES[currency] || 1;
    const price = priceInUsd * rate;

    return new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return { formatPrice };
};
