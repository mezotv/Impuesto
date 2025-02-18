import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, CartesianGrid, YAxis } from "recharts";
import { ChartWrapper } from "@/components/chart-wrapper";

const data = [
  { name: "Jan", currentYear: 4000, previousYear: 2400 },
  { name: "Feb", currentYear: 3000, previousYear: 1398 },
  { name: "Mar", currentYear: 2000, previousYear: 9800 },
  { name: "Apr", currentYear: 2780, previousYear: 3908 },
  { name: "May", currentYear: 1890, previousYear: 4800 },
  { name: "Jun", currentYear: 2390, previousYear: 3800 },
  { name: "Jul", currentYear: 3490, previousYear: 4300 },
];

const chartConfig = {
  currentYear: {
    label: "Current Year",
    color: "hsl(var(--chart-purple))",
  },
  previousYear: {
    label: "Previous Year",
    color: "hsl(var(--chart-blue))",
  },
} satisfies ChartConfig;

export function MonthlyComparisonChart() {
  return (
    <ChartWrapper title="Monthly Comparison" data={data} className="h-[420px] w-full">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                valueFormatter={(value) =>
                  `${value.toLocaleString("en-US", { style: "currency", currency: "EUR" })}`
                }
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="currentYear"
            type="monotone"
            stroke="var(--color-currentYear)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="previousYear"
            type="monotone"
            stroke="var(--color-previousYear)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
