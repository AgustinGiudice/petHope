import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const login = async (
  userData,
  setUserData,
  setToken,
  setCurrentUser,
  setError,
  navigation
) => {
  try {
    console.log(BASE_URL);
    const response = await fetchData(
      `${BASE_URL}api/refugios/login`,
      userData,
      setError
    );
    console.log(response);

    const data = await response.json();
    if (response.status === 404) {
      const secondResponse = await fetchData(
        `${BASE_URL}api/usuarios/login`,
        userData,
        setError
      );
      const data2 = await secondResponse.json();
      if (secondResponse.status === 200) {
        await handleStatus200(
          data2,
          setToken,
          setUserData,
          setError,
          setCurrentUser,
          navigation,
          false
        );
      } else {
        setError(data2.mensaje);
      }
    }
    if (response.status === 401) {
      setError(data.mensaje);
    }

    if (response.status === 200) {
      await handleStatus200(
        data,
        setToken,
        setUserData,
        setError,
        setCurrentUser,
        navigation,
        true
      );
    }
  } catch (error) {
    console.error(error);
  }
};

async function fetchData(url, userData, setError) {
  console.log(url);
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    setError("Error del servidor \nIntente nuevamente más tarde");
    console.error(error);
  }
}

async function handleStatus200(
  data,
  setToken,
  setUserData,
  setError,
  setCurrentUser,
  navigation,
  isRefugio
) {
  const data_user = {
    token: data.token,
    usuario: data.usuario,
    matches: data.matches,
  };

  setToken(data.token);
  await AsyncStorage.setItem("token", JSON.stringify(data_user));

  const { usuario, token } = data;
  usuario.isRefugio = isRefugio;
  console.log({ usuario });
  setCurrentUser(usuario);
  setUserData({ mail: "", pass: "" });
  setError("");
  navigation.navigate("Tabs", { usuario, token });
}
