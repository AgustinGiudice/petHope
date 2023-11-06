import { createStackNavigator } from "@react-navigation/stack";
import RefShowPets from "./tabScreens/refugioScreens/RefShowPets";
import EditarMascota from "./tabScreens/refugioScreens/EditarMascota";

const Stack = createStackNavigator();

function PetRefNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="RefShowPets"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RefShowPets" component={RefShowPets} />
      <Stack.Screen name="EditarMascota" component={EditarMascota} />
    </Stack.Navigator>
  );
}

export default PetRefNavigation;
