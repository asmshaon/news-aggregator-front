import { AuthContextType } from "@/types";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
