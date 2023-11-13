import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const responderCuestonario = async (
  userData,
  token,
  navigation,
  setCurrentUser
) => {
  try {
    const response = await fetchData(userData, token);

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }

    const data = await response.json();
    data.usuario.imagen && data.usuario.tuvoMascotas !== null
      ? (data.usuario.completado = 100)
      : data.usuario.imagen || data.usuario.tuvoMascotas
      ? (data.usuario.completado = 66)
      : (data.usuario.completado = 33);

    setCurrentUser(data.usuario);
    navigation.navigate("Tabs");
  } catch (error) {
    console.error("Error al completar el formulario", error);
  }
};

async function fetchData(userData, token) {
  try {
    return await fetch(`${BASE_URL}api/usuarios/cuestionario/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error("Error al completar el formulario", error);
  }
}
