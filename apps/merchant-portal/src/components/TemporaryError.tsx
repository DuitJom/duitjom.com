import { useState } from 'react';
import { AlertTriangle, Loader2, LogOut, RefreshCw } from 'lucide-react';
import { checkDashboardAvailability } from 'zitejs/api';
import { Button } from '@project/components/ui/button';

export default function TemporaryError({ onLogout }: { onLogout: () => void }) {
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');
  const retry = async () => {
    if (checking) return;
    setChecking(true);
    setMessage('');
    try {
      const result = await checkDashboardAvailability({});
      if (result.available) { onLogout(); return; }
      setMessage('The dashboard is still being updated. Please try again later.');
    } catch {
      setMessage('Unable to check availability. Please try again.');
    } finally {
      setChecking(false);
    }
  };
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-white/20 bg-card/95 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600"><AlertTriangle className="h-8 w-8" aria-hidden="true" /></div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Service temporarily unavailable</p>
      <h1 className="mt-3 text-2xl font-extrabold">We cannot open your dashboard right now</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">The dashboard is currently being updated. Please try again later.</p>
      <div role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {message && <p>{message}</p>}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" disabled={checking} onClick={onLogout} className="h-12 rounded-xl"><LogOut className="mr-2 h-4 w-4" />Log out</Button>
        <Button onClick={retry} disabled={checking} className="h-12 rounded-xl">{checking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}{checking ? 'Checking...' : 'Retry'}</Button>
      </div>
    </section>
  );
}
