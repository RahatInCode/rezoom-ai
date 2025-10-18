"use client";
import React from "react";

type Plan = {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfect to try out basic features.",
    price: "$0",
    period: "forever",
    features: [
      "10 Resume Download / month",
      "Basic Templates",
      "Sample Interview Questions",
      "No AI Interview Feedback",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Monthly",
    description: "Best for short-term prep.",
    price: "$15",
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
  },
  {
    name: "Yearly",
    description: "Save more with long-term access.",
    price: "$120",
    period: "per year",
    features: [
      "Everything in Monthly",
      "2 Months Free",
      "Advanced Interview Analytics",
      "Career Growth Resources",
    ],
    buttonText: "Get Yearly",
    badge: "Best Value",
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.highlight
                  ? "border-2 border-blue-500 shadow-blue-100"
                  : "border border-gray-200"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white ${
                    plan.highlight ? "bg-blue-500" : "bg-emerald-500"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 ml-2">/{plan.period.split(' ')[1]}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => {
                  const isNegative = feature.toLowerCase().includes("no ");
                  return (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          isNegative
                            ? "bg-gray-200 text-gray-500"
                            : plan.highlight
                            ? "bg-blue-100 text-blue-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {isNegative ? "✕" : "✓"}
                      </span>
                      <span
                        className={`text-sm ${
                          isNegative ? "text-gray-500" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom plan for your team?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}