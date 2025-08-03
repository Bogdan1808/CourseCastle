import { getCurrentUser } from "@/app/actions/authActions";
import { fetchWrapper } from "@/lib/fetchWrapper";
import PaymentClient from "./PaymentClient";

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur bg-black/40">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-xs">
          <div className="mb-4 text-lg font-bold">Login Required</div>
          <p className="mb-6">
            You must be logged in to enroll in this course.
          </p>
          <a
            href="http://localhost:5000/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fscope%3Dopenid%2520profile%2520courseApp%26response_type%3Dcode%26client_id%3DnextApp%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fapi%252Fauth%252Fcallback%252Fid-server%26prompt%3Dlogin%26code_challenge%3DexjDzchBVVmhIYe-ODfghiIytxRhGBCEWfJ00yXKF0I%26code_challenge_method%3DS256%26suppressed_prompt%3Dlogin"
            className="btn-medieval w-full py-2 text-lg inline-block"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  let paymentIntent;
  try {
    paymentIntent = await fetchWrapper.post("payment/create-payment-intent", {
      courseId: params.id,
    });
  } catch (err: any) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {err?.error?.message?.message ||
          err?.error?.message ||
          "An error occurred while loading the payment page."}
      </div>
    );
  }

  if (!paymentIntent?.clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load payment information.
      </div>
    );
  }

  return (
    <PaymentClient
      clientSecret={paymentIntent.clientSecret}
      courseTitle={paymentIntent.courseTitle}
      amount={paymentIntent.amount}
      courseId={params.id}
      publishableKey={paymentIntent.publishableKey}
    />
  );
}
