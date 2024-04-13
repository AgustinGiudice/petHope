// vacunasService.js
import { BASE_URL } from "@env"; // Asegúrate de que BASE_URL esté correctamente definido en tu .env

export const registrarVacunas = async (vacunas, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/vacunas/registro-vacunacion/multiple`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vacunas),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data }; // Retorna un objeto indicando éxito y los datos recibidos
  } catch (error) {
    console.error("Error registrando vacunas:", error);
    return { success: false, error }; // Retorna un objeto indicando fracaso y el error ocurrido
  }
};
