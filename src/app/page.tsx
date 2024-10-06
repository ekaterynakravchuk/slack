'use client';

import UserButton from '@/features/auth/components/user-button';

export default function Home() {

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <UserButton />
    </div>
  );
}
