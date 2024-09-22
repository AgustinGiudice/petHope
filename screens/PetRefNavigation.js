import { createStackNavigator } from "@react-navigation/stack";
import RefShowPets from "./tabScreens/refugioScreens/RefShowPets";
import EditarMascota from "./tabScreens/refugioScreens/EditarMascota";
import MascotaVacunas from "./tabScreens/refugioScreens/MascotaVacunas";
import DetalleCartillaVacunacion from "./tabScreens/refugioScreens/DetalleCartillaVacunacion";

const Stack = createStackNavigator();

function PetRefNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="RefShowPets"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RefShowPets" component={RefShowPets} />
      <Stack.Screen name="EditarMascota" component={EditarMascota} />
      <Stack.Screen name="MascotaVacunas" component={MascotaVacunas} />
      <Stack.Screen
        name="DetalleCartillaVacunacion"
        component={DetalleCartillaVacunacion}
      />

    </Stack.Navigator>
  );
}

export default PetRefNavigation;
