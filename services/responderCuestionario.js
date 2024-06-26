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
    if (response.status === 200) {
      const data = await response.json();
      setCurrentUser(data.usuario);
      const new_obj = {
        token: token,
        usuario: data.usuario,
      };

      AsyncStorage.setItem("token", JSON.stringify(new_obj));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al completar el formulario", error);
    return false;
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
