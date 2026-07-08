import type { ComponentType, ReactNode } from 'react';
import {
  Award,
  Baby,
  BookOpen,
  Boxes,
  Brush,
  CakeSlice,
  Coffee,
  Flame,
  Flower2,
  HeartPulse,
  Package,
  Palette,
  Scissors,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sprout,
  UserRound,
} from 'lucide-react';

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

const categoryIcons: Record<string, IconComponent> = {
  Agriculture: Sprout,
  Baking: CakeSlice,
  Beauty: Sparkles,
  Crafts: Brush,
  Food: Flame,
  Services: Boxes,
  Soap: Flower2,
  'Soap Making': Flower2,
  Tailoring: Scissors,
  Textiles: Shirt,
  Weaving: Palette,
  Health: HeartPulse,
  Baby: Baby,
  Learning: BookOpen,
  Product: ShoppingBag,
  Certificate: Award,
  Coffee: Coffee,
};

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="app-page-title">{title}</h1>
        {description && <p className="app-page-copy">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = 'green',
}: {
  icon: IconComponent;
  label: ReactNode;
  value: ReactNode;
  tone?: 'green' | 'navy' | 'gold' | 'red';
}) {
  const toneClass = {
    green: 'bg-emerald-50 text-emerald-800',
    navy: 'bg-blue-50 text-[#003366]',
    gold: 'bg-amber-50 text-amber-800',
    red: 'bg-red-50 text-red-700',
  }[tone];

  return (
    <div className="app-card p-4">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <p className="text-xl font-extrabold text-foreground">{value}</p>
      <p className="app-label mt-0.5">{label}</p>
    </div>
  );
}

export function GlyphTile({
  category,
  label,
  size = 'md',
}: {
  category?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const key = category || label || 'Product';
  const Icon = categoryIcons[key] || categoryIcons.Product || Package;
  const sizeClass = size === 'lg' ? 'h-20 w-20 rounded-2xl' : size === 'sm' ? 'h-10 w-10 rounded-xl' : 'h-14 w-14 rounded-2xl';
  const iconSize = size === 'lg' ? 34 : size === 'sm' ? 18 : 24;

  return (
    <div className={`${sizeClass} flex shrink-0 items-center justify-center border border-primary/10 bg-[#E3F6E8] text-primary`}>
      <Icon size={iconSize} strokeWidth={1.75} />
    </div>
  );
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
}: {
  icon?: IconComponent;
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="app-card p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ProductMeta({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">{children}</span>;
}

export { Package, UserRound };
