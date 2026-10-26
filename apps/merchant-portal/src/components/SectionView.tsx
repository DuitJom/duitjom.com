import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@project/components/ui/card';
import { NAV, Section } from './Sidebar';
import MerchantCard from './MerchantCard';
import Dashboard from './Dashboard';
import ReportButton from './ReportButton';
import MyProfile from './MyProfile';

export interface Session { merchantId: string; email: string; role: 'admin' | 'user' }

function Contact() {
  const [msg, setMsg] = useState('');
  return (
    <Card><CardContent className="space-y-3 p-5">
      <p className="text-sm">GETMORE RESOURCES SDN BHD · +60 16-534 9363</p>
      <Textarea placeholder="Write your message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
      <Button disabled={!msg.trim()} onClick={() => { toast.success('Message sent'); setMsg(''); }}>Send</Button>
    </CardContent></Card>
  );
}

export default function SectionView({ section, session, onSelect, onQuit }: { section: Section; session: Session; onSelect: (s: Section) => void; onQuit: () => void }) {
  const title = NAV.find((n) => n.id === section)?.label;
  let body: JSX.Element;
  switch (section) {
    case 'dashboard':
      body = <Dashboard onQuit={onQuit} />;
      break;
    case 'profile':
      body = <MyProfile />;
      break;
    case 'creditor':
    case 'records':
    case 'database':
      body = <MerchantCard onBack={() => onSelect('dashboard')} onContinue={() => toast.success('Record opened')} />;
      break;
    case 'contact':
      body = <Contact />;
      break;
    case 'clear':
      body = <Card><CardContent className="space-y-3 p-5"><p className="text-sm text-muted-foreground">Remove locally stored history and preferences.</p>
        <Button variant="destructive" onClick={() => { localStorage.clear(); sessionStorage.clear(); toast.success('History cleared'); }}>Clear History</Button></CardContent></Card>;
      break;
    default:
      body = <Card><CardContent className="p-5"><Input placeholder={`Search ${title}...`} /></CardContent></Card>;
  }
  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-8">
      <Card className="border-0 bg-transparent shadow-none"><CardHeader className="p-0"><CardTitle className="text-2xl font-extrabold">{title}</CardTitle></CardHeader></Card>
      {body}
    </div>
  );
}
