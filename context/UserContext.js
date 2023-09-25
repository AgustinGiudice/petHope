import { createContext, useState } from "react";

export const UserContext = createContext(null);

function UserState({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserState;
