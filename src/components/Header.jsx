import { ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react";
import React from "react";

import LogoFintrack from "@/assets/images/logo-fintrack.svg";
import { AuthContext } from "@/contexts/auth/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { user, signout } = React.useContext(AuthContext);

  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between px-8">
          <div>
            <a href="/">
              <img src={LogoFintrack} alt="Logo da Fintrack" />
            </a>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-40"
                render={
                  <Button variant="outline" className="space-x-1 px-4 py-5">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        {user.firstName[0]} {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <ChevronDownIcon />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon />
                    Perfil
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={signout}
                  >
                    <LogOutIcon />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
