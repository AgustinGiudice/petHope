import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const agregarMascota = async (
  petData,
  images,
  token,
  navigation,
  setCurrentUser
) => {
  try {
    console.log("LLEGUE");
    const formData = new FormData();

    images.forEach((photo, index) => {
      formData.append(`petImage`, {
        uri: photo,
        type: "petImage/jpeg",
        name: `image${index}.jpg`,
      });
    });

    for (const key in petData) {
      if (petData.hasOwnProperty(key)) {
        formData.append(key, petData[key]);
      }
    }
    const response = await fetchData(token, formData);

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error al crear mascota:", error);
  }
};

async function fetchData(token, formData) {
  try {
    console.log("LLEGUE 2");
    console.log("Form Data Final" + JSON.stringify(formData));
    const response = await fetch(`${BASE_URL}api/mascotas/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.log("No se pudo realizar la conexión con la API");
    throw error;
  }
}
