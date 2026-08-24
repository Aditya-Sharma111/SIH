import MarketPage from "@/marketpage/marketpage";

export const metadata = {
  title: "Market Decision & Mandi Prices | Smart Farm OS",
  description: "Compare nearby mandi prices, calculate transport deductions, and find the best net realization for your crop.",
};

export default function MarketRoute() {
  return <MarketPage />;
}
