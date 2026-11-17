export default function FooterBrandPill({ label, icon, tone }) {
  return (
    <span className={`flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono-tag font-bold dark:border-black/20 dark:bg-black/10 ${tone}`}>
      <i className={`bi ${icon}`} />
      {label}
    </span>
  );
}
