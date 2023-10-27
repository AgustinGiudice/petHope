import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (
  userData,
  setUserData,
  isRefugio,
  setToken,
  setCurrentUser,
  setError,
  navigation
) => {
  fetch(
    `https://mascotas-back-31adf188c4e6.herokuapp.com/api/${
      isRefugio ? "refugios" : "usuarios"
    }/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.token && data.usuario) {
        data.usuario.imagen && data.usuario.tuvoMascotas
          ? (data.usuario.completado = 100)
          : data.usuario.imagen || data.usuario.tuvoMascotas
          ? (data.usuario.completado = 66)
          : (data.usuario.completado = 33);

        const data_user = {
          token: data.token,
          usuario: data.usuario,
          matches: data.matches,
        };
        setToken(data.token);
        AsyncStorage.setItem("token", JSON.stringify(data_user))
          .then(() => {
            console.log("Token guardado correctamente:", data.token);
            return AsyncStorage.getItem("token"); // Recuperar el token
          })
          .then((storedToken) => {
            console.log("Token almacenado en AsyncStorage:", storedToken); //mostrar token en async storage
            const { usuario, token } = data;
            usuario.isRefugio = isRefugio;
            setCurrentUser(usuario);
            setUserData({ mail: "", pass: "" });
            setError("");
            navigation.navigate("Tabs", { usuario, token });
          });
      } else {
        setError("Inicio de sesión fallido"); // Establecer mensaje de error
      }
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
};
