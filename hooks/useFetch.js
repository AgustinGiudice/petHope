export async function fetchData(url, token, method, body, navigation) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    if (response.status === 401 || response.status === 403) {
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
