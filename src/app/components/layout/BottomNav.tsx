import { useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, ShoppingCart, Baby, User } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocale();

  const tabs = [
    { id: 'home', label: t('home'), icon: Home, path: '/dashboard' },
    { id: 'learn', label: t('learn'), icon: BookOpen, path: '/learn' },
    { id: 'market', label: t('market'), icon: ShoppingCart, path: '/market' },
    { id: 'baby', label: t('baby'), icon: Baby, path: '/baby-health' },
    { id: 'profile', label: t('profileTab'), icon: User, path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t" style={{ backgroundColor: 'white', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-around px-2 py-3 max-w-2xl mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all min-w-[64px]"
              style={{
                color: isActive ? 'var(--primary)' : 'var(--muted-foreground)'
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs" style={{ fontWeight: isActive ? 600 : 400 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
