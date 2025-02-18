/**
 * Exports the provided data as a CSV file.
 *
 * @param {DataItem[]} data - The data to be exported.
 * @param {string} [filename="data.csv"] - The name of the exported CSV file.
 */
export interface DataItem {
  [key: string]: any;
}

export interface ExportConfig {
  png?: {
    enabled: boolean;
    fileName?: string;
  };
  csv?: {
    enabled: boolean;
    fileName?: string;
    data?: () => DataItem[];
  };
  excel?: {
    enabled: boolean;
    fileName?: string;
    sheetName?: string;
    data?: () => Array<Array<string | number>>;
  };
}
