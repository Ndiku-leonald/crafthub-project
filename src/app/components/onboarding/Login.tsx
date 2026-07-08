import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Eye, EyeOff, Lock, Phone } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { validatePassword, validatePhone } from '../../utils/validationUtils';
import { CraftMotionScene, OnboardingPage } from './OnboardingChrome';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setServerError('');

    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    if (phoneError || passwordError) {
      const newErrors: Record<string, string> = {};
      if (phoneError) newErrors[phoneError.field] = phoneError.message;
      if (passwordError) newErrors[passwordError.field] = passwordError.message;
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      if (login(phone, password)) {
        navigate('/dashboard');
      } else {
        setServerError(t('invalidLogin'));
      }
      setLoading(false);
    }, 450);
  };

  return (
    <OnboardingPage centered>
      <section className="grid w-full gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="hidden lg:block">
          <CraftMotionScene />
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-[#DDE4DD] bg-white p-5 shadow-[0_18px_40px_rgb(22_37_31_/_0.08)] sm:p-7">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#355CFF]">
              <Lock size={22} />
            </div>
            <h1 className="text-3xl font-extrabold text-[#16251F]">{t('welcome')}</h1>
            <p className="mt-2 text-sm leading-6 text-[#516057]">{t('signInToAccount')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-extrabold text-[#26352D]">{t('phoneNumber')}</span>
              <span className="relative block">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6A766D]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={t('enterPhone')}
                  className="app-input w-full pl-10"
                />
              </span>
              {errors.phone && <span className="mt-1 block text-sm font-semibold text-red-600">{errors.phone}</span>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-extrabold text-[#26352D]">{t('password')}</span>
              <span className="relative block">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6A766D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="app-input w-full pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#6A766D] transition hover:bg-[#F0F3F0]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
              {errors.password && <span className="mt-1 block text-sm font-semibold text-red-600">{errors.password}</span>}
            </label>

            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#355CFF] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#2848D9] disabled:translate-y-0 disabled:opacity-60"
            >
              {loading ? t('signingIn') : t('signIn')}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-[#F7F8F6] p-4 text-center text-sm font-semibold text-[#516057]">
            {t('noAccount')}{' '}
            <button onClick={() => navigate('/language')} className="font-extrabold text-[#355CFF] hover:underline">
              {t('signUp')}
            </button>
          </div>
        </div>
      </section>
    </OnboardingPage>
  );
}
