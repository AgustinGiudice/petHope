import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import CustomComponent from "./components/CustomComponent";
import Menu from "./components/Menu";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomComponent />
      <Menu />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
