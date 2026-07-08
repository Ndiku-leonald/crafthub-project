import { useState } from 'react';
import { BarChart3, Clock, DollarSign, Edit, Package, Plus, Trash2, TrendingUp } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { GlyphTile, PageHeader, StatCard } from '../ui/product-ui';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: 'inStock' | 'outOfStock';
  orders: number;
  category: string;
};

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Vanilla Cake', price: 15000, stock: 'inStock', orders: 12, category: 'Baking' },
  { id: 2, name: 'Chocolate Cupcakes', price: 5000, stock: 'inStock', orders: 8, category: 'Baking' },
  { id: 3, name: 'Banana Bread', price: 10000, stock: 'outOfStock', orders: 5, category: 'Baking' },
];

export default function MyShop() {
  const { t } = useLocale();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const totalEarned = products.reduce((sum, p) => sum + p.price * p.orders, 0);
  const pendingOrders = products.reduce((sum, p) => sum + Math.floor(p.orders * 0.2), 0);
  const activeProducts = products.filter((p) => p.stock === 'inStock').length;

  const addProduct = () => {
    if (!newName.trim() || !newPrice) return;
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        price: Number(newPrice),
        stock: 'inStock',
        orders: 0,
        category: 'Crafts',
      },
    ]);
    setNewName('');
    setNewPrice('');
    setShowForm(false);
  };

  const removeProduct = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="app-page max-w-screen-xl">
      <PageHeader
        title={t('myShop')}
        description="Manage your products, orders, and earnings"
        actions={
          <button onClick={() => setShowForm((v) => !v)} className="app-primary-btn">
            <Plus size={16} />
            {t('addProduct')}
          </button>
        }
      />

      {showForm && (
        <div className="app-card p-5">
          <h3 className="mb-4 font-bold text-foreground">New Product</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input type="text" placeholder="Product name" value={newName} onChange={(e) => setNewName(e.target.value)} className="app-input flex-1" />
            <input type="number" placeholder="Price (UGX)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="app-input w-full sm:w-40" />
            <button onClick={addProduct} className="app-primary-btn">Save</button>
            <button onClick={() => setShowForm(false)} className="app-secondary-btn">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={DollarSign} label={t('totalEarned')} value={`${(totalEarned / 1000).toFixed(0)}K UGX`} tone="gold" />
        <StatCard icon={Clock} label={t('pending')} value={`${pendingOrders} orders`} tone="red" />
        <StatCard icon={Package} label={t('active')} value={`${activeProducts} products`} tone="green" />
        <StatCard icon={BarChart3} label="Total Sales" value={products.reduce((s, p) => s + p.orders, 0)} tone="navy" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="app-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="app-section-title">{t('myProducts')}</h2>
              <span className="app-label">{products.length} products</span>
            </div>
            <div className="divide-y divide-border/70">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/35">
                  <GlyphTile category={product.category} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-foreground">{product.name}</p>
                    <p className="mt-0.5 text-sm font-extrabold text-[#AD7E00]">UGX {product.price.toLocaleString()}</p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${product.stock === 'inStock' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
                        {t(product.stock)}
                      </span>
                      <span className="text-xs text-muted-foreground">{product.orders} {t('orders')}</span>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <button className="rounded-xl bg-muted p-2 text-muted-foreground transition hover:bg-[#DCE4DA]" aria-label="Edit">
                      <Edit size={15} />
                    </button>
                    <button onClick={() => removeProduct(product.id)} className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100" aria-label="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-primary p-5 text-white">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#F3C74D]" />
              <h3 className="text-sm font-bold">{t('incomeTracker')}</h3>
            </div>
            <p className="mb-1 text-3xl font-extrabold text-white">
              {(totalEarned / 1000).toFixed(0)}K
              <span className="ml-1 text-sm font-bold text-white/70">UGX</span>
            </p>
            <p className="text-xs text-white/70">Total revenue from all products</p>
            <div className="mt-4 space-y-2">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{p.name}</span>
                  <span className="font-bold text-[#F3C74D]">{((p.price * p.orders) / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="app-card p-5">
            <h3 className="mb-3 text-sm font-bold text-foreground">Seller Tips</h3>
            <div className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Add clear product photos to improve buyer confidence.</p>
              <p>Reply to customers within 24 hours for better ratings.</p>
              <p>Offer bundle discounts to increase order value.</p>
              <p>Ask satisfied buyers to leave short reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
