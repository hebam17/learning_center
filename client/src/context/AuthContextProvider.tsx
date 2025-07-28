import { createContext, ReactElement } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({});

type AccessTokenType = {
  accessToken: string | null;
};

type ChildrenType = ReactElement | null;

type Props = {
  authInfo: AccessTokenType;
  children: ChildrenType;
};

const AuthContextProvider = ({ children, authInfo }: Props) => {
  const decoded =
    authInfo && authInfo.accessToken && jwtDecode(authInfo.accessToken);

  console.log("decoded token:", decoded);
  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthContextProvider;
