export default function RecipeCard({ receta }) {
  const missingCount = receta.ingredientesFaltantes.length;

  return (
    <article className="flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-emerald-800/60 dark:bg-sazon-verdeNutresaCard">
      <div className="space-y-4">
        <div className="relative h-48 overflow-hidden">
          <img src={receta.imagen} alt={receta.nombre} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono-tag font-bold text-white backdrop-blur-md">
            {receta.marca}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between text-xs font-mono-tag text-slate-500 dark:text-sazon-verdeNeon">
            <span>
              <i className="bi bi-star-fill text-amber-400" /> {receta.rating} ({receta.reviews})
            </span>
            <span>
              <i className="bi bi-clock" /> {receta.tiempo}
            </span>
          </div>
          <h4 className="font-poppins text-sm font-bold leading-snug text-slate-900 dark:text-white">{receta.nombre}</h4>
          {receta.coincidencia === 100 ? (
            <div className="despensa-faltante-label inline-flex items-center gap-1.5 rounded-full bg-sazon-verdeHoja px-3 py-1 text-white">
              <i className="bi bi-check-circle-fill" /> ¡Lo tienes todo!
            </div>
          ) : (
            <div className="despensa-faltante-label space-y-1 rounded-xl border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-800/80 dark:bg-amber-950/80">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400">
                <i className="bi bi-exclamation-triangle-fill" /> Te falta: {missingCount} {missingCount === 1 ? 'ingrediente' : 'ingredientes'}
              </div>
              <ul className="list-inside list-disc space-y-0.5 text-[11px] text-amber-900/80 dark:text-amber-300">
                {receta.ingredientesFaltantes.map((ing) => (
                  <li key={ing}>
                    {ing} <span className="font-bold text-amber-600">(faltante)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 pt-0">
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-sazon-verdeHoja px-5 py-2.5 text-xs font-mono-tag font-bold text-white shadow transition-all hover:bg-emerald-700">
          <i className="bi bi-fire text-base" />
          <span>Cocinar ahora</span>
        </button>
      </div>
    </article>
  );
}
