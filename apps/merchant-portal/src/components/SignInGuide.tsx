import { KeyRound, LogIn, ShieldCheck, UserCheck } from 'lucide-react';

const STEPS: { icon: typeof LogIn; title: string; detail: string }[] = [
  { icon: KeyRound, title: 'Enter your Merchant ID & Passkey', detail: 'Key in your Merchant ID and Passkey on the form above, then tap Find.' },
  { icon: ShieldCheck, title: 'Verify your merchant account', detail: 'We check your details. When a match is found you will see "1 Rekod ditemui" and your merchant card.' },
  { icon: UserCheck, title: 'Complete your client details', detail: 'Add your phone number, create a 6-digit access PIN and confirm your e-mail to continue.' },
  { icon: LogIn, title: 'Sign in to the portal', detail: 'Your details are submitted and you are taken into the Merchant Portal dashboard.' },
];

export default function SignInGuide() {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">How to sign in</h3>
      <ol className="space-y-3">
        {STEPS.map(({ icon: Icon, title, detail }, i) => (
          <li key={title} className="flex gap-3 rounded-xl border bg-card p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">{i + 1}</span>
                <p className="font-semibold text-foreground">{title}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
