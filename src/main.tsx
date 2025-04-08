
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force dark mode by adding the class to the html element
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
