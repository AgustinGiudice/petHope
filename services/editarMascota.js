import { BASE_URL } from "@env";

export const editarMascota = async (id, petData, token) => {
    console.log("ID", id);
    console.log("PETDATA", petData);
    console.log("TOKEN", token);
    try {
      const response = await fetch(`${BASE_URL}api/mascotas/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petData),
      });
  
      if (!response.ok) {
        throw new Error("Error al editar la mascota");
      }
  
      const data = await response.json();
      console.log("RESPUESTA", data);
      return data;
    } catch (error) {
      console.error("Error en editarMascota:", error);
      throw error;
    }
  };
  