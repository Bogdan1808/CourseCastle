"use client";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ courseId }: { courseId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      router.push(`/courses/success/${courseId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-4 btn-medieval py-3 text-lg"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}