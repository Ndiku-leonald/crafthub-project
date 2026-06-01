import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { validateFirstName, validatePhone } from '../../utils/validationUtils';

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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }} />
            <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('stepLabel').replace('{step}', '1').replace('{total}', '2')}</p>
        </div>

        <h1 className="mb-8 text-3xl md:text-4xl" style={{ color: 'var(--primary)' }}>
          {t('quickProfileSetup')}
        </h1>

        <div className="space-y-6 max-w-lg">
          <div>
            <label className="block mb-2 font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('firstName')} *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder={t('enterYourName')}
              className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-[var(--primary)]"
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
                className="w-full px-4 py-3 rounded-xl border-2 outline-none appearance-none focus:border-[var(--primary)]"
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
                className="p-3 rounded-full hover:opacity-80 transition-all"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <Minus size={20} style={{ color: 'var(--primary)' }} />
              </button>
              <div className="flex-1 text-center py-3 rounded-xl" style={{ backgroundColor: 'white', border: '2px solid var(--border)' }}>
                <span className="text-2xl font-semibold" style={{ color: 'var(--primary)' }}>{formData.children}</span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                className="p-3 rounded-full hover:opacity-80 transition-all"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <Plus size={20} style={{ color: 'var(--primary)' }} />
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
              className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-[var(--primary)]"
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
            className="w-full py-4 rounded-xl transition-all hover:opacity-90 font-medium text-lg"
            style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
