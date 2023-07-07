import { createContext, useContext } from "react";

export function useAuth(){

  return useContext(createContext(null))
}