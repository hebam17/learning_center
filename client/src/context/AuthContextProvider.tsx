import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

type idDecoded = {
  userId: string;
  username: string;
  roles: string;
} | null;

// Define the interface for the object containing the state and setter
export interface StateAndSetterObject {
  idDecodedToken: idDecoded;
  setIdToken: Dispatch<SetStateAction<IdTokenType>>;
}

export const UserContext = createContext<StateAndSetterObject>({
  idDecodedToken: null,
  setIdToken: () => {},
});

type IdTokenType = string | null;

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [idToken, setIdToken] = useState<IdTokenType>(null);
  const decoded: idDecoded = idToken ? jwtDecode(idToken) : null;
  const contextData: StateAndSetterObject = {
    idDecodedToken: decoded,
    setIdToken,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default AuthContextProvider;
