import { ChevronRight, User, Bell, Globe, Shield, HelpCircle, LogOut, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { t, locale, setLocale } = useLocale();
  const { userProfile } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const userName = userProfile?.firstName || 'User';
  const userDistrict = userProfile?.district || 'District';

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (newLocale: 'en' | 'lg' | 'rk' | 'ac' | 'teo' | 'lgg' | 'cgg' | 'sw' | 'ny' | 'nd') => {
    setLocale(newLocale);
    setShowLanguageModal(false);
  };

  const languageNames: Record<string, string> = {
    en: 'English',
    lg: 'Luganda',
    rk: 'Runyankore',
    ac: 'Acholi',
    teo: 'Ateso',
    lgg: 'Lugbara',
    cgg: 'Rukiga',
    sw: 'Swahili',
    ny: 'Nyoro',
    nd: 'Ndebele'
  };

  const menuItems = [
    { id: 1, icon: User, label: t('editProfile'), color: 'var(--primary)', onClick: () => {} },
    { id: 2, icon: Bell, label: t('notifications'), color: 'var(--primary)', onClick: () => {} },
    { id: 3, icon: Globe, label: t('language'), value: languageNames[locale], color: 'var(--primary)', onClick: () => setShowLanguageModal(true) },
    { id: 4, icon: Shield, label: t('privacySecurity'), color: 'var(--primary)', onClick: () => {} },
    { id: 5, icon: HelpCircle, label: t('helpSupport'), color: 'var(--primary)', onClick: () => {} }
  ];

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-8">
        <h1 className="mb-8" style={{ color: 'var(--navy)' }}>
          {t('profile')}
        </h1>

        <div className="rounded-xl p-6 mb-8 flex items-center gap-4" style={{ backgroundColor: 'white' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ backgroundColor: 'var(--card-bg)' }}>
            👩🏾
          </div>
          <div className="flex-1">
            <h2 className="mb-1" style={{ color: 'var(--navy)' }}>
              {userName}
            </h2>
            <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
              {userDistrict}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: 'var(--charcoal)' }}>{t('skillsProductsSummary')}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h3 className="mb-3" style={{ color: 'var(--navy)' }}>
            {t('yourProgress')}
          </h3>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--gold)' }}>45K</div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('totalEarned')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--green)' }}>25</div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('lessonsDone')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--navy)' }}>12</div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('totalOrders')}</p>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>
            {t('settings')}
          </h2>

          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full p-4 flex items-center gap-4 transition-all hover:bg-gray-50"
                  style={{
                    borderBottom: index < menuItems.length - 1 ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <span className="flex-1 text-left" style={{ color: 'var(--charcoal)' }}>
                    {item.label}
                  </span>
                  {item.value && (
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {item.value}
                    </span>
                  )}
                  <ChevronRight size={20} style={{ color: 'var(--muted-foreground)' }} />
                </button>
              );
            })}
          </div>
        </section>

        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
              <Shield size={20} style={{ color: 'var(--green)' }} />
            </div>
            <h3 style={{ color: 'var(--navy)' }}>
              {t('supportedByUCU')}
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {t('programmeFreeBacked')}
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--warning)', color: 'var(--destructive)', border: '1px solid var(--destructive)' }}
        >
          <LogOut size={20} />
          <span>{t('signOut')}</span>
        </button>

        {/* Language Selection Modal */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
            <div className="w-full rounded-t-2xl p-6" style={{ backgroundColor: 'white' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ color: 'var(--navy)' }}>{t('language')}</h2>
                <button onClick={() => setShowLanguageModal(false)} className="p-1">
                  <X size={24} style={{ color: 'var(--charcoal)' }} />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { code: 'en' as const, label: '🇬🇧 English' },
                  { code: 'lg' as const, label: '🇺🇬 Luganda' },
                  { code: 'rk' as const, label: '🇺🇬 Runyankore' },
                  { code: 'ac' as const, label: '🇺🇬 Acholi' },
                  { code: 'teo' as const, label: '🇺🇬 Ateso' },
                  { code: 'lgg' as const, label: '🇺🇬 Lugbara' },
                  { code: 'cgg' as const, label: '🇺🇬 Rukiga' },
                  { code: 'sw' as const, label: '🇹🇿 Swahili' },
                  { code: 'ny' as const, label: '🇺🇬 Nyoro' },
                  { code: 'nd' as const, label: '🇿🇦 Ndebele' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full p-4 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: locale === lang.code ? 'var(--primary)' : 'var(--card-bg)',
                      color: locale === lang.code ? 'white' : 'var(--charcoal)'
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
