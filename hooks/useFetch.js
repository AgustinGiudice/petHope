import { TokenContext } from "../context/TokenContext";
import { UserContext } from "../context/UserContext";
import { CountMatchesContext } from "../context/CountMatchesContext";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function fetchData(
  url,
  token,
  method,
  body,
  navigation,
  contentType
) {
  const { setCurrentUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const { setMatchesCount } = useContext(CountMatchesContext);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    if (response.status === 401 || response.status === 403) {
      setCurrentUser(null);
      setMatchesCount(null);
      setToken(null);
      AsyncStorage.removeItem("token");
      navigation.navigate("LoginScreen");
      throw new Error("Acceso no autorizado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
