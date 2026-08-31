export const formatCOP = (amount: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

// "3163713928" -> "316 3713928"
export const formatPhoneCO = (digits: string): string =>
  digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits;
