import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage";
import { UserService } from "@/services/user";

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

const AuthContext = React.createContext({
  isInitializing: true,
  user: null,
  login: () => {},
  signup: () => {},
  signout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isInitializing, setIsInitializing] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);

        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );

        if (!accessToken && !refreshToken) return;

        const response = await UserService.me();

        setUser(response);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      const response = await UserService.signup(data);
      return response;
    },
  });

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (user) => {
        setTokens(user.tokens);
        setUser(user);
        toast.success("Conta criada com sucesso.");
      },
      onError: () => {
        toast.error(
          "Erro ao criar conta. Por favor, tente novamente mais tarde."
        );
      },
    });
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await UserService.login(data);
      return response;
    },
  });

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (user) => {
        setTokens(user.tokens);
        setUser(user);
        toast.success("Login realizado com sucesso.");
      },
      onError: () => {
        toast.error(
          "Erro ao fazer login. Por favor, tente novamente mais tarde."
        );
      },
    });
  };

  const signout = () => {
    removeTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isInitializing,
        user,
        login,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
