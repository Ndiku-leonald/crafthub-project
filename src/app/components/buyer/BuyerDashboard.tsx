import { Bell, MapPin, Search, Star, Store, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { GlyphTile, PageHeader, StatCard, UserRound } from '../ui/product-ui';

const featuredProducts = [
  { id: 1, name: 'Vanilla Cake', seller: 'Grace', location: 'Mukono', price: 15000, rating: 4.8, category: 'Baking' },
  { id: 2, name: 'Handwoven Basket', seller: 'Sarah', location: 'Kampala', price: 25000, rating: 5.0, category: 'Weaving' },
  { id: 3, name: 'Natural Soap Pack', seller: 'Mary', location: 'Wakiso', price: 12000, rating: 4.6, category: 'Soap Making' },
];

const categories = [
  { id: 1, name: 'Baking', count: 45 },
  { id: 2, name: 'Tailoring', count: 32 },
  { id: 3, name: 'Soap Making', count: 28 },
  { id: 4, name: 'Candles', count: 19 },
  { id: 5, name: 'Weaving', count: 24 },
  { id: 6, name: 'Crafts', count: 15 },
];

const topSellers = [
  { id: 1, name: 'Grace', location: 'Mukono', products: 8, sales: 45 },
  { id: 2, name: 'Sarah', location: 'Kampala', products: 12, sales: 67 },
  { id: 3, name: 'Mary', location: 'Wakiso', products: 6, sales: 38 },
];

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="app-page">
      <PageHeader
        title={t('supportMothers')}
        description={t('shopLocalDescription') || 'Explore local craft products and connect with makers across the region.'}
        actions={
          <button className="app-secondary-btn">
            <Bell size={16} />
            {t('notifications') || 'Notifications'}
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label={t('mothers')} value="127" tone="navy" />
        <StatCard icon={Store} label={t('productsLabel')} value="342" tone="green" />
        <StatCard icon={TrendingUp} label={t('ugxEarnedShort')} value="8M" tone="gold" />
      </div>

      <section className="app-card p-5">
        <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr] xl:items-end">
          <div>
            <p className="app-label">{t('searchCatalog') || 'Search catalog'}</p>
            <h2 className="app-section-title mt-2">{t('findLocalCrafts') || 'Find local crafts quickly'}</h2>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('searchProducts') || 'Search for products or sellers...'}
              className="app-input w-full pl-11"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="app-card p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="app-label">{t('browseByCategory')}</p>
              <h2 className="app-section-title mt-1">{t('popularCategories') || 'Popular categories'}</h2>
            </div>
            <button onClick={() => navigate('/market')} className="app-secondary-btn">
              {t('viewAll')}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate('/market')}
                className="rounded-xl border border-border bg-muted/35 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white"
              >
                <GlyphTile category={category.name} />
                <p className="mt-4 font-bold text-foreground">{category.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.count} {t('items')}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="app-card p-5">
          <p className="app-label">{t('topSellersThisWeek')}</p>
          <div className="mt-4 space-y-3">
            {topSellers.map((seller) => (
              <div key={seller.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-primary">
                    <UserRound size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{seller.name}</p>
                    <p className="text-sm text-muted-foreground">{seller.location}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{seller.products} {t('products')}</span>
                  <span>{seller.sales} {t('sales')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-card p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="app-label">{t('featuredProducts')}</p>
            <h2 className="app-section-title mt-1">{t('curatedSelection') || 'Curated selection'}</h2>
          </div>
          <button onClick={() => navigate('/market')} className="app-primary-btn">
            {t('shopNow') || 'Shop now'}
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-xl border border-border bg-muted/35 p-4">
              <div className="flex h-32 items-center justify-center rounded-xl bg-white">
                <GlyphTile category={product.category} size="lg" />
              </div>
              <div className="mt-5">
                <p className="app-label">{product.category}</p>
                <p className="mt-1 font-bold text-foreground">{product.name}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>{product.location}</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-foreground">
                <p className="font-extrabold">UGX {product.price.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star size={14} fill="currentColor" />
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
