import MainStackNavigation from "./screens/MainNavigation";
import TabNavigation from "./screens/TabNavigation";
//CONTEXT
import { AuthContextProvider } from "./context/AuthContext";
import UserState from "./context/UserContext";

export default function App() {
  return (
    <UserState>
      <MainStackNavigation />
    </UserState>
  );
}
