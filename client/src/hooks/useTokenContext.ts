import { TokenContext } from "@/context/TokenContext";
import { useContext } from "react";

export function useTokenContext() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
}
