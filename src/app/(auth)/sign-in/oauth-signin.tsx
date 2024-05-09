'use client';

import { Button } from '@/components/ui/button';
import * as Icons from '@/components/ui/icons';
import { signIn } from 'next-auth/react';

import { useState } from 'react';
import { toast } from 'sonner';

type Provider = 'github' | 'google';

export default function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState<Provider | null>(null);

  const signInUser = async (provider: Provider) => {
    try {
      setIsLoading(provider);
      await signIn(provider);
      toast.success("You're in. Redirecting you to the dashboard...");
    } catch (error) {
      toast.error('Failed to sign you in.');
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => signInUser('github')}
      >
        {isLoading === 'github' ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => signInUser('google')}
      >
        {isLoading === 'google' ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}
