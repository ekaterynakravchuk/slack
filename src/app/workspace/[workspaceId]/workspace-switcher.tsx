import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function WorkspaceSwitcher() {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [, setOpen] = useCreateWorkspaceModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className='w-9 h-9 relative overflow-hidden flex items-center justify-center rounded-md bg-[#ababab] hover:bg-[#ababab]/80 text-slate-900 font-semibold text-xl'>
          {workspaceLoading ? (
            <Loader className='size-5 animate-spin shrink-0' />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem
          className='cursor-pointer flex-col justify-start items-start capitalize'
          onClick={() => {
            router.push(`/workspace/${workspaceId}`);
          }}
        >
          {workspace?.name}
          <span className='text-xs text-muted-foreground'>
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className='cursor-pointer capitalize overflow-hidden'
            onClick={() => {
              router.push(`/workspace/${workspace._id}`);
            }}
          >
            <div className='shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className='truncate'>
            {workspace.name}
            </p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
          <div className='size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
            <Plus className='size-4' />
          </div>
          Create new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceSwitcher;
