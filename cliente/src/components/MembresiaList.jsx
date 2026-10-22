import MembresiaCard from './MembresiaCard'

export default function MembresiaList({ membresias, cambiarEstado }) {
  if (membresias.length === 0) {
    return <p>No hay membresías registradas.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {membresias.map((m) => (
        <MembresiaCard key={m.id} membresia={m} cambiarEstado={cambiarEstado} />
      ))}
    </div>
  )
}