import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.slice(0, 2) : 'es';

  const switchLanguage = (lang) => {
    if (lang === currentLang) return;
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hombros_lang', lang);
    }
  };

  return (
    <div 
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-[#EDE8DC] border border-[#D4C9B8] shadow-2xs font-mono text-xs select-none ${className}`}
      title={currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <div className="pl-1.5 pr-0.5 text-slate-500">
        <Globe className="w-3.5 h-3.5 text-[#487075]" />
      </div>

      <button
        type="button"
        onClick={() => switchLanguage('es')}
        className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
          currentLang === 'es'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
        }`}
      >
        ES
      </button>

      <span className="text-slate-400 text-[10px]">|</span>

      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
          currentLang === 'en'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
        }`}
      >
        EN
      </button>
    </div>
  );
}
