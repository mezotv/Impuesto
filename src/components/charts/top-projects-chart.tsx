import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartWrapper } from "@/components/chart-wrapper";

const data = [
  { name: "Project A", revenue: 4000 },
  { name: "Project B", revenue: 3000 },
  { name: "Project C", revenue: 2000 },
  { name: "Project D", revenue: 2780 },
  { name: "Project E", revenue: 1890 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-blue))",
  },
} satisfies ChartConfig;

export function TopProjectsChart() {
  return (
    <ChartWrapper title="Top Projects" data={data} className="h-[420px] w-full">
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
