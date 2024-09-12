import { BASE_URL } from "@env";

// Servicio para registrar al usuario
export const registrarUsuario = async (userData) => {
  return await fetchData(userData);
};

// Servicio para verificar si el email ya está en uso
export const validarEmail = async (email) => {
  return await fetchEmailStatus(email);
};

// Función para hacer la solicitud de registro de usuario
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

// Función para verificar si el email está en uso
async function fetchEmailStatus(email) {
  try {
    const response = await fetch(`${BASE_URL}api/usuarios/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Envía el email en el body
    });

    const data = await response.json();

    if (response.status === 200) {
      // El email está disponible
      return { available: true, message: data.message };
    } else if (response.status === 409) {
      // El email ya está en uso
      return { available: false, message: data.message };
    } else {
      return { available: false, message: "Ingrese un email válido." };
    }
  } catch (error) {
    console.log(error);
    return { available: false, message: "Error al verificar el email" };
  }
}
