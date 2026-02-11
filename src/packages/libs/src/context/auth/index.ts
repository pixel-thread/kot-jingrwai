import { AuthContextI } from "@repo/types";
import React from "react";

export const AuthContext = React.createContext<AuthContextI | null>(null);
