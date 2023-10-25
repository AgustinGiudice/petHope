import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const getRefugios = async (
  token,
  navigation,
  setRefugios,
  setCurrentUser
) => {
  try {
    const response = await fetchData(`${BASE_URL}api/refugios/`, token); //verificar si se necesita el await o no

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }

    const data = await response.json();
    setRefugios(data);
  } catch (error) {
    console.error("Error al obtener Refugios:", error);
  } finally {
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
    return response;
  } catch (error) {
    console.log("No se pudo realizar la conexión con la API");
    throw error;
  }
}
