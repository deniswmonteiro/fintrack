import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import { api } from "@/lib/axios";

import { AuthContext } from "./auth-context";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken && !refreshToken) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
        const accessToken = user.tokens.accessToken;
        const refreshToken = user.tokens.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {},
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
