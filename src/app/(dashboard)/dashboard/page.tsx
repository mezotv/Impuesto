"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { Overview } from "@/components/dashboard/overview";
import { GrowthChart } from "@/components/dashboard/growth-chart";
import { DateRange } from "react-day-picker";
import { useState } from "react";

// Helper function to determine the color class based on the percentage
function getPercentageColorClass(percentage: number): string {
  return percentage >= 0 ? "text-green-500" : "text-red-500";
}

// Helper function to format the percentage
function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(1)}%`;
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 6, 1), // July 2023
    to: new Date(2024, 6, 1), // July 2024
  });

  // Mock data for the cards
  const cardData = [
    { title: "Total Revenue", value: "€45,231.89", percentage: 20.1 },
    { title: "Invoices", value: "+2,350", percentage: 180.1 },
    { title: "Paid Invoices", value: "+12,234", percentage: 19.0 },
    { title: "Active Projects", value: "+573", percentage: -2.5 },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Updated main content container */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-muted-foreground text-xs">
                <span className={`font-medium ${getPercentageColorClass(card.percentage)}`}>
                  {formatPercentage(card.percentage)}
                </span>
                {" from last month"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Overview className="md:col-span-4" />
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentInvoices />
          </CardContent>
        </Card>
      </div>
      <GrowthChart dateRange={dateRange} setDateRange={setDateRange} />
    </div>
  );
}
