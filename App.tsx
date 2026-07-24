import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'about', href: '#about' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Sun className="w-8 h-8 text-green-500" />
            <span className="text-xl font-bold text-slate-800">BARTSINSTALL</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-slate-600 hover:text-green-500 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors font-medium text-slate-700"
            >
              {i18n.language === 'pl' ? 'EN' : 'PL'}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-slate-600 hover:text-green-500 transition-colors font-medium"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors font-medium text-slate-700"
              >
                {i18n.language === 'pl' ? 'English' : 'Polski'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
