"use client";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Cancel Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-[#64748b]" strokeWidth={2} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg md:text-xl text-[#64748b] mb-8">
            No worries! Your payment was not processed.
          </p>

          {/* Info Box */}
          <div className="bg-[#f8fafc] rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-[#10b981] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#0f172a] mb-2">
                  What happened?
                </h3>
                <p className="text-[#64748b]">
                  You cancelled the payment process. You can try again anytime,
                  or continue using our free plan.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#pricing"
              className="flex-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-4 rounded-full font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="flex-1 bg-white text-[#10b981] border-2 border-[#10b981] py-4 rounded-full font-semibold hover:bg-[#f0fdf4] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-center text-[#64748b] mt-8">
          Having trouble?{" "}
          <a
            href="/contact"
            className="text-[#10b981] hover:text-[#047857] font-semibold underline underline-offset-4"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}