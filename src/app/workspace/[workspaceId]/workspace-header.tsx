import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, SquarePen } from 'lucide-react';
import { Doc } from '../../../../convex/_generated/dataModel';
import Hint from '@/components/hint';
import PreferencesModal from './preferences-modal';
import { useState } from 'react';

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>;
  isAdmin: boolean;
}

function WorkspaceHeader({ workspace, isAdmin }: WorkspaceHeaderProps) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  return (
    <>
    <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />
      <div className='flex items-center justify-between px-4 h-[49px] gap-0.5'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='transparent'
              className='font-semibold text-lg w-auto p-1.5 overflow-hidden'
              size='sm'
            >
              <span className='truncate'>{workspace.name}</span>
              <ChevronDown className='size-4 ml-1 shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start' className='w-64'>
            <DropdownMenuItem className='cursor-pointer capitalize'>
              <div className='size-9 relative overflow-hidden mr-2 flex items-center justify-center rounded-md bg-[#606160] hover:bg-[#ababab]/80 text-white font-semibold text-xl'>
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className='flex flex-col items-start'>
                <p className='font-bold'>{workspace.name}</p>
                <p className='text-xs text-muted-foreground'>
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  Invite members to {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => setPreferencesOpen(true)}>
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex items-center gap-0.5'>
          <Hint label='Edit workspace' side='bottom'>
            <Button variant='transparent' size='iconSm'>
              <SquarePen className='size-5 text-white' />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
}

export default WorkspaceHeader;
