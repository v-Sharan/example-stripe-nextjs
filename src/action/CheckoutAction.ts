"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

const loadStripeCheckout = async ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "https://example-stripe-nextjs.vercel.app/success",
    cancel_url: "https://example-stripe-nextjs.vercel.app/cancel",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "purchase",
            images: [
              "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ=",
            ],
          },
          unit_amount: price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: quantity,
      },
    ],
    mode: "payment",
  });

  return { session };
};

export { loadStripeCheckout };
