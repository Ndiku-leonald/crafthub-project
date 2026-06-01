import { useNavigate } from 'react-router';
import { Shield, Award, Lock } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLocale } from '../../context/LocaleContext';

export default function TrustBanner() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { t } = useLocale();

  const handleEnter = () => {
    setUserType('mother');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }} />
          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }} />
        </div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('stepLabel').replace('{step}', '2').replace('{total}', '2')}</p>
      </div>

      <h1 className="mb-4" style={{ color: 'var(--primary)' }}>
        {t('youreProtected')}
      </h1>

      <p className="mb-12" style={{ color: 'var(--muted-foreground)' }}>
        {t('mamaSkillsSupported')}
      </p>

      <div className="space-y-6 max-w-md mb-12">
        <div className="p-6 rounded-xl flex items-start gap-4" style={{ backgroundColor: 'white' }}>
          <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}>
            <Award size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h3 className="mb-2" style={{ color: 'var(--primary)' }}>
              {t('supportedByUCU')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              This programme is backed by UCU's community development initiative
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl flex items-start gap-4" style={{ backgroundColor: 'white' }}>
          <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--success)' }}>
            <Shield size={28} style={{ color: 'var(--green)' }} />
          </div>
          <div>
            <h3 className="mb-2" style={{ color: 'var(--green)' }}>
              {t('lc1Endorsed')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Approved by local leadership in your community
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl flex items-start gap-4" style={{ backgroundColor: 'white' }}>
          <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }}>
            <Lock size={28} style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <h3 className="mb-2" style={{ color: 'var(--secondary)' }}>
              {t('yourDataSafe')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              This programme is free. We never sell your data.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleEnter}
        className="w-full py-4 rounded-xl transition-all hover:opacity-90 max-w-md"
        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
      >
        {t('enterApp')}
      </button>
    </div>
  );
}
