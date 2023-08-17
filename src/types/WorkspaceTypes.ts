export type Workspace = {
  id: number,
  name: string
}

export type WorkspaceProviderValue = {
  currentWorkspace: Workspace | undefined,
  getWorkspaces: (userId: string) => Promise<Workspace[]>,
  switchWorkspace: (workspaceId: string) => void
}

export type WorkspaceInfoProps = { 
  currentWorkspace: Workspace | undefined, 
  workspaces: Workspace[], 
  callback: (wrkId: string) => void 
}