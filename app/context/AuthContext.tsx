"use client";
import { gettingUser, loginUser, updateUser } from "@/utils/fetchUser";
import { loginFormSchema } from "@/utils/formSchema";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";

interface LoginResponse {
  access: string;
  refresh: string;
}
interface JwtCustomePayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  name: string;
}
const AuthContext = createContext<{
  signIn: (credentials: z.infer<typeof loginFormSchema>) => void;
  token: LoginResponse | null;
  user: string | null;
  error: string;
}>({
  signIn: async () => {},
  token: null,
  error: "",
  user: null,
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await gettingUser()
      if(data){
        
      setUser(data)
      }else{
        await updateUser()
      }
    }
    getUser();
  })
  const signIn = (credentials: z.infer<typeof loginFormSchema>) => {
    const userData = loginUser(credentials).then((response) => {
      if (response as LoginResponse){
        setError("");
      const decoded = jwtDecode<JwtCustomePayload>(response.access);
      setUser(decoded.name ? decoded.name : null);
      setToken(response);
      }else{
        setError("Invalid Credentials!")
      }
      
    }).catch(err => {
      setError(err.message)
    });
  };
  return (
    <AuthContext.Provider value={{ signIn, token, error, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
