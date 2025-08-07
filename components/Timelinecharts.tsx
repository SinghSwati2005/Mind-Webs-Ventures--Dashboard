// This is the base layout for all 4 charts shown in your image
// We'll use Recharts (https://recharts.org/en-US/) for implementation
// Chart components: LineChart, AreaChart, PieChart, BarChart

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useMemo } from "react";

const sampleDates = [
  "Mar 4",
  "Mar 25",
  "Apr 15",
  "May 6",
  "May 27",
  "Jun 17",
  "Jul 8",
  "Jul 22",
  "Aug 12",
  "Sep 2",
  "Sep 30",
];

export default function DashboardCharts() {
  const { timeUnit, timeRange } = useDashboardStore();

  const data = useMemo(() => {
    return sampleDates.map((date, i) => ({
      date,
      revenue: 500000 - i * 15000 + Math.random() * 10000,
      users: 100000 + i * 5000,
      sessions: 80000 + i * 4000,
      conversion: +(Math.random() * 10).toFixed(2),
      bounce: +(Math.random() * 100).toFixed(2),
    }));
  }, [timeUnit, timeRange]);

  const pieData = [
    { name: "Organic", value: 42 },
    { name: "Paid", value: 33 },
    { name: "Social", value: 25 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* Revenue Trend */}
      <div className="bg-[#1e293b] p-4 rounded-xl">
        <h2 className="text-white mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" tickFormatter={(val) => `$${(val / 1000).toFixed(0)}K`} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Activity */}
      <div className="bg-[#1e293b] p-4 rounded-xl">
        <h2 className="text-white mb-4">User Activity</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Area type="monotone" dataKey="sessions" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
            <Area type="monotone" dataKey="users" stackId="1" stroke="#10b981" fill="#10b981" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic Sources */}
      <div className="bg-[#1e293b] p-4 rounded-xl">
        <h2 className="text-white mb-4">Traffic Sources</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion & Bounce Rates */}
      <div className="bg-[#1e293b] p-4 rounded-xl">
        <h2 className="text-white mb-4">Conversion & Bounce Rates</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="bounce" fill="#ef4444" barSize={24} />
            <Bar dataKey="conversion" fill="#10b981" barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
