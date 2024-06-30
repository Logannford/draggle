'use client';
import { useState } from 'react';

import { EnvelopeClosedIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { toast } from 'sonner';
import { passwordReset } from '@/actions/user/password-reset';

export default function PasswordRestForm() {
  const [state, setState] = useState({
    forgotPasswordEmail: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const sendPasswordResetLink = async () => {
    setIsLoading(true);
    try {
      // send the password reset link
      await passwordReset(state.forgotPasswordEmail);

      // show a success message
      toast.success('Password reset link sent to ' + state.forgotPasswordEmail);
    } catch (e) {
      toast.error(e.message);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event == 'PASSWORD_RECOVERY') {
  //       console.log('ran');
  //       const newPassword = prompt(
  //         'What would you like your new password to be?'
  //       );
  //       const { data, error } = await supabase.auth.updateUser({
  //         password: newPassword
  //       });

  //       if (data) alert('Password updated successfully!');
  //       if (error) alert('There was an error updating your password.');
  //     }
  //   });
  // }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendPasswordResetLink();
      }}
      className="flex flex-col gap-y-8 bg-black-300 border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]"
    >
      <h3 className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
        Reset your password
      </h3>
      <div className="flex flex-col gap-y-1.5">
        <Label
          htmlFor="forgotPasswordEmail"
          className="text-white/80 text-xs font-inter"
        >
          Email Address
        </Label>
        <div className="flex h-10 items-center rounded-md bg-transparent text-sm relative">
          <EnvelopeClosedIcon className="size-4 text-white/50 absolute ml-3" />
          <Input
            id="forgotPasswordEmail"
            type="email"
            name="forgotPasswordEmail"
            placeholder="hello@layowt.com"
            className="
              bg-transparent w-full p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
              focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-10
              hover:border-white/50
            "
            value={state.forgotPasswordEmail}
            onChange={handleChange}
            autoComplete="forgot-password-email"
          />
        </div>
        <div className="w-full mt-4">
          <Button
            type="submit"
            className="
              rounded-lg px-4 py-1 w-full
              duration-300 disabled:cursor-not-allowed 
              flex gap-x-2 items-center
            "
            variant="secondary"
          >
            {isLoading ? <ReloadIcon className="w-3 h-3 animate-spin" /> : ''}
            Send Reset Link
          </Button>
        </div>
      </div>
    </form>
  );
}
