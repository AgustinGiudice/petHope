import { createStackNavigator } from "@react-navigation/stack";
import RegisterPet from "./tabScreens/refugioScreens/RegisterPet";

const Stack = createStackNavigator();

function RegisterPetNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="RegisterPet"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RegisterPet" component={RegisterPet} />
      {/* <Stack.Screen name="Segundo" component={Chat} /> */}
    </Stack.Navigator>
  );
}

export default RegisterPetNavigation;
