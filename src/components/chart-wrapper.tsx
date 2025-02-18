import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exportAsCSV, exportAsExcel, exportAsPng } from "@/hooks/export-graph";
import { DataItem, ExportConfig } from "@/types/export";
import { useState, useRef, CSSProperties } from "react";
import { Download, Maximize2 } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GraphWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  config?: ExportConfig;
  className?: string;
  wrapperClassName?: string;
  data: DataItem[];
  actions?: ReactNode;
}

const defaultChartWrapperConfig = {
  png: {
    enabled: true,
  },
  csv: {
    enabled: true,
  },
  excel: {
    enabled: true,
  },
} satisfies ChartWrapperConfig;

/**
 * A wrapper component for charts that provides a title, description, export functionality (PNG, CSV, Excel), and fullscreen support.
 *
 * @param {GraphWrapperProps} props - The properties for configuring the chart wrapper.
 * @returns {JSX.Element} The rendered `ChartWrapper` component.
 *
 * @example
 * // Example usage of ChartWrapper with export configuration
 * import { ChartWrapper } from "@/components/ChartWrapper";
 * import { ExportConfig } from "@/types/export";
 *
 * const exportConfig: ExportConfig = {
 *   png: { enabled: true, fileName: "chart.png" },
 *   csv: {
 *     enabled: true,
 *     fileName: "data.csv",
 *     data: () => myChartData.map(item => ({ ...item, value: item.value * 100 })) // Optional: Transform data before exporting
 *   },
 *   excel: {
 *     enabled: true,
 *     fileName: "report.xlsx",
 *     sheetName: "Sales Data"
 *   }
 * };
 *
 * <ChartWrapper
 *   title="Sales Chart"
 *   description="Monthly sales data overview"
 *   data={myChartData}
 *   config={exportConfig}
 * >
 *   <MyChartComponent />
 * </ChartWrapper>
 *
 * @remarks
 * - If no `data` function is provided in `csv` or `excel`, the component uses the `data` prop by default.
 * - The `png` export captures the rendered chart as an image.
 * - Fullscreen mode allows for a larger view of the chart.
 */
export function ChartWrapper({
  title,
  description,
  children,
  config = defaultChartWrapperConfig,
  className,
  wrapperClassName,
  data,
  actions,
}: GraphWrapperProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPng = () => {
    if (!chartRef.current) return;
    exportAsPng(chartRef, config?.png?.fileName);
  };

  const handleDownloadCSV = () => {
    if (!config?.csv) return;
    const csvData = config.csv.data ? config.csv.data() : data;

    exportAsCSV(csvData, config.csv.fileName);
  };

  const handleDownloadExcel = () => {
    if (!config?.excel) return;
    const excelData = config.excel?.data
      ? config.excel.data()
      : [Object.keys(data[0]), ...data.map((item) => Object.values(item))];

    exportAsExcel(excelData, config.excel.fileName, config.excel.sheetName);
  };

  const handleFullscreen = () => {
    setShowFullscreen(true);
  };

  return (
    <>
      <Card className={cn("flex h-full w-full flex-1 flex-col", wrapperClassName)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="hover:bg-muted cursor-pointer rounded-md p-2 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {config?.png?.enabled && (
                    <DropdownMenuItem onClick={handleDownloadPng}>Download PNG</DropdownMenuItem>
                  )}
                  {config?.csv?.enabled && (
                    <DropdownMenuItem onClick={handleDownloadCSV}>Download CSV</DropdownMenuItem>
                  )}
                  {config?.excel?.enabled && (
                    <DropdownMenuItem onClick={handleDownloadExcel}>
                      Download Excel Report
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                className="hover:bg-muted cursor-pointer rounded-md p-2 transition-colors"
                onClick={handleFullscreen}
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
            {actions}
          </div>
        </CardHeader>
        <CardContent className="flex-1 pt-4 pl-2" ref={chartRef}>
          <div className={className}>{children}</div>
        </CardContent>
      </Card>

      {showFullscreen && (
        <FullscreenDialog showFullscreen={showFullscreen} setShowFullscreen={setShowFullscreen}>
          {children}
        </FullscreenDialog>
      )}
    </>
  );
}

/**
 * A dialog component that renders the chart in fullscreen mode.
 *
 * @param {Object} props - The properties for configuring the fullscreen dialog.
 * @param {ReactNode} props.children - The chart component to be displayed in fullscreen.
 * @param {boolean} props.showFullscreen - Whether the fullscreen mode is active.
 * @param {(show: boolean) => void} props.setShowFullscreen - Function to toggle fullscreen mode.
 * @returns {JSX.Element} The rendered FullscreenDialog component.
 */
const FullscreenDialog = ({
  children,
  showFullscreen,
  setShowFullscreen,
}: {
  children: ReactNode;
  showFullscreen: boolean;
  setShowFullscreen: (show: boolean) => void;
}) => {
  return (
    <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
      <DialogContent className="h-[90vh] max-w-[95vw] overflow-hidden sm:max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Fullscreen View</DialogTitle>
        </DialogHeader>
        <div className="h-[calc(90vh-100px)] flex-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export type ChartWrapperConfig = ExportConfig;
