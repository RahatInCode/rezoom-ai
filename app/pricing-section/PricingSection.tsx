"use client";
import React, { useState } from "react";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
import { handleStripeCheckout } from "../lib/stripe-checkout";
import Link from "next/link";

type Plan = {
  name: string;
  description: string;
  price: string;
  priceId: string;
  period?: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
  badge?: string;
  icon: React.ReactNode;
};

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfect to try out basic features.",
    price: "$0",
    priceId: "", // No Stripe needed for free
    period: "forever",
    features: [
      "10 Resume Downloads / month",
      "Basic Templates",
      "Sample Interview Questions",
      "No AI Interview Feedback",
    ],
    buttonText: "Start Free",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    name: "Monthly",
    description: "Best for short-term prep.",
    price: "$15",
    priceId: "price_1SLdaZ6XfOPAZGtt9zfg1hU7", 
    period: "per month",
    features: [
      "Unlimited Resume Downloads",
      "Premium Templates",
      "AI Mock Interview + Feedback",
      "Save Progress Across Devices",
      "Priority Support",
    ],
    highlight: true,
    buttonText: "Get Monthly",
    badge: "Most Popular",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    name: "Yearly",
    description: "Save more with long-term access.",
    price: "$120",
    priceId: "price_1SLdbY6XfOPAZGttl7UjSaKo", 
    period: "per year",
    features: [
      "Everything in Monthly",
      "2 Months Free",
      "Advanced Interview Analytics",
      "Career Growth Resources",
    ],
    buttonText: "Get Yearly",
    badge: "Best Value",
    icon: <Crown className="w-8 h-8" />,
  },
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlanSelection = async (plan: Plan) => {
    // Handle free plan
    if (plan.name === "Free") {
      window.location.href = "/dashboard";
      return;
    }

    // Validate price ID exists
    if (!plan.priceId || plan.priceId.includes("PASTE_YOUR")) {
      alert(
        "⚠️ Stripe Price ID not configured!\n\nPlease:\n1. Create products in Stripe Dashboard\n2. Copy the Price IDs\n3. Update PricingSection.tsx"
      );
      return;
    }

    setLoadingPlan(plan.name);
    setError(null);

    try {
      await handleStripeCheckout(plan.priceId, plan.name);
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Failed to start checkout. Please try again.";
      setError(message);

      // Show user-friendly error
      alert(
        `Failed to start checkout:\n${message}\n\nPlease check:\n- Your internet connection\n- Stripe configuration\n- Browser console for details`
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-[#64748b] max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features.
          </p>

          {/* Test Mode Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Test Mode - Use card 4242 4242 4242 4242
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <p className="font-semibold mb-1">Payment Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isNegativeFeature = (feature: string) =>
              feature.toLowerCase().includes("no ");

            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.highlight
                    ? "border-2 border-[#10b981] shadow-xl shadow-emerald-100 scale-105"
                    : "border border-gray-200 shadow-lg"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#10b981] to-[#059669] shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`inline-flex p-3 rounded-xl mb-6 ${
                    plan.highlight
                      ? "bg-gradient-to-br from-[#10b981] to-[#059669] text-white"
                      : "bg-[#f0fdf4] text-[#10b981]"
                  }`}
                >
                  {plan.icon}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#64748b] mb-6">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-[#0f172a]">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-[#64748b] ml-2">
                        /{plan.period.split(" ")[1]}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => {
                    const isNegative = isNegativeFeature(feature);
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            isNegative
                              ? "bg-gray-200 text-gray-400"
                              : "bg-[#f0fdf4] text-[#10b981]"
                          }`}
                        >
                          {isNegative ? (
                            <X className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" strokeWidth={3} />
                          )}
                        </span>
                        <span
                          className={`text-sm ${
                            isNegative
                              ? "text-[#64748b] line-through"
                              : "text-[#1e293b]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loadingPlan === plan.name}
                  className={`w-full py-3.5 rounded-full font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105"
                      : "bg-white text-[#10b981] border-2 border-[#10b981] hover:bg-[#f0fdf4]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === plan.name ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-[#64748b]">
            Need a custom plan for your team?{" "}
            <Link
              href="/contact"
              className="text-[#10b981] hover:text-[#047857] font-semibold underline underline-offset-4"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}