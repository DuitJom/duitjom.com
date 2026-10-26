import { useState } from 'react';
import { Toaster } from '@project/components/ui/sonner';
import TopNav from './components/TopNav';
import LoginStepOne from './components/LoginStepOne';
import SignInGuide from './components/SignInGuide';
import LoginStepTwo from './components/LoginStepTwo';
import type { Session } from './components/SectionView';
import TemporaryError from './components/TemporaryError';
import { cn } from '@project/components/lib/utils';

const BG = 'https://images.fillout.com/orgid-902182/flowpublicid-obvwexdqqo/widgetid-default/g9Fm5m8fBZxHVU24SmBkrM/pasted-image-1792701673972-w1t1zojr.jpeg';

function Stepper({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-6 flex gap-2">
      {[1, 2].map((i) => (
        <div key={i} className={cn('h-1.5 flex-1 rounded-full transition', step >= i ? 'bg-primary' : 'bg-muted')} />
      ))}
    </div>
  );
}

export default function App() {
  return <Portal />;
}

function Portal() {
  const [step, setStep] = useState<1 | 2>(1);
  const [merchantId, setMerchantId] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const role = 'user' as const;

  const logout = () => { setSession(null); setStep(1); setMerchantId(''); };

  const bg = (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <img src={BG} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_70%_8%/0.75)] via-[hsl(222_70%_10%/0.6)] to-[hsl(222_70%_6%/0.85)]" />
    </div>
  );

  if (session) {
    return (
      <div className="min-h-screen">
        {bg}
        <TopNav onLogout={logout} />
        <main className="px-4 py-10 sm:py-16">
          <TemporaryError onLogout={logout} />
        </main>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {bg}
      <TopNav />
      <main className="mx-auto flex max-w-xl flex-col px-4 py-10 sm:py-16">
        <div className="mb-8 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{step === 1 ? 'Merchant Sign In' : 'Client Verification'}</h1>
          <p className="mt-2 text-white/70">{step === 1 ? 'Verify your merchant account to get started' : 'Complete your client details to continue'}</p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <Stepper step={step} />
          {step === 1 ? (
            <LoginStepOne onContinue={(id) => { setMerchantId(id); setStep(2); }} />
          ) : (
            <LoginStepTwo merchantId={merchantId} role={role}
              onDone={(email) => setSession({ merchantId, email, role })} />
          )}
          {step === 1 && <SignInGuide />}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
