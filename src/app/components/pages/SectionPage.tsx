import { ReactNode } from 'react';
import { useLocale } from '../../context/LocaleContext';

interface SectionPageProps {
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export default function SectionPage({ title, description, actions, children }: SectionPageProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('section')}</p>
          <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
        </div>
        {actions && <div>{actions}</div>}
      </div>

      <div className="grid gap-6">{children}</div>
    </div>
  );
}
