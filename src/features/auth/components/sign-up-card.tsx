'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
function SignUpCard({ setState }: SignUpCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5'>
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <Input
            disabled={false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm password'
            required
          />
          <Button disabled={false} type='submit' className='w-full' size='lg'>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={false}
            type='submit'
            onClick={() => {}}
            variant='outline'
            className='w-full relative'
            size='lg'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
            Sign up with Google
          </Button>
          <Button
            disabled={false}
            type='submit'
            onClick={() => {}}
            variant='outline'
            className='w-full relative'
            size='lg'
          >
            <FaGithub className='size-5 absolute top-2.5 left-2.5' />
            Sign up with GitHub
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className='text-sky-700 hover:underline cursor-pointer'
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
