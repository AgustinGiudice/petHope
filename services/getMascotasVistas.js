import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMascotasVistas = async (setPetVistos) => {
  try {
    const cache = await AsyncStorage.getItem("mascotasVistas");
    if (cache !== null) {
      console.log("cache", cache);
      setPetVistos(cache);
    }
  } catch (error) {
    console.log("Error al obtener datos de caché:", error);
  }
};
