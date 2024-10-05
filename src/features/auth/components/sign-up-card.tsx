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
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleProviderSignUp = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value).then(() => {
      setPending(false);
    });
  };

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setPending(true);
    signIn('password', { email, password, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong, please try again');
      })
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <span>{error}</span>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handlePasswordSignUp}>
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm password'
            required
          />
          <Button disabled={pending} type='submit' className='w-full' size='lg'>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            type='submit'
            onClick={() => handleProviderSignUp('google')}
            variant='outline'
            className='w-full relative'
            size='lg'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
            Sign up with Google
          </Button>
          <Button
            disabled={pending}
            type='submit'
            onClick={() => handleProviderSignUp('github')}
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
