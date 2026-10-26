import { useState } from 'react';
import { Eye, EyeOff, Globe, MapPin, LogOut, Building2, UserRound } from 'lucide-react';
import ReportButton from './ReportButton';
import { Button } from '@project/components/ui/button';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@project/components/ui/alert-dialog';
import { CLIENT, COMPANY, PRODUCT_RECORD, mask } from './data';
import { ActiveBadge, OngoingBadge } from './StatusBadge';
import ClientRecordFields from './ClientRecordFields';

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="font-semibold sm:text-right">{value}</span>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Globe; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><Icon className="h-4 w-4" /> {title}</h3>
      {children}
    </section>
  );
}

const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-primary hover:underline">{children}</a>
);

export default function Dashboard({ onQuit }: { onQuit: () => void }) {
  const [show, setShow] = useState(false);
  const v = (s: string, keep = 4) => (show ? s : mask(s, keep));

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(222_60%_14%)] to-primary p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">User Name</p>
            <p className="text-xl font-extrabold sm:text-2xl">{v(CLIENT.fullName, 6)}</p>
            <p className="pt-2 text-sm text-white/80">MyKad: <span className="font-mono font-semibold text-white">{v(CLIENT.myKad)}</span></p>
            <p className="text-sm text-white/80">Product: <span className="font-semibold text-white">{CLIENT.product}</span></p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="rounded-full bg-white p-0.5"><ActiveBadge /></div>
            <Button size="sm" variant="secondary" className="rounded-full" onClick={() => setShow(!show)}>
              {show ? <EyeOff className="mr-1.5 h-4 w-4" /> : <Eye className="mr-1.5 h-4 w-4" />} {show ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
      </div>

      <Panel title="Detail of Product — DUITJOM" icon={Globe}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b py-3">
          <span className="text-lg font-extrabold">{PRODUCT_RECORD.name}</span>
          <ActiveBadge />
        </div>
        <Row label="Application No." value={<span className="font-mono">{PRODUCT_RECORD.applicationNo}</span>} />
        <Row label="Start/End Date" value={PRODUCT_RECORD.startDate + ' - ' + PRODUCT_RECORD.endDate} />
        <Row label="Latest Transaction" value={PRODUCT_RECORD.latestTransaction} />
        <Row label="Latest Amount" value={PRODUCT_RECORD.latestAmount} />
        <Row label="Status Record" value={<OngoingBadge />} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Client Detail" icon={UserRound}>
          <ClientRecordFields format={v} />
        </Panel>
        <Panel title="Merchant & Product Info" icon={Globe}>
          <p className="text-xs text-muted-foreground">Creditor / Merchant record: <b className="text-foreground">1 Found</b></p>
          <Row label="Product" value="DUITJOM / Finance" />
          <Row label="Website" value={<Link href="https://www.duitjom.com">www.duitjom.com</Link>} />
          <Row label="DUITJOM Sites" value={<span>1 x <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">active</span></span>} />
          <Row label="Application site" value={<Link href={PRODUCT_RECORD.applicationSite}>HTTPS://WWW.DUITJOM.COM</Link>} />
          <Row label="Repayment site" value={<Link href={PRODUCT_RECORD.repaymentSite}>HTTPS://WWW.DUITJOM.MY</Link>} />
        </Panel>
      </div>

      <Panel title="Details Info of Company" icon={Building2}>
        <p className="py-2 text-lg font-extrabold">{COMPANY.name}</p>
        <Row label="Business Register No." value={COMPANY.ssm} />
        <Row label="Fax" value={COMPANY.fax} />
        <Row label="Service" value={COMPANY.service} />
        <div className="pt-3 text-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</p>
          <p className="mt-1">{COMPANY.address}</p>
          <a href={COMPANY.maps} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-primary hover:underline"><MapPin className="h-4 w-4" /> Open in Google Maps</a>
        </div>
      </Panel>

      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <span className="text-sm font-bold uppercase tracking-wider">Status Application</span>
        <ActiveBadge />
      </div>

      <div className="flex justify-between gap-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="h-12 rounded-xl px-6"><LogOut className="mr-2 h-4 w-4" /> Quit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quit the portal?</AlertDialogTitle>
              <AlertDialogDescription>You will be signed out and the form will be closed.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onQuit}>Quit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ReportButton />
      </div>
    </div>
  );
}
