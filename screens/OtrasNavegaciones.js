import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import Match from './Match';
import { View, TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Match" component={Match} />
    </Stack.Navigator>
  );
}

export default function OtrasNavegaciones({navigation}) {
    return (
        <View>
            <TouchableOpacity
            color="#007bff"
            onPress={() => navigation.navigate("Login")}
            >
            <Text>login</Text>
            </TouchableOpacity>
        </View>
    );
  }