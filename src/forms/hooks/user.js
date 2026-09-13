import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "@/contexts/auth/auth";

import { useLoginFormSchema, useSignupFormSchema } from "../schemas/user";

const useLoginForm = () => {
  const { login } = React.useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(useLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data) => login(data);

  return { form, handleSubmit };
};

const useSignupForm = () => {
  const { signup } = React.useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(useSignupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const handleSubmit = (data) => signup(data);

  return { form, handleSubmit };
};

export { useLoginForm, useSignupForm };
