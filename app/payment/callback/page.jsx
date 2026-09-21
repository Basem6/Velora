import { Suspense } from "react";
import PaymentCallback from "./PaymentCallback";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        </main>
      }
    >
      <PaymentCallback />
    </Suspense>
  );
}