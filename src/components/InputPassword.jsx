import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputPassword = ({ placeholder = "Digite a sua senha" }) => {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? "text" : "password"}
        placeholder={placeholder}
        className="pr-12"
      />
      <Button
        type="button"
        variant="ghost"
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto h-10 w-10"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default InputPassword;
