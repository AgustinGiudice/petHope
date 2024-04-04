import "react-native-gesture-handler";
import MainStackNavigation from "./screens/MainNavigation";
//CONTEXT
import UserState from "./context/UserContext";
import CountMatchesContext from "./context/CountMatchesContext";
import TokenState from "./context/TokenContext";
import { StatusBar } from "react-native";

export default function App() {
  StatusBar.setBackgroundColor("#c69ae8");
  return (
    <UserState>
      <CountMatchesContext>
        <TokenState>
          <MainStackNavigation />
        </TokenState>
      </CountMatchesContext>
    </UserState>
  );
}
