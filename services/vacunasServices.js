import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const getVacunasDetalladas = async (mascotaId, token, setVacunasDetalladas) => {
    try {
        const response = await fetchData(`${BASE_URL}api/vacunas/vacunas-detalladas2/${mascotaId}`, token);
        const data = await response.json();
        setVacunasDetalladas(data);
    } catch (error) {
        console.error("Error al obtener las vacunas detalladas:", error);
    }
};

export const getCartillaVacunacion = async (mascotaId, token, setCartillaVacunacion) => {
    try {
        const response = await fetchData(`${BASE_URL}api/vacunas/cartilla-vacunacion/${mascotaId}`, token);
        const data = await response.json();
        setCartillaVacunacion(data);
    } catch (error) {
        console.error("Error al obtener la cartilla de vacunación:", error);
    }
};

export const getVacunasSinRegistro = async (mascotaId, token, setVacunasSinRegistro) => {
    try {
        const response = await fetchData(`${BASE_URL}api/vacunas/vacunas-sin-registro/${mascotaId}`, token);
        const data = await response.json();
        setVacunasSinRegistro(data);
    } catch (error) {
        console.error("Error al obtener las vacunas sin registro:", error);
    }
};

async function fetchData(url, token) {
    try {
        const response = await fetch(url, {
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

        return response;
    } catch (error) {
        console.error("No se pudo realizar la conexión con la API:", error);
    }
}
