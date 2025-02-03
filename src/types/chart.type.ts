import { DefaultizedPieValueType } from '@mui/x-charts';

export interface IMuiPieChart {
  participiants: Array<{ id: number; value: number; label: string }>;
  arcLabel: (item: DefaultizedPieValueType) => string;
  colors?: Array<string>;
  width: number;
  height: number;
}

export interface IMuiBarChart {
  participiants?: Array<number>;
  chartName?: string;
  xAxisLabels?: Array<string>;
  seriesData?: Array<number>;
  width?: number;
  height?: number;
}
