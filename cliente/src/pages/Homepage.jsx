import { useEffect, useState } from 'react'
import { obtenerMembresias, actualizarMembresia } from '../api/membresias'
import MembresiaList from '../components/MembresiaList'

export default function Homepage() {
  const [membresias, setMembresias] = useState([])

  async function cargarMembresias() {
    const respuesta = await obtenerMembresias()
    setMembresias(respuesta.data)
  }

  useEffect(() => {
    cargarMembresias()
  }, [])

  async function cambiarEstado(membresia) {
    await actualizarMembresia(membresia.id, { activo: !membresia.activo })
    cargarMembresias()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de membresías</h1>
      <MembresiaList membresias={membresias} cambiarEstado={cambiarEstado} />
    </div>
  )
}