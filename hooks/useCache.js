import AsyncStorage from "@react-native-async-storage/async-storage";

//const [cachedData, setCachedData] = useState("");

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
    }
  } catch (error) {
    console.error("Error al cargar desde caché:", error);
  }
};

module.exports = {
  saveDataToCache,
  loadCachedData,
};
