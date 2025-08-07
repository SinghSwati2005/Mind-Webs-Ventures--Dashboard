'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function ConversionBounce() {
  const { rangeType, timeRange, timePoint } = useDashboardStore();

  const generateData = () => {
    const labels = Array.from({ length: 30 }, (_, i) => `Week ${i + 1}`);
    const values = labels.map((_, i) => ({
      date: `Week ${i + 1}`,
      conversion: 5 + Math.random() * 5,
      bounce: 40 + Math.random() * 30,
    }));

    const [start, end] =
      rangeType === 'range' ? timeRange : [timePoint, timePoint + 1];

    return values.slice(start, end + 1);
  };

  const data = generateData();

  return (
    <div className="bg-[#1e293b] p-4 rounded-xl">
      <h2 className="text-white text-lg font-semibold mb-2">Conversion & Bounce Rates</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="bounce" fill="#ef4444" />
          <Bar dataKey="conversion" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
