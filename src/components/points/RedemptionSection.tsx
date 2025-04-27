
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRewards } from "@/hooks/useRewards";
import { Skeleton } from "@/components/ui/skeleton";

export const RedemptionSection = () => {
  const { data: rewards, isLoading, error } = useRewards();

  const getEmojiForReward = (title: string) => {
    const emojiMap: { [key: string]: string } = {
      'Meal': '🍔',
      'Bus': '🚌',
      'Hygiene': '🧼',
      'Grocery': '🛒',
      'Clothing': '👕',
    };

    const matchedEmoji = Object.entries(emojiMap).find(([key]) => 
      title.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchedEmoji ? matchedEmoji[1] : '🎁';
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Redeem Your HopePoints</h2>
        <p className="text-xl text-gray-700 mt-2">
          Use your HopePoints to get food, transport, and other essentials!
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-12 w-12 mx-auto rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600">Failed to load rewards</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {rewards?.map((reward, index) => {
            const isLastItem = index === rewards.length - 1;
            const isOddTotal = rewards.length % 2 !== 0;
            const shouldSpanFull = isLastItem && isOddTotal;

            return (
              <Card 
                key={reward.id} 
                className={`p-6 bg-white border-2 border-gray-200 shadow-md rounded-xl ${
                  shouldSpanFull ? 'md:col-span-2' : ''
                }`}
              >
                <div className="space-y-4 text-center">
                  <div className="text-4xl">{getEmojiForReward(reward.title)}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{reward.title}</h3>
                  <p className="text-xl font-bold text-emerald-700">{reward.cost} HopePoints</p>
                  <p className="text-gray-600">{reward.description}</p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-6">
                    Redeem
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};
