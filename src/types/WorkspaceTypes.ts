export type Workspace = {
  id: number,
  name: string
}

export type WorkspaceProviderValue = {
  isLoading: boolean,
  currentWorkspace: Workspace | undefined,
  switchWorkspace: (workspaceId: string) => void,
  resetWorkspace: () => void
}

export type WorkspaceInfoProps = { 
  currentWorkspace: Workspace | undefined, 
  workspaces: Workspace[], 
}