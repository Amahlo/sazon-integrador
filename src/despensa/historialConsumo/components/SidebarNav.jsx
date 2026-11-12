const MENU_ITEMS = [
  { label: 'Inicio', icon: 'bi-house-door', active: false },
  { label: 'Catálogo de Productos Nutresa', icon: 'bi-compass', active: false },
  { label: 'Recetario y Contenido', icon: 'bi-calendar3', active: false },
  { label: 'Despensa Virtual y Sugerencias', icon: 'bi-box-seam', active: true },
  { label: 'Nutrición y Perfiles Alimentarios', icon: 'bi-clock-history', active: false },
  { label: 'Planificador de Menús y Lista de Mercado', icon: 'bi-bookmark-heart', active: false },
  { label: 'Comunidad y Valoraciones', icon: 'bi-shield-check', active: false },
  { label: 'Mercadeo, Campañas y Fidelización', icon: 'bi-megaphone', active: false },
];

export default function SidebarNav({ open = false, onClose }) {
  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col justify-between bg-sazon-verdeHoja p-6 text-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-sazon-verdeHoja shadow-md">
              <svg className="h-5 w-5 fill-current text-sazon-verdeHoja" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-poppins text-lg font-extrabold leading-none">Sa·zón</h2>
              <span className="font-mono-tag text-[10px] uppercase tracking-wider text-white/80">Recetario Digital</span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-lg text-white hover:bg-white/20" aria-label="Cerrar menú">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="space-y-1 font-poppins text-sm font-semibold">
          <div className="mb-2 text-[11px] font-mono-tag uppercase tracking-wider text-white/70">RECETARIO Y COCINA</div>
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                item.active ? 'bg-white text-sazon-verdeHoja font-bold shadow-sm' : 'hover:bg-white/20'
              }`}
            >
              <i className={`bi ${item.icon} text-lg`} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs font-mono-tag text-white/80">
        <span>Despensa Virtual</span>
        <span className="rounded bg-white/20 px-2 py-0.5 font-bold">v1.0.5</span>
      </div>
    </aside>
  );
}
