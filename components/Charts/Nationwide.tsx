"use client";

import useSWR from "swr";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
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

interface ChartData {
  date: string;
  Renewable: number;
  NonRenewable: number;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const chartConfig = {
  Renewable: {
    label: "Renewable",
    color: "hsl(var(--chart-1))",
  },
  NonRenewable: {
    label: "Non-renewable",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function NEMRadial() {
  const { data: chartData, error } = useSWR<ChartData[]>(
    `/api/fetchNationwideData`,
    fetcher
  );

  if (error) return <div>Error loading data</div>;
  if (!chartData) return <div>Loading...</div>;

  const totalGeneration = chartData[0].Renewable + chartData[0].NonRenewable;

  return (
    <div className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardDescription>Total Supply by Resource Type</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] max-h-[220px]"
        >
          <RadialBarChart
            data={[chartData[0]]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="font-bold text-xl fill-current"
                        >
                          {totalGeneration.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-current"
                        >
                          MW
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Renewable"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.Renewable.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="NonRenewable"
              fill={chartConfig.NonRenewable.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mb-5">
        <div className="leading-none text-muted-foreground">
          Showing total supply for the current month
        </div>
      </CardFooter>
    </div>
  );
}
