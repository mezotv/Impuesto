import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartWrapper } from "@/components/chart-wrapper";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { name: "Product A", revenue: 4140 },
  { name: "Product B", revenue: 3290 },
  { name: "Product C", revenue: 2420 },
  { name: "Product D", revenue: 2880 },
  { name: "Product E", revenue: 1960 },
  { name: "Product F", revenue: 3740 },
  { name: "Product G", revenue: 2190 },
  { name: "Product H", revenue: 2660 },
  { name: "Product I", revenue: 3130 },
  { name: "Product J", revenue: 2840 },
  { name: "Product K", revenue: 2340 },
  { name: "Product L", revenue: 2980 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-blue))",
  },
} satisfies ChartConfig;

export function TopProductsChart() {
  return (
    <ChartWrapper title="Revenue Chart" data={data} className="h-96 w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${value}`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) =>
                  `${value.toLocaleString("en-US", { style: "currency", currency: "EUR" })}`
                }
              />
            }
          />
          <Bar dataKey="revenue" stackId="a" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
