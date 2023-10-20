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
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    
    const data = await response;
    return data;
  } catch (error) {
    throw error;
  }
}
