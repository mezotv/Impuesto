"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyComparisonChart } from "@/components/charts/monthly-comparison-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceStatusChart } from "@/components/charts/invoice-status-chart";
import { TopProjectsChart } from "@/components/charts/top-projects-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { DateRangePicker } from "@/components/date-range-picker";
import { useState } from "react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() });

  return (
    <div className="flex max-h-[calc(100vh-64px-1rem*2)] flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <DateRangePicker date={dateRange} setDate={setDateRange} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,231.89</div>
            <p className="text-muted-foreground text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invoices Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-muted-foreground text-xs">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-muted-foreground text-xs">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€6,354.12</div>
            <p className="text-muted-foreground text-xs">-4% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="flex flex-1 flex-col space-y-4">
        <TabsList className="flex w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="m-0 flex-1 space-y-4">
          <div className="grid h-full flex-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <RevenueChart />
            </div>
            <div className="col-span-3">
              <InvoiceStatusChart />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="invoices" className="m-0 flex h-full flex-1 space-y-4">
          <MonthlyComparisonChart />
        </TabsContent>
        <TabsContent value="projects" className="m-0 flex h-full flex-1 space-y-4">
          <TopProjectsChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
