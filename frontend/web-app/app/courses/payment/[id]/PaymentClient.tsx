"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

interface PaymentClientProps {
  clientSecret: string;
  courseTitle: string;
  amount: number;
  courseId: string;
  publishableKey: string;
}

export default function PaymentClient({
  clientSecret,
  courseTitle,
  amount,
  courseId,
  publishableKey,
}: PaymentClientProps) {
  const stripePromise = loadStripe(publishableKey);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" as const },
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{courseTitle}</h2>
      <p className="mb-6">Total: <span className="font-semibold">${amount}</span></p>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm courseId={courseId} />
      </Elements>
    </div>
  );
}