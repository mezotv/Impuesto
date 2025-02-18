import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartWrapper } from "@/components/chart-wrapper";
import { PieChart, Pie } from "recharts";

const data = [
  { status: "paid", value: 400, fill: "var(--color-paid)" },
  { status: "pending", value: 300, fill: "var(--color-pending)" },
  { status: "overdue", value: 100, fill: "var(--color-overdue)" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-blue))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-yellow))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-red))",
  },
} satisfies ChartConfig;

export function InvoiceStatusChart() {
  return (
    <ChartWrapper title="Revenue Chart" data={data} className="h-[420px] w-full">
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-full w-full"
      >
        <PieChart>
          <Pie data={data} dataKey="value" label nameKey="status" />
          <ChartLegend
            content={<ChartLegendContent nameKey="status" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
