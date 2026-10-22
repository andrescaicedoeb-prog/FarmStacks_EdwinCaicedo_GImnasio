import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import MembresiaForm from './pages/MembresiaForm'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nueva" element={<MembresiaForm />} />
        <Route path="/editar/:id" element={<MembresiaForm />} />
      </Routes>
    </BrowserRouter>
  )
}
