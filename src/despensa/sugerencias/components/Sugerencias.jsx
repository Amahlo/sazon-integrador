import { useEffect, useMemo, useRef, useState } from 'react'
import '../assets/sugerencias.css'

const RECETAS = [
  {
    id: 1,
    nombre: 'Pasta Cremosa con Salchicha Ranchera Zenú y Cebollín',
    marca: 'Zenú & Pastas Doria',
    tiempo: '25 min',
    rating: 4.9,
    reviews: 142,
    imagen:
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281318?w=900&auto=format&fit=crop&q=85',
    coincidencia: 100,
    descripcion:
      'Plato reconfortante preparado con Salchichas Rancheras Zenú doradas al sartén, integradas en una salsa suave de queso y Pastas Doria Spaghetti.',
    ingredientesDisponibles: [
      'Salchicha Ranchera Zenú',
      'Pastas Doria Spaghetti',
      'Crema de leche',
      'Cebollín fresco',
    ],
    ingredientesFaltantes: [],
    autor: 'Mateo Ríos',
  },
  {
    id: 2,
    nombre: 'Copa Napolitana de Galletas Ducales Noel con Fresas',
    marca: 'Galletas Noel',
    tiempo: '10 min',
    rating: 5.0,
    reviews: 215,
    imagen:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900&auto=format&fit=crop&q=85',
    coincidencia: 100,
    descripcion:
      'Postre rápido en capas con Galletas Ducales Noel trituradas, crema batida y láminas de fresas frescas.',
    ingredientesDisponibles: ['Galletas Ducales Noel', 'Crema de leche', 'Fresas frescas'],
    ingredientesFaltantes: [],
    autor: 'Mariana Morales',
  },
  {
    id: 3,
    nombre: 'Fettuccine Ligero con Jamón Pietrán Horneado',
    marca: 'Pietrán & Pastas Doria',
    tiempo: '20 min',
    rating: 4.8,
    reviews: 90,
    imagen:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900&auto=format&fit=crop&q=85',
    coincidencia: 85,
    descripcion:
      'Opción balanceada con tiras de Jamón Pietrán, ajo, aceite de oliva y Pastas Doria Fettuccine al dente.',
    ingredientesDisponibles: [
      'Jamón Pietrán horneado',
      'Fettuccine Pastas Doria',
      'Aceite de oliva virgen extra',
    ],
    ingredientesFaltantes: ['Yogur griego sin dulce'],
    autor: 'Mariana Morales',
  },
  {
    id: 4,
    nombre: 'Sandwich Gourmet de Jamón Pietrán y Queso Sabana',
    marca: 'Pietrán',
    tiempo: '12 min',
    rating: 4.6,
    reviews: 78,
    imagen:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&auto=format&fit=crop&q=85',
    coincidencia: 75,
    descripcion:
      'Sandwich tostado crujiente con tajadas de Jamón Pietrán, queso Sabana derretido y un toque de mostaza Dijon.',
    ingredientesDisponibles: ['Jamón Pietrán', 'Pan tajado integral'],
    ingredientesFaltantes: ['Queso Sabana'],
    autor: 'Carolina Restrepo',
  },
  {
    id: 5,
    nombre: 'Mousse de Maracuyá con Base Crocante de Saltín Noel',
    marca: 'Galletas Noel',
    tiempo: '15 min',
    rating: 4.7,
    reviews: 110,
    imagen:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=900&auto=format&fit=crop&q=85',
    coincidencia: 60,
    descripcion:
      'Mousse ácida y cremosa sobre una base dorada y salada de Galletas Saltín Noel trituradas con mantequilla.',
    ingredientesDisponibles: ['Galletas Saltín Noel', 'Leche condensada'],
    ingredientesFaltantes: ['Concentrado de Maracuyá', 'Crema de leche'],
    autor: 'Mateo Ríos',
  },
  {
    id: 6,
    nombre: 'Sopa Rústica de Tomate Asado con Crotones Doria',
    marca: 'Pastas Doria',
    tiempo: '30 min',
    rating: 4.5,
    reviews: 54,
    imagen:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=85',
    coincidencia: 40,
    descripcion:
      'Sopa de tomates horneados con albahaca fresca y crujientes crotones de tostadas Pastas Doria.',
    ingredientesDisponibles: ['Tostadas Pastas Doria'],
    ingredientesFaltantes: ['Tomates maduros', 'Dientes de ajo', 'Albahaca fresca'],
    autor: 'Mariana Morales',
  },
]

