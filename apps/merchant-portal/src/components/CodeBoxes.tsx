import { useRef } from 'react';
import { cn } from '@project/components/lib/utils';

interface Props {
  value: string;
  onChange: (v: string) => void;
  masked?: boolean;
  length?: number;
  invalid?: boolean;
}

export default function CodeBoxes({ value, onChange, masked, length = 6, invalid }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setAt = (i: number, ch: string) => {
    const arr = value.padEnd(length, ' ').split('');
    arr[i] = ch || ' ';
    onChange(arr.join('').trimEnd().replace(/ /g, ''));
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type={masked ? 'password' : 'text'}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(-1);
            if (!d) return;
            setAt(i, d);
            refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
              if (value[i]) onChange(value.slice(0, i));
              else if (i > 0) { onChange(value.slice(0, i - 1)); refs.current[i - 1]?.focus(); }
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const d = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
            onChange(d);
            refs.current[Math.min(d.length, length - 1)]?.focus();
          }}
          className={cn(
            'h-12 w-10 sm:w-12 rounded-lg border-2 bg-card text-center font-mono text-lg outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
            invalid && 'border-destructive'
          )}
        />
      ))}
    </div>
  );
}
