import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CurrencyInput from "./CurrencyInput";
import CurrencySelect from "./CurrencySelect";
import { 
  Currency, 
  ExchangeRateResponse, 
  fetchExchangeRates, 
  popularCurrencies,
  convertCurrency
} from "@/lib/api";
import { RefreshCw } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./Loader";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("0");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  const getExchangeRates = useCallback(async () => {
    if (!fromCurrency) return;

    setIsLoading(true);
    try {
      const data: ExchangeRateResponse = await fetchExchangeRates(fromCurrency);
      
      if (data && data.rates && toCurrency) {
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        
        if (amount) {
          const converted = convertCurrency(parseFloat(amount) || 0, data.rates, toCurrency);
          setResult(converted.toFixed(4));
        }
        
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, amount, toast]);

  useEffect(() => {
    getExchangeRates();
  }, [fromCurrency, toCurrency, getExchangeRates]);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    
    if (value && exchangeRate) {
      const converted = (parseFloat(value) || 0) * exchangeRate;
      setResult(converted.toFixed(4));
    } else {
      setResult("0");
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyObj = popularCurrencies.find(c => c.code === fromCurrency);
  const toCurrencyObj = popularCurrencies.find(c => c.code === toCurrency);

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl text-center">Currency Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CurrencyInput
          value={amount}
          onChange={handleAmountChange}
          currency={fromCurrencyObj}
          label="Amount"
        />

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <CurrencySelect
            currencies={popularCurrencies}
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />

          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapCurrencies}
            className="mt-5"
            aria-label="Swap currencies"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <CurrencySelect
            currencies={popularCurrencies}
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
        </div>

        <div className="pt-2">
          <CurrencyInput
            value={result}
            onChange={() => {}}
            currency={toCurrencyObj}
            label="Result"
            readOnly
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
          <div className="flex items-center">
            {lastUpdated ? (
              <span>Updated: {lastUpdated}</span>
            ) : (
              <span>Loading data...</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={getExchangeRates}
            disabled={isLoading}
            className="flex items-center gap-1 h-7 px-2"
            aria-label="Refresh rates"
          >
            {isLoading ? (
              <Loader size="sm" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
            <span className="text-xs">Refresh</span>
          </Button>
        </div>

        <div className="text-center text-sm text-slate-600 pt-1">
          {exchangeRate > 0 && (
            <p>
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
