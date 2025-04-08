
import { Input } from "@/components/ui/input";
import { Currency } from "@/lib/api";
import { useEffect, useState } from "react";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: Currency | undefined;
  label: string;
  readOnly?: boolean;
}

const CurrencyInput = ({
  value,
  onChange,
  currency,
  label,
  readOnly = false,
}: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Format the value when it changes externally
    if (value !== displayValue) {
      setDisplayValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow only numeric input with decimals
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setDisplayValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400">{currency?.symbol || ''}</span>
        </div>
        <Input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          readOnly={readOnly}
          className={`pl-8 h-12 bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 ${
            readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
