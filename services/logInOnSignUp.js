import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const logInOnSignUp = async (userData, setCurrentUser) => {
  try {
    const response = await fetchData(`${BASE_URL}api/usuarios/login`, userData);
    const data = await response.json();

    if (data.token && data.usuario) {
      const data_user = {
        token: data.token,
        usuario: data.usuario,
        matches: data.matches,
      };
      AsyncStorage.setItem("token", JSON.stringify(data_user))
        .then(() => {
          console.log("Token guardado correctamente:", data.token);
          return AsyncStorage.getItem("token"); // Recuperar el token
        })
        .then((storedToken) => {
          console.log("Token almacenado en AsyncStorage:", storedToken); //mostrar token en async storage
          const { usuario, token } = data;
          setCurrentUser(usuario);
        });
    } 
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

async function fetchData(url, userData) {
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error(error);
  }
}
