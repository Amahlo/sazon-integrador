export default function HistoryRow({ item, onRetry, onDelete }) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition-all hover:border-sazon-verdeHoja dark:border-emerald-900/60 dark:bg-sazon-verdeNutresa sm:flex-row sm:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <i className="bi bi-search text-xs text-sazon-verdeHoja dark:text-sazon-verdeNeon" />
          <span className="font-poppins text-xs font-bold text-slate-900 dark:text-white">{item.query}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono-tag text-slate-400">
          <span>{item.fecha}</span>
          <span>•</span>
          <span className="font-semibold text-sazon-verdeHoja dark:text-sazon-verdeNeon">{item.resultados} Recetas sugeridas</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRetry(item.query)}
          className="flex items-center gap-1 rounded-lg bg-sazon-verdeHoja/10 px-3 py-1.5 text-xs font-mono-tag font-bold text-sazon-verdeHoja transition-all hover:bg-sazon-verdeHoja hover:text-white dark:bg-sazon-verdeNeon/20 dark:text-sazon-verdeNeon"
        >
          <i className="bi bi-arrow-clockwise text-base" />
          <span className="hidden sm:inline">Reintentar</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-mono-tag text-slate-400 hover:text-red-500 dark:border-emerald-900"
        >
          <i className="bi bi-x-lg text-base sm:hidden" />
          <span className="hidden sm:inline">Limpiar esta búsqueda</span>
        </button>
      </div>
    </div>
  );
}
