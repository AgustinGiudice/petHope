import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegisterRef from './RegisterRef';
import RegisterUser from './RegisterUser';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName='RegisterRef'>
      <Drawer.Screen name="RegisterRef" component={RegisterRef} />
      <Drawer.Screen name="RegisterUser" component={RegisterUser} />
    </Drawer.Navigator>
  );
}