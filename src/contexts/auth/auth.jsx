import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import { api } from "@/lib/axios";

const LOCAL_STORAGE_ACCESS_TOKEN = "accessToken";
const LOCAL_STORAGE_REFRESH_TOKEN = "refreshToken";

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);

        if (!accessToken && !refreshToken) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        removeTokens();
        console.log(error);
      }
    };

    init();
  }, []);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      const response = await api.post("/users", {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });

      return response.data;
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
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      return response.data;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

export { AuthContext, AuthContextProvider };
