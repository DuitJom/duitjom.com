import { motion } from 'framer-motion';
import { Button } from '@project/components/ui/button';
import { Globe, MapPin, Phone, Building2 } from 'lucide-react';

const MAPS = 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x304ac5c47c1e91ed:0x865f1174ab57e5f7?entry=s&sa=X&ved=2ahUKEwiGg9XRkc6XAxWf1DgGHTGcAosQ4kB6BAgEEAA&hl=en';

export default function MerchantCard({ onBack, onContinue, continueLabel = 'Continue' }: { onBack: () => void; onContinue: () => void; continueLabel?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-md)]">
      <div className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        Creditor / Merchant record : 1 Found.
      </div>
      <div className="divide-y">
        <div className="p-5 text-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Product</p>
          <p className="text-lg font-bold">DUITJOM / Finance</p>
          <a href="https://www.duitjom.com" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-primary hover:underline">
            <Globe className="h-4 w-4" /> www.duitjom.com
          </a>
        </div>
        <div className="flex gap-4 p-5 text-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-bold">GETMORE RESOURCES SDN BHD</p>
            <p><span className="text-muted-foreground">Business Register No.:</span> SSM: 202101021538 / 1421838-P</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> +60 16-534 9363</p>
            <p><span className="text-muted-foreground">Service:</span> Financial Product</p>
          </div>
        </div>
        <div className="p-5 text-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Address</p>
          <p className="mt-1">47A Tingkat, Bandar Sunway, 1, Jln Todak 4, Seberang Jaya, 13700 Perai, Pulau Pinang.</p>
          <a href={MAPS} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-primary hover:underline">
            <MapPin className="h-4 w-4" /> Open in Google Maps
          </a>
        </div>
        <div className="flex justify-between gap-3 p-5">
          <Button variant="outline" onClick={onBack}>Go back</Button>
          <Button onClick={onContinue}>{continueLabel}</Button>
        </div>
      </div>
    </motion.div>
  );
}
