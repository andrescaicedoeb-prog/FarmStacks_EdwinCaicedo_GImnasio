import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const obtenerMembresias = () => axios.get(`${API_URL}/membresias`)

export const obtenerMembresia = (id) => axios.get(`${API_URL}/membresias/${id}`)

export const crearMembresia = (membresia) => axios.post(`${API_URL}/membresias`, membresia)

export const actualizarMembresia = (id, membresia) => axios.put(`${API_URL}/membresias/${id}`, membresia)

export const eliminarMembresia = (id) => axios.delete(`${API_URL}/membresias/${id}`)


