"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StripeLoad from "@/lib/loadStripe";
import { loadStripeCheckout } from "@/action/CheckoutAction";

export default function Home() {
  const [price, setPrice] = useState<number>(10);
  const handleClick = async () => {
    const stripe = await StripeLoad();
    const { session } = await loadStripeCheckout({ price, quantity: 1 });
    if (!session.id) return;
    console.log("before checkout");
    stripe?.redirectToCheckout({ sessionId: session.id });
    console.log("after checkout");
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <Image src={"/bookjpeg.jpeg"} width={300} height={200} alt="book img" />
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              if (price === 10) return;
              setPrice((prev) => prev - 10);
            }}
          >
            -
          </Button>
          <CardDescription className="font-bold">Price {price}</CardDescription>
          <Button
            onClick={() => {
              setPrice((prev) => prev + 10);
            }}
          >
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleClick}>Buy</Button>
      </CardFooter>
    </Card>
  );
}
