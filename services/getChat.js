import AsyncStorage from "@react-native-async-storage/async-storage";

export const getChat = async (
  receiverId,
  senderId,
  mascotaId,
  setMessages,
  token,
  setCurrentUser,
  navigation
) => {
  try {
    const response = await fetch(
      `https://mascotas-back-31adf188c4e6.herokuapp.com/api/mensajes?receiver=${receiverId}&sender=${senderId}&mascota=${mascotaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    const data = await response.json();
    setMessages(data);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
};
