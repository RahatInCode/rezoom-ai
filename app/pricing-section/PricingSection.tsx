"use client";
import React, { useState } from "react";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
import { handleStripeCheckout } from "../lib/stripe-checkout";

type Plan = {
  name: string;
  description: string;
  price: string;
  priceId: string; // Stripe Price ID
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
    priceId: "", // No price ID for free plan
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
    // Use a manual test mode - we'll create this in Stripe Dashboard
    priceId: "price_1QW8KmKZJQm5Qn5v4x3Z9X8Y", // Replace with your actual test price
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
    priceId: "price_1QW8KmKZJQm5Qn5v4x3Z9X9Z", // Replace with your actual test price
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

  const handlePlanSelection = async (plan: Plan) => {
    if (plan.name === "Free") {
      // Handle free plan signup (redirect to signup/dashboard)
      window.location.href = "/dashboard";
      return;
    }

    setLoadingPlan(plan.name);
    try {
      await handleStripeCheckout(plan.priceId, plan.name);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
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
            Start free and upgrade as you grow. All plans include our core
            features.
          </p>
        </div>

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
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#10b981] to-[#059669] shadow-lg">
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl mb-6 ${
                    plan.highlight
                      ? "bg-gradient-to-br from-[#10b981] to-[#059669] text-white"
                      : "bg-[#f0fdf4] text-[#10b981]"
                  }`}
                >
                  {plan.icon}
                </div>

                {/* Plan Info */}
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

                {/* Features */}
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

                {/* CTA Button */}
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

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-[#64748b]">
            Need a custom plan for your team?{" "}
            <a
              href="/contact"
              className="text-[#10b981] hover:text-[#047857] font-semibold underline underline-offset-4"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}