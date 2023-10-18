import { createContext, useState } from "react";

export const TokenContext = createContext(null);

function TokenState({ children }) {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export default TokenState;
