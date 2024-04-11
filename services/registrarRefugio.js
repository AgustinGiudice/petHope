import { BASE_URL } from "@env";

export const registrarRefugio = (
  refugioData,
  setRefugioData,
  initialData,
  navigation
) => {
  fetch(`${BASE_URL}api/refugios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refugioData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRefugioData(initialData);
      navigation.navigate("RegisterComplete");
    })
    .catch((error) => {
      console.error("Error al guardar el refugio:", error);
    });
};
