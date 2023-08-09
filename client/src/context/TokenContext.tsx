import { Tokens } from "@/App";
import { ReactNode, createContext } from "react";

export interface TokenContextProps {
  setTokensInContext: (newToken: Tokens) => void;
  getTokensFromContext: () => Tokens | undefined;
  removeTokensFromContext: () => void;
}

export const TokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Store the token in the context
  const setTokensInContext = (newToken: Tokens) => {
    // Store the token in the local storage
    localStorage.setItem("token", JSON.stringify(newToken));
  };

  // Get the token from the local storage
  const getTokensFromContext = (): Tokens | undefined => {
    const token = localStorage.getItem("token");
    if (token) {
      return JSON.parse(token);
    }
    return undefined;
  };

  // Remove the token from the local storage
  const removeTokensFromContext = () => {
    localStorage.removeItem("token");
  };

  return (
    <TokenContext.Provider
      value={{
        setTokensInContext,
        getTokensFromContext,
        removeTokensFromContext,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
