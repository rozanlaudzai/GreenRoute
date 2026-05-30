import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Green Route</p>
          <p className="mt-2 text-sm text-slate-400">A sustainability platform for smarter travel.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
