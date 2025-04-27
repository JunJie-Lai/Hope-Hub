
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const RedemptionSection = () => {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Redeem Your HopePoints</h2>
        <p className="text-xl text-gray-700 mt-2">
          Use your HopePoints to get food, transport, and other essentials!
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
          <div className="space-y-4 text-center">
            <div className="text-4xl">🍔</div>
            <h3 className="text-2xl font-semibold text-gray-800">Food Coupon</h3>
            <p className="text-xl font-bold text-emerald-700">100 HopePoints</p>
            <p className="text-gray-600">Redeem for a $10 meal voucher</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
              Redeem
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
          <div className="space-y-4 text-center">
            <div className="text-4xl">🚌</div>
            <h3 className="text-2xl font-semibold text-gray-800">Transport Pass</h3>
            <p className="text-xl font-bold text-emerald-700">150 HopePoints</p>
            <p className="text-gray-600">Bus pass valid for 1 day</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
              Redeem
            </Button>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl">
          <div className="space-y-4 text-center">
            <div className="text-4xl">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-800">Hygiene Kit</h3>
            <p className="text-xl font-bold text-emerald-700">200 HopePoints</p>
            <p className="text-gray-600">Includes soap, toothbrush, sanitizer</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
              Redeem
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
