import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, Languages } from 'lucide-react';
import { LOCALE_OPTIONS, LocaleCode, useLocale } from '../../context/LocaleContext';

export function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign('/')}
      className="group flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-black/5"
    >
      <img
        src="/CraftHub_Logo.jpeg"
        alt="CraftHub logo"
        className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10"
      />
      <span className={`hidden text-sm font-extrabold sm:inline ${dark ? 'text-white' : 'text-[#16251F]'}`}>CraftHub</span>
    </button>
  );
}

export function LocaleMenu({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const active = LOCALE_OPTIONS.find((item) => item.code === locale) || LOCALE_OPTIONS[0];

  return (
    <label className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${
      dark ? 'border-white/20 bg-white/10 text-white' : 'border-[#D6DDD6] bg-white text-[#16251F]'
    }`}>
      <Languages size={15} />
      <span className="hidden sm:inline">{t('navLanguage')}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as LocaleCode)}
        className="max-w-[8rem] bg-transparent text-inherit outline-none"
        aria-label={t('navLanguage')}
      >
        {LOCALE_OPTIONS.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none opacity-60" />
      <span className="sr-only">{active.name}</span>
    </label>
  );
}

export function LandingNav({ dark = false }: { dark?: boolean }) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const linkClass = dark ? 'text-white/78 hover:text-white' : 'text-[#516057] hover:text-[#16251F]';

  return (
    <header className="absolute left-0 right-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <BrandMark dark={dark} />
        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          <a href="/#about" className={linkClass}>{t('navAbout')}</a>
          <a href="/#how-it-works" className={linkClass}>{t('navHowItWorks')}</a>
          <a href="/#safety" className={linkClass}>{t('navSafety')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleMenu dark={dark} />
          <button onClick={() => navigate('/login')} className={`${dark ? 'app-secondary-btn border-white/25 bg-white/10 text-white hover:bg-white/15' : 'app-secondary-btn'} whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm`}>
            {t('signIn')}
          </button>
          <button onClick={() => navigate('/language')} className="hidden rounded-full bg-[#355CFF] px-4 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#2848D9] sm:inline-flex">
            {t('signUp')}
          </button>
        </div>
      </div>
    </header>
  );
}

export function OnboardingPage({
  children,
  dark = false,
  centered = false,
}: {
  children: ReactNode;
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <main className={`${dark ? 'bg-[#13201A]' : 'bg-[#F7F8F6]'} min-h-[100dvh] overflow-hidden`}>
      <LandingNav dark={dark} />
      <div className={`mx-auto flex min-h-[100dvh] max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 ${centered ? 'items-center justify-center' : ''}`}>
        {children}
      </div>
    </main>
  );
}

export function CraftMotionScene() {
  return (
    <div className="craft-scene" aria-hidden="true">
      <div className="craft-disc craft-disc-one" />
      <div className="craft-disc craft-disc-two" />
      <div className="craft-card-3d craft-card-front">
        <span>Learn</span>
        <strong>12 lessons</strong>
      </div>
      <div className="craft-card-3d craft-card-back">
        <span>Market</span>
        <strong>UGX</strong>
      </div>
      <div className="craft-orbit">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
