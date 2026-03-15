import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { client } from "./util/graphqlClient";
import { verifyToken } from "./data/authData";
import { loginUser } from "./data/userData";

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const ACCESS_TOKEN_NAME = "accessToken";

interface AccessTokenCookieValue {
  accessToken?: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies<
    "accessToken",
    AccessTokenCookieValue
  >(["accessToken"]);

  // Restore auth state on app load
  useEffect(() => {
    const token = cookies.accessToken;
    console.log(`test test test ${token} ${isAuthenticated}`);
    if (token) {
      // Validate token with your API
      client
        .request(verifyToken, { accessToken: token })
        .then((userData) => {
          console.log(userData);
          if (userData.auth.getVerifiedUserByToken) {
            setUser(userData.auth.getVerifiedUserByToken);
            setIsAuthenticated(true);
          } else {
            setCookie(ACCESS_TOKEN_NAME, null);
          }
        })
        .catch(() => {
          setCookie(ACCESS_TOKEN_NAME, null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const login = async (username: string, password: string) => {
    const response = await client.request(loginUser, { username, password });
    if (response?.auth?.login?.loginUser?.message) {
      throw new Error(
        `Authentication failed ${response?.auth?.login?.loginUser?.message}`,
      );
    }

    const userData = response?.auth?.login?.loginUser?.user;
    setUser(userData);
    setIsAuthenticated(true);
    setCookie(ACCESS_TOKEN_NAME, response?.auth?.login?.loginUser?.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCookie(ACCESS_TOKEN_NAME, null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
