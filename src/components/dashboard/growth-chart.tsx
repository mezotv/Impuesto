"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ChartWrapper } from "../chart-wrapper";
import { DateRange } from "react-day-picker";
import { revenueData } from "./overview";

// Calculate cumulative growth data
function getGrowthData(dateRange?: DateRange) {
  return revenueData.reduce(
    (acc, curr, index) => {
      const date = new Date(2024, index, 1); // Mock dates for demonstration

      // Filter by date range if provided
      if (dateRange?.from && date < dateRange.from) return acc;
      if (dateRange?.to && date > dateRange.to) return acc;

      const previousTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
      acc.push({
        name: curr.name,
        total: previousTotal + curr.total,
        date,
      });
      return acc;
    },
    [] as { name: string; total: number; date: Date }[],
  );
}

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-cyan))",
  },
} satisfies ChartConfig;

interface GrowthChartProps {
  dateRange?: DateRange;
  className?: string;
  setDateRange?: (range: DateRange | undefined) => void;
}

export function GrowthChart({ dateRange, className, setDateRange }: GrowthChartProps) {
  const growthData = getGrowthData(dateRange);

  console.log(growthData);

  return (
    <ChartWrapper
      title="Revenue Chart"
      data={revenueData}
      wrapperClassName={className}
      className="h-96 w-full"
      actions={setDateRange && <DateRangePicker date={dateRange} setDate={setDateRange} />}
    >
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={growthData}
          accessibilityLayer
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${value.toLocaleString()}`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelKey="revenue"
                indicator="line"
                valueFormatter={(value) =>
                  `${value.toLocaleString("en-US", { style: "currency", currency: "EUR" })}`
                }
              />
            }
          />
          <Area
            type="natural"
            dataKey="total"
            stackId="a"
            fill="url(#fillTotal)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
