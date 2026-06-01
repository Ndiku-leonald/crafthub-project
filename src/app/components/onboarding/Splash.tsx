import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';

export default function Splash() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full">
        <div className="mb-8 flex items-center justify-center w-32 h-32 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}>
          <img src="/CraftHub_Logo.jpeg" alt="logo" className="w-28 h-28 object-contain rounded-full" />
        </div>

        <h1 className="text-4xl md:text-5xl mb-4 text-center" style={{ color: 'white' }}>
          {t('appName')}
        </h1>

        <p className="text-xl md:text-2xl mb-2 text-center" style={{ color: 'var(--secondary)'}}>
          {t('tagline')}
        </p>

        <p className="mb-12 text-center opacity-90 text-base md:text-lg" style={{ color: 'white' }}>
          {t('subtagline')}
        </p>
      </div>

      <div className="w-full max-w-md space-y-4 mb-12">
        <button
          onClick={() => navigate('/language')}
          className="w-full py-4 px-6 rounded-xl transition-all hover:opacity-90 text-base md:text-lg font-medium"
          style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
        >
          {t('getStarted')}
        </button>

        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 px-6 rounded-xl border-2 transition-all hover:bg-white/10 text-base md:text-lg font-medium"
          style={{ borderColor: 'white', color: 'white' }}
        >
          {t('alreadyAccount')}
        </button>
      </div>
    </div>
  );
}
