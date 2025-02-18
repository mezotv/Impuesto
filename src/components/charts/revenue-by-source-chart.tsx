import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartWrapper, ChartWrapperConfig } from "@/components/chart-wrapper";
import { Pie, PieChart } from "recharts";

const data = [
  { name: "Direct", value: 400, fill: "var(--color-direct)" },
  { name: "Affiliate", value: 300, fill: "var(--color-affiliate)" },
  { name: "Social", value: 200, fill: "var(--color-social)" },
  { name: "Email", value: 100, fill: "var(--color-email)" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-indigo))",
  },
  affiliate: {
    label: "Affiliate",
    color: "hsl(var(--chart-emerald))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-orange))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-pink))",
  },
} satisfies ChartConfig;

export function RevenueBySourceChart() {
  return (
    <ChartWrapper title="Revenue Chart" data={data} className="h-96 w-full">
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-full w-full"
      >
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                valueFormatter={(value) =>
                  `${value.toLocaleString("en-US", { style: "currency", currency: "EUR" })}`
                }
              />
            }
          />
          <Pie data={data} dataKey="value" label nameKey="name" />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
