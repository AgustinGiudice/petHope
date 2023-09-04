import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//SCREENS
import LoginScreen from "./screens/Login";
import PersonalData from "./screens/PersonalData";
import ShowPets from "./screens/ShowPets";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator initialRouteName="Login">
            <Tab.Screen name="Login" component={LoginScreen}/>
            <Tab.Screen name="Perfil" component={PersonalData}/>
            <Tab.Screen name="Pets" component={ShowPets}/>
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}