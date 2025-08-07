

'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const data = [
  { name: 'Organic', value: 42 },
  { name: 'Paid', value: 33 },
  { name: 'Social', value: 25 },
];

export default function TrafficSources() {
  return (
    <div className="bg-[#1e293b] p-4 rounded-xl">
      <h2 className="text-white text-lg font-semibold mb-2">Traffic Sources</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ percent = 0 }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

