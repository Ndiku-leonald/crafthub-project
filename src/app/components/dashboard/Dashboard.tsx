import { Bell, Plus, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';

const skills = [
  { id: 1, name: 'Baking', progress: 60, difficulty: 'Beginner', offline: true, icon: '🍰' },
  { id: 2, name: 'Tailoring', progress: 30, difficulty: 'Intermediate', offline: true, icon: '🧵' },
  { id: 3, name: 'Soap Making', progress: 0, difficulty: 'Beginner', offline: true, icon: '🧼' },
  { id: 4, name: 'Candle Making', progress: 0, difficulty: 'Beginner', offline: false, icon: '🕯️' },
  { id: 5, name: 'Basket Weaving', progress: 45, difficulty: 'Intermediate', offline: true, icon: '🧺' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { userProfile } = useUser();
  const userName = userProfile?.firstName || 'Friend';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('overview') || 'Overview'}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">{t('helloName').replace('{name}', userName)}</h2>
              <p className="mt-3 text-sm text-slate-600">{t('dashboardIntro') || 'Your craft business growth snapshot for the week.'}</p>
            </div>
            <button className="rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200">
              <Bell size={18} />
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-600 p-6 text-white">
              <p className="text-sm opacity-80">{t('activeSkills') || 'Active skills'}</p>
              <p className="mt-4 text-3xl font-semibold">8</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white">
              <p className="text-sm opacity-80">{t('monthlyRevenue') || 'Monthly revenue'}</p>
              <p className="mt-4 text-3xl font-semibold">45K</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white">
              <p className="text-sm opacity-80">{t('newOrders') || 'New orders'}</p>
              <p className="mt-4 text-3xl font-semibold">12</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">{t('marketplacePerformance') || 'Marketplace performance'}</p>
              <div className="mt-4 flex items-end gap-4">
                <div className="h-32 w-full rounded-3xl bg-slate-100" />
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-slate-900">+24%</p>
                  <p className="text-sm text-slate-500">{t('weekOverWeek') || 'week over week'}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">{t('communityImpact') || 'Community impact'}</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-slate-700 font-semibold">127</p>
                  <p className="text-sm text-slate-500">{t('activeSellers') || 'Active sellers'}</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-slate-700 font-semibold">342</p>
                  <p className="text-sm text-slate-500">{t('productsLive') || 'Products live'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{t('status')}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{t('online')}</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                <Cloud size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{t('quickAction') || 'Quick action'}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{t('listNewProduct') || 'List new product'}</p>
              </div>
              <button
                onClick={() => navigate('/my-shop')}
                className="rounded-3xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{t('recentLearning')}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{t('continueLearning')}</h3>
            </div>
            <button className="rounded-3xl bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200">
              View all
            </button>
          </div>

          <div className="mt-8 grid gap-4">
            {skills.slice(0, 4).map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => navigate('/learn')}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{skill.icon}</div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-900">{skill.name}</p>
                    <p className="text-sm text-slate-500">{skill.difficulty}</p>
                  </div>
                </div>
                <div className="text-sm text-slate-600">{skill.progress}%</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-500">{t('topOffers') || 'Top offers'}</p>
          <div className="mt-6 space-y-4">
            {[
              { title: 'Vanilla Cake', amount: '15000 UGX' },
              { title: 'Handwoven Basket', amount: '25000 UGX' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
