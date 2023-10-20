import "react-native-gesture-handler";
import MainStackNavigation from "./screens/MainNavigation";
//CONTEXT
import UserState from "./context/UserContext";
import CountMatchesContext from "./context/CountMatchesContext";
import TokenState from "./context/TokenContext";

export default function App() {
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
