import { Bell, Search, Star, MapPin, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';

const featuredProducts = [
  { id: 1, name: 'Vanilla Cake', seller: 'Grace', location: 'Mukono', price: 15000, rating: 4.8, image: '🍰', category: 'Baking' },
  { id: 2, name: 'Handwoven Basket', seller: 'Sarah', location: 'Kampala', price: 25000, rating: 5.0, image: '🧺', category: 'Weaving' },
  { id: 3, name: 'Natural Soap Pack', seller: 'Mary', location: 'Wakiso', price: 12000, rating: 4.6, image: '🧼', category: 'Soap Making' }
];

const categories = [
  { id: 1, name: 'Baking', icon: '🍰', count: 45 },
  { id: 2, name: 'Tailoring', icon: '🧵', count: 32 },
  { id: 3, name: 'Soap', icon: '🧼', count: 28 },
  { id: 4, name: 'Candles', icon: '🕯️', count: 19 },
  { id: 5, name: 'Baskets', icon: '🧺', count: 24 },
  { id: 6, name: 'More', icon: '➕', count: 15 }
];

const topSellers = [
  { id: 1, name: 'Grace', location: 'Mukono', products: 8, sales: 45, image: '👩🏾' },
  { id: 2, name: 'Sarah', location: 'Kampala', products: 12, sales: 67, image: '👩🏿' },
  { id: 3, name: 'Mary', location: 'Wakiso', products: 6, sales: 38, image: '👩🏾' }
];

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('shopLocal')}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">{t('supportMothers')}</h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600">{t('shopLocalDescription') || 'Explore local craft products and connect with makers across the region.'}</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200">
            <Bell size={18} />
            {t('notifications') || 'Notifications'}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">{t('mothers')}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">127</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">{t('productsLabel')}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">342</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">{t('ugxEarnedShort')}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">8M</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr] xl:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('searchCatalog') || 'Search catalog'}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t('findLocalCrafts') || 'Find local crafts quickly'}</h2>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchProducts') || 'Search for products or sellers...'}
              className="w-full rounded-3xl border border-slate-200 bg-slate-100 py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm text-slate-500">{t('browseByCategory')}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{t('popularCategories') || 'Popular categories'}</h2>
            </div>
            <button
              onClick={() => navigate('/market')}
              className="rounded-3xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-slate-300"
            >
              {t('viewAll')}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate('/market')}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-slate-300"
              >
                <div className="text-4xl">{category.icon}</div>
                <p className="mt-4 font-semibold text-slate-900">{category.name}</p>
                <p className="mt-2 text-sm text-slate-500">{category.count} {t('items')}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('topSellersThisWeek')}</p>
          <div className="mt-6 space-y-4">
            {topSellers.map((seller) => (
              <div key={seller.id} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
                    {seller.image}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{seller.name}</p>
                    <p className="text-sm text-slate-500">{seller.location}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>{seller.products} {t('products')}</span>
                  <span>{seller.sales} {t('sales')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('featuredProducts')}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{t('curatedSelection') || 'Curated selection'}</h2>
          </div>
          <button
            onClick={() => navigate('/market')}
            className="rounded-3xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800"
          >
            {t('shopNow') || 'Shop now'}
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="h-32 rounded-3xl bg-white shadow-sm flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">{product.category}</p>
                <p className="mt-2 font-semibold text-slate-900">{product.name}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} />
                  <span>{product.location}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-slate-900">
                <p className="font-semibold">UGX {product.price.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="var(--gold)" />
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
