import { CLIENT } from './data';

export default function ClientRecordFields({ format = (value: string) => value }: { format?: (value: string, keep?: number) => string }) {
  const fields = [
    ['Full Name', format(CLIENT.fullName, 6)],
    ['No. MyKad', format(CLIENT.myKad)],
    ['E-mail', format(CLIENT.email, 10)],
    ['No. Phone', format(CLIENT.phone)],
    ['Sex', CLIENT.sex],
    ['Religion/Race', CLIENT.religionRace],
  ];
  return (
    <dl className="grid min-w-0 gap-4 py-3 sm:grid-cols-2">
      {fields.map(([label, value]) => (
        <div key={label} className="min-w-0 space-y-1.5">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
          <dd className="min-h-11 break-words rounded-lg border bg-muted/40 px-3 py-3 text-sm font-semibold [overflow-wrap:anywhere]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
