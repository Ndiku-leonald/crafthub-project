import { AlertTriangle, Play, Calendar, MapPin } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

const dangerSigns = [
  { id: 1, sign: 'highFever', icon: '🌡️' },
  { id: 2, sign: 'difficultyBreathing', icon: '😮' },
  { id: 3, sign: 'refusingToFeed', icon: '🍼' },
  { id: 4, sign: 'convulsionsSeizures', icon: '⚠️' },
  { id: 5, sign: 'sunkenFontanelle', icon: '👶' }
];

const ancVisits = [
  { id: 1, name: 'firstANCVisit', completed: true },
  { id: 2, name: 'secondANCVisit', completed: true },
  { id: 3, name: 'thirdANCVisit', completed: true },
  { id: 4, name: 'fourthANCVisit', completed: false }
];

export default function BabyHealth() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-8">
        <h1 className="mb-8" style={{ color: 'var(--navy)' }}>
          {t('babyHealthGuide')}
        </h1>

        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'white' }}>
          <label className="block mb-3" style={{ color: 'var(--charcoal)' }}>
            {t('myBabyIs')}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              defaultValue={4}
              className="w-24 px-4 py-3 rounded-xl border-2 outline-none text-center focus:border-[var(--navy)]"
              style={{ backgroundColor: 'var(--off-white)', borderColor: 'var(--border)' }}
            />
            <span style={{ color: 'var(--charcoal)' }}>{t('monthsOld')}</span>
          </div>
        </div>

        <div className="rounded-xl p-6 mb-6 border-2" style={{
          backgroundColor: '#FEF2F2',
          borderColor: 'var(--destructive)'
        }}>
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle size={24} style={{ color: 'var(--destructive)' }} />
            <h2 style={{ color: 'var(--destructive)' }}>
              {t('goClinicIf')}
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {dangerSigns.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'white' }}>
                <div className="text-2xl">{item.icon}</div>
                <span style={{ color: 'var(--charcoal)' }}>{t(item.sign)}</span>
              </div>
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--destructive)', color: 'white' }}
          >
            <MapPin size={20} />
            <span>{t('findClinic')}</span>
          </button>
        </div>

        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'var(--warning)' }}>
          <h2 className="mb-4" style={{ color: 'var(--charcoal)' }}>
            {t('weeklyHealthTip')}
          </h2>

          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">👶🏾</div>
            <div className="flex-1">
              <h3 className="mb-2" style={{ color: 'var(--navy)' }}>
                {t('fourMonthMilestoneCheck')}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
                {t('fourMonthMilestoneDetails')}
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)' }}
          >
            <Play size={18} />
            <span>{t('listenLuganda')}</span>
          </button>
        </div>

        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'white' }}>
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>
            {t('ancVisitTracker')}
          </h2>

          <div className="space-y-3 mb-6">
            {ancVisits.map(visit => (
              <div key={visit.id} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: visit.completed ? 'var(--green)' : 'var(--border)'
                  }}
                >
                  {visit.completed && <span style={{ color: 'white' }}>✓</span>}
                </div>
                <span style={{
                  color: visit.completed ? 'var(--charcoal)' : 'var(--muted-foreground)',
                  textDecoration: visit.completed ? 'line-through' : 'none'
                }}>
                  {t(visit.name)}
                </span>
              </div>
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)', color: 'white' }}
          >
            <Calendar size={20} />
            <span>{t('scheduleNext')}</span>
          </button>
        </div>

        <div className="rounded-xl p-6" style={{ backgroundColor: 'white' }}>
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>
            {t('ageAppropriateNutrition')}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="text-3xl mb-2">🍼</div>
              <p className="text-sm" style={{ color: 'var(--charcoal)' }}>{t('breastMilkOnly')}</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="text-3xl mb-2">💧</div>
              <p className="text-sm" style={{ color: 'var(--charcoal)' }}>{t('cleanWater')}</p>
            </div>
          </div>

          <p className="text-sm mt-4 text-center" style={{ color: 'var(--muted-foreground)' }}>
            {t('solidFoodsAt6Months')}
          </p>
        </div>
      </div>
    </div>
  );
}
