import { BASE_URL } from "@env";

export const registrarUsuario = async (userData) => {
  response = await fetchData(userData);
};

async function fetchData(userData) {
  try {
    const response = await fetch(`${BASE_URL}api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
