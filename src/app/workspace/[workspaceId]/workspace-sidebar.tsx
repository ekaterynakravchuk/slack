import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { AlertTriangle, Loader } from 'lucide-react';
import WorkspaceHeader from './workspace-header';

function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (memberLoading || workspaceLoading) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin shrink-0 text-white' />
      </div>
    );
  }
  if (!member || !workspace) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center gap-y-2'>
        <AlertTriangle className='size-5 shrink-0 text-white' />
        <span className='text-white'>No workspace found</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-[#5e2c5f] h-full'>
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'}/>
    </div>
  )
}

export default WorkspaceSidebar;
