import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMascotas = async (
  url,
  token,
  navigation,
  setMascotas,
  setPetVistos,
  setIndex,
  resetMatches,
  setResetMatches,
  setIsLoading
) => {
  try {
    const response = fetchData(url, token); //verificar si se necesita el await o no

    if (response.status === 401 || response.status === 403) {
      AsyncStorage.removeItem("token");
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }

    const data = await response.json();

    const hayMascotas = manejarMascotas(
      data,
      setMascotas,
      setResetMatches,
      setPetVistos,
      setIndex,
      resetMatches
    );

    if (hayMascotas) {
      saveIdMascotaEnCache(data, setPetVistos);
    }
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
  setResetMatches,
  setIndex,
  resetMatches
) {
  if (data.length > 0) {
    if (!resetMatches) {
      setMascotas((prevData) => prevData.concat(data));
    } else {
      setMascotas(data);
      setResetMatches(false);
    }
    return true;
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
    return false;
  }
}

function saveIdMascotaEnCache(data, setPetVistos) {
  const idMascotas = data.map((mascota) => mascota.id);
  setPetVistos((prevString) => {
    const updatedString =
      prevString === ""
        ? idMascotas.join("|")
        : prevString + "|" + idMascotas.join("|");
    AsyncStorage.setItem("mascotasVistas", updatedString);
    return updatedString;
  });
}
