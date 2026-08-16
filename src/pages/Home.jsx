import React from "react";
import { Navigate } from "react-router";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth/auth";

const Home = () => {
  const { user, isInitializing, signout } = React.useContext(AuthContext);

  if (isInitializing) return null;

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <h1>Olá, {user.first_name}</h1>
      <Button onClick={signout}>Sair</Button>
    </>
  );
};

export default Home;
