import { Building2, Globe, Headset, MapPin, UserRound } from 'lucide-react';
import ClientRecordFields from './ClientRecordFields';
import { CLIENT, PRODUCT_RECORD, PROFILE_COMPANY } from './data';
import { ActiveBadge } from './StatusBadge';
import ReportButton from './ReportButton';

export default function MyProfile() {
  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border bg-background p-2.5 text-primary"><UserRound className="h-5 w-5" /></div>
            <div><h2 className="text-sm font-bold uppercase tracking-wider">Client Detail</h2><p className="mt-0.5 font-mono text-xs text-muted-foreground">{PRODUCT_RECORD.applicationNo}</p></div>
          </div>
          <ActiveBadge />
        </div>
        <div className="p-5"><ClientRecordFields /></div>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"><Building2 className="h-4 w-4 text-primary" /> Merchant Info</h2>
          <span className="rounded-md border bg-background px-3 py-1.5 font-mono text-xs font-semibold">{PRODUCT_RECORD.merchantId}</span>
        </div>
        <dl className="grid gap-4 p-5 sm:grid-cols-2">
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Product</dt><dd className="mt-2 rounded-lg border bg-muted/40 p-3 text-sm font-semibold">{PRODUCT_RECORD.product}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Site</dt><dd className="mt-2 rounded-lg border bg-muted/40 p-3 text-sm font-semibold"><a href={PRODUCT_RECORD.applicationSite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 break-all text-primary hover:underline"><Globe className="h-4 w-4 shrink-0" />WWW.DUITJOM.COM</a></dd></div>
        </dl>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <h2 className="border-b bg-muted/40 px-5 py-4 text-sm font-bold uppercase tracking-wider">Merchant Info — Company</h2>
        <div className="space-y-5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border bg-white p-3"><img src={PROFILE_COMPANY.logo} alt="Merchant company logo" className="h-full w-full object-contain" /></div>
            <div className="min-w-0"><p className="text-xs uppercase tracking-wider text-muted-foreground">Company</p><h3 className="mt-1 break-words text-lg font-bold">{CLIENT.merchantName}</h3><p className="mt-2 text-sm"><span className="text-muted-foreground">Service:</span> {PROFILE_COMPANY.service}</p></div>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Address</h3>
            <p className="mt-2 text-xs font-semibold">ORIGIN : {PROFILE_COMPANY.origin}</p>
            <p className="mt-3 max-w-md text-sm leading-6">{PROFILE_COMPANY.address}</p>
            <a href={PROFILE_COMPANY.maps} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><MapPin className="h-4 w-4" />Open in maps</a>
          </div>
          <a href={PROFILE_COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold text-primary hover:bg-muted"><Headset className="h-4 w-4" />{PROFILE_COMPANY.phone}</a>
        </div>
      </section>
      <div className="flex justify-end"><ReportButton /></div>
    </div>
  );
}
