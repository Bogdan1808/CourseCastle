'use client'

import { Button } from '@/components/ui/button';
import { addToWishlist, removeFromWishlist } from '@/app/actions/courseActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface WishlistButtonProps {
  courseId: string;
  isWishlisted: boolean;
}

export default function WishlistButton({ courseId, isWishlisted }: WishlistButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);
    const result = await addToWishlist(courseId);
    
    if (result.success) {
      console.log('Added to wishlist:', result.message);
      router.refresh();
    } else {
      console.error('Failed to add to wishlist:', result.message);
      alert(result.message);
    }
    setLoading(false);
  };

  const handleRemoveFromWishlist = async () => {
    setLoading(true);
    const result = await removeFromWishlist(courseId);
    
    if (result.success) {
      console.log('Removed from wishlist:', result.message);
      router.refresh();
    } else {
      console.error('Failed to remove from wishlist:', result.message);
      alert(result.message);
    }
    setLoading(false);
  };

  if (isWishlisted) {
    return (
      <Button
        variant="outline"
        className="w-full border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white py-6"
        onClick={handleRemoveFromWishlist}
        disabled={loading}
      >
        {loading ? 'Removing...' : 'Remove from Wishlist'}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full border-stone-600 text-stone-600 hover:bg-stone-400 py-6"
      onClick={handleAddToWishlist}
      disabled={loading}
    >
      {loading ? 'Adding...' : 'Add to Wishlist'}
    </Button>
  );
}