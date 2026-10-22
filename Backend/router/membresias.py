from fastapi import APIRouter, HTTPException
from models import Membresia, MembresiaUpdate
from database import (
    obtener_todas, obtener_una, obtener_por_nombre,
    crear, actualizar, eliminar,
)

router = APIRouter()


@router.get("/membresias")
async def listar_membresias():
    return await obtener_todas()


@router.get("/membresias/{id}")
async def ver_membresia(id: str):
    membresia = await obtener_una(id)
    if not membresia:
        raise HTTPException(status_code=404, detail="Membresía no encontrada")
    return membresia


@router.post("/membresias")
async def crear_membresia(membresia: Membresia):
    existe = await obtener_por_nombre(membresia.nombre_usuario)
    if existe:
        raise HTTPException(status_code=400, detail="Ya existe una membresía para ese usuario")
    return await crear(membresia.model_dump())


@router.put("/membresias/{id}")
async def editar_membresia(id: str, datos: MembresiaUpdate):
    actual = await obtener_una(id)
    if not actual:
        raise HTTPException(status_code=404, detail="Membresía no encontrada")

    cambios = datos.model_dump(exclude_unset=True)

    nuevo_nombre = cambios.get("nombre_usuario")
    if nuevo_nombre and nuevo_nombre != actual["nombre_usuario"]:
        repetido = await obtener_por_nombre(nuevo_nombre)
        if repetido:
            raise HTTPException(status_code=400, detail="Ya existe una membresía para ese usuario")

    return await actualizar(id, cambios)


@router.delete("/membresias/{id}")
async def borrar_membresia(id: str):
    borrada = await eliminar(id)
    if not borrada:
        raise HTTPException(status_code=404, detail="Membresía no encontrada")
    return {"mensaje": "Membresía eliminada"}