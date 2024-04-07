import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRefugios = async (
  url,
  token,
  navigation,
  setRefugios,
  setCurrentUser
) => {
  try {
    const response = await fetchData(url, token); 

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
    console.log("No se pudo realizar la conexión con la API: ", error);
  }
}
