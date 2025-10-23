"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

type SessionData = {
  planName?: string;
  email?: string;
  // add other session fields returned by your API here
};

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Verify the session (optional)
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-[#64748b] mb-8">
            Welcome to your premium journey. Your account has been upgraded.
          </p>

          {/* Session Info */}
          {sessionData && (
            <div className="bg-[#f0fdf4] rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-[#10b981] mt-1" />
                <div>
                  <p className="text-sm text-[#64748b]">Plan</p>
                  <p className="text-lg font-semibold text-[#0f172a]">
                    {sessionData.planName || "Premium"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-[#10b981] mt-1" />
                <div>
                  <p className="text-sm text-[#64748b]">Receipt</p>
                  <p className="text-sm text-[#10b981] font-medium">
                    Sent to your email
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="bg-[#f8fafc] rounded-xl p-6 mb-8">
            <h3 className="font-bold text-[#0f172a] mb-4">
              You now have access to:
            </h3>
            <ul className="space-y-3 text-left">
              {[
                "Unlimited Resume Downloads",
                "Premium Templates",
                "AI Mock Interview + Feedback",
                "Priority Support",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                  <span className="text-[#1e293b]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-4 rounded-full font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/resume-builder"
              className="flex-1 bg-white text-[#10b981] border-2 border-[#10b981] py-4 rounded-full font-semibold hover:bg-[#f0fdf4] transition-all duration-200"
            >
              Start Building
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-[#64748b] mt-8">
          Questions? Contact us at{" "}
          <a
            href="mailto:support@yourapp.com"
            className="text-[#10b981] hover:text-[#047857] font-semibold"
          >
            support@yourapp.com
          </a>
        </p>
      </div>
    </div>
  );
}