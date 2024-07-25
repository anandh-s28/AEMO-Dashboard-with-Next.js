"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

// Configure your Supabase client
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChartData {
  date: string;
  total_demand: number;
  rrp: number;
}

interface StateDemandChartProps {
  tableName: string;
  title: string;
}

const chartConfig: ChartConfig = {
  demand: {
    label: "Total Demand",
    color: "hsl(var(--chart-1))",
  },
  rrp: {
    label: "Spot Price",
    color: "hsl(var(--chart-2))",
  },
};

function StateDemandChart({ tableName, title }: StateDemandChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from<ChartData>(tableName)
        .select("date, total_demand, rrp")
        .order("date", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      // Format the data for the chart
      const formattedData = (data || []).reverse().map((item) => ({
        date: new Date(item.date).toLocaleString(), // Format the date as needed
        total_demand: item.total_demand,
        rrp: item.rrp,
      }));

      setChartData(formattedData);
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 minutes
    const intervalId = setInterval(fetchData, 300000); // 300000ms = 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [tableName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Total Demand and Spot Price of Electricity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
              fill="var(--color-demand)"
              fillOpacity={0.4}
              stroke="var(--color-demand)"
              stackId="a"
            />
            <Area
              dataKey="rrp"
              type="natural"
              fill="var(--color-rrp)"
              fillOpacity={0.4}
              stroke="var(--color-rrp)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default StateDemandChart;
