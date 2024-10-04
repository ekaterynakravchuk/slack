'use client'

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

interface SignInCardProps {
  setState:(state:SignInFlow) => void
}

function SignInCard({ setState }: SignInCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
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
            Sign in with Google
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
            Sign in with GitHub
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>Don&apos;t have an account? <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer'>Sign up</span></p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
