import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Award,
  ChevronDown,
  CreditCard,
  Eye,
  Lock,
  MapPin,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useAuth } from '../../context/AuthContext';
import { EmptyState } from '../ui/product-ui';

const NAVY = '#0F2C1A';
const GOLD = '#AD7E00';
const GREEN = '#1F5C2E';

type Product = {
  id: number;
  name: string;
  seller: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  condition: 'New' | 'Made to order' | 'Fresh';
  certificate: string;
  delivery: string;
  image: string;
  imageAlt: string;
};

type CartLine = {
  productId: number;
  quantity: number;
};

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Vanilla Celebration Cake', seller: 'Grace Nakato', location: 'Mukono', price: 15000, rating: 4.8, reviews: 24, category: 'Baking', condition: 'Made to order', certificate: 'Bread Baking', delivery: 'Same day pickup', image: '/product-images/vanilla-cake.jpg', imageAlt: 'Layered vanilla cake on a serving plate' },
  { id: 2, name: 'Handwoven Storage Basket', seller: 'Sarah N.', location: 'Kampala', price: 25000, rating: 5.0, reviews: 18, category: 'Crafts', condition: 'New', certificate: 'Basket Weaving', delivery: '1 day delivery', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80', imageAlt: 'Handwoven basket on a neutral surface' },
  { id: 3, name: 'Natural Soap Pack', seller: 'Mary A.', location: 'Wakiso', price: 12000, rating: 4.6, reviews: 31, category: 'Beauty', condition: 'New', certificate: 'Soap Making', delivery: 'Pickup available', image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824ce?auto=format&fit=crop&w=900&q=80', imageAlt: 'Stacked handmade soap bars' },
  { id: 4, name: 'Cotton Sunday Dress', seller: 'Joy K.', location: 'Jinja', price: 35000, rating: 4.9, reviews: 12, category: 'Tailoring', condition: 'Made to order', certificate: 'Dress Making', delivery: '2 day delivery', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80', imageAlt: 'Cotton dress displayed on a hanger' },
  { id: 5, name: 'Scented Candle Pair', seller: 'Ruth M.', location: 'Mukono', price: 8000, rating: 4.7, reviews: 45, category: 'Crafts', condition: 'New', certificate: 'Candle Making', delivery: 'Same day pickup', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', imageAlt: 'Scented candles on a table' },
  { id: 6, name: 'Chocolate Cupcake Box', seller: 'Grace Nakato', location: 'Mukono', price: 5000, rating: 4.9, reviews: 67, category: 'Baking', condition: 'Fresh', certificate: 'Cake Decoration', delivery: 'Order before 11am', image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80', imageAlt: 'Decorated cupcakes in a bakery display' },
  { id: 7, name: 'Beaded Necklace', seller: 'Anita B.', location: 'Entebbe', price: 18000, rating: 4.5, reviews: 22, category: 'Crafts', condition: 'New', certificate: 'Beadwork', delivery: '1 day delivery', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80', imageAlt: 'Handmade necklace with beads' },
  { id: 8, name: 'Fresh Honey Jar', seller: 'Peter O.', location: 'Masaka', price: 22000, rating: 4.8, reviews: 38, category: 'Agriculture', condition: 'Fresh', certificate: 'Beekeeping', delivery: 'Pickup available', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80', imageAlt: 'Jar of honey with honeycomb' },
  { id: 9, name: 'Braided Wig', seller: 'Diana L.', location: 'Kampala', price: 45000, rating: 4.9, reviews: 15, category: 'Beauty', condition: 'Made to order', certificate: 'Hair Braiding', delivery: '2 day delivery', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80', imageAlt: 'Braided hairstyle close-up' },
  { id: 10, name: 'Tie-Dye Shirt', seller: 'Alice W.', location: 'Mbale', price: 20000, rating: 4.6, reviews: 29, category: 'Textiles', condition: 'New', certificate: 'Tie-Dye Textiles', delivery: 'Bus parcel', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80', imageAlt: 'Colorful folded textile fabric' },
  { id: 11, name: 'Mushroom Pack', seller: 'James R.', location: 'Fort Portal', price: 9000, rating: 4.7, reviews: 41, category: 'Agriculture', condition: 'Fresh', certificate: 'Mushroom Growing', delivery: 'Pickup available', image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=900&q=80', imageAlt: 'Fresh mushrooms ready for cooking' },
  { id: 12, name: 'Leather Shoulder Bag', seller: 'Brenda S.', location: 'Kampala', price: 55000, rating: 4.8, reviews: 8, category: 'Crafts', condition: 'New', certificate: 'Leatherwork', delivery: '1 day delivery', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80', imageAlt: 'Brown leather shoulder bag' },
  { id: 13, name: 'Chili Sauce Bottle', seller: 'Miriam C.', location: 'Gulu', price: 7000, rating: 4.5, reviews: 53, category: 'Food Processing', condition: 'Fresh', certificate: 'Fruit Processing', delivery: 'Pickup available', image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80', imageAlt: 'Bottled red chili sauce' },
  { id: 14, name: 'Carved Wooden Bowl', seller: 'Charles T.', location: 'Mbarara', price: 30000, rating: 4.7, reviews: 19, category: 'Crafts', condition: 'New', certificate: 'Woodcarving', delivery: '2 day delivery', image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80', imageAlt: 'Carved wooden bowl on a table' },
  { id: 15, name: 'Organic Coffee Pack', seller: 'Rose N.', location: 'Kabale', price: 18000, rating: 4.9, reviews: 62, category: 'Agriculture', condition: 'Fresh', certificate: 'Plant Propagation', delivery: 'Bus parcel', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80', imageAlt: 'Roasted coffee beans close-up' },
  { id: 16, name: 'Embroidered Table Cloth', seller: 'Stella E.', location: 'Soroti', price: 28000, rating: 4.6, reviews: 14, category: 'Textiles', condition: 'New', certificate: 'Embroidery', delivery: '2 day delivery', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80', imageAlt: 'Detailed patterned fabric textile' },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.category))).sort()];
const LOCATIONS = ['All Uganda', ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.location))).sort()];
const SORT_OPTIONS = [
  { value: 'rating', label: 'Recommended' },
  { value: 'price_asc', label: 'Lowest price' },
  { value: 'price_desc', label: 'Highest price' },
  { value: 'reviews', label: 'Most reviewed' },
];

const CATEGORY_BG: Record<string, string> = {
  Agriculture: '#E3F6E8',
  Baking: '#FFF4DB',
  Beauty: '#F5EBE5',
  Crafts: '#EEF4FB',
  'Food Processing': '#FFF4DB',
  Tailoring: '#E8EFE7',
  Textiles: '#F6F8F5',
};

const PAGE_SIZE = 12;
const DELIVERY_FEE = 3000;

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

export default function Marketplace() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { isLoggedIn, login, signup } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Uganda');
  const [sortBy, setSortBy] = useState('rating');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [page, setPage] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const filteredProducts = useMemo(() => {
    const list = ALL_PRODUCTS.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.certificate.toLowerCase().includes(q);
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchLocation = selectedLocation === 'All Uganda' || p.location === selectedLocation;
      return matchSearch && matchCat && matchLocation;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const cartProducts = cart
    .map((line) => {
      const product = ALL_PRODUCTS.find((item) => item.id === line.productId);
      return product ? { ...product, quantity: line.quantity } : null;
    })
    .filter(Boolean) as Array<Product & { quantity: number }>;
  const subtotal = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const hasMore = visibleProducts.length < filteredProducts.length;
  const heroProduct = ALL_PRODUCTS[0];
  const featuredProducts = ALL_PRODUCTS.slice(1, 4);

  const updateQuantity = (productId: number, direction: 1 | -1) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.productId === productId);
      if (!existing && direction === 1) return [...prev, { productId, quantity: 1 }];
      return prev
        .map((line) => (line.productId === productId ? { ...line, quantity: line.quantity + direction } : line))
        .filter((line) => line.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => setCart((prev) => prev.filter((line) => line.productId !== productId));

  const beginCheckout = () => {
    setCheckoutOpen(true);
    setPaymentReady(isLoggedIn);
  };

  const handleAuth = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError('');

    if (!buyerPhone.trim() || !buyerPassword.trim()) {
      setAuthError('Enter your phone number and password to continue.');
      return;
    }

    const ok = authMode === 'login'
      ? login(buyerPhone.trim(), buyerPassword)
      : signup({
        email: buyerPhone.trim(),
        phone: buyerPhone.trim(),
        password: buyerPassword,
        firstName: buyerName.trim() || 'Buyer',
        district: selectedLocation === 'All Uganda' ? 'Uganda' : selectedLocation,
        children: 0,
      });

    if (!ok) {
      setAuthError(authMode === 'login' ? 'Could not sign in with those details.' : 'That phone number already has an account. Try signing in.');
      return;
    }

    setPaymentReady(true);
  };

  return (
    <div className="app-page max-w-none">
      <section className="overflow-hidden rounded-2xl bg-[#0F2C1A] text-white">
        <div className="grid min-h-[440px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#F3C74D]">
                <ShieldCheck size={14} />
                Craft Hub verified sellers
              </div>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                Buy handmade food, crafts, fashion, and home goods from trained local makers.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/76 sm:text-base">
                Browse real products with prices up front, add what you need to cart, then create an account only when you are ready to pay.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="relative">
                <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#526356]" />
                <input
                  type="text"
                  placeholder="Search cakes, baskets, soap, dresses..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  className="w-full rounded-xl border border-white/20 bg-white px-11 py-3 text-sm font-semibold text-[#17231A] outline-none placeholder:text-[#6E7B70] focus:ring-2 focus:ring-[#F3C74D]"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#526356] hover:bg-[#E8EFE7]">
                    <X size={15} />
                  </button>
                )}
              </div>
              <button onClick={beginCheckout} disabled={cartCount === 0} className="app-primary-btn bg-[#F3C74D] text-[#132416] hover:bg-[#E9B92B]">
                <ShoppingCart size={16} />
                Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px]">
            <img
              src={heroProduct.image}
              alt={heroProduct.imageAlt}
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-4 text-[#17231A] shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:inset-x-6 sm:bottom-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#526356]">Featured today</p>
                  <h2 className="mt-1 text-lg font-extrabold">{heroProduct.name}</h2>
                  <p className="mt-1 text-xs font-semibold text-[#526356]">{heroProduct.seller} / {heroProduct.location}</p>
                </div>
                <p className="whitespace-nowrap text-lg font-extrabold text-[#1F5C2E]">{formatUGX(heroProduct.price)}</p>
              </div>
              <button onClick={() => updateQuantity(heroProduct.id, 1)} className="app-primary-btn mt-4 w-full">
                <ShoppingCart size={15} />
                Add featured product
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featuredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => updateQuantity(product.id, 1)}
            className="overflow-hidden rounded-2xl border border-border bg-white text-left transition hover:-translate-y-0.5 hover:border-[#BFCDBA]"
          >
            <img src={product.image} alt={product.imageAlt} className="h-36 w-full object-cover" />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="truncate text-sm font-extrabold text-foreground">{product.name}</p>
                <p className="whitespace-nowrap text-sm font-extrabold text-primary">{formatUGX(product.price)}</p>
              </div>
              <p className="text-xs font-semibold text-muted-foreground">{product.location} / {product.delivery}</p>
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="app-card p-4">
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="flex flex-wrap gap-2 xl:flex-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setPage(1); }}
                    className="app-chip px-3 py-2"
                    style={selectedCategory === cat ? { backgroundColor: NAVY, borderColor: NAVY, color: '#fff' } : undefined}
                  >
                    {cat}
                    {cat !== 'All' && <span className="opacity-70">{ALL_PRODUCTS.filter((p) => p.category === cat).length}</span>}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[380px]">
                <div className="relative">
                  <select value={selectedLocation} onChange={(e) => { setSelectedLocation(e.target.value); setPage(1); }} className="app-input w-full appearance-none pr-8">
                    {LOCATIONS.map((location) => <option key={location}>{location}</option>)}
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="app-input w-full appearance-none pr-8">
                    {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All Uganda') && (
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLocation('All Uganda'); }} className="text-xs font-bold text-muted-foreground hover:text-foreground">
                Reset filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try changing the category, location, or search phrase."
              action={<button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLocation('All Uganda'); }} className="app-primary-btn">Clear filters</button>}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => {
                  const line = cart.find((item) => item.productId === product.id);
                  return (
                    <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:border-[#BFCDBA]">
                      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: CATEGORY_BG[product.category] ?? '#EEF4FB' }}>
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-foreground">{product.condition}</span>
                        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-foreground">{product.category}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="mb-1 text-sm font-extrabold leading-snug text-foreground transition group-hover:text-primary">{product.name}</h3>
                        <div className="mb-1 flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{product.seller[0]}</div>
                          <span className="text-xs font-bold text-muted-foreground">{product.seller}</span>
                        </div>
                        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={10} /> {product.location} / {product.delivery}
                        </div>
                        <div className="mb-3 flex items-center gap-1.5">
                          <StarRating rating={product.rating} />
                          <span className="text-xs font-extrabold" style={{ color: GOLD }}>{product.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#FFF4DB] px-2 py-1 text-xs font-bold text-[#7A5A00]">
                          <Award size={11} />
                          {product.certificate}
                        </div>
                        <p className="mb-3 mt-auto text-base font-extrabold text-primary">{formatUGX(product.price)}</p>
                        <div className="flex gap-2">
                          {line ? (
                            <div className="flex flex-1 items-center justify-between rounded-xl border border-border bg-white px-2 py-1">
                              <button onClick={() => updateQuantity(product.id, -1)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted" aria-label="Reduce quantity">
                                <Minus size={13} />
                              </button>
                              <span className="text-sm font-extrabold text-foreground">{line.quantity}</span>
                              <button onClick={() => updateQuantity(product.id, 1)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted" aria-label="Increase quantity">
                                <Plus size={13} />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => updateQuantity(product.id, 1)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white transition hover:opacity-90 active:translate-y-px" style={{ backgroundColor: NAVY }}>
                              <ShoppingCart size={12} />
                              Add to Cart
                            </button>
                          )}
                          <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition hover:bg-[#DCE4DA]" aria-label="View product">
                            <Eye size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
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

        <aside className="app-card h-fit overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Cart</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">{cartCount} items</span>
            </div>
          </div>

          {cartProducts.length === 0 ? (
            <div className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary">
                <ShoppingCart size={20} />
              </div>
              <p className="text-sm font-bold text-foreground">No products selected</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Add products to prepare your order.</p>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
                {cartProducts.map((product) => (
                  <div key={product.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-start gap-3">
                      <img src={product.image} alt={product.imageAlt} className="h-12 w-12 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">{product.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{product.seller}</p>
                        <p className="mt-1 text-xs font-bold text-primary">{formatUGX(product.price)} x {product.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="rounded-lg p-1 text-red-500 hover:bg-red-50" aria-label="Remove from cart">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatUGX(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery estimate</span>
                  <span>{formatUGX(DELIVERY_FEE)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-foreground">
                  <span>Total</span>
                  <span>{formatUGX(total)}</span>
                </div>
              </div>

              <button onClick={beginCheckout} className="app-primary-btn w-full">
                <CreditCard size={16} />
                Checkout
              </button>
            </div>
          )}
        </aside>
      </section>

      {checkoutOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={(event) => event.currentTarget === event.target && setCheckoutOpen(false)}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#0F2C1A] px-5 py-4 text-white">
              <div>
                <p className="text-sm font-extrabold">Checkout</p>
                <p className="text-xs text-white/70">{cartCount} item{cartCount !== 1 ? 's' : ''} / {formatUGX(total)}</p>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {!paymentReady ? (
                <div>
                  <div className="mb-5 rounded-xl border border-[#BFCDBA] bg-[#F0FDF4] p-4">
                    <div className="flex gap-3">
                      <Lock size={18} className="mt-0.5 text-[#1F5C2E]" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Create an account before payment</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Buyers can browse freely. To protect orders and payments, sign in or create an account before continuing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
                    {[
                      { value: 'signup', label: 'Create Account', icon: UserPlus },
                      { value: 'login', label: 'Sign In', icon: Lock },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = authMode === item.value;
                      return (
                        <button
                          key={item.value}
                          onClick={() => { setAuthMode(item.value as 'signup' | 'login'); setAuthError(''); }}
                          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition"
                          style={active ? { backgroundColor: '#fff', color: NAVY } : { color: '#526356' }}
                        >
                          <Icon size={14} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleAuth} className="space-y-3">
                    {authMode === 'signup' && (
                      <input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} placeholder="Your name" className="app-input w-full" />
                    )}
                    <div className="relative">
                      <Phone size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input value={buyerPhone} onChange={(event) => setBuyerPhone(event.target.value)} placeholder="Phone number" className="app-input w-full pl-10" />
                    </div>
                    <input value={buyerPassword} onChange={(event) => setBuyerPassword(event.target.value)} type="password" placeholder="Password" className="app-input w-full" />
                    {authError && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{authError}</div>}
                    <button type="submit" className="app-primary-btn w-full">
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#BFCDBA] bg-[#F0FDF4] p-4">
                    <div className="flex gap-3">
                      <ShieldCheck size={20} className="mt-0.5 text-[#1F5C2E]" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Account ready</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          You can now proceed to payment. Mobile money integration can connect here.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatUGX(subtotal)}</span>
                    </div>
                    <div className="mb-3 flex justify-between text-sm text-muted-foreground">
                      <span>Delivery estimate</span>
                      <span>{formatUGX(DELIVERY_FEE)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-extrabold text-foreground">
                      <span>Total</span>
                      <span>{formatUGX(total)}</span>
                    </div>
                  </div>

                  <button onClick={() => navigate('/billing')} className="app-primary-btn w-full">
                    <CreditCard size={16} />
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
