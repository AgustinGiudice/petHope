import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMascotas = async (
  url,
  token,
  navigation,
  setMascotas,
  index,
  setIndex,
  resetMatches,
  setResetMatches,
  setIsLoading,
  setCurrentUser
) => {
  try {
    const response = await fetchData(url, token); //verificar si se necesita el await o no

    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }

    const data = await response.json();
    manejarMascotas(
      data,
      setMascotas,
      resetMatches,
      setResetMatches,
      index,
      setIndex
    );
    console.log(data);
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
  } finally {
    setIsLoading(false);
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

function manejarMascotas(
  data,
  setMascotas,
  resetMatches,
  setResetMatches,
  index,
  setIndex
) {
  if (data.length > 0) {
    if (!resetMatches) {
      setMascotas((prevData) => prevData.concat(data));
    } else {
      setMascotas(data);
      setResetMatches(false);
    }
  } else {
    if (!resetMatches) {
      setIndex(1);
    } else {
      if (index === 0) {
        setIndex(1);
      }
      setMascotas([]);
      setResetMatches(false);
    }
  }
}
