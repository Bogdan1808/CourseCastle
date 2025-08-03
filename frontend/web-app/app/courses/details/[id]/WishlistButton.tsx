'use client'

import { Button } from '@/components/ui/button';
import { addToWishlist, removeFromWishlist } from '@/app/actions/courseActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import AuthModal from "@/components/AuthModal";

interface WishlistButtonProps {
  courseId: string;
  isWishlisted: boolean;
}

export default function WishlistButton({ courseId, isWishlisted }: WishlistButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: session, status } = useSession();

  const isLoadingSession = status === "loading";

  const handleAddToWishlist = async () => {
    if (isLoadingSession) return;
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    const result = await addToWishlist(courseId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  const handleRemoveFromWishlist = async () => {
    if (isLoadingSession) return;
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    const result = await removeFromWishlist(courseId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  if (isWishlisted) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white py-6"
          onClick={handleRemoveFromWishlist}
          disabled={loading || isLoadingSession}
        >
          {loading || isLoadingSession ? 'Removing...' : 'Remove from Wishlist'}
        </Button>
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full border-stone-600 text-stone-600 hover:bg-stone-400 py-6"
        onClick={handleAddToWishlist}
        disabled={loading || isLoadingSession}
      >
        {loading || isLoadingSession ? 'Adding...' : 'Add to Wishlist'}
      </Button>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}