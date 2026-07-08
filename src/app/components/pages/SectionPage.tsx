import { ReactNode } from 'react';
interface SectionPageProps {
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export default function SectionPage({ title, description, actions, children }: SectionPageProps) {
  return (
    <div className="app-page">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="app-page-title">{title}</h1>
          <p className="app-page-copy">{description}</p>
        </div>
        {actions && <div>{actions}</div>}
      </div>

      <div className="grid gap-6">{children}</div>
    </div>
  );
}
