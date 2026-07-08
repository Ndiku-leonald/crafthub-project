import { Check, Languages } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LOCALE_OPTIONS, LocaleCode, useLocale } from '../../context/LocaleContext';
import { OnboardingPage } from './OnboardingChrome';

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { locale, setLocale, t } = useLocale();

  const choose = (code: LocaleCode) => {
    setLocale(code);
    window.setTimeout(() => navigate('/user-type'), 180);
  };

  return (
    <OnboardingPage centered>
      <section className="grid w-full gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#355CFF]">
            <Languages size={24} />
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-[#16251F]">{t('chooseLanguage')}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-[#516057]">{t('languageIntro')}</p>
          <p className="mt-4 text-sm font-semibold text-[#6A766D]">{t('youCanChange')}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {LOCALE_OPTIONS.map((lang) => {
            const active = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => choose(lang.code)}
                className={`group flex min-h-28 items-center justify-between rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 ${
                  active ? 'border-[#355CFF] shadow-[0_10px_24px_rgb(53_92_255_/_0.12)]' : 'border-[#DDE4DD]'
                }`}
              >
                <span>
                  <span className="block text-lg font-extrabold text-[#16251F]">{lang.nativeName}</span>
                  <span className="mt-1 block text-sm font-semibold text-[#6A766D]">{lang.name} / {lang.region}</span>
                </span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? 'bg-[#355CFF] text-white' : 'bg-[#F0F3F0] text-[#6A766D]'}`}>
                  {active ? <Check size={17} /> : lang.code.toUpperCase().slice(0, 2)}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </OnboardingPage>
  );
}
