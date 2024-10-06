'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '../api/use-current-user';
import { Loader2, LogOut } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';


function UserButton() {
  const {signOut}=useAuthActions();
  const {data, isLoading} = useCurrentUser();

  if (isLoading){
    return <Loader2 className='w-4 h-4 animate-spin'/>
  }

  if(!data){
    return null
  }

  const {name, image} = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return <DropdownMenu modal={false}>
    <DropdownMenuTrigger className='outline-none relative'>
      <Avatar className='size-10 hover:opacity-75 transition'>
        <AvatarImage alt={name} src={image}/>
        <AvatarFallback className='bg-sky-500 text-white'>
          {avatarFallback}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='center' side='right' className='w-60'>
      <DropdownMenuItem onClick={() => signOut()} className='h-10 cursor-pointer'>
        <LogOut className='sixe-4 mr-2'/>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}

export default UserButton;
