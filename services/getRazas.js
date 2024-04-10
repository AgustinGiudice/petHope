import { BASE_URL } from "@env";

export const getRazas = async (animalnumber, setRazas) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/razas/allrazas?animal=${animalnumber}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setRazas(data);
  } catch (error) {
    console.error("Error fetching razas:", error);
  }
};
