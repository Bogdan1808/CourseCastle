'use client'

import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn('id-server', { redirectTo: '/' }, {prompt: 'login'})}
      className="bg-stone-800 border border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold px-4 py-2 rounded"
    >
      Login
    </Button>
  );
}
