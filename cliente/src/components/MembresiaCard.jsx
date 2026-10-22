import { useNavigate } from 'react-router-dom'

export default function MembresiaCard({ membresia, cambiarEstado }) {
  const navigate = useNavigate()

  const colores = membresia.activo
    ? 'bg-green-100 border-green-500'
    : 'bg-white border-gray-300'

  return (
    <div className={`border-l-4 shadow rounded p-4 ${colores}`}>
      <h2 className="text-lg font-bold">{membresia.nombre_usuario}</h2>
      <p>Plan: {membresia.plan_suscripcion}</p>
      <p>Duración: {membresia.meses_duracion} meses</p>
      <p>Estado: {membresia.activo ? 'Activa' : 'Inactiva'}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => cambiarEstado(membresia)}
          title="Cambiar estado"
          className={`p-2 rounded ${membresia.activo ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        <button
          onClick={() => navigate(`/editar/${membresia.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Editar
        </button>
      </div>
    </div>
  )
}