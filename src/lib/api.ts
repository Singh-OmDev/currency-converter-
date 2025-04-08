
// Define the currency type
export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

// Define the exchange rate response type
export interface ExchangeRateResponse {
  success: boolean;
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Popular currencies for the dropdown
export const popularCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
];

// Exchange Rate API Base URL - Switched to a free API that doesn't require an API key
const API_BASE_URL = "https://open.er-api.com/v6";

// Function to fetch exchange rates
export const fetchExchangeRates = async (base: string): Promise<ExchangeRateResponse> => {
  try {
    console.log(`Fetching exchange rates for base currency: ${base}`);
    const response = await fetch(
      `${API_BASE_URL}/latest/${base}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Exchange rate data received:", data);
    
    // Transform the API response to match our expected format
    const transformedData: ExchangeRateResponse = {
      success: true,
      base: data.base_code,
      date: data.time_last_update_utc,
      rates: data.rates || {}
    };
    
    return transformedData;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

// Function to convert currency
export const convertCurrency = (
  amount: number,
  rates: Record<string, number>,
  toCurrency: string
): number => {
  if (!rates || !rates[toCurrency]) {
    console.warn(`No rate found for ${toCurrency}`);
    return 0;
  }
  
  return amount * rates[toCurrency];
};
