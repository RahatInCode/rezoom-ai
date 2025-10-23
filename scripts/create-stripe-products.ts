import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

async function createProducts() {
  try {
    // Create Monthly Product
    const monthlyProduct = await stripe.products.create({
      name: "Resume Builder - Monthly",
      description: "Monthly subscription with all premium features",
    });

    const monthlyPrice = await stripe.prices.create({
      product: monthlyProduct.id,
      unit_amount: 1500, // $15.00
      currency: "usd",
      recurring: {
        interval: "month",
      },
    });

    console.log("Monthly Price ID:", monthlyPrice.id);

    // Create Yearly Product
    const yearlyProduct = await stripe.products.create({
      name: "Resume Builder - Yearly",
      description: "Yearly subscription with 2 months free",
    });

    const yearlyPrice = await stripe.prices.create({
      product: yearlyProduct.id,
      unit_amount: 12000, // $120.00
      currency: "usd",
      recurring: {
        interval: "year",
      },
    });

    console.log("Yearly Price ID:", yearlyPrice.id);

    console.log("\n✅ Products created successfully!");
    console.log("\nUpdate your PricingSection.tsx with these Price IDs:");
    console.log(`Monthly priceId: "${monthlyPrice.id}"`);
    console.log(`Yearly priceId: "${yearlyPrice.id}"`);
  } catch (error) {
    console.error("Error creating products:", error);
  }
}

createProducts();