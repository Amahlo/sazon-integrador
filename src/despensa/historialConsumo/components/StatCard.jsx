export default function StatCard({ icon, value, label, className }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-emerald-800/60 dark:bg-sazon-verdeNutresaCard">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${className}`}>
        <i className={`bi ${icon}`} />
      </div>
      <div>
        <span className="block text-lg font-bold leading-none text-slate-900 dark:text-white">{value}</span>
        <span className="mt-1 block text-[10px] font-mono-tag text-slate-400">{label}</span>
      </div>
    </div>
  );
}
