import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMascotasVistas = async (setPetVistos) => {
  try {
    const cache = await AsyncStorage.getItem("mascotasVistas");
    if (cache !== null) {
      setPetVistos(cache);
    }
  } catch (error) {
    console.log("Error al obtener datos de caché:", error);
  }
};
