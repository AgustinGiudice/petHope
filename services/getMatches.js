import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMatches = async (
  navigation,
  currentUser,
  setCurrentUser,
  token,
  setIsLoading,
  setMatches,
  setRefreshing
) => {
  try {
    setRefreshing(true);

    const response = await fetch(`${BASE_URL}api/match/${currentUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de matches.");
    }
    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    const data = await response.json();
    setIsLoading(false);
    setMatches(data);
  } catch (error) {
    console.error("Error al obtener los matches:", error);
  } finally {
    setRefreshing(false);
  }
};
