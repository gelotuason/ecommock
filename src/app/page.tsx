import Hero from "@/components/hero";
import Bestsellers from "@/components/bestsellers";
import { Truck, Undo2, CreditCard, PhoneCall } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* services */}
      <section className="flex flex-col gap-10 justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <Truck size={40} strokeWidth={1} />
          <h1 className="font-semibold text-lg">Free Shipping</h1>
          <p className="text-accent">For all orders over $100</p>
        </div>
        <div className="flex flex-col items-center">
          <Undo2 size={40} strokeWidth={1} />
          <h1 className="font-semibold text-lg">30 days returns</h1>
          <p className="text-accent">For an Exchange Product</p>
        </div>
        <div className="flex flex-col items-center">
          <CreditCard size={40} strokeWidth={1} />
          <h1 className="font-semibold text-lg">Secured Payment</h1>
          <p className="text-accent">Payment Cards Accepted</p>
        </div>
        <div className="flex flex-col items-center">
          <PhoneCall size={40} strokeWidth={1} />
          <h1 className="font-semibold text-lg">Support 24/7</h1>
          <p className="text-accent">Contact us Anytime</p>
        </div>
      </section>
      {/* end of services */}

      <Bestsellers />
    </main>
  );
}
