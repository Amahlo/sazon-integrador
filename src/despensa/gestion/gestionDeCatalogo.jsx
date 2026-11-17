import { useEffect, useState } from 'react'
import '../assets/gestionDeCatalogo.css'

const ITEMS_INICIALES = [
  { idIngrediente: 1, nombreItem: 'Café Sello Rojo' },
  { idIngrediente: 2, nombreItem: 'Pastas Doria' },
  { idIngrediente: 3, nombreItem: 'Salchicha Ranchera Zenú' },
  { idIngrediente: 4, nombreItem: 'Jamón Pietrán' },
  { idIngrediente: 5, nombreItem: 'Galletas Ducales Noel' },
  { idIngrediente: 6, nombreItem: 'Colección de postres con piña' },
]

const STORAGE_KEY = 'gestion-despensa-items'

function GestionDeCatalogo() {
  const [activeTab, setActiveTab] = useState('hu311')
  const [items, setItems] = useState(ITEMS_INICIALES)
  const [idIngrediente, setIdIngrediente] = useState('')
  const [nombreItem, setNombreItem] = useState('')

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY)
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch {
      setItems(ITEMS_INICIALES)
    }
  }, [])

  const showToast = (message) => {
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast(message)
    }
  }

  const persistItems = (nextItems) => {
    setItems(nextItems)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
    } catch {
      showToast('No se pudo guardar la información localmente')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const parsedId = Number.parseInt(idIngrediente, 10)
    const trimmedName = nombreItem.trim()

    if (!parsedId || !trimmedName) {
      showToast('Por favor complete todos los campos requeridos')
      return
    }

    if (items.some((item) => item.idIngrediente === parsedId)) {
      showToast('Ya existe un ingrediente con ese identificador')
      return
    }

    persistItems([...items, { idIngrediente: parsedId, nombreItem: trimmedName }])
    showToast(`Ingrediente "${trimmedName}" agregado con éxito`)
    setIdIngrediente('')
    setNombreItem('')
    setActiveTab('hu311')
  }

  const eliminarIngrediente = (id) => {
    persistItems(items.filter((item) => item.idIngrediente !== id))
    showToast('Ingrediente eliminado de la despensa')
  }

  const tabButtonClass = (tab) =>
    `gestion-catalogo-tab ${activeTab === tab ? 'is-active' : ''}`

  return (
    <div className="gestion-catalogo-content space-y-8">
      <section className="gestion-catalogo-subnav">
        <div className="gestion-catalogo-subnav-inner">
          <div className="gestion-catalogo-module-title">
            <span className="gestion-catalogo-cell">Célula 3</span>
            <h2>Módulo de Despensa Virtual</h2>
          </div>

          <div className="gestion-catalogo-tabs" role="tablist" aria-label="Vistas de despensa">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hu311'}
              className={tabButtonClass('hu311')}
              onClick={() => setActiveTab('hu311')}
            >
              <i className="bi bi-box-seam"></i>
              <span>Despensa Personal</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hu312'}
              className={tabButtonClass('hu312')}
              onClick={() => setActiveTab('hu312')}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Agregar Ingrediente</span>
            </button>
          </div>
        </div>
      </section>

      <section className="gestion-catalogo-banner">
        <div className="gestion-catalogo-banner-content">
          <span className="gestion-catalogo-eyebrow">
            <i className="bi bi-stars"></i>
            Ecosistema Gastronómico Nutresa
          </span>
          <h2>
            Cocina con lo que tienes en casa. <em>Sa·zón</em> que inspira historias.
          </h2>
          <p>
            Transforma tus ingredientes cotidianos en banquetes memorables con las marcas líderes del Grupo Nutresa.
          </p>
          <div className="gestion-catalogo-brands">
            <span className="gestion-catalogo-brand brand-zenu">
              <i className="bi bi-record-circle-fill"></i> Zenú
            </span>
            <span className="gestion-catalogo-brand brand-doria">
              <i className="bi bi-cup-hot-fill"></i> Pastas Doria
            </span>
            <span className="gestion-catalogo-brand brand-pietran">
              <i className="bi bi-heart-pulse-fill"></i> Pietrán
            </span>
            <span className="gestion-catalogo-brand brand-noel">
              <i className="bi bi-cookie"></i> Noel
            </span>
          </div>
        </div>
      </section>

      <section className="gestion-catalogo-metrics" aria-label="Indicadores del ecosistema">
        <article className="gestion-catalogo-metric">
          <span className="gestion-catalogo-metric-icon metric-green">
            <i className="bi bi-journal-bookmark"></i>
          </span>
          <div>
            <strong>+240</strong>
            <span>Recetas Verificadas</span>
          </div>
        </article>
        <article className="gestion-catalogo-metric">
          <span className="gestion-catalogo-metric-icon metric-amber">
            <i className="bi bi-people"></i>
          </span>
          <div>
            <strong>+1,200</strong>
            <span>Cocineros Activos</span>
          </div>
        </article>
        <article className="gestion-catalogo-metric">
          <span className="gestion-catalogo-metric-icon metric-blue">
            <i className="bi bi-arrow-repeat"></i>
          </span>
          <div>
            <strong>85%</strong>
            <span>Aprovechamiento</span>
          </div>
        </article>
        <article className="gestion-catalogo-metric">
          <span className="gestion-catalogo-metric-icon metric-purple">
            <i className="bi bi-patch-check"></i>
          </span>
          <div>
            <strong>100%</strong>
            <span>Calidad Nutresa</span>
          </div>
        </article>
      </section>

      {activeTab === 'hu311' && (
        <section className="gestion-catalogo-view" id="view-hu311">
          <div className="gestion-catalogo-view-header">
            <div>
              <h3>
                <i className="bi bi-box-seam"></i>
                Ingredientes en Despensa Personal
              </h3>
              <p>
                Consumo asíncrono desde despensaServicio.listarDespensa() • Renderizado de etiquetas (.despensa-chip)
              </p>
            </div>
            <button
              type="button"
              className="gestion-catalogo-primary-button"
              onClick={() => setActiveTab('hu312')}
            >
              <i className="bi bi-plus-lg"></i>
              <span>+ Agregar ingrediente</span>
            </button>
          </div>

          <div className="gestion-catalogo-chip-panel">
            <div className="gestion-catalogo-chip-heading">
              <span>Ingredientes en casa ({items.length})</span>
              <span>Codificación UTF-8 ✓</span>
            </div>
            {items.length === 0 ? (
              <p className="gestion-catalogo-empty">
                No hay ingredientes registrados en tu despensa. ¡Agrega uno nuevo!
              </p>
            ) : (
              <ul className="gestion-catalogo-chips">
                {items.map((item) => (
                  <li className="gestion-catalogo-chip" key={item.idIngrediente}>
                    <i className="bi bi-tag-fill"></i>
                    <span>{item.nombreItem}</span>
                    <button
                      type="button"
                      title={`Eliminar ${item.nombreItem}`}
                      aria-label={`Eliminar ${item.nombreItem}`}
                      onClick={() => eliminarIngrediente(item.idIngrediente)}
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {activeTab === 'hu312' && (
        <section className="gestion-catalogo-view" id="view-hu312">
          <div className="gestion-catalogo-form-heading">
            <h3>
              <i className="bi bi-plus-circle"></i>
              Incorporar Nuevo Ingrediente a la Despensa
            </h3>
            <p>
              Formulario semántico con etiquetas form, fieldset, legend y label for. Invocación de despensaServicio.agregarItem()
            </p>
          </div>

          <div className="gestion-catalogo-form-card">
            <form onSubmit={handleSubmit} className="gestion-catalogo-form">
              <fieldset>
                <legend>Datos del Ingrediente (Atributos Backend)</legend>

                <div className="gestion-catalogo-field">
                  <label htmlFor="idIngrediente">
                    idIngrediente <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="number"
                    id="idIngrediente"
                    name="idIngrediente"
                    required
                    min="1"
                    placeholder="Ej: 6"
                    value={idIngrediente}
                    onChange={(event) => setIdIngrediente(event.target.value)}
                  />
                </div>

                <div className="gestion-catalogo-field">
                  <label htmlFor="nombreItem">
                    nombreItem <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombreItem"
                    name="nombreItem"
                    required
                    placeholder="Ej: Piña en rodajas, Pastas Doria, Cebolla cabezona..."
                    value={nombreItem}
                    onChange={(event) => setNombreItem(event.target.value)}
                  />
                </div>
              </fieldset>

              <div className="gestion-catalogo-form-actions">
                <button
                  type="button"
                  className="gestion-catalogo-secondary-button"
                  onClick={() => setActiveTab('hu311')}
                >
                  Cancelar
                </button>
                <button type="submit" className="gestion-catalogo-primary-button">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Guardar Ingrediente</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

export default GestionDeCatalogo