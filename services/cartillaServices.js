import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const getVacunasDetalladas2 = async (mascotaId, token) => {
  try {
    const response = await fetch(`${BASE_URL}api/vacunas/vacunas-detalladas2/${mascotaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      throw new Error("Acceso no autorizado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener las vacunas detalladas:", error);
    throw error;
  }
};

export const actualizarVacuna = async (vacuna, token) => {
  try {
    const response = await fetch(`${BASE_URL}api/vacunas/actualizar-vacuna`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vacuna),
    });

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      throw new Error("Acceso no autorizado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la vacuna:", error);
    throw error;
  }
};

export const agregarVacuna = async (vacuna, token) => {
  try {
    const response = await fetch(`${BASE_URL}api/vacunas/agregar-vacuna`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vacuna),
    });

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      throw new Error("Acceso no autorizado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al agregar la vacuna:", error);
    throw error;
  }
};

export const eliminarVacuna = async (vacuna, token) => {
  try {
    const response = await fetch(`${BASE_URL}api/vacunas/eliminar-vacuna`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vacuna),
    });

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      throw new Error("Acceso no autorizado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la vacuna:", error);
    throw error;
  }
};
