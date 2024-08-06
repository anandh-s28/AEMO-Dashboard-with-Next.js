"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  liquid_fuel: {
    label: "Liquid Fuel",
    color: "hsl(var(--chart-1))",
  },
  gas: {
    label: "Gas",
    color: "hsl(var(--chart-9))",
  },
  wind: {
    label: "Wind",
    color: "hsl(var(--chart-8))",
  },
  solar: {
    label: "Solar",
    color: "hsl(var(--chart-1))",
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
    color: "hsl(var(--chart-2))",
  },
  brown_coal: {
    label: "Brown Coal",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig;

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export function NEMFuelSupplyBarChart() {
  const { data: chartData, error } = useSWR(`/api/fetchSummary`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!chartData)
    return (
      <div className="grid grid-cols-2 gap-5 p-15 mt-5">
        <Skeleton />
      </div>
    );

  const formattedData = chartData.map((item: any) => {
    const key = item.fuel_type.toLowerCase().replace(/\s+/g, "_");
    return {
      fuel_type: item.fuel_type,
      total_generation: item.total_generation,
      fill: chartConfig[key as keyof typeof chartConfig]?.color,
    };
  });
  return (
    <div>
      <CardHeader>
        <CardDescription>Fuel Supply by Type across Australia</CardDescription>
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
            <XAxis dataKey="total_generation" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total_generation" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
