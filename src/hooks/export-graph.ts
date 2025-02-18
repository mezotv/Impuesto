import { DataItem } from "@/types/export";
import html2canvas from "html2canvas";
import * as ExcelJS from "exceljs";
import { RefObject } from "react";

/**
 * Exports the content of a given reference element as a PNG image.
 *
 * @param {RefObject<HTMLElement | null>} ref - The reference to the element to capture.
 * @param {string} [filename="download.png"] - The name of the exported PNG file.
 * @param {string} [backgroundColor] - The background color for the PNG image, default is based on the page theme (dark/light).
 */
export const exportAsPng = async (
  ref: RefObject<HTMLElement | null>,
  filename = "exported_graph.png",
  backgroundColor = document.documentElement.classList.contains("dark") ? "#0f0f0f" : "#ffffff",
) => {
  if (!ref.current) return;

  const canvas = await html2canvas(ref.current, {
    backgroundColor,
  });

  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.download = filename;
  link.href = image;
  link.click();
};

export const exportAsCSV = (data: DataItem[], filename = "data.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csvContent = [
    headers,
    ...data.map((item) => headers.map((key) => JSON.stringify(item[key] ?? ""))),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

/**
 * Exports the provided data as an Excel file with optional total rows for specific columns.
 *
 * @param {Record<string, any>[]} data - The data to be exported.
 * @param {string} [filename="data-report.xlsx"] - The name of the exported Excel file.
 * @param {string} [worksheetTitle="Data"] - The title of the worksheet.
 * @param {string[]} [totalColumns=[]] - An array of column names to calculate totals for.
 */
export const exportAsExcel = async (
  data: Record<string, any>[],
  filename = "data-report.xlsx",
  worksheetTitle = "Data",
  totalColumns: string[] = [],
) => {
  if (!data.length) return;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Your App";
  workbook.lastModifiedBy = "Your App";
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet(worksheetTitle);

  const headers = Object.keys(data[0]);
  worksheet.columns = headers.map((key) => ({
    header: key.charAt(0).toUpperCase() + key.slice(1),
    key,
    width: 15,
  }));

  worksheet.getRow(1).font = { bold: true };

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  // Apply number formatting for numeric columns
  headers.forEach((header) => {
    const column = worksheet.getColumn(header);
    if (typeof data[0][header] === "number") {
      column.numFmt = "#,##0.00";
    }
  });

  // Add total row for specified columns
  totalColumns.forEach((col) => {
    if (headers.includes(col)) {
      const total = data.reduce((sum, item) => sum + (item[col] || 0), 0);
      const totalRow = worksheet.addRow({ [col]: total });
      totalRow.font = { bold: true };
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
