import { AnimatePresence, motion } from 'framer-motion';
import { Dices, User, Database, FileText, Mail, Trash2, SearchCheck, Settings, Bell, ShieldCheck, Users, BarChart3, X, Lock } from 'lucide-react';
import { cn } from '@project/components/lib/utils';

export const LOCKED: Section[] = ['database', 'records', 'security', 'settings'];

export type Section = 'dashboard' | 'profile' | 'database' | 'records' | 'creditor' | 'users' | 'reports' | 'notifications' | 'security' | 'settings' | 'contact' | 'clear';

export const NAV: { id: Section; label: string; icon: typeof User; admin?: boolean }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Dices },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'records', label: 'Records', icon: FileText },
  { id: 'creditor', label: 'Find Creditor', icon: SearchCheck },
  { id: 'users', label: 'Manage Users', icon: Users, admin: true },
  { id: 'reports', label: 'Reports', icon: BarChart3, admin: true },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'contact', label: 'Contact Us', icon: Mail },
  { id: 'clear', label: 'Clear History', icon: Trash2 },
];

interface Props { open: boolean; onClose: () => void; active: Section; onSelect: (s: Section) => void; isAdmin: boolean }

export default function Sidebar({ open, onClose, active, onSelect, isAdmin }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-extrabold text-white">Navigation</span>
              <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
              {NAV.filter((n) => !n.admin || isAdmin).map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { onSelect(id); onClose(); }}
                  className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-[hsl(var(--sidebar-accent))]',
                    active === id && 'bg-[hsl(var(--sidebar-primary))] text-white hover:bg-[hsl(var(--sidebar-primary))]')}>
                  <Icon className="h-5 w-5" /> {label}
                  {LOCKED.includes(id) && !isAdmin && <Lock className="ml-auto h-4 w-4 opacity-60" />}
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
