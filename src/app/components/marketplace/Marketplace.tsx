import { Search, Star } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useState } from 'react';

const products = [
  { id: 1, name: 'Vanilla Cake', seller: 'Grace', location: 'Mukono', price: 15000, rating: 4.8, image: '🍰' },
  { id: 2, name: 'Handwoven Basket', seller: 'Sarah', location: 'Kampala', price: 25000, rating: 5.0, image: '🧺' },
  { id: 3, name: 'Natural Soap Pack', seller: 'Mary', location: 'Wakiso', price: 12000, rating: 4.6, image: '🧼' },
  { id: 4, name: 'Cotton Dress', seller: 'Joy', location: 'Jinja', price: 35000, rating: 4.9, image: '👗' },
  { id: 5, name: 'Scented Candles', seller: 'Ruth', location: 'Mukono', price: 8000, rating: 4.7, image: '🕯️' },
  { id: 6, name: 'Chocolate Cupcakes', seller: 'Grace', location: 'Mukono', price: 5000, rating: 4.9, image: '🧁' }
];

const featuredSeller = {
  name: 'Grace',
  location: 'Mukono',
  story: 'Mother of 2, baking delicious treats for the community',
  productsCount: 3,
  image: '👩🏾'
};

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLocale();

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-8">
        <h1 className="mb-2" style={{ color: 'var(--navy)' }}>
          {t('shopLocal')}
        </h1>
        <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>
          {t('supportMothers')}
        </p>

        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={20}
              style={{ color: 'var(--muted-foreground)' }}
            />
            <input
              type="text"
              placeholder={t('searchProducts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:border-[var(--navy)]"
              style={{ backgroundColor: 'white', borderColor: 'var(--border)' }}
            />
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{
          background: 'linear-gradient(135deg, var(--gold) 0%, #D4A017 100%)'
        }}>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{featuredSeller.image}</div>
            <div className="flex-1">
              <div className="px-3 py-1 rounded-full inline-block mb-2" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'var(--navy)'
              }}>
                {t('motherOfWeek')}
              </div>
              <h3 className="mb-1" style={{ color: 'var(--navy)' }}>
                {featuredSeller.name} · {featuredSeller.location}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--charcoal)' }}>
                {featuredSeller.story}
              </p>
              <button className="px-4 py-2 rounded-lg" style={{
                backgroundColor: 'var(--navy)',
                color: 'white'
              }}>
                {t('viewProducts')} ({featuredSeller.productsCount})
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>
            {t('allProducts')}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <div
                key={product.id}
                className="rounded-xl overflow-hidden transition-all hover:shadow-lg cursor-pointer"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <div className="h-32 flex items-center justify-center" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className="text-6xl">{product.image}</div>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 text-sm" style={{ color: 'var(--navy)' }}>
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {product.seller} · {product.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star size={14} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                    <span className="text-sm" style={{ color: 'var(--gold)' }}>
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span style={{ color: 'var(--navy)' }}>
                      UGX {product.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="w-full py-2 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--green)', color: 'white' }}
                  >
                    {t('order')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
