'use client'

import { Button } from "flowbite-react";
import Heading from "./heading";
import { useParamsStore } from "@/hooks/useParamsStore";
import { signIn } from "next-auth/react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "No matches for this filters",
  subtitle = "Try changing the filter or seach term",
  showReset,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.resetParams);

  return (
    <div className="bg-stone-900/90 text-white py-16 mt-14 rounded-lg border border-stone-600">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        <Heading title={title} subtitle={subtitle} center />
        {showReset && (
          <Button className="px-6 py-3 text-sm" outline onClick={reset}>
            Reset filters
          </Button>
        )}
        {showLogin && (
          <Button className="px-6 py-3 text-sm" outline onClick={() => signIn('id-server', {redirectTo: callbackUrl})}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
