import { useMemo, useState } from 'react';
import { ChevronDown, Eye, Filter, MapPin, Package, Search, ShoppingCart, Star, TrendingUp, X } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { EmptyState, GlyphTile, PageHeader, StatCard } from '../ui/product-ui';

const NAVY = '#0F2C1A';
const GOLD = '#AD7E00';

type Product = {
  id: number;
  name: string;
  seller: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
};

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Vanilla Cake', seller: 'Grace', location: 'Mukono', price: 15000, rating: 4.8, reviews: 24, category: 'Baking' },
  { id: 2, name: 'Handwoven Basket', seller: 'Sarah', location: 'Kampala', price: 25000, rating: 5.0, reviews: 18, category: 'Crafts' },
  { id: 3, name: 'Natural Soap Pack', seller: 'Mary', location: 'Wakiso', price: 12000, rating: 4.6, reviews: 31, category: 'Beauty' },
  { id: 4, name: 'Cotton Dress', seller: 'Joy', location: 'Jinja', price: 35000, rating: 4.9, reviews: 12, category: 'Tailoring' },
  { id: 5, name: 'Scented Candles', seller: 'Ruth', location: 'Mukono', price: 8000, rating: 4.7, reviews: 45, category: 'Crafts' },
  { id: 6, name: 'Chocolate Cupcakes', seller: 'Grace', location: 'Mukono', price: 5000, rating: 4.9, reviews: 67, category: 'Baking' },
  { id: 7, name: 'Beaded Necklace', seller: 'Anita', location: 'Entebbe', price: 18000, rating: 4.5, reviews: 22, category: 'Crafts' },
  { id: 8, name: 'Fresh Honey', seller: 'Peter', location: 'Masaka', price: 22000, rating: 4.8, reviews: 38, category: 'Agriculture' },
  { id: 9, name: 'Braided Wig', seller: 'Diana', location: 'Kampala', price: 45000, rating: 4.9, reviews: 15, category: 'Beauty' },
  { id: 10, name: 'Tie-Dye Shirt', seller: 'Alice', location: 'Mbale', price: 20000, rating: 4.6, reviews: 29, category: 'Textiles' },
  { id: 11, name: 'Mushroom Pack', seller: 'James', location: 'Fort Portal', price: 9000, rating: 4.7, reviews: 41, category: 'Agriculture' },
  { id: 12, name: 'Leather Bag', seller: 'Brenda', location: 'Kampala', price: 55000, rating: 4.8, reviews: 8, category: 'Crafts' },
  { id: 13, name: 'Chili Sauce', seller: 'Miriam', location: 'Gulu', price: 7000, rating: 4.5, reviews: 53, category: 'Food' },
  { id: 14, name: 'Wooden Bowl', seller: 'Charles', location: 'Mbarara', price: 30000, rating: 4.7, reviews: 19, category: 'Crafts' },
  { id: 15, name: 'Organic Coffee', seller: 'Rose', location: 'Kabale', price: 18000, rating: 4.9, reviews: 62, category: 'Agriculture' },
  { id: 16, name: 'Embroidered Cloth', seller: 'Stella', location: 'Soroti', price: 28000, rating: 4.6, reviews: 14, category: 'Textiles' },
];

const FEATURED_SELLER = {
  name: 'Grace Nakato',
  location: 'Mukono District',
  story: 'Mother of 2, baking delicious treats for the whole community since 2022. Trained through CraftHub and now earning over 300,000 UGX monthly.',
  productsCount: 3,
  totalSales: '1,200+',
  rating: 4.9,
};

const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.category))).sort()];
const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const CATEGORY_BG: Record<string, string> = {
  Agriculture: '#E3F6E8',
  Baking: '#FFF4DB',
  Beauty: '#F5EBE5',
  Crafts: '#EEF4FB',
  Food: '#FFF4DB',
  Tailoring: '#E8EFE7',
  Textiles: '#F6F8F5',
};

