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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChartData {
  date: string;
  TOTALDEMAND: number;
  //RRP: number;
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
  RRP: {
    label: "Spot Price",
    color: "hsl(var(--chart-2))",
  },
};

function StateDemandChart({ tableName, title }: StateDemandChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select("SETTLEMENTDATE, TOTALDEMAND")
        .order("SETTLEMENTDATE", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const formattedData = (data || []).reverse().map((item) => ({
        date: new Date(item.SETTLEMENTDATE).toLocaleString(),
        TOTALDEMAND: item.TOTALDEMAND,
        //RRP: item.RRP,
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
              tickLine={true}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="TOTALDEMAND"
              type="natural"
              fill="var(--color-demand)"
              fillOpacity={0.4}
              stroke="var(--color-demand)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default StateDemandChart;
