import { createStackNavigator } from "@react-navigation/stack";
import RegisterPet from "./tabScreens/refugioScreens/RegisterPet";
import Vacunas from "./tabScreens/refugioScreens/Vacunas";
const Stack = createStackNavigator();

function RegisterPetNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="RegisterPet"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RegisterPet" component={RegisterPet} />
      <Stack.Screen name="Vacunas" component={Vacunas} />
    </Stack.Navigator>
  );
}

export default RegisterPetNavigation;
