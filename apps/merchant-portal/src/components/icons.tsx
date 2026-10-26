import { motion } from 'framer-motion';

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Salesforce"
      className={`h-12 w-[74px] shrink-0 ${className}`}
      style={{
        backgroundImage: 'url(https://images.fillout.com/orgid-902182/flowpublicid-obvwexdqqo/widgetid-default/enrZ39MC5T3c2iH16LvL6J/pasted-image-1792701673945-8try6j43.jpeg)',
        backgroundSize: '242px auto',
        backgroundPosition: '-42px -42px',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

export function LiveCheck({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Valid">
      <motion.circle cx="12" cy="12" r="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
      <motion.path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.3 }} />
    </svg>
  );
}

export function LiveCross({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Incomplete">
      <motion.circle cx="12" cy="12" r="10" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
      <motion.path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.4"
        strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.3 }} />
    </svg>
  );
}
