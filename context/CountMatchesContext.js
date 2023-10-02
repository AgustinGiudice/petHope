import { createContext, useState } from "react";

export const CountMatchesContext = createContext(null);

function CountMatchesState({ children }) {
  const [matchesCount, setMatchesCount] = useState(null);

  return (
    <CountMatchesContext.Provider
      value={{
        matchesCount,
        setMatchesCount,
      }}
    >
      {children}
    </CountMatchesContext.Provider>
  );
}

export default CountMatchesState;
