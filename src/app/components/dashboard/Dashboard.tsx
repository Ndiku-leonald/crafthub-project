import { useNavigate } from 'react-router';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  Eye,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { GlyphTile } from '../ui/product-ui';

const NAVY = '#0F2C1A';
const GOLD = '#AD7E00';
const GREEN = '#1F5C2E';

const learningSkills = [
  { name: 'Bread Baking', category: 'Baking', progress: 75, categoryKey: 'baking', nextLesson: 'Advanced Techniques' },
  { name: 'Basket Weaving', category: 'Weaving', progress: 45, categoryKey: 'weaving', nextLesson: 'Traditional Patterns' },
  { name: 'Soap Making', category: 'Soap', progress: 30, categoryKey: 'soap', nextLesson: 'Natural Ingredients' },
  { name: 'Machine Tailoring', category: 'Tailoring', progress: 60, categoryKey: 'tailoring', nextLesson: 'Dress Patterns' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { userProfile } = useUser();
  const userName = userProfile?.firstName || 'Friend';

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return t('goodMorning');
    if (h < 17) return t('goodAfternoon');
    return t('goodEvening');
  })();

  const kpiCards = [
    { label: t('activeSkillsLabel'), value: '8', icon: BookOpen, trend: t('trendActiveSkills'), trendUp: true, iconBg: '#EEF4FB', iconColor: NAVY },
    { label: t('monthlyRevenue'), value: '45,200', suffix: ' UGX', icon: TrendingUp, trend: t('trendRevenue'), trendUp: true, iconBg: '#FFF4DB', iconColor: GOLD },
    { label: t('ordersLabel'), value: '12', icon: Package, trend: t('trendOrders'), trendUp: true, iconBg: '#E3F6E8', iconColor: GREEN },
    { label: t('ratingLabel'), value: '4.8', icon: Star, trend: t('trendRating'), trendUp: true, iconBg: '#F5EBE5', iconColor: '#A94722' },
  ];

  const recentActivity = [
    { category: 'Learning', text: t('trendOrders') !== '+3 new orders' ? `${t('lessonsDone')}: Bread Baking Basics` : 'Completed lesson "Bread Baking Basics"', time: '2h ago' },
    { category: 'Product', text: 'New order: Vanilla Cake, 15,000 UGX', time: '5h ago' },
    { category: 'Certificate', text: 'Received 5-star review from Mary K.', time: t('previous') },
    { category: 'Crafts', text: 'Product listed: Handwoven Basket', time: '2d ago' },
  ];

  const communityStats = [
    { label: t('activeSellers'), value: '127' },
    { label: t('productsLive'), value: '342' },
    { label: t('ordersThisWeek'), value: '58' },
    { label: t('ugxGenerated'), value: '2.1M' },
  ];

  const performanceRows = [
    { label: t('viewsLabel'), value: 320, max: 400, color: NAVY },
    { label: t('salesStat'), value: 240, max: 400, color: GOLD },
    { label: t('repeatBuyers'), value: 160, max: 400, color: GREEN },
  ];

  return (
    <div className="app-page">
      <div className="rounded-2xl bg-[#0F2C1A] p-6 text-white lg:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1.5 text-sm font-bold text-[#F3C74D]">{greeting}</p>
            <h1 className="text-2xl font-extrabold leading-tight text-white lg:text-3xl">
              {t('helloName').replace('{name}', userName)}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">{t('businessGrowing')}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: '127', label: t('sellers') },
              { value: '342', label: t('productsLabel') },
              { value: '89%', label: t('satisfaction') },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center">
                <p className="text-xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="app-card p-5 transition hover:border-[#BFCDBA]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: card.iconBg }}>
                  <Icon size={19} style={{ color: card.iconColor }} />
                </div>
                <span className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-bold ${card.trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                  {card.trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-foreground">
                {card.value}
                {'suffix' in card && card.suffix && <span className="ml-0.5 text-sm font-bold text-muted-foreground">{card.suffix}</span>}
              </p>
              <p className="app-label mt-0.5">{card.label}</p>
              <p className="mt-2 text-xs font-bold" style={{ color: card.trendUp ? GREEN : '#DC2626' }}>{card.trend}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="app-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="app-section-title">{t('learningProgress')}</h2>
                <p className="app-label mt-0.5">{learningSkills.length} {t('activeSkillsProgress')}</p>
              </div>
              <button onClick={() => navigate('/learn')} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                {t('viewAll')} <ArrowRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-border/70">
              {learningSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/35">
                  <GlyphTile category={skill.category} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground">{skill.name}</p>
                        <span className="hidden rounded-md bg-muted px-1.5 py-0.5 text-xs font-bold text-muted-foreground sm:inline">{t(skill.categoryKey)}</span>
                      </div>
                      <span className="text-xs font-extrabold text-foreground">{skill.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${skill.progress}%`, backgroundColor: skill.progress >= 70 ? GREEN : skill.progress >= 40 ? GOLD : NAVY }} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t('nextLessonLabel')} {skill.nextLesson}</p>
                  </div>
                  <button onClick={() => navigate('/learn')} className="app-secondary-btn hidden px-3 py-1.5 text-xs sm:inline-flex">
                    {t('continueBtn')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="app-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="app-section-title">{t('recentActivity')}</h2>
                <p className="app-label mt-0.5">{t('yourLatestUpdates')}</p>
              </div>
              <Activity size={16} className="text-muted-foreground" />
            </div>
            <div className="divide-y divide-border/70">
              {recentActivity.map((item) => (
                <div key={`${item.text}-${item.time}`} className="flex items-center gap-3 px-6 py-3.5 transition hover:bg-muted/35">
                  <GlyphTile category={item.category} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{item.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <ChevronRight size={14} className="flex-shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="app-card overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h2 className="app-section-title">{t('quickActions')}</h2>
              <p className="app-label mt-0.5">{t('shortcutsKeyTasks')}</p>
            </div>
            <div className="space-y-2 p-4">
              <button onClick={() => navigate('/my-shop')} className="app-primary-btn w-full justify-start">
                <Plus size={16} /> {t('listProduct')} <ChevronRight size={14} className="ml-auto" />
              </button>
              {[
                { label: t('browseMarket'), icon: ShoppingBag, path: '/market' },
                { label: t('viewMyShop'), icon: Store, path: '/my-shop' },
                { label: t('startSkill'), icon: Zap, path: '/learn' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.label} onClick={() => navigate(action.path)} className="app-secondary-btn w-full justify-start">
                    <Icon size={16} /> {action.label} <ChevronRight size={14} className="ml-auto text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-5 text-white">
            <div className="mb-4 flex items-center gap-2">
              <Users size={16} className="text-[#F3C74D]" />
              <h2 className="text-sm font-bold">{t('communityStats')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {communityStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5">
                  <p className="text-lg font-extrabold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="app-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-foreground">{t('performanceTitle')}</h2>
                <p className="app-label mt-0.5">{t('thisMonth')}</p>
              </div>
              <BarChart3 size={15} className="text-muted-foreground" />
            </div>
            <div className="space-y-3.5">
              {performanceRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                    <span>{row.label}</span>
                    <span className="font-bold text-foreground">{row.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${(row.value / row.max) * 100}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/analytics')} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
              <Eye size={12} /> {t('viewFullAnalytics')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
