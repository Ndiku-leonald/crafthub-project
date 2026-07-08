import { Award, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { OnboardingPage } from './OnboardingChrome';

export default function TrustBanner() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { t } = useLocale();

  const handleEnter = () => {
    setUserType('mother');
    navigate('/dashboard');
  };

  const items = [
    { icon: Award, title: t('supportedByUCU'), body: t('supportedByUCUText'), tone: '#355CFF' },
    { icon: Shield, title: t('lc1Endorsed'), body: t('lc1EndorsedText'), tone: '#1F6D4A' },
    { icon: Lock, title: t('yourDataSafe'), body: t('yourDataSafeText'), tone: '#AD7E00' },
  ];

  return (
    <OnboardingPage centered>
      <section className="w-full max-w-3xl rounded-2xl border border-[#DDE4DD] bg-white p-5 shadow-[0_18px_40px_rgb(22_37_31_/_0.08)] sm:p-7">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#355CFF]" />
            <div className="h-2 flex-1 rounded-full bg-[#355CFF]" />
          </div>
          <p className="text-sm font-bold text-[#6A766D]">{t('stepLabel').replace('{step}', '2').replace('{total}', '2')}</p>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-[#16251F] md:text-4xl">{t('youreProtected')}</h1>
          <p className="mt-4 text-base leading-7 text-[#516057]">{t('mamaSkillsSupported')}</p>
        </div>

        <div className="mt-8 grid gap-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex gap-4 rounded-2xl border border-[#DDE4DD] bg-[#F7F8F6] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white" style={{ color: item.tone }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#16251F]">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#516057]">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-[#DDE4DD] bg-white p-4">
          <p className="text-sm leading-6 text-[#516057]">{t('termsIntro')}</p>
        </div>

        <button
          onClick={handleEnter}
          className="mt-6 w-full rounded-full bg-[#355CFF] py-4 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#2848D9]"
        >
          {t('acceptTerms')}
        </button>
      </section>
    </OnboardingPage>
  );
}
