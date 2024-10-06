import React from 'react'

interface WorkspacePageProps {
  params: {
    workspaceId: string
  }
}

function WorkspacePage({ params }: WorkspacePageProps) {
  return (
    <div>WorkspacePage id: {params.workspaceId}</div>
  )
}

export default WorkspacePage