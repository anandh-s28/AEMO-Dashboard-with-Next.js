"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the chartConfig for fuel types directly
const chartConfig = {
  liquid_fuel: {
    label: "Liquid Fuel",
    color: "hsl(var(--chart-1))",
  },
  gas: {
    label: "Gas",
    color: "hsl(var(--chart-2))",
  },
  wind: {
    label: "Wind",
    color: "hsl(var(--chart-3))",
  },
  solar: {
    label: "Solar",
    color: "hsl(var(--chart-4))",
  },
  hydro: {
    label: "Hydro",
    color: "hsl(var(--chart-5))",
  },
  battery: {
    label: "Battery",
    color: "hsl(var(--chart-6))",
  },
  black_coal: {
    label: "Black Coal",
    color: "hsl(var(--chart-7))",
  },
  brown_coal: {
    label: "Brown Coal",
    color: "hsl(var(--chart-8))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function FuelSupplyBarChart({ state }: { state: string }) {
  const { data: chartData, error } = useSWR(
    `/api/fetchFuelData?state=${state}`,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  if (error) return <div>Error loading data</div>;
  if (!chartData) return <div>Loading...</div>;

  const formattedData = chartData.map((item: any) => {
    const key = item.fuel_type.toLowerCase().replace(/\s+/g, "_");
    return {
      fuel_type: item.fuel_type,
      Supply: item.supply,
      fill: chartConfig[key as keyof typeof chartConfig]?.color,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Supply by Type</CardTitle>
        <CardDescription>Latest Fuel Supply Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={formattedData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="fuel_type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="Supply" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Supply" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total fuel supply for the latest available data
        </div>
      </CardFooter>
    </Card>
  );
}
