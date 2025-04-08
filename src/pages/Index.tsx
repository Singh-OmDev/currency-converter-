
import CurrencyConverter from "@/components/CurrencyConverter";
import { Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-converter">
      <div className="absolute inset-0 bg-slate-900/5 z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Currency Converter
          </h1>
          <p className="text-lg text-white/70">
            Convert currencies with real-time exchange rates
          </p>
        </div>
        
        <CurrencyConverter />
        
        <footer className="mt-12 text-center text-white/60 text-sm">
          <p>Exchange rates provided by exchangerate.host</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
