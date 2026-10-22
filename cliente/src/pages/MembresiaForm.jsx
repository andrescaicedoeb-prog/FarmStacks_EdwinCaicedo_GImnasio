import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  crearMembresia,
  obtenerMembresia,
  actualizarMembresia,
  eliminarMembresia,
} from '../api/membresias'

export default function MembresiaForm() {
  const [form, setForm] = useState({
    nombre_usuario: '',
    plan_suscripcion: 'Básico',
    meses_duracion: 1,
    activo: false,
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function cargarDatos() {
      if (params.id) {
        const respuesta = await obtenerMembresia(params.id)
        setForm(respuesta.data)
      }
    }
    cargarDatos()
  }, [params.id])

  function manejarCambio(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function guardar(e) {
    e.preventDefault()
    setError('')

    const datos = {
      nombre_usuario: form.nombre_usuario,
      plan_suscripcion: form.plan_suscripcion,
      meses_duracion: Number(form.meses_duracion),
      activo: form.activo,
    }

    try {
      if (params.id) {
        await actualizarMembresia(params.id, datos)
      } else {
        await crearMembresia(datos)
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Ocurrió un error al guardar')
    }
  }

  async function borrar() {
    if (window.confirm('¿Seguro que quieres eliminar esta membresía?')) {
      await eliminarMembresia(params.id)
      navigate('/')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {params.id ? 'Editar membresía' : 'Nueva membresía'}
      </h1>

      {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</p>}

      <form onSubmit={guardar} className="flex flex-col gap-3">
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Nombre del usuario"
          value={form.nombre_usuario}
          onChange={manejarCambio}
          required
          className="border p-2 rounded"
        />

        <select
          name="plan_suscripcion"
          value={form.plan_suscripcion}
          onChange={manejarCambio}
          className="border p-2 rounded"
        >
          <option>Básico</option>
          <option>Premium</option>
          <option>VIP</option>
        </select>

        <input
          type="number"
          name="meses_duracion"
          min="1"
          value={form.meses_duracion}
          onChange={manejarCambio}
          required
          className="border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="activo" checked={form.activo} onChange={manejarCambio} />
          Membresía activa
        </label>

        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          {params.id ? 'Guardar cambios' : 'Crear membresía'}
        </button>

        {params.id && (
          <button type="button" onClick={borrar} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
            Eliminar membresía
          </button>
        )}
      </form>
    </div>
  )
}