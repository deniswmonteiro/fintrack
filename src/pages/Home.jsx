import React from "react";
import { Navigate } from "react-router";

import { AuthContext } from "@/contexts/auth/auth";

const Home = () => {
  const { user, isInitializing } = React.useContext(AuthContext);

  if (isInitializing) return null;

  if (!user) return <Navigate to="/login" />;

  return <h1>Página inicial</h1>;
};

export default Home;