const BRAND_TAGS = [
  ['bi-egg-fried', 'Zenú', 'sugerencias-brand-zenu'],
  ['bi-cup-hot', 'Pastas Doria', 'sugerencias-brand-doria'],
  ['bi-heart-pulse', 'Pietrán', 'sugerencias-brand-pietran'],
  ['bi-cookie', 'Noel', 'sugerencias-brand-noel'],
]

function getMatchTone(match) {
  if (match === 100) return 'green'
  if (match >= 75) return 'amber'
  return 'rose'
}

function RecipeCard({ receta, onDetails, onCook }) {
  const tone = getMatchTone(receta.coincidencia)

  return (
    <article className="despensa-sugerencia-card flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard">
      <div className="relative h-52 overflow-hidden">
        <img
          src={receta.imagen}
          alt={receta.nombre}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          {receta.marca}
        </span>
        <span className={`sugerencias-match-badge ${tone}`}>
          <i className="bi bi-lightning-charge-fill" aria-hidden="true"></i>
          {receta.coincidencia}% Match
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            <i className="bi bi-star-fill mr-1 text-amber-400" aria-hidden="true"></i>
            {receta.rating.toFixed(1)} ({receta.reviews})
          </span>
          <span>
            <i className="bi bi-clock mr-1" aria-hidden="true"></i>
            {receta.tiempo}
          </span>
        </div>

        <button
          type="button"
          className="mb-4 text-left font-poppins text-base font-bold leading-snug text-slate-900 hover:text-sazon-verdeHoja dark:text-white dark:hover:text-sazon-verdeNeon"
          onClick={() => onDetails(receta)}
        >
          {receta.nombre}
        </button>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span>Coincidencia despensa</span>
            <span className={`sugerencias-match-text ${tone}`}>{receta.coincidencia}%</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full border border-slate-300 bg-slate-200 p-0.5 dark:border-emerald-900 dark:bg-emerald-950/80"
            role="progressbar"
            aria-label={`Coincidencia de despensa: ${receta.coincidencia}%`}
            aria-valuenow={receta.coincidencia}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`despensa-progreso-barra ${tone}`}
              style={{ width: `${receta.coincidencia}%` }}
            ></div>
          </div>
          <p className="min-h-5 pt-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
            {receta.ingredientesFaltantes.length ? (
              <>Te falta: {receta.ingredientesFaltantes.join(', ')}</>
            ) : (
              <span className="text-sazon-verdeHoja dark:text-sazon-verdeNeon">
                <i className="bi bi-check-circle-fill mr-1" aria-hidden="true"></i>
                ¡Tienes todos los ingredientes!
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-5 pb-5">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200 dark:border-emerald-900 dark:bg-sazon-verdeNutresa dark:text-slate-200 dark:hover:bg-emerald-950"
          onClick={() => onDetails(receta)}
        >
          <i className="bi bi-eye" aria-hidden="true"></i>
          Detalles
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-sazon-verdeHoja px-3 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
          onClick={() => onCook(receta)}
        >
          <i className="bi bi-fire" aria-hidden="true"></i>
          Cocinar
        </button>
      </div>
    </article>
  )
}

function Sugerencias() {
  const [recetas, setRecetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('hu341')
  const [matchFilter, setMatchFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState('desc')
  const [progressValue, setProgressValue] = useState(85)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    let active = true
    const timer = window.setTimeout(() => {
      if (active) {
        setRecetas([...RECETAS])
        setLoading(false)
      }
    }, 200)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!selectedRecipe) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedRecipe(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedRecipe])

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current)
    },
    [],
  )

  const sortedRecipes = useMemo(
    () =>
      [...recetas].sort((a, b) =>
        sortDirection === 'desc'
          ? b.coincidencia - a.coincidencia
          : a.coincidencia - b.coincidencia,
      ),
    [recetas, sortDirection],
  )

  const filteredRecipes = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('es')

    return sortedRecipes.filter((receta) => {
      const matchesFilter =
        matchFilter === 'all' ||
        (matchFilter === '100' && receta.coincidencia === 100) ||
        (matchFilter === '75' && receta.coincidencia >= 75) ||
        (matchFilter === 'partial' && receta.coincidencia < 100)
      const searchableText = [
        receta.nombre,
        receta.marca,
        ...receta.ingredientesDisponibles,
        ...receta.ingredientesFaltantes,
      ]
        .join(' ')
        .toLocaleLowerCase('es')

      return matchesFilter && (!term || searchableText.includes(term))
    })
  }, [matchFilter, search, sortedRecipes])

  const metrics = useMemo(() => {
    const fullMatches = recetas.filter((receta) => receta.coincidencia === 100).length
    const average = recetas.length
      ? Math.round(recetas.reduce((sum, receta) => sum + receta.coincidencia, 0) / recetas.length)
      : 0
    return { fullMatches, average }
  }, [recetas])

  const notify = (message) => {
    if (typeof window.showToast === 'function') {
      window.showToast(message)
      return
    }
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 3200)
  }

  const handleCook = (receta) => {
    notify(`Iniciando preparación: ${receta.nombre}`)
  }

  const progressTone = getMatchTone(progressValue)
  const progressMessage =
    progressValue >= 80
      ? '¡Excelente coincidencia! Tienes la mayoría de ingredientes en tu despensa.'
      : progressValue >= 50
        ? 'Coincidencia moderada. Te faltan 1 o 2 ingredientes para completar.'
        : 'Coincidencia baja. Se requiere agregar varios ingredientes a tu despensa.'

  return (
    <div className="sugerencias-page space-y-7">
      <section className="sugerencias-hero relative overflow-hidden rounded-3xl p-6 text-white shadow-xl sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-sazon-verdeHoja/50 bg-sazon-verdeHoja/30 px-3 py-1 text-xs font-bold uppercase text-sazon-verdeNeon">
              <i className="bi bi-cpu-fill" aria-hidden="true"></i>
              Ecosistema Gastronómico Nutresa
            </span>
            <h1 className="font-poppins text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Puedes cocinar{' '}
              <span className="text-sazon-verdeNeon underline decoration-wavy">
                {recetas.length}
              </span>{' '}
              recetas sugeridas con tu despensa
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-emerald-100">
              Encuentra recetas según los ingredientes que ya tienes y descubre qué te falta para
              prepararlas.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {BRAND_TAGS.map(([icon, label, className]) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${className}`}
                >
                  <i className={`bi ${icon}`} aria-hidden="true"></i>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-2.5 font-mono-tag text-xs md:min-w-56">
            <div className="flex items-center justify-between gap-5 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <i className="bi bi-check-circle-fill text-sazon-verdeNeon" aria-hidden="true"></i>
                100% Match:
              </span>
              <strong className="text-sm text-sazon-verdeNeon">{metrics.fullMatches}</strong>
            </div>
            <div className="flex items-center justify-between gap-5 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <i className="bi bi-bar-chart-fill text-amber-300" aria-hidden="true"></i>
                Promedio Match:
              </span>
              <strong className="text-sm text-amber-300">{metrics.average}%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-emerald-900/50 sm:flex-row sm:items-center">
        <div>
          <span className="mr-2 rounded-md bg-sazon-verdeHoja/10 px-2.5 py-1 text-xs font-bold text-sazon-verdeHoja dark:bg-sazon-verdeNeon/15 dark:text-sazon-verdeNeon">
            Célula 3
          </span>
          <h2 className="mt-2 inline font-poppins text-lg font-bold text-slate-900 dark:text-white sm:mt-0">
            Motor de coincidencias y sugerencias
          </h2>
        </div>
        <div className="flex w-full gap-1 overflow-x-auto rounded-xl bg-slate-200/70 p-1 dark:bg-sazon-verdeNutresa sm:w-auto">
          {[
            ['hu341', 'bi-grid-fill', 'Recetas'],
            ['hu342', 'bi-sort-numeric-down', 'Ordenamiento'],
            ['hu343', 'bi-sliders', 'Simulador & QA'],
          ].map(([tab, icon, label]) => (
            <button
              key={tab}
              type="button"
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                activeTab === tab
                  ? 'bg-white text-sazon-verdeHoja shadow-sm dark:bg-sazon-verdeNutresaCard dark:text-sazon-verdeNeon'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <i className={`bi ${icon}`} aria-hidden="true"></i>
              {label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'hu341' && (
        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">
                Recetas para ti
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Ordenadas por los ingredientes que tienes disponibles.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="sugerencias-search">
                Buscar recetas, marcas o ingredientes
              </label>
              <input
                id="sugerencias-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar receta o ingrediente..."
                className="min-w-48 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-sazon-verdeHoja focus:ring-2 focus:ring-sazon-verdeHoja/20 dark:border-emerald-900 dark:bg-sazon-verdeNutresaCard dark:text-white"
              />
              <label className="sr-only" htmlFor="sugerencias-filter">
                Filtrar recetas por coincidencia
              </label>
              <select
                id="sugerencias-filter"
                value={matchFilter}
                onChange={(event) => setMatchFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none dark:border-emerald-900 dark:bg-sazon-verdeNutresaCard dark:text-white"
              >
                <option value="all">Todas las recetas ({recetas.length})</option>
                <option value="100">Solo 100% Match</option>
                <option value="75">Match mayor o igual a 75%</option>
                <option value="partial">Con ingredientes faltantes</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setLoading(true)
                  window.setTimeout(() => {
                    setRecetas([...RECETAS])
                    setLoading(false)
                  }, 200)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sazon-verdeHoja px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <i className="bi bi-arrow-repeat" aria-hidden="true"></i>
                Actualizar
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-500 dark:text-slate-300">
              <span className="sugerencias-spinner mx-auto mb-3 block"></span>
              Cargando sugerencias de tu despensa...
            </div>
          ) : filteredRecipes.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((receta) => (
                <RecipeCard
                  key={receta.id}
                  receta={receta}
                  onDetails={setSelectedRecipe}
                  onCook={handleCook}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-slate-500 dark:text-slate-400">
              <i className="bi bi-search-heart mb-2 block text-4xl opacity-40" aria-hidden="true"></i>
              No se encontraron sugerencias con los filtros seleccionados.
            </div>
          )}
        </section>
      )}

      {activeTab === 'hu342' && (
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">
                Ordenamiento por porcentaje de coincidencia
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Las recetas se reordenan de mayor a menor coincidencia.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                ['desc', 'Mayor a menor'],
                ['asc', 'Menor a mayor'],
              ].map(([direction, label]) => (
                <button
                  key={direction}
                  type="button"
                  aria-pressed={sortDirection === direction}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    sortDirection === direction
                      ? 'bg-sazon-verdeHoja text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-sazon-verdeNutresa dark:text-slate-200'
                  }`}
                  onClick={() => setSortDirection(direction)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <ol className="space-y-3">
            {sortedRecipes.map((receta, index) => (
              <li
                key={receta.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sazon-verdeHoja/10 font-poppins text-sm font-black text-sazon-verdeHoja dark:bg-sazon-verdeHoja/20 dark:text-sazon-verdeNeon">
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className="font-poppins text-sm font-bold text-slate-900 dark:text-white">
                      {receta.nombre}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {receta.marca} · Creador: {receta.autor}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono-tag text-xs font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon">
                    {receta.coincidencia}% Coincidencia
                  </span>
                  <button
                    type="button"
                    className="rounded-xl bg-slate-100 px-3 py-2 text-slate-600 hover:bg-sazon-verdeHoja hover:text-white dark:bg-sazon-verdeNutresa dark:text-slate-300"
                    onClick={() => setSelectedRecipe(receta)}
                    aria-label={`Ver detalles de ${receta.nombre}`}
                  >
                    <i className="bi bi-eye" aria-hidden="true"></i>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {activeTab === 'hu343' && (
        <section className="space-y-5">
          <div>
            <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">
              Simulador de coincidencia y validación
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Ajusta el porcentaje para ver cómo cambia la barra de progreso.
            </p>
          </div>
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-emerald-900/60 dark:bg-sazon-verdeNutresaCard sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-poppins font-bold text-slate-900 dark:text-white">
                Porcentaje de coincidencia
              </h4>
              <div className="flex items-center gap-2">
                {[100, 75, 40].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-sazon-verdeHoja hover:text-white dark:bg-sazon-verdeNutresa dark:text-slate-200"
                    onClick={() => setProgressValue(value)}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
            <label
              htmlFor="sugerencias-progress"
              className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Porcentaje de Match
              <output className="rounded-md bg-sazon-verdeHoja px-3 py-1 text-white">
                {progressValue}% Match
              </output>
            </label>
            <input
              type="range"
              id="sugerencias-progress"
              min="0"
              max="100"
              value={progressValue}
              onChange={(event) => setProgressValue(Number(event.target.value))}
              aria-label="Porcentaje de coincidencia"
              className="w-full accent-sazon-verdeHoja"
            />
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-emerald-900/60 dark:bg-sazon-verdeNutresa">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Coincidencia de tu despensa</span>
                <span className={`sugerencias-match-text ${progressTone}`}>{progressValue}%</span>
              </div>
              <div
                className="h-3 overflow-hidden rounded-full bg-slate-200 p-0.5 dark:bg-emerald-950/80"
                role="progressbar"
                aria-label={`Coincidencia de ejemplo: ${progressValue}%`}
                aria-valuenow={progressValue}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={`despensa-progreso-barra ${progressTone}`}
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
              <p className={`text-xs font-semibold sugerencias-match-text ${progressTone}`}>
                {progressMessage}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#090e17] p-5 font-mono-tag text-xs leading-relaxed text-slate-200 shadow-xl">
            <h4 className="mb-4 font-bold text-white">QA Terminal Inspector — Motor Match %</h4>
            <p className="mb-2 text-emerald-400">[OK HU 3.4.1] Tarjetas de recetas sugeridas cargadas.</p>
            <p className="mb-2 text-emerald-400">[OK HU 3.4.2] Orden numérico por porcentaje de coincidencia.</p>
            <p className="text-emerald-400">[OK HU 3.4.3] Barra de progreso dinámica integrada.</p>
            <button
              type="button"
              className="mt-5 rounded-xl bg-sazon-verdeHoja px-4 py-2 font-bold text-white hover:bg-emerald-600"
              onClick={() => notify('Pruebas del algoritmo Match % ejecutadas correctamente.')}
            >
              <i className="bi bi-play-fill mr-1" aria-hidden="true"></i>
              Ejecutar prueba de algoritmo
            </button>
          </div>
        </section>
      )}

      {selectedRecipe && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedRecipe(null)
          }}
        >
          <section
            aria-labelledby="sugerencias-modal-title"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-emerald-900 dark:bg-sazon-verdeNutresaCard"
            role="dialog"
          >
            <div className="relative h-48">
              <img
                src={selectedRecipe.imagen}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                {selectedRecipe.marca}
              </span>
              <button
                type="button"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                onClick={() => setSelectedRecipe(null)}
                aria-label="Cerrar detalles"
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>
            <div className="max-h-[calc(90vh-12rem)] space-y-4 overflow-y-auto p-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon">
                  {selectedRecipe.coincidencia}% Match
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  <i className="bi bi-clock mr-1" aria-hidden="true"></i>
                  {selectedRecipe.tiempo}
                </span>
              </div>
              <h2
                id="sugerencias-modal-title"
                className="font-poppins text-xl font-bold text-slate-900 dark:text-white"
              >
                {selectedRecipe.nombre}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {selectedRecipe.descripcion}
              </p>
              <div className="border-t border-slate-100 pt-4 dark:border-emerald-900">
                <h3 className="mb-2 text-xs font-bold uppercase text-slate-700 dark:text-slate-200">
                  Ingredientes en tu despensa
                </h3>
                <ul className="space-y-1 text-sm text-emerald-700 dark:text-sazon-verdeNeon">
                  {selectedRecipe.ingredientesDisponibles.map((ingrediente) => (
                    <li key={ingrediente}>
                      <i className="bi bi-check2 mr-2" aria-hidden="true"></i>
                      {ingrediente}
                    </li>
                  ))}
                </ul>
              </div>
              {!!selectedRecipe.ingredientesFaltantes.length && (
                <div className="border-t border-slate-100 pt-4 dark:border-emerald-900">
                  <h3 className="mb-2 text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                    Ingredientes faltantes
                  </h3>
                  <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                    {selectedRecipe.ingredientesFaltantes.map((ingrediente) => (
                      <li key={ingrediente}>
                        <i className="bi bi-exclamation-circle mr-2" aria-hidden="true"></i>
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-emerald-900">
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-emerald-800 dark:text-slate-200 dark:hover:bg-sazon-verdeNutresa"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-sazon-verdeHoja px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  onClick={() => {
                    handleCook(selectedRecipe)
                    setSelectedRecipe(null)
                  }}
                >
                  <i className="bi bi-fire mr-1" aria-hidden="true"></i>
                  Cocinar ahora
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 right-5 z-[70] flex items-center gap-3 rounded-xl border border-emerald-500/50 bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl">
          <i className="bi bi-info-circle-fill text-sazon-verdeNeon" aria-hidden="true"></i>
          {toast}
        </div>
      )}
    </div>
  )
}

export default Sugerencias
