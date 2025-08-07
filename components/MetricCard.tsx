// components/MetricCard.tsx
'use client';

import { useDashboardStore } from '@/store/useDashboardStore';
import type { Metrics } from '@/types/dashboard';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

type Props = {
  title: string;
  field: keyof Metrics;
  suffix?: string;
};

export default function MetricCard({ title, field, suffix = '' }: Props) {
  const metrics = useDashboardStore((state) => state.metrics);
  const value = metrics[field];
  
  const change = metrics.change ?? 0;
  const isPositive = change >= 0;

  return (
     <div className="bg-[#1e293b] p-4 rounded-xl w-full shadow text-white">
      <div className="text-sm text-gray-400 mb-1">{title}</div>

      <div className="text-2xl font-bold">
        {suffix}
        {Number(value).toLocaleString()}
      </div>

      <div className={`text-xs flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(change)}%
      </div>
    </div>
  );
}
