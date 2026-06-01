import { useNavigate } from 'react-router';
import { Baby, ShoppingBag } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLocale } from '../../context/LocaleContext';

export default function UserType() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col px-6 py-12" style={{ backgroundColor: 'var(--off-white)' }}>
      <h1 className="mb-4" style={{ color: 'var(--primary)' }}>
        {t('whoAreYou')}
      </h1>

      <p className="mb-12" style={{ color: 'var(--muted-foreground)' }}>
        {t('tellUsWho')}
      </p>

      <div className="space-y-4 max-w-md">
        <button
          onClick={() => {
            setUserType('mother');
            navigate('/profile-setup');
          }}
          className="w-full p-8 rounded-xl border-2 transition-all hover:shadow-xl flex items-center gap-6"
          style={{ backgroundColor: 'white', borderColor: 'var(--primary)' }}
        >
          <div className="p-4 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}>
            <Baby size={40} style={{ color: 'var(--primary)' }} />
          </div>
          <div className="flex-1 text-left">
            <h3 style={{ color: 'var(--primary)' }}>{t('caregiver')}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              {t('learnSkillsEarnIncome')}
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            setUserType('buyer');
            navigate('/dashboard');
          }}
          className="w-full p-8 rounded-xl border-2 transition-all hover:shadow-xl flex items-center gap-6"
          style={{ backgroundColor: 'white', borderColor: 'var(--green)' }}
        >
          <div className="p-4 rounded-full" style={{ backgroundColor: 'var(--success)' }}>
            <ShoppingBag size={40} style={{ color: 'var(--green)' }} />
          </div>
          <div className="flex-1 text-left">
            <h3 style={{ color: 'var(--green)' }}>{t('buyer')}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              {t('supportCraftPeople')}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
