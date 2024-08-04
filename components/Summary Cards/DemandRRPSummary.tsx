import useSWR from "swr";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "../ui/card";

interface Summary {
  demand: number;
  rrp: number;
}

interface DemandPriceSummaryCardProps {
  tableName: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DemandPriceSummaryCard({
  tableName,
}: DemandPriceSummaryCardProps) {
  const { data: summary, error } = useSWR<Summary>(
    `/api/fetchStateData?state=${tableName}&summary=true`,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  if (error) {
    console.error("Error loading data:", error);
    return <div>Error loading data</div>;
  }

  if (!summary) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  console.log("Summary data:", summary);

  return (
    <div className="grid grid-cols-2 gap-5 p-15 mt-5">
      <Card>
        <CardHeader>
          <CardDescription>Current Demand</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>{summary.demand}MW</CardTitle>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Current Price</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>${summary.rrp}/MWh</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
