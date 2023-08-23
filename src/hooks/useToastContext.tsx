import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

export function useToastContext(){
  return useContext(ToastContext);
}