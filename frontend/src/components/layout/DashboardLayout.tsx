import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.10),_transparent_30%),radial-gradient(circle_at_75%_10%,_rgba(16,185,129,0.08),_transparent_20%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_24%),radial-gradient(circle_at_75%_10%,_rgba(56,189,248,0.10),_transparent_18%)]">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
