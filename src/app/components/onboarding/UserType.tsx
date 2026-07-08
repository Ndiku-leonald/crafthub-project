import { Baby, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { OnboardingPage } from './OnboardingChrome';

export default function UserType() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { t } = useLocale();

  const options = [
    {
      type: 'mother' as const,
      icon: Baby,
      title: t('caregiver'),
      body: t('learnSkillsEarnIncome'),
      accent: '#355CFF',
      next: '/profile-setup',
    },
    {
      type: 'buyer' as const,
      icon: ShoppingBag,
      title: t('buyer'),
      body: t('supportCraftPeople'),
      accent: '#1F6D4A',
      next: '/dashboard',
    },
  ];

  return (
    <OnboardingPage centered>
      <section className="w-full max-w-4xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-[#16251F]">{t('whoAreYou')}</h1>
          <p className="mt-4 text-base leading-7 text-[#516057]">{t('tellUsWho')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.title}
                onClick={() => {
                  setUserType(option.type);
                  navigate(option.next);
                }}
                className="group rounded-2xl border border-[#DDE4DD] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgb(22_37_31_/_0.10)]"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${option.accent}14`, color: option.accent }}>
                  <Icon size={28} />
                </div>
                <h2 className="text-2xl font-extrabold text-[#16251F]">{option.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#516057]">{option.body}</p>
              </button>
            );
          })}
        </div>
      </section>
    </OnboardingPage>
  );
}
