import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { validatePhone, validatePassword, ValidationError } from '../../utils/validationUtils';

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    // Validate phone number
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
    // Simulate network delay
    setTimeout(() => {
      if (login(phone, password)) {
        navigate('/dashboard');
      } else {
        setServerError('Invalid phone number or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: 'var(--secondary)' }}>
          <img src="/CraftHub_Logo.jpeg" alt="logo" className="w-16 h-16 object-contain rounded-full" />
          </div>
          <h1 className="text-3xl mb-2" style={{ color: 'white' }}>
            {t('welcome')}
          </h1>
          <p style={{ color: 'var(--secondary)' }}>
            {t('signInToAccount')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'white' }}>
              {t('phoneNumber')} *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('enterPhone') || '+256 700 000 000'}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none focus:border-[var(--secondary)]"
              style={{
                backgroundColor: 'white',
                borderColor: errors.phone ? '#DC2626' : 'transparent'
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-sm" style={{ color: '#FCA5A5' }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'white' }}>
              {t('password') || 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 outline-none focus:border-[var(--secondary)]"
                style={{
                  backgroundColor: 'white',
                  borderColor: errors.password ? '#DC2626' : 'transparent'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} style={{ color: 'var(--muted-foreground)' }} />
                ) : (
                  <Eye size={20} style={{ color: 'var(--muted-foreground)' }} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm" style={{ color: '#FCA5A5' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#FCA5A5' }}>
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
          >
            {loading ? (t('signingIn') || 'Signing in...') : (t('signIn') || 'Sign In')}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>OR</span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </div>

        {/* Sign Up Link */}
        <p className="text-center" style={{ color: 'white' }}>
          {t('noAccount') || "Don't have an account?"}{' '}
          <button
            onClick={() => navigate('/')}
            className="font-semibold hover:opacity-80"
            style={{ color: 'var(--secondary)' }}
          >
            {t('signUp') || 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
