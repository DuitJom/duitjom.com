import { useState } from 'react';
import { toast } from 'sonner';
import { FileBarChart, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@project/components/ui/dialog';
import { requestReport } from 'zitejs/api';
import { CLIENT } from './data';

export default function ReportButton({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const report = async () => {
    setOpen(true);
    setSending(true);
    try {
      await requestReport({ fullName: CLIENT.fullName, myKad: CLIENT.myKad, email: CLIENT.email, phone: CLIENT.phone, product: CLIENT.product, status: CLIENT.status });
    } catch (e) {
      setOpen(false);
      toast.error(e instanceof Error ? e.message : 'Request failed.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button className={`h-12 rounded-xl px-6 ${className}`} onClick={report} disabled={sending}>
        {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileBarChart className="mr-2 h-4 w-4" />} Request Report
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader className="items-center">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              {sending ? <Loader2 className="h-7 w-7 animate-spin" /> : <MailCheck className="h-7 w-7" />}
            </div>
            <DialogTitle>{sending ? 'Please wait...' : 'Report requested'}</DialogTitle>
            <DialogDescription className="text-center">
              Please wait, we're sending your report to your e-mail address. Please check your inbox to get the latest report statement.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button className="w-full rounded-xl" onClick={() => setOpen(false)} disabled={sending}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
