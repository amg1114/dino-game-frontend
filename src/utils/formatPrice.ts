/**
 * Formats a given price as a string in Colombian Peso (COP) currency format.
 *
 * @param price - The numeric value of the price to format.
 * @returns A string representing the formatted price. If the price is 0, it returns "Gratis".
 */
export function formatPrice(price: number, useFreeLabel = true): string {
  if (price === 0 && useFreeLabel) {
    return 'Gratis';
  }
  const formattedPrice = price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
  return formattedPrice;
}
