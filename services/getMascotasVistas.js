import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMascotasVistas = async (setPetVistos) => {
  try {
    //  await AsyncStorage.removeItem("mascotasVistas");
    //  setPetVistos("");
    const cache = await AsyncStorage.getItem("mascotasVistas");
    if (cache) {
      setPetVistos(cache);
    } 
  } catch (error) {
    console.log("Error al obtener datos de caché:", error);
  }
};
