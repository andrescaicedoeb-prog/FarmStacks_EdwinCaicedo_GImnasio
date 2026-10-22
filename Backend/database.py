from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

cliente = AsyncIOMotorClient(config("MONGO_URL"))
db = cliente.gimnasio_db
coleccion = db.membresias


def a_dict(m):
    # Convierte el documento de MongoDB a un diccionario normal
    return {
        "id": str(m["_id"]),
        "nombre_usuario": m["nombre_usuario"],
        "plan_suscripcion": m["plan_suscripcion"],
        "meses_duracion": m["meses_duracion"],
        "activo": m["activo"],
    }


async def obtener_todas():
    lista = []
    async for m in coleccion.find():
        lista.append(a_dict(m))
    return lista


async def obtener_una(id):
    if not ObjectId.is_valid(id):
        return None
    m = await coleccion.find_one({"_id": ObjectId(id)})
    if m:
        return a_dict(m)
    return None


async def obtener_por_nombre(nombre):
    m = await coleccion.find_one({"nombre_usuario": nombre})
    if m:
        return a_dict(m)
    return None


async def crear(datos):
    resultado = await coleccion.insert_one(datos)
    nueva = await coleccion.find_one({"_id": resultado.inserted_id})
    return a_dict(nueva)


async def actualizar(id, datos):
    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": datos})
    return await obtener_una(id)


async def eliminar(id):
    resultado = await coleccion.delete_one({"_id": ObjectId(id)})
    return resultado.deleted_count == 1