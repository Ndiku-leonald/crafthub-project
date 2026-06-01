import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'lg' as const, name: 'Luganda', flag: '🇺🇬' },
  { code: 'rk' as const, name: 'Runyankore', flag: '🇺🇬' },
  { code: 'ac' as const, name: 'Acholi', flag: '🇺🇬' },
  { code: 'teo' as const, name: 'Ateso', flag: '🇺🇬' },
  { code: 'lgg' as const, name: 'Lugbara', flag: '🇺🇬' },
  { code: 'cgg' as const, name: 'Rukiga', flag: '🇺🇬' },
  { code: 'sw' as const, name: 'Swahili', flag: '🇹🇿' },
  { code: 'ny' as const, name: 'Nyoro', flag: '🇺🇬' },
  { code: 'nd' as const, name: 'Ndebele', flag: '🇿🇦' },
];

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { setLocale, t } = useLocale();

  const choose = (code: 'en' | 'lg' | 'rk' | 'ac' | 'teo' | 'lgg' | 'cgg' | 'sw' | 'ny' | 'nd') => {
    setLocale(code);
    navigate('/user-type');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12" style={{ backgroundColor: 'var(--off-white)' }}>
      <h1 className="mb-8" style={{ color: 'var(--primary)' }}>
        {t('chooseLanguage')}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => choose(lang.code)}
            className="p-6 rounded-xl border-2 transition-all hover:shadow-lg flex flex-col items-center justify-center gap-3"
            style={{
              backgroundColor: 'white',
              borderColor: 'var(--border)',
              minHeight: '140px'
            }}
          >
            <div className="text-5xl">{lang.flag}</div>
            <div className="font-medium" style={{ color: 'var(--charcoal)' }}>{lang.name}</div>
          </button>
        ))}
      </div>

      <p className="text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {t('youCanChange')}
      </p>
    </div>
  );
}
