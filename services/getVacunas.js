// Servicio para obtener las vacunas de una mascota específica
import { BASE_URL } from "@env"; // Asegúrate de que BASE_URL esté correctamente definido en tu .env

export const getVacunas = async (mascotaId) => {
  try {
    const url = `${BASE_URL}api/vacunas/vacunas-detalladas2/${mascotaId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Retorna los datos de las vacunas para la mascota especificada
  } catch (error) {
    console.error("Error fetching vacunas para mascota:", error);
    return []; // En caso de error, retorna un arreglo vacío para manejarlo de forma segura
  }
};
