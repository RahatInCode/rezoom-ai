import React from "react";

type Plan = {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfect to try out basic features.",
    price: "$0",
    features: [
      "1 Resume Download / month",
      "Basic Templates",
      "Sample Interview Questions",
      "No AI Interview Feedback",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Monthly",
    description: "Best for short-term prep.",
    price: "$15/month",
    features: [
      "Unlimited Resume Downloads",
      "Premium Templates",
      "AI Mock Interview + Feedback",
      "Save Progress Across Devices",
      "Priority Support",
    ],
    highlight: true,
    buttonText: "Get Monthly",
  },
  {
    name: "Yearly",
    description: "Save more with long-term access.",
    price: "$120/year",
    features: [
      "Everything in Monthly",
      "2 Months Free",
      "Advanced Interview Analytics",
      "Career Growth Resources",
    ],
    buttonText: "Get Yearly",
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow p-6 border ${
                plan.highlight ? "border-2 border-blue-600 shadow-lg" : ""
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-2 ${
                  plan.highlight ? "text-gray-600" : ""
                }`}
              >
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="text-left space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index}>✔ {feature}</li>
                ))}
              </ul>
              <p className="text-2xl font-bold mt-6">{plan.price}</p>
              <button
                className={`mt-6 w-full py-2 rounded-lg ${
                  plan.highlight
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
