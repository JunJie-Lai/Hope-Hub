
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const HistorySection = () => {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">HopePoints History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Date</TableHead>
              <TableHead className="text-lg">Action</TableHead>
              <TableHead className="text-lg">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-base">April 26, 2025</TableCell>
              <TableCell className="text-base">Attended Workshop</TableCell>
              <TableCell className="text-base font-semibold text-emerald-700">+75</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-base">April 25, 2025</TableCell>
              <TableCell className="text-base">Completed Microjob</TableCell>
              <TableCell className="text-base font-semibold text-emerald-700">+50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-base">April 24, 2025</TableCell>
              <TableCell className="text-base">Completed Microjob</TableCell>
              <TableCell className="text-base font-semibold text-emerald-700">+100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
