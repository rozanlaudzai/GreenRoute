import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-semibold text-brand-700">
          Green Route
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/trips">Calculator</Link>
          <Link href="/challenges">Challenges</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/admin" className="rounded-full bg-slate-900 px-4 py-2 text-white">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
