import { useState } from 'react';
import { Globe, LogOut, Menu } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import { LogoMark } from './icons';
import { LANGUAGES } from './languages';

export default function TopNav({ onMenu, onLogout }: { onMenu?: () => void; onLogout?: () => void }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') ?? 'ms');
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-white/10 bg-card/90 px-4 shadow-sm backdrop-blur">
      {onMenu && (
        <Button variant="ghost" size="icon" onClick={onMenu} aria-label="Open menu"><Menu className="h-5 w-5" /></Button>
      )}
      <div className="flex items-center gap-2">
        <LogoMark />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Select value={lang} onValueChange={(v) => { setLang(v); localStorage.setItem('lang', v); document.documentElement.lang = v; }}>
          <SelectTrigger className="w-[150px] sm:w-[220px]">
            <Globe className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {LANGUAGES.map((l) => <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {onLogout && (
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Log out" title="Log out">
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
