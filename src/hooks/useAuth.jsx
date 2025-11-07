import { useContext } from "react";
import { AuthContext } from "../components/AuthContextValue";

export function useAuth() {
  return useContext(AuthContext);
}
