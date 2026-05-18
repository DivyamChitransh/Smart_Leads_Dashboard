import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AuthLayout({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95">
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-400/15 dark:text-primary-200">
            Smart Leads
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
