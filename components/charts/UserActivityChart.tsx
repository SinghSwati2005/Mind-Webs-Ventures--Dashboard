'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function UserActivity() {
  const { rangeType, timeRange, timePoint } = useDashboardStore();

  const generateData = () => {
    const labels = Array.from({ length: 30 }, (_, i) => `Week ${i + 1}`);
    const values = labels.map((_, i) => ({
      week: `Week ${i + 1}`,
      active: 120000 + Math.random() * 50000,
      returning: 60000 + Math.random() * 30000,
    }));

    const [start, end] =
      rangeType === 'range' ? timeRange : [timePoint, timePoint + 1];

    return values.slice(start, end + 1);
  };

  const data = generateData();

  return (
    <div className="bg-[#1e293b] p-4 rounded-xl">
      <h2 className="text-white text-lg font-semibold mb-2">User Activity</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Area type="monotone" dataKey="active" stackId="1" stroke="#22c55e" fill="#22c55e" />
          <Area type="monotone" dataKey="returning" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
