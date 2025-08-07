// import { create } from 'zustand';

// type TimeUnit = 'day' | 'month' | 'year';
// type RangeType = 'single' | 'range';

// type Metrics = {
//   revenue: number;
//   users: number;
//   sessions: number;
//   conversion: number;
//   pageViews: number;
//   change: number; // Percentage change, for ↑ or ↓ arrow
// };

// interface DashboardState {
//   timeUnit: TimeUnit;
//   setTimeUnit: (unit: TimeUnit) => void;

//   rangeType: RangeType;
//   setRangeType: (type: RangeType) => void;

//   timeRange: [number, number]; // For range selection
//   setTimeRange: (range: [number, number]) => void;

//   timePoint: number; // For single point selection
//   setTimePoint: (point: number) => void;

//   metrics: Metrics;
//   setMetrics: (metrics: Metrics) => void;
// }

// export const useDashboardStore = create<DashboardState>((set) => ({
//   timeUnit: 'day',
//   setTimeUnit: (unit) => set(() => ({ timeUnit: unit })),

//   rangeType: 'range',
//   setRangeType: (type) => set(() => ({ rangeType: type })),

//   timeRange: [0, 24], // Default for "day" unit
//   setTimeRange: (range) => set(() => ({ timeRange: range })),

//   timePoint: 0,
//   setTimePoint: (point) => set(() => ({ timePoint: point })),

//   metrics: {
//     revenue: 0,
//     users: 0,
//     sessions: 0,
//     conversion: 0,
//     pageViews: 0,
//     change: 0,
//   },
//   setMetrics: (metrics) => set(() => ({ metrics })),
// }));


// ✅ UPDATED Zustand store to include chartData
import { create } from 'zustand';

type TimeUnit = 'day' | 'month' | 'year';
type RangeType = 'single' | 'range';

type Metrics = {
  revenue: number;
  users: number;
  sessions: number;
  conversion: number;
  pageViews: number;
  change: number;
};

type DashboardChartData = {
  date: string;
  revenue: number;
  users: number;
  paid: number;
  organic: number;
  social: number;
  conversion: number;
  bounce: number;
};
export type ThresholdRule = {
  operator: '<' | '<=' | '=' | '>=' | '>';
  value: number;
  color: string;
};

export type PolygonRule = {
  polygonId: string;
  dataSource: string;
  rules: ThresholdRule[];
};


interface DashboardState {
  timeUnit: TimeUnit;
  setTimeUnit: (unit: TimeUnit) => void;

  rangeType: RangeType;
  setRangeType: (type: RangeType) => void;

  timeRange: [number, number];
  setTimeRange: (range: [number, number]) => void;

  timePoint: number;
  setTimePoint: (point: number) => void;

  metrics: Metrics;
  setMetrics: (metrics: Metrics) => void;

  chartData: DashboardChartData[];
  setChartData: (data: DashboardChartData[]) => void;

   polygonRules: PolygonRule[];
  setPolygonRules: (rules: PolygonRule[]) => void;
}

const generateMockChartData = (
  timeUnit: TimeUnit,
  rangeType: RangeType,
  values: number[]
): DashboardChartData[] => {
  const length =
    rangeType === 'range' ? values[1] - values[0] + 1 : 1;
  return Array.from({ length }, (_, i) => {
    const date = `${timeUnit}-${values[0] + i + 1}`;
    return {
      date,
      revenue: 300000 + Math.random() * 200000,
      users: 100000 + Math.random() * 100000,
      paid: Math.floor(Math.random() * 100),
      organic: Math.floor(Math.random() * 100),
      social: Math.floor(Math.random() * 100),
      conversion: +(2 + Math.random() * 3).toFixed(2),
      bounce: Math.floor(Math.random() * 100),
    };
  });
};

export const useDashboardStore = create<DashboardState>((set) => ({
  timeUnit: 'day',
  setTimeUnit: (unit) => set(() => ({ timeUnit: unit })),

  rangeType: 'range',
  setRangeType: (type) => set(() => ({ rangeType: type })),

  timeRange: [0, 24],
  setTimeRange: (range) => set(() => ({ timeRange: range })),

  timePoint: 0,
  setTimePoint: (point) => set(() => ({ timePoint: point })),

  metrics: {
    revenue: 0,
    users: 0,
    sessions: 0,
    conversion: 0,
    pageViews: 0,
    change: 0,
  },
  setMetrics: (metrics) => set(() => ({ metrics })),

  chartData: [],
  setChartData: (data) => set(() => ({ chartData: data })),

  polygonRules: [],
setPolygonRules: (rules) => set(() => ({ polygonRules: rules })),

}));

export { generateMockChartData };
