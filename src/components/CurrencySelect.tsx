
import { Currency } from "@/lib/api";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencySelectProps {
  currencies: Currency[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const CurrencySelect = ({ 
  currencies, 
  value, 
  onChange, 
  label 
}: CurrencySelectProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 h-12">
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center gap-2">
                  <span>{currency.code}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">- {currency.name} {currency.symbol && `(${currency.symbol})`}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelect;
