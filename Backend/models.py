from pydantic import BaseModel
from typing import Optional

class Membresia(BaseModel):
    nombre_usuario: str
    plan_suscripcion: str
    meses_duracion: int
    activo: bool = False

class MembresiaUpdate(BaseModel):
    nombre_usuario: Optional[str] = None
    plan_suscripcion: Optional[str] = None
    meses_duracion: Optional[int] = None
    activo: Optional[bool] = None