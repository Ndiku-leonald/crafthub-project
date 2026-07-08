import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { validateFirstName, validatePhone } from '../../utils/validationUtils';
import { OnboardingPage } from './OnboardingChrome';

const districts = [
  'Kampala', 'Mukono', 'Wakiso', 'Jinja', 'Mbale', 'Gulu', 'Mbarara', 'Masaka'
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { setUserProfile } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    district: '',
    children: 1,
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    const firstNameError = validateFirstName(formData.firstName);
    if (firstNameError) newErrors[firstNameError.field] = firstNameError.message;

    if (!formData.district) {
      newErrors.district = 'Please select a district';
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors[phoneError.field] = phoneError.message;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setUserProfile({
        firstName: formData.firstName,
        phone: formData.phone,
        district: formData.district,
        children: formData.children
      });
      navigate('/trust');
    }
  };

  return (
    <OnboardingPage centered>
      <div className="w-full max-w-2xl rounded-2xl border border-[#DDE4DD] bg-white p-5 shadow-[0_18px_40px_rgb(22_37_31_/_0.08)] sm:p-7">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#355CFF]" />
            <div className="h-2 flex-1 rounded-full bg-[#DDE4DD]" />
          </div>
          <p className="text-sm font-bold text-[#6A766D]">{t('stepLabel').replace('{step}', '1').replace('{total}', '2')}</p>
        </div>

        <h1 className="text-3xl font-extrabold text-[#16251F] md:text-4xl">
          {t('quickProfileSetup')}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#516057]">{t('profileSetupIntro')}</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('firstName')} *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder={t('enterYourName')}
              className="app-input w-full"
              style={{
                backgroundColor: 'white',
                borderColor: errors.firstName ? '#DC2626' : 'var(--border)'
              }}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm" style={{ color: '#DC2626' }}>{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('district')} *
            </label>
            <div className="relative">
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="app-input w-full appearance-none"
                style={{
                  backgroundColor: 'white',
                  borderColor: errors.district ? '#DC2626' : 'var(--border)'
                }}
              >
                <option value="">{t('selectDistrict')}</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                size={20}
                style={{ color: 'var(--muted-foreground)' }}
              />
            </div>
            {errors.district && (
              <p className="mt-1 text-sm" style={{ color: '#DC2626' }}>{errors.district}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('numberOfChildren')}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                className="rounded-full bg-[#EEF2FF] p-3 text-[#355CFF] transition hover:bg-[#E1E8FF]"
              >
                <Minus size={20} />
              </button>
              <div className="flex-1 rounded-xl border border-[#DDE4DD] bg-[#F7F8F6] py-3 text-center">
                <span className="text-2xl font-extrabold text-[#16251F]">{formData.children}</span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                className="rounded-full bg-[#EEF2FF] p-3 text-[#355CFF] transition hover:bg-[#E1E8FF]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('phoneNumber')} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+256 700 000 000"
              className="app-input w-full"
              style={{
                backgroundColor: 'white',
                borderColor: errors.phone ? '#DC2626' : 'var(--border)'
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-sm" style={{ color: '#DC2626' }}>{errors.phone}</p>
            )}
          </div>

          <p className="text-sm text-center" style={{ color: 'var(--muted-foreground)' }}>
            {t('noEmail')}
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full rounded-full bg-[#355CFF] py-4 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#2848D9]"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </OnboardingPage>
  );
}
