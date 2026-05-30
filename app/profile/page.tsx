import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Profile</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Account & settings</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Manage your preferences, update your profile, and keep your account secure.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">Alex Green</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">alex@greenroute.org</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Campus</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">University of EcoTech</p>
            </div>
          </div>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Security</h2>
          <p className="text-sm text-slate-600">Update your password, login options, and notification preferences.</p>
          <Button>Sign out</Button>
        </Card>
      </div>
    </section>
  );
}
