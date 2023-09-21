import AsyncStorage from "@react-native-async-storage/async-storage";

const saveDataToCache = async (nombreCache, dataCache) => {
  try {
    await AsyncStorage.setItem(nombreCache, dataCache);
    console.log("Datos guardados en caché");
  } catch (error) {
    console.error("Error al guardar en caché:", error);
  }
};

const loadCachedData = async (nombreCache) => {
  try {
    const cachedData = await AsyncStorage.getItem(nombreCache);
    if (cachedData !== null) {
      return cachedData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al cargar desde caché:", error);
  }
};

const clearCache = async (nombreCache) => {
  try {
    await AsyncStorage.removeItem(nombreCache);
    console.log("Cache borrado");
  } catch (error) {
    console.log("Error al limpiar el caché:", error);
  }
};

module.exports = {
  saveDataToCache,
  loadCachedData,
  clearCache,
};
