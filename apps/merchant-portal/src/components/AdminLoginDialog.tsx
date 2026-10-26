import { useState } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { Button } from '@project/components/ui/button';
import { verifyAdmin } from 'zitejs/api';

export default function AdminLoginDialog({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { valid } = await verifyAdmin({ username, password });
      if (!valid) { setError('Invalid username or password.'); return; }
      setUsername(''); setPassword('');
      onSuccess();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { setError(''); onClose(); } }}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldAlert className="h-5 w-5" /></div>
          <DialogTitle>Admin access required</DialogTitle>
          <DialogDescription>Enter User &amp; Password to continue.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5"><Label>User</Label><Input value={username} onChange={(e) => setUsername(e.target.value)} className="h-11 rounded-xl" autoFocus /></div>
          <div className="space-y-1.5"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl" /></div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <Button type="submit" className="h-11 w-full rounded-xl" disabled={!username || !password || loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
