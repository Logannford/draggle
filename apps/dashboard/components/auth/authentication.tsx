'use client'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'

// hooks
import useInterval from '@/hooks/useInterval';

// components
import AuthenticationCardWrapper from './form-wrapper';
import { Button } from '@/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip';
import { toast } from 'sonner';

// utils
import { createClient } from '@/utils/supabase/client'

export default function AuthenticationCard(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [seconds, setSeconds] = useState(5);

  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const handleAuthenticationSubmit = () => {
    // Handle form submission
  }

  useEffect(() => {
    interval.start();
    return interval.stop
  }, [])

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (!emailParam) {
      router.push('/login');
    } else {
      setEmail(emailParam);
    }
  }, [router, searchParams]);

  const handleResendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('No email found');
      return;
    }
    try {
      const supabase = createClient();

		  const promise = () => 
		  	new Promise<void>(async(resolve) => {
		  		await supabase.auth.resend({
		  			type: 'signup',
		  			email,
		  			options: {
		  				emailRedirectTo: '/dashboard'
		  			}
		  		});
		  		resolve();
		  	});
      setSeconds(5);

      interval.start();
      toast.promise(promise, {
        loading: 'Sending verification email...',
        success: () => `Check your inbox at ${email} to verify your email.`,
        error: 'Failed to send verification email.',
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto'
        }
      });
    } catch (error) {
      toast.error('Error resending verification email', error);
    }
  }

  return (
    <AuthenticationCardWrapper 
      onSubmit={handleAuthenticationSubmit} 
      className="text-white font-satoshi justify-center items-center lg:w-[500px]"
    >
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-heading-3xl text-center">
          Waiting for authentication
        </h1>
        <div className="flex flex-col gap-y-4 text-center inter-text-sm">
          In order to check you are a real human, please go to {email} and click the link in the email.
        </div>
        <div className="mt-4 w-full flex gap-x-2 items-center justify-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger 
                className={`
                  bg-white text-black px-4 h-10 font-medium
                  duration-300 rounded-xl hover:rounded-lg font-satoshi
                  ${
                    seconds == 0
                      ? 'hover:cursor-pointer'
                      : 'hover:cursor-not-allowed'
                  }
                `}
                autoFocus={false}
                disabled={seconds != 0}
                onClick={handleResendEmail}
                >
                Resend email
              </TooltipTrigger>
              {seconds != 0 ? (
                <TooltipContent side="bottom">
                  <p className="text-xs">Resend Email in {seconds} seconds</p>
                </TooltipContent>
                ) : (
                  ''
                )}
            </Tooltip>
          </TooltipProvider>

          <Button
            variant='secondary'
            className='w-full'
            special={false}
          >
            Confirm
          </Button>
        </div>
      </div>
    </AuthenticationCardWrapper>
  )
}
