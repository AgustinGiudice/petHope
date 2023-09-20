import * as React from "react";
import { View, Text, Button } from "react-native";
import { useState } from "react";

function Home({ navigation, route }) {
  const [token, setToken] = useState('');
  const [usuario, setUsuario] = useState(null); // Inicializar usuario como null

  // Obtener los parámetros de usuario y token de route.params
  React.useEffect(() => {
    if (route.params) {
      const { usuario, token } = route.params;
      setUsuario(usuario);
      setToken(token);
    }
  }, [route.params]);

  const handleCloseLogin = () => {
    setToken("");
    navigation.navigate("Login");
  }


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

    {token ? (
        <Button title="Cerrar Sesión" onPress={() => handleCloseLogin('')} />
      ) : (
        <Button title="Iniciar Sesión" onPress={() => saveTokenToState('token-de-ejemplo', usuarioEjemplo)} />
      )}

      {usuario && ( // Verificar si usuario existe antes de mostrar sus propiedades
        <View>
          <Text>Nombre: {usuario.nombre}</Text>
          <Text>Email: {usuario.mail}</Text>
        </View>
      )}

      <Button
        title="Ir a Matchs"
        onPress={() => navigation.navigate("Matchs")}
      />
    </View>
  );
}

export default Home;
