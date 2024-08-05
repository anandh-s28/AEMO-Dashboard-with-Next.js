"use client";

import useSWR from "swr";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  date: string;
  total_demand: number;
  rrp: number;
}

interface StateDemandChartProps {
  tableName: string;
  title: string;
  color?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function StateDemandChart({ tableName, title, color }: StateDemandChartProps) {
  const { data: chartData, error } = useSWR<ChartData[]>(
    `/api/fetchStateData?state=${tableName}`,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  if (error) return <div>Error loading data</div>;
  if (!chartData) return <div>Loading...</div>;

  const chartConfig: ChartConfig = {
    demand: {
      label: "Total Demand",
      color: color || "hsl(var(--chart-2))",
    },
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: -15,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="total_demand"
                type="natural"
                fill={chartConfig.demand.color}
                fillOpacity={0.4}
                stroke={chartConfig.demand.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default StateDemandChart;
