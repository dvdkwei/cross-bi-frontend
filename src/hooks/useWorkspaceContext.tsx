import { useContext } from "react";
import { WorkspaceContext } from "../contexts/WorkspaceContext";

export const useWorkspaceContext = () => {
  return useContext(WorkspaceContext);
}