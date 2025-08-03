"use client";

import { useEffect, useState, useRef } from "react";
import { getCourseReviews, postCourseReview } from "@/app/actions/courseActions";
import { Review } from "@/types";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";

function StarRating({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const starRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const getValueFromMouse = (e: React.MouseEvent, idx: number) => {
    if (!starRefs.current[idx]) return idx + 1;
    const { left, width } = starRefs.current[idx]!.getBoundingClientRect();
    const x = e.clientX - left;
    return x < width / 2 ? idx + 0.5 : idx + 1;
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill =
          hover !== null
            ? hover >= i + 1
              ? "#f59e0b"
              : hover >= i + 0.5
              ? "half"
              : "none"
            : value >= i + 1
            ? "#f59e0b"
            : value >= i + 0.5
            ? "half"
            : "none";
        return (
          <span
            key={i}
            ref={el => { starRefs.current[i] = el; }}
            className="relative cursor-pointer"
            onMouseMove={e => !disabled && setHover(getValueFromMouse(e, i))}
            onMouseLeave={() => !disabled && setHover(null)}
            onClick={e => !disabled && onChange(getValueFromMouse(e, i))}
            style={{ width: 28, height: 28, display: "inline-block" }}
            tabIndex={0}
            aria-label={`Rate ${i + 1} star${i > 0 ? "s" : ""}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={2}
              className="w-7 h-7"
            >
              <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" />
            </svg>
            {fill === "#f59e0b" && (
              <svg
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth={2}
                className="w-7 h-7 absolute left-0 top-0"
              >
                <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" />
              </svg>
            )}
            {fill === "half" && (
              <svg
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth={2}
                className="w-7 h-7 absolute left-0 top-0"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" />
              </svg>
            )}
          </span>
        );
      })}
      <span className="ml-2 text-amber-300 font-medium">{hover ?? value} / 5</span>
    </div>
  );
}

export default function CourseReviews({
  courseId,
  owned,
  currentUsername, // New prop to receive username
}: {
  courseId: string;
  owned: boolean;
  currentUsername: string | null; // Type for the new prop
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  // Remove userName state, use currentUsername prop directly
  // const [userName, setUserName] = useState<string | null>(null); // Old line

  const router = useRouter();

  useEffect(() => {
    // Set userName directly from the prop on initial render and when prop changes
    // setUserName(currentUsername); // Old way
    fetchReviews(currentUsername); // Pass currentUsername to fetchReviews
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, currentUsername]); // Now depends on currentUsername prop

  // Modified fetchReviews to accept userName
  async function fetchReviews(usernameToCheck: string | null) {
    const data = await getCourseReviews(courseId);
    setReviews(data.reviews);
    setAverage(data.averageRating);

    // Check if the current user has already reviewed using the passed username
    if (usernameToCheck) {
      const existing = data.reviews.find((r: Review) => r.userName === usernameToCheck);
      setUserReview(existing || null);
    } else {
      setUserReview(null); // Clear user review if no user is logged in
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUsername) { // Check if user is logged in
      setShowAuthModal(true);
      setError("Please log in to submit a review.");
      return;
    }

    if (!owned) {
      setError("You must own the course to submit a review.");
      return;
    }

    // Prevent submission if a review already exists for this user (client-side check)
    if (userReview) {
      setError("You have already submitted a review for this course.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await postCourseReview(courseId, rating, comment);
      if (res?.error || res?.message) {
        if (
          typeof res.message === "string" &&
          res.message.toLowerCase().includes("already") &&
          res.message.toLowerCase().includes("review")
        ) {
          setError("You have already submitted a review for this course.");
          await fetchReviews(currentUsername); // Re-fetch to update userReview state
        } else {
          setError(res.error || res.message || "Could not submit review.");
        }
      } else {
        setSuccess("Review submitted!");
        setComment("");
        setRating(5);
        await fetchReviews(currentUsername); // Re-fetch reviews to update UI and userReview state
        router.refresh(); // To trigger server-side revalidation if needed
      }
    } catch (err: any) {
      if (
        typeof err?.message === "string" &&
        err.message.toLowerCase().includes("already") &&
        err.message.toLowerCase().includes("review")
      ) {
        setError("You have already submitted a review for this course.");
        await fetchReviews(currentUsername); // Re-fetch to update userReview state
      } else {
        setError("Could not submit review.");
      }
      console.error("Review submit error:", err);
    }
    setLoading(false);
  }

  return (
    <div className="bg-stone-800/90 rounded-xl p-6 mt-8 border border-stone-700 shadow-lg">
      <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
        <span className="bg-amber-400/20 px-2 py-1 rounded text-amber-400 font-mono">
          Reviews
        </span>
      </h3>

      {/* Conditional rendering based on userReview state */}
      {userReview ? (
        <div className="mb-8 text-amber-400 font-semibold p-4 border border-amber-500 rounded-lg bg-amber-400/10">
          You have already submitted a review for this course. You can only submit one review.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <label htmlFor="rating" className="text-stone-300 font-medium">
              Your Rating:
            </label>
            {/* Disable StarRating if not owned or if user is not logged in */}
            <StarRating value={rating} onChange={setRating} disabled={!owned || !currentUsername} />
          </div>
          <textarea
            className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-400"
            rows={3}
            placeholder={
              !currentUsername ? "Log in to submit a review." :
              !owned ? "You must own the course to submit a review." :
              "Write your review..."
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            // Disable textarea if not owned or no currentUsername
            disabled={!owned || !currentUsername}
          />
          {error && <div className="text-red-400 font-medium">{error}</div>}
          {success && <div className="text-green-400 font-medium">{success}</div>}
          <button
            type="submit"
            className="btn-medieval w-full font-semibold px-6 py-2 rounded transition disabled:opacity-60"
            // Disable button if loading, not owned, no currentUsername, or userReview already exists
            disabled={loading || !owned || !currentUsername || !!userReview}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          {!owned && currentUsername && ( // Show this message only if user is logged in but doesn't own
            <div className="text-red-400 font-medium">
              You must own the course to submit a review.
            </div>
          )}
          {!currentUsername && ( // Show this message if user is not logged in
            <div className="text-stone-400 font-medium text-center">
              Please <span className="text-amber-400 cursor-pointer" onClick={() => setShowAuthModal(true)}>log in</span> to submit a review.
            </div>
          )}
        </form>
      )}

      {/* Existing Reviews List */}
      <ul className="mb-6 space-y-3">
        {reviews.length === 0 && (
          <li className="text-stone-400 italic">
            No reviews yet. Be the first to review!
          </li>
        )}
        {reviews.map((r) => (
          <li
            key={r.id}
            className="bg-stone-800/80 rounded-lg px-4 py-3 border border-stone-700 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-amber-300">{r.userName}</span>
                <span className="bg-amber-400/20 text-amber-400 font-mono px-2 py-0.5 rounded text-sm">
                  {Number(r.rating) % 1 === 0 ? r.rating : r.rating.toFixed(1)}★
                </span>
              <span className="text-xs text-stone-500 ml-auto">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-stone-200">{r.comment}</div>
          </li>
        ))}
      </ul>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}