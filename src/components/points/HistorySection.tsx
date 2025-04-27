
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";

export const HistorySection = () => {
  const { data: history, isLoading, error } = useTransactionHistory();

  const formatTransactionType = (type: string | null) => {
    if (!type) return 'Unknown';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">HopePoints History</h2>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">Failed to load history</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Date</TableHead>
                <TableHead className="text-lg">Action</TableHead>
                <TableHead className="text-lg">Type</TableHead>
                <TableHead className="text-lg">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-base">
                    {format(new Date(transaction.created_at), 'MMMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-base">
                    {transaction.title || 'Unknown Transaction'}
                  </TableCell>
                  <TableCell className="text-base capitalize">
                    {formatTransactionType(transaction.type)}
                  </TableCell>
                  <TableCell className={`text-base font-semibold ${
                    transaction.points > 0 ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};

