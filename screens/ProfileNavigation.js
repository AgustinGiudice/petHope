import { createStackNavigator } from "@react-navigation/stack";
import PersonalData from "./tabScreens/PersonalData";
import MorePersonalData from "./tabScreens/MorePersonalData";

const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="PersonalData"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="MorePersonalData" component={MorePersonalData} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
