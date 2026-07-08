import { ArrowRight, BookOpen, HeartPulse, ShieldCheck, Store } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { CraftMotionScene, OnboardingPage } from './OnboardingChrome';

export default function Splash() {
  const navigate = useNavigate();
  const { t } = useLocale();

  const features = [
    { icon: BookOpen, title: t('landingLearnTitle'), body: t('landingLearnBody') },
    { icon: Store, title: t('landingSellTitle'), body: t('landingSellBody') },
    { icon: HeartPulse, title: t('landingCareTitle'), body: t('landingCareBody') },
  ];

  return (
    <OnboardingPage>
      <div className="w-full">
        <section id="about" className="grid min-h-[calc(100dvh-7rem)] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6DDD6] bg-white px-4 py-2 text-sm font-extrabold text-[#355CFF]">
              <ShieldCheck size={16} />
              {t('landingBadge')}
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] text-[#16251F] sm:text-5xl lg:text-6xl">
              {t('landingHeadline')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#516057] sm:text-lg">
              {t('landingIntro')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/language')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#355CFF] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#2848D9]"
              >
                {t('landingPrimaryCta')}
                <ArrowRight size={17} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center rounded-full border border-[#D6DDD6] bg-white px-6 py-3.5 text-sm font-extrabold text-[#16251F] transition hover:-translate-y-0.5 hover:border-[#BFC8C1]"
              >
                {t('landingSecondaryCta')}
              </button>
            </div>
            <p className="mt-5 max-w-xl text-sm font-semibold text-[#6A766D]">{t('landingProof')}</p>
          </div>

          <div className="relative hidden lg:block">
            <CraftMotionScene />
          </div>
        </section>

        <section id="how-it-works" className="grid gap-4 py-10 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-2xl border border-[#DDE4DD] bg-white p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#355CFF]">
                  <Icon size={21} />
                </div>
                <h2 className="text-xl font-extrabold text-[#16251F]">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#516057]">{feature.body}</p>
              </article>
            );
          })}
        </section>

        <section id="safety" className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-[#16251F]">{t('landingStepsTitle')}</h2>
          </div>
          <div className="space-y-3">
            {[t('landingStepOne'), t('landingStepTwo'), t('landingStepThree')].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-[#DDE4DD] bg-white p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#355CFF] text-sm font-extrabold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-bold leading-6 text-[#26352D]">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </OnboardingPage>
  );
}
