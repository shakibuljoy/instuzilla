"use client";
import { createContext, useEffect, useState } from "react";
import { z } from "zod";
import {jwtDecode} from "jwt-decode";
import { gettingUser, logOutUser, loginUser, updateUser } from "@/utils/fetchUser";
import { loginFormSchema } from "@/utils/formSchema";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface JwtCustomPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  name: string;
  type: string;
}

const AuthContext = createContext<{
  signIn: (credentials: z.infer<typeof loginFormSchema>) => void;
  token: LoginResponse | null;
  user: { name: string | null; user_type: string | null } | null ;
  error: string;
  logOut: () => boolean;
  loading: boolean;
}>({
  signIn: async () => {},
  token: null,
  error: "",
  user: null,
  logOut: () => false,
  loading: true,
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ name: string | null; user_type: string | null } | null >(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const userData = await gettingUser();
        if (userData) {
          setUser(userData);
        } else {
          const updatedToken = await updateUser();
          if (updatedToken) {
            const decoded = jwtDecode<JwtCustomPayload>(updatedToken.access);
            setUser({
              name: decoded.name || null,
              user_type: decoded.type || null,
            });
            setToken(updatedToken);
          }else{
            logOut()
            setLoading(false);
          }
        }
      } catch (err) {
        setError("An error occured when fetching user");
      }finally{
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signIn = async (credentials: z.infer<typeof loginFormSchema>) => {
    setError("");
    setLoading(true)
    try {
      const response = await loginUser(credentials);
      const data = await response;
      if (response) {
        const decoded = jwtDecode<JwtCustomPayload>(response.access);
        setUser({
          name: decoded.name || null,
          user_type: decoded.type || null,
        });
        setToken(response);
        return true;
      } else {
        setError(data.detail);
        return false
      }
    } catch (err:any) {
      setError(err.message);
      return false;
    }finally{
      setLoading(false);
    }
  };




  const logOut = () => {
    setLoading(true);
    const loggingOut = logOutUser();
    if (loggingOut) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ signIn, token, error, user, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
