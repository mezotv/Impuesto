"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, YAxis } from "recharts";
import { ChartWrapper } from "../chart-wrapper";

export interface RevenueData {
  name: string;
  total: number;
}

export const revenueData: RevenueData[] = [
  { name: "Jan", total: -4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 4500 },
  { name: "Apr", total: 4000 },
  { name: "May", total: 3000 },
  { name: "Jun", total: 2000 },
  { name: "Jul", total: 4000 },
  { name: "Aug", total: 3000 },
  { name: "Sep", total: -2500 },
  { name: "Oct", total: 2000 },
  { name: "Nov", total: 3000 },
  { name: "Dec", total: 4250 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-green))",
  },
} satisfies ChartConfig;

export function Overview({ className }: { className?: string }) {
  return (
    <ChartWrapper
      title="Revenue Chart"
      data={revenueData}
      wrapperClassName={className}
      className="h-96 w-full"
    >
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <BarChart accessibilityLayer data={revenueData}>
          <CartesianGrid vertical={false} />
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
                hideIndicator
                valueFormatter={(value) =>
                  `${value.toLocaleString("en-US", { style: "currency", currency: "EUR" })}`
                }
              />
            }
          />
          <Bar dataKey="total">
            <LabelList
              position="top"
              dataKey="name"
              fillOpacity={1}
              fill="hsl(var(--foreground))"
            />
            {revenueData.map((item) => (
              <Cell
                key={item.name}
                fill={item.total > 0 ? "hsl(var(--chart-green))" : "hsl(var(--chart-red))"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
