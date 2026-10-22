
import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/pacientes'

const formularioVacio = {
  nombre: '',
  apellido: '',
  documento: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
}

function App() {
  const [pacientes, setPacientes] = useState([])
  const [formulario, setFormulario] = useState(formularioVacio)
  const [pacienteEditando, setPacienteEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(true)

  // Consultar los pacientes guardados en MySQL mediante Spring Boot.
  async function cargarPacientes() {
    setCargando(true)

    try {
      const respuesta = await fetch(API_URL)

      if (!respuesta.ok) {
        throw new Error('No se pudieron consultar los pacientes.')
      }

      const datos = await respuesta.json()
      setPacientes(datos)
    } catch (error) {
      setMensaje(
        'No fue posible conectar con el servidor. Verifica que Spring Boot esté ejecutándose.'
      )
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarPacientes()
  }, [])

  const pacientesFiltrados = pacientes.filter((paciente) =>
    `${paciente.nombre} ${paciente.apellido} ${paciente.documento}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  function actualizarCampo(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  function abrirNuevoPaciente() {
    setFormulario(formularioVacio)
    setPacienteEditando(null)
    setMostrarFormulario(true)
    setMensaje('')
  }

  function editarPaciente(paciente) {
    setFormulario({
      nombre: paciente.nombre ?? '',
      apellido: paciente.apellido ?? '',
      documento: paciente.documento ?? '',
      telefono: paciente.telefono ?? '',
      correo: paciente.correo ?? '',
      fechaNacimiento: paciente.fechaNacimiento ?? '',
    })

    setPacienteEditando(paciente.id)
    setMostrarFormulario(true)
    setMensaje('')
  }

  async function guardarPaciente(evento) {
    evento.preventDefault()
    setMensaje('')

    const editando = pacienteEditando !== null
    const url = editando
      ? `${API_URL}/${pacienteEditando}`
      : API_URL

    try {
      const respuesta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      })

      if (!respuesta.ok) {
        throw new Error(
          editando
            ? 'No se pudo actualizar el paciente.'
            : 'No se pudo registrar el paciente.'
        )
      }

      await cargarPacientes()
      setMensaje(
        editando
          ? 'Paciente actualizado correctamente.'
          : 'Paciente registrado correctamente.'
      )
      setFormulario(formularioVacio)
      setPacienteEditando(null)
      setMostrarFormulario(false)
    } catch (error) {
      setMensaje(
        error.message || 'Ocurrió un error al guardar el paciente.'
      )
    }
  }

  async function eliminarPaciente(id) {
    const confirmar = window.confirm(
      '¿Estás segura de que deseas eliminar este paciente de la base de datos?'
    )

    if (!confirmar) return

    setMensaje('')

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el paciente.')
      }

      await cargarPacientes()
      setMensaje('Paciente eliminado correctamente.')
    } catch (error) {
      setMensaje(
        error.message || 'Ocurrió un error al eliminar el paciente.'
      )
    }
  }

  return (

    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">+</div>
          <div>
            <strong>CitaMed</strong>
            <span>Gestión médica</span>
          </div>
        </div>

        <p className="menu-label">MENÚ PRINCIPAL</p>

        <nav className="navigation">
          <a href="#inicio" className="nav-item">
            <span>⌂</span> Inicio
          </a>
          <a href="#pacientes" className="nav-item active">
            <span>♙</span> Pacientes
          </a>
          <a href="#citas" className="nav-item">
            <span>▦</span> Citas médicas
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">AD</div>
          <div>
            <strong>Administrador</strong>
            <span>Panel de gestión</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="pacientes">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Sistema médico / Pacientes</span>
            <h1>Gestión de pacientes</h1>
            <p>Administra la información de tus pacientes.</p>
          </div>
          <div className="topbar-status">
            <span className="status-dot" />
            Conectado con MySQL
          </div>
        </header>

        <section className="welcome-card">
          <div>
            <span className="welcome-label">PANEL DE ADMINISTRACIÓN</span>
            <h2>¡Bienvenida a CitaMed!</h2>
            <p>
              Mantén organizada la información de los pacientes
              desde un solo lugar.
            </p>
          </div>
          <div className="welcome-symbol" aria-hidden="true">✚</div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon blue">♙</span>
            <span className="stat-label">Total de pacientes</span>
            <strong>{pacientes.length}</strong>
            <small>Pacientes registrados</small>
          </article>

          <article className="stat-card">
            <span className="stat-icon green">✓</span>
            <span className="stat-label">Estado del proyecto</span>
            <strong>Activo</strong>
            <small>Interfaz React funcionando</small>
          </article>

          <article className="stat-card">
            <span className="stat-icon purple">▦</span>
            <span className="stat-label">Módulo actual</span>
            <strong>Pacientes</strong>
            <small>Registro y administración</small>
          </article>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Listado de pacientes</h2>
              <p>Consulta y administra los pacientes registrados en el sistema.</p>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={abrirNuevoPaciente}
            >
              + Nuevo paciente
            </button>
          </div>

          {mensaje && (
            <div className="message" role="status">
              {mensaje}
            </div>
          )}

          {mostrarFormulario && (
            <form className="patient-form" onSubmit={guardarPaciente}>
              <h3>
                {pacienteEditando !== null
                  ? 'Editar paciente'
                  : 'Registrar paciente'}
              </h3>

              <div className="form-grid">
                <label>
                  Nombre
                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                    required
                    maxLength={80}
                  />
                </label>

                <label>
                  Apellido
                  <input
                    name="apellido"
                    value={formulario.apellido}
                    onChange={actualizarCampo}
                    required
                    maxLength={80}
                  />
                </label>

                <label>
                  Documento
                  <input
                    name="documento"
                    value={formulario.documento}
                    onChange={actualizarCampo}
                    required
                    maxLength={30}
                  />
                </label>

                <label>
                  Teléfono
                  <input
                    name="telefono"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                    required
                    maxLength={30}
                  />
                </label>

                <label>
                  Correo electrónico
                  <input
                    name="correo"
                    type="email"
                    value={formulario.correo}
                    onChange={actualizarCampo}
                    required
                    maxLength={120}
                  />
                </label>

                <label>
                  Fecha de nacimiento
                  <input
                    name="fechaNacimiento"
                    type="date"
                    value={formulario.fechaNacimiento}
                    onChange={actualizarCampo}
                    required
                  />
                </label>
              </div>

              <div className="form-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
                <button className="primary-button" type="submit">
                  Guardar paciente
                </button>
              </div>
            </form>
          )}

          <div className="table-toolbar">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar por nombre o documento..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              aria-label="Buscar pacientes"
            />
            <span>{pacientesFiltrados.length} registros</span>
          </div>


        
<div className="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Paciente</th>
        <th>Documento</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      {cargando && (
        <tr>
          <td colSpan={5} className="empty-state">
            Cargando pacientes...
          </td>
        </tr>
      )}

      {!cargando &&
        pacientesFiltrados.map((paciente) => (
          <tr key={paciente.id}>
            <td>
              <strong>
                {paciente.nombre} {paciente.apellido}
              </strong>
            </td>
            <td>{paciente.documento}</td>
            <td>{paciente.telefono}</td>
            <td>{paciente.correo}</td>
            <td>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => editarPaciente(paciente)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => eliminarPaciente(paciente.id)}
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}

      {!cargando && pacientesFiltrados.length === 0 && (
        <tr>
          <td colSpan={5} className="empty-state">
            No se encontraron pacientes.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


         
          <p className="demo-notice">
            Los pacientes se consultan y guardan en la base de datos MySQL
            mediante el servidor Spring Boot.
          </p>

        </section>

        <footer className="page-footer">
          Sistema de Gestión de Citas Médicas · Proyecto formativo
        </footer>
      </main>
    </div>
  )
}

export default App
