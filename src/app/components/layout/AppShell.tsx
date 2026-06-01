import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Heart,
  Home,
  Layers,
  MessageSquare,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  Wallet,
  Bell,
  Search,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '../ui/sidebar';

const navigation = [
  { title: 'Dashboard', path: '/dashboard', icon: Home },
  { title: 'Learn', path: '/learn', icon: BookOpen },
  { title: 'Marketplace', path: '/market', icon: ShoppingBag },
  { title: 'My Shop', path: '/my-shop', icon: ShoppingCart },
  { title: 'Baby Health', path: '/baby-health', icon: Heart },
  { title: 'Profile', path: '/profile', icon: User },
];

const secondaryNavigation = [
  { title: 'Analytics', path: '/analytics', icon: BarChart3 },
  { title: 'Reports', path: '/reports', icon: FileText },
  { title: 'Messages', path: '/messages', icon: MessageSquare },
  { title: 'Team', path: '/team', icon: Layers },
  { title: 'Billing', path: '/billing', icon: CreditCard },
  { title: 'Settings', path: '/settings', icon: Settings },
];

function formatBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  return segments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    path: `/${segments.slice(0, index + 1).join('/')}`,
  }));
}

export default function AppShell() {
  const { t, locale } = useLocale();
  const { userProfile } = useUser();
  const { logout } = useAuth();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const userName = userProfile?.firstName || t('user') || 'User';
  const breadcrumbs = useMemo(() => formatBreadcrumbs(location.pathname), [location.pathname]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col xl:flex-row">
          <Sidebar
            data-sidebar="main"
            className="border-r border-slate-200 bg-white px-3 py-4 shadow-sm"
          >
            <SidebarHeader className="px-2">
              <div className="flex items-center justify-between gap-3 px-2 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-600 text-white flex items-center justify-center text-lg font-semibold">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                      CraftHub
                    </p>
                    <p className="text-xs text-slate-500">Modern marketplace</p>
                  </div>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
              <SidebarGroup className="space-y-3">
                <SidebarGroupLabel>{t('workspace') || 'Workspace'}</SidebarGroupLabel>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="text-slate-700">
                          <NavLink to={item.path} className="flex items-center gap-3 w-full">
                            <Icon size={18} />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator className="my-4" />

              <SidebarGroup className="space-y-3">
                <SidebarGroupLabel>{t('insights') || 'Insights'}</SidebarGroupLabel>
                <SidebarMenu>
                  {secondaryNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="text-slate-700">
                          <NavLink to={item.path} className="flex items-center gap-3 w-full">
                            <Icon size={18} />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto px-2 pt-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t('currentLocale') || 'Locale'}</p>
                <p className="mt-1 font-semibold" style={{ color: 'var(--navy)' }}>{locale.toUpperCase()}</p>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex min-h-screen flex-1 flex-col bg-slate-50">
            <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('welcomeBack') || 'Welcome back'}</p>
                  <h1 className="text-2xl font-semibold" style={{ color: 'var(--navy)' }}>
                    {t('helloName').replace('{name}', userName)}
                  </h1>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <div className="relative w-full sm:w-80">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={t('searchPlaceholder') || 'Search insights, products, skills...'}
                      className="w-full rounded-full border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-slate-300 focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
                      <Bell size={18} />
                    </button>

                    <button className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
                      <Settings size={18} />
                    </button>

                    <button
                      onClick={logout}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span className="hidden sm:inline">{userName}</span>
                        <ChevronDown size={14} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 p-6">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <NavLink to="/dashboard" className="hover:text-slate-700">
                  {t('home') || 'Home'}
                </NavLink>
                <span className="text-slate-300">/</span>
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.path} className={index === breadcrumbs.length - 1 ? 'text-slate-900 font-semibold' : 'hover:text-slate-700'}>
                    {crumb.label}
                  </span>
                ))}
              </div>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
