import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white ${className}`}
    >
      <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
