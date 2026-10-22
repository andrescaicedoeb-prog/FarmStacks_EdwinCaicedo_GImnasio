import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-4 flex flex-wrap justify-between items-center gap-2">
      <Link to="/" className="text-xl font-bold">
        Gimnasio - Membresías
      </Link>
      <Link to="/nueva" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
        Nueva membresía
      </Link>
    </nav>
  )
}