function formatUGX(n: number) {
  return `UGX ${n.toLocaleString()}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? GOLD : 'none'} stroke={i <= Math.round(rating) ? GOLD : '#CBD5C8'} />
      ))}
    </div>
  );
}

const PAGE_SIZE = 12;

export default function Marketplace() {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const list = ALL_PRODUCTS.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
    return [...list].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < filteredProducts.length;
  const uniqueSellers = new Set(ALL_PRODUCTS.map((p) => p.seller)).size;
  const uniqueCategories = new Set(ALL_PRODUCTS.map((p) => p.category)).size;

  const toggleCart = (id: number) =>
    setCart((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="app-page">
      <PageHeader
        title={t('shopLocal') || 'Local Marketplace'}
        description="Handcrafted goods made by skilled artisans in your community"
        actions={
          cart.size > 0 ? (
            <div className="flex items-center gap-2 rounded-xl bg-[#FFF4DB] px-4 py-2 text-sm font-bold text-[#6B4D00]">
              <ShoppingCart size={16} />
              {cart.size} item{cart.size !== 1 ? 's' : ''} in cart
            </div>
          ) : null
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Package} label="Products Listed" value={ALL_PRODUCTS.length} tone="navy" />
        <StatCard icon={TrendingUp} label="Active Sellers" value={uniqueSellers} tone="green" />
        <StatCard icon={Filter} label="Categories" value={uniqueCategories} tone="gold" />
      </div>

      <div className="rounded-2xl bg-[#0F2C1A] p-6">
        <div className="flex items-start gap-5">
          <GlyphTile category="Baking" size="lg" />
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-[#F3C74D] px-2.5 py-1 text-xs font-bold text-[#132416]">Featured Seller</span>
            <p className="mt-3 text-xl font-extrabold leading-tight text-white">{FEATURED_SELLER.name}</p>
            <p className="mb-2 mt-1 flex items-center gap-1 text-xs text-white/70">
              <MapPin size={11} /> {FEATURED_SELLER.location}
            </p>
            <p className="mb-3 max-w-xl text-sm leading-6 text-white/80">{FEATURED_SELLER.story}</p>
            <div className="flex flex-wrap gap-5 text-xs font-bold text-white/70">
              <span>{FEATURED_SELLER.productsCount} products</span>
              <span>{FEATURED_SELLER.totalSales} sales</span>
              <span>{FEATURED_SELLER.rating} rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-card p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, sellers, locations..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="app-input w-full pl-10 pr-4"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={15} />
              </button>
            )}
          </div>
          {[{ value: selectedCategory, set: setSelectedCategory, options: CATEGORIES }, { value: sortBy, set: setSortBy, options: SORT_OPTIONS.map((o) => o.value), labels: SORT_OPTIONS }].map((control, index) => (
            <div key={index} className="relative min-w-44">
              <select
                value={control.value}
                onChange={(e) => { control.set(e.target.value); if (index === 0) setPage(1); }}
                className="app-input w-full appearance-none pl-3 pr-8"
              >
                {control.options.map((option) => (
                  <option key={option} value={option}>
                    {'labels' in control ? control.labels.find((o) => o.value === option)?.label : option}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              className="app-chip"
              style={selectedCategory === cat ? { backgroundColor: NAVY, borderColor: NAVY, color: '#fff' } : undefined}
            >
              {cat}
              {cat !== 'All' && <span className="opacity-70">{ALL_PRODUCTS.filter((p) => p.category === cat).length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length === ALL_PRODUCTS.length ? `Showing all ${filteredProducts.length} products` : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        {(searchQuery || selectedCategory !== 'All') && (
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="text-xs font-bold text-muted-foreground hover:text-foreground">
            Reset filters
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different search or category."
          action={<button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="app-primary-btn">Clear filters</button>}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => {
              const inCart = cart.has(product.id);
              return (
                <div key={product.id} className="app-card group flex flex-col overflow-hidden transition hover:border-[#BFCDBA]">
                  <div className="relative flex h-40 items-center justify-center" style={{ backgroundColor: CATEGORY_BG[product.category] ?? '#EEF4FB' }}>
                    <GlyphTile category={product.category} size="lg" />
                    <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2 py-0.5 text-xs font-bold text-foreground">{product.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-1 text-sm font-extrabold leading-snug text-foreground transition group-hover:text-primary">{product.name}</h3>
                    <div className="mb-1 flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{product.seller[0]}</div>
                      <span className="text-xs font-bold text-muted-foreground">{product.seller}</span>
                    </div>
                    <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={10} /> {product.location}
                    </div>
                    <div className="mb-3 flex items-center gap-1.5">
                      <StarRating rating={product.rating} />
                      <span className="text-xs font-extrabold" style={{ color: GOLD }}>{product.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <p className="mb-3 mt-auto text-base font-extrabold text-primary">{formatUGX(product.price)}</p>
                    <div className="flex gap-2">
                      <button onClick={() => toggleCart(product.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white transition hover:opacity-90 active:translate-y-px" style={{ backgroundColor: inCart ? GOLD : NAVY }}>
                        <ShoppingCart size={12} />
                        {inCart ? 'Added' : 'Add to Cart'}
                      </button>
                      <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition hover:bg-[#DCE4DA]" aria-label="View product">
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="pt-2 text-center">
              <button onClick={() => setPage((p) => p + 1)} className="app-secondary-btn px-8 py-3">
                Load More ({filteredProducts.length - visibleProducts.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
