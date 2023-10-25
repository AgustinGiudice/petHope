export const cancelarMatch = async (
  matchId,
  token,
  navigation,
  setCurrentUser
) => {
  try {
    // URL de la API para cancelar un match (ajústala a tu API)
    const apiUrl = `${BASE_URL}api/match/delete/${matchId}`;

    const response = await fetch(apiUrl, {
      method: "PUT", // Método HTTP para actualizar el estado del match
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ matchId }), // Enviar el ID del match en el cuerpo de la solicitud
    });
    if (response.status === 401 || response.status === 403) {
      await AsyncStorage.removeItem("token");
      setCurrentUser(null);
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    if (response.ok) {
      // La solicitud fue exitosa, el match se ha cancelado
      alert("Match cancelado con éxito");
    } else {
      // La solicitud falló, puedes manejar los errores aquí
      alert("Error al cancelar el match");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    alert("Error al cancelar el match");
  }
};
