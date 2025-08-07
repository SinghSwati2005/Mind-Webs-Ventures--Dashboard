'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function RevenueTrend() {
  const { timeUnit, rangeType, timeRange, timePoint } = useDashboardStore();

  // Dummy data generation based on time selection
  const generateData = () => {
    const labels = Array.from({ length: 30 }, (_, i) => `Week ${i + 1}`);
    const values = labels.map((_, i) => ({
      date: `Week ${i + 1}`,
      revenue: 500000 - i * 5000 + Math.floor(Math.random() * 10000),
    }));

    const [start, end] =
      rangeType === 'range' ? timeRange : [timePoint, timePoint + 1];

    return values.slice(start, end + 1);
  };

  const data = generateData();

  return (
    <div className="bg-[#1e293b] p-4 rounded-xl">
      <h2 className="text-white text-lg font-semibold mb-2">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#a855f7" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
