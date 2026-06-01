import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

const myProducts = [
  { id: 1, name: 'Vanilla Cake', price: 15000, stock: 'inStock', orders: 12, image: '🍰' },
  { id: 2, name: 'Chocolate Cupcakes', price: 5000, stock: 'inStock', orders: 8, image: '🧁' },
  { id: 3, name: 'Banana Bread', price: 10000, stock: 'outOfStock', orders: 5, image: '🍞' }
];

export default function MyShop() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ color: 'var(--navy)' }}>{t('myShop')}</h1>
          <button
            className="px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)' }}
          >
            <Plus size={20} />
            <span>{t('addProduct')}</span>
          </button>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: 'white' }}>
          <h2 className="mb-6" style={{ color: 'var(--navy)' }}>{t('earningsSummary')}</h2>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--gold)' }}>45K</div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('totalEarned')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--navy)' }}>7</div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('pending')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: 'var(--green)' }}>3</div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('active')}</p>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--navy)', color: 'white' }}
          >
            <TrendingUp size={20} />
            <span>{t('incomeTracker')}</span>
          </button>
        </div>

        <section>
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>{t('myProducts')}</h2>

          <div className="space-y-4">
            {myProducts.map(product => (
              <div
                key={product.id}
                className="rounded-xl p-4 flex items-center gap-4"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className="text-4xl">{product.image}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-1" style={{ color: 'var(--navy)' }}>
                    {product.name}
                  </h3>
                  <div className="text-sm mb-2" style={{ color: 'var(--gold)' }}>
                    UGX {product.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span
                      className="px-2 py-1 rounded"
                      style={{
                        backgroundColor: product.stock === 'inStock' ? 'var(--success)' : 'var(--warning)',
                        color: product.stock === 'inStock' ? 'var(--green)' : 'var(--gold)'
                      }}
                    >
                      {t(product.stock)}
                    </span>
                    <span style={{ color: 'var(--muted-foreground)' }}>
                      {product.orders} {t('orders')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="p-2 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <Edit size={18} style={{ color: 'var(--navy)' }} />
                  </button>
                  <button className="p-2 rounded-lg" style={{ backgroundColor: 'var(--warning)' }}>
                    <Trash2 size={18} style={{ color: 'var(--destructive)' }} />
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
