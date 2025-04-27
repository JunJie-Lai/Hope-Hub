
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  points: number | null;
  isLoading: boolean;
}

export const Header = ({ points, isLoading }: HeaderProps) => {
  return (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-6xl">🏆</div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        {isLoading ? "Loading points..." : `You have ${points ?? 0} HopePoints!`}
      </h1>
    </div>
  );
};
