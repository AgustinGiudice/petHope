import { BASE_URL } from "@env";

export const setMascotaLike = async (idMascota, idUsuario, token) => {
  try {
    return await fetch(`${BASE_URL}api/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idMascota,
        idUsuario,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
