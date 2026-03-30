import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { client } from "./util/graphqlClient";
import { verifyToken } from "./data/authData";
import { loginUser } from "./data/userData";
import type { User } from "./data/gql/graphql";

type SafeUser = Omit<User, "password" | "locations" | "plants">;

export interface AuthState {
  isAuthenticated: boolean;
  user: SafeUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const ACCESS_TOKEN_NAME = "accessToken";

interface AccessTokenCookieValue {
  accessToken?: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies<
    "accessToken",
    AccessTokenCookieValue
  >(["accessToken"]);

  // Restore auth state on app load
  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      // Validate token with your API
      client
        .request(verifyToken, { accessToken: token })
        .then((userData) => {
          setUser(userData.auth.getVerifiedUserByToken);
          setIsAuthenticated(true);
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
    const loginResponse = response.auth.login.loginUser;

    if (loginResponse.__typename === "LoginError") {
      throw new Error(`Authentication failed ${loginResponse.message}`);
    }

    const userData = loginResponse.user;
    setUser(userData);
    setIsAuthenticated(true);
    setCookie(ACCESS_TOKEN_NAME, loginResponse.token);
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
