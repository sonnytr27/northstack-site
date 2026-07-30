/** Shared money formatting so the document, the extracted fields and the CSV
 *  can never disagree about a number. */

const AMOUNT = new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "£1,089.00" — display only. */
export function formatMoney(value: number, currency: string): string {
  return `${currency}${AMOUNT.format(value)}`;
}

/** "1089.00" — for CSV cells, so spreadsheets read it as a number. */
export function formatAmountPlain(value: number): string {
  return value.toFixed(2);
}
