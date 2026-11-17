import { useMemo, useState } from 'react';
import '../assets/Tailwind.css';
import StatCard from './StatCard';
import RecipeCard from './RecipeCard';
import HistoryRow from './HistoryRow';

const KPI_METRICS = [
  { icon: 'bi-journal-bookmark', value: '+240', label: 'Recetas Verificadas', className: 'bg-emerald-100 text-sazon-verdeHoja dark:bg-emerald-950 dark:text-sazon-verdeNeon' },
  { icon: 'bi-people', value: '+1,200', label: 'Cocineros Activos', className: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' },
  { icon: 'bi-arrow-repeat', value: '85%', label: 'Aprovechamiento', className: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400' },
  { icon: 'bi-patch-check', value: '100%', label: 'Calidad Nutresa', className: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400' },
];

const RECIPES = [
  {
    id: 1,
    nombre: 'Salteado de Pollo con Verduras y Arroz Jazmín',
    marca: 'Zenú',
    tiempo: '22 min',
    rating: 4.9,
    reviews: 148,
    imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    coincidencia: 100,
    ingredientesFaltantes: [],
    autor: 'Mariana Morales',
  },
  {
    id: 2,
    nombre: 'Fettuccine ligero con Jamón Pietrán horneado y yogur griego',
    marca: 'Pietrán & Doria',
    tiempo: '20 min',
    rating: 4.8,
    reviews: 90,
    imagen: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    coincidencia: 75,
    ingredientesFaltantes: ['Yogur griego'],
    autor: 'Mariana Morales',
  },
  {
    id: 3,
    nombre: 'Mousse refrescante de Maracuyá con base crocante de Ducales',
    marca: 'Galletas Noel',
    tiempo: '15 min',
    rating: 5.0,
    reviews: 210,
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
    coincidencia: 60,
    ingredientesFaltantes: ['Maracuyá', 'Crema de leche'],
    autor: 'Mariana Morales',
  },
  {
    id: 4,
    nombre: 'Crema de Tomate con Crotones de Pan Doria',
    marca: 'Pastas Doria',
    tiempo: '20 min',
    rating: 4.7,
    reviews: 85,
    imagen: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    coincidencia: 50,
    ingredientesFaltantes: ['Tomate fresco', 'Queso parmesano', 'Albahaca'],
    autor: 'Carolina Restrepo',
  },
];

const INITIAL_HISTORY = [
  { id: 1, query: 'Huevo, Tomate, Pollo', fecha: 'Hace 10 min', resultados: 4 },
  { id: 2, query: 'Arroz, Cebolla, Lentejas', fecha: 'Hace 2 horas', resultados: 15 },
  { id: 3, query: 'Salchicha Ranchera, Pastas Doria', fecha: 'Ayer a las 3:15 PM', resultados: 8 },
];

export default function HistorialConsumoPage() {
  const [activeTab, setActiveTab] = useState('hu1');
  const [filterMatch, setFilterMatch] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);

  const visibleRecipes = useMemo(() => {
    if (filterMatch === 'full') return RECIPES.filter((recipe) => recipe.coincidencia === 100);
    if (filterMatch === 'partial') return RECIPES.filter((recipe) => recipe.coincidencia < 100);
    return RECIPES;
  }, [filterMatch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const value = searchInput.trim();
    if (!value) return;

    setHistory((prev) => [{ id: Date.now(), query: value, fecha: 'Hace un momento', resultados: Math.floor(Math.random() * 8) + 1 }, ...prev]);
    setSearchInput('');
    setActiveTab('hu2');
  };

  const retrySearch = (queryText) => {
    setSearchInput(queryText);
    setActiveTab('hu2');
  };

  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
  };

  return (
    <div className="historial-consumo-page">
      <div className="min-h-[calc(100vh-120px)] bg-sazon-marfil text-slate-800 transition-colors duration-300 dark:bg-sazon-verdeNutresa dark:text-slate-100">

        <div className="border-b border-slate-200 bg-slate-200/40 px-4 py-2 dark:border-emerald-900/40 dark:bg-sazon-verdeNutresa/80">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="rounded bg-sazon-verdeHoja px-2 py-0.5 text-[11px] font-bold text-white">Célula 3</span>
              <h2 className="font-poppins text-sm font-bold text-slate-900 dark:text-white">Módulo de Despensa Virtual</h2>
            </div>

            <div className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-300/60 p-1 font-mono-tag text-xs font-semibold sm:w-auto dark:bg-sazon-verdeNutresaCard">
              <button
                type="button"
                onClick={() => setActiveTab('hu1')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                  activeTab === 'hu1' ? 'bg-white font-bold text-sazon-verdeHoja shadow-sm dark:bg-sazon-verdeNutresa dark:text-sazon-verdeNeon' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <i className="bi bi-tag text-base" />
                <span className="hidden sm:inline">Etiquetas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hu2')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                  activeTab === 'hu2' ? 'bg-white font-bold text-sazon-verdeHoja shadow-sm dark:bg-sazon-verdeNutresa dark:text-sazon-verdeNeon' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <i className="bi bi-clock-history text-base" />
                <span className="hidden sm:inline">Historial</span>
              </button>
            </div>
          </div>
        </div>

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-8 px-4 py-6 lg:px-8">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-emerald-950 via-sazon-verdeNutresa to-emerald-900 p-6 text-white shadow-xl md:p-10">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-sazon-verdeHoja/50 bg-sazon-verdeHoja/30 px-3 py-1 font-mono-tag text-xs font-bold uppercase text-sazon-verdeNeon">
                <i className="bi bi-stars" /> Ecosistema Gastronómico Nutresa
              </div>
              <h2 className="font-poppins text-3xl font-extrabold leading-tight md:text-4xl">
                Cocina con lo que tienes en casa. <span className="italic text-sazon-verdeNeon">Sa·zón</span> que inspira historias.
              </h2>
              <p className="font-inter text-sm leading-relaxed text-emerald-100/90">
                Transforma tus ingredientes cotidianos en banquetes memorables con las marcas líderes del Grupo Nutresa.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="flex items-center gap-1 rounded-full border border-sazon-brandZenu bg-sazon-brandZenu/20 px-3 py-1 text-xs font-mono-tag font-bold text-red-300">
                  <i className="bi bi-egg-fried" /> Zenú
                </span>
                <span className="flex items-center gap-1 rounded-full border border-sazon-brandDoria bg-sazon-brandDoria/20 px-3 py-1 text-xs font-mono-tag font-bold text-orange-300">
                  <i className="bi bi-cup-hot" /> Pastas Doria
                </span>
                <span className="flex items-center gap-1 rounded-full border border-sazon-brandPietran bg-sazon-brandPietran/20 px-3 py-1 text-xs font-mono-tag font-bold text-emerald-300">
                  <i className="bi bi-heart-pulse" /> Pietrán
                </span>
                <span className="flex items-center gap-1 rounded-full border border-sazon-brandNoel bg-sazon-brandNoel/20 px-3 py-1 text-xs font-mono-tag font-bold text-pink-300">
                  <i className="bi bi-cookie" /> Noel
                </span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {KPI_METRICS.map((metric) => (
              <StatCard key={metric.label} icon={metric.icon} value={metric.value} label={metric.label} className={metric.className} />
            ))}
          </div>

          <section className={`${activeTab === 'hu1' ? 'block' : 'hidden'} space-y-6`}>
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-3 sm:flex-row sm:items-center dark:border-emerald-900/40">
              <div>
                <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">Recetas Sugeridas y Etiquetas de Faltantes</h3>
                <p className="mt-1 text-xs font-mono-tag text-slate-500 dark:text-sazon-verdeNeon">Renderizado condicional con clase prefijada .despensa-faltante-label (&lt; 100% coincidencia)</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-tag">
                <span className="text-slate-500 dark:text-slate-400">Filtrar:</span>
                <select
                  value={filterMatch}
                  onChange={(event) => setFilterMatch(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold focus:outline-none dark:border-emerald-800/60 dark:bg-sazon-verdeNutresaCard dark:text-white"
                >
                  <option value="all">Todas las recetas (4)</option>
                  <option value="full">100% Coincidencia (¡Lo tienes todo!)</option>
                  <option value="partial">Con ingredientes faltantes (&lt;100%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleRecipes.map((receta) => (
                <RecipeCard key={receta.id} receta={receta} />
              ))}
            </div>
          </section>

          <section className={`${activeTab === 'hu2' ? 'block' : 'hidden'} space-y-6`}>
            <div className="border-b border-slate-200 pb-3 dark:border-emerald-900/40">
              <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">Historial de Búsquedas Recientes</h3>
              <p className="mt-1 text-xs font-mono-tag text-slate-500 dark:text-sazon-verdeNeon">Registro interactivo de búsquedas anteriores en la despensa con capacidad de limpieza y reintento</p>
            </div>

            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-emerald-800/60 dark:bg-sazon-verdeNutresaCard">
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <label className="block text-xs font-mono-tag font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Consultar combinación de ingredientes en despensa:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-sazon-verdeHoja" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Ej: Huevo, Tomate, Pollo / Arroz, Cebolla, Lentejas..."
                      required
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sazon-verdeHoja dark:border-emerald-800 dark:bg-sazon-verdeNutresa dark:text-white"
                    />
                  </div>
                  <button type="submit" className="flex items-center gap-2 rounded-xl bg-sazon-verdeHoja px-5 py-3 text-xs font-mono-tag font-bold text-white shadow-md transition-all hover:bg-emerald-700">
                    <i className="bi bi-search text-base" />
                    <span className="hidden sm:inline">Buscar</span>
                  </button>
                </div>
              </form>

              <div className="space-y-4 border-t border-slate-100 pt-4 dark:border-emerald-900/40">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 font-poppins text-sm font-bold text-slate-900 dark:text-white">
                    <i className="bi bi-clock-history text-sazon-verdeHoja dark:text-sazon-verdeNeon" />
                    Consultas Recientes (<span className="font-mono-tag">{history.length}</span>)
                  </h4>
                  <button type="button" onClick={clearAllHistory} className="flex items-center gap-1 text-xs font-mono-tag font-semibold text-red-600 hover:underline dark:text-red-400">
                    <i className="bi bi-trash" />
                    <span className="hidden sm:inline">Limpiar todo el historial</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {history.length === 0 ? (
                    <div className="p-8 text-center font-mono-tag text-xs text-slate-400">
                      <i className="mb-2 block text-3xl opacity-40 bi bi-clock-history" />
                      El historial de búsquedas recientes está vacío.
                    </div>
                  ) : (
                    history.map((item) => (
                      <HistoryRow key={item.id} item={item} onRetry={retrySearch} onDelete={deleteHistoryItem} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className={`${activeTab === 'hu3' ? 'block' : 'hidden'} space-y-6`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-emerald-800/60 dark:bg-sazon-verdeNutresaCard">
              <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">Comunidad y valoraciones</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Los usuarios comparten recetas, consejos y comentarios para seguir inspirando tus menús.</p>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
