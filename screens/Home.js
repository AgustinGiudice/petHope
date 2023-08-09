import * as React from "react";
import { View, Text, Button } from "react-native";
import  { useState } from "react";

function Home({ navigation }) {

  const [token, setToken] = useState('');
  const saveTokenToState = (newToken) => {
    setToken(newToken);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      {token ? (
        <Button title="Cerrar Sesión" onPress={() => setToken('')} />
      ) : (
        <Button title="Iniciar Sesión" onPress={() => saveTokenToState('token-de-ejemplo')} />
      )}

      <Button
        title="Ir a Matchs"
        onPress={() => navigation.navigate("Matchs")}
      />
    </View>
  );
}

export default Home;
