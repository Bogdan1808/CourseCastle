'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { useRouter } from "next/navigation";

export default function EnrollNowButton({ courseId }: { courseId: string }) {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const isLoading = status === "loading";

  return (
    <>
      <Button
        className="w-full btn-medieval py-6 text-lg"
        disabled={isLoading}
        onClick={() => {
          if (isLoading) return;
          if (!session) {
            setShowAuthModal(true);
            return;
          }
          router.push(`/courses/payment/${courseId}`);
        }}
      >
        {isLoading ? "Checking..." : "Enroll Now"}
      </Button>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}