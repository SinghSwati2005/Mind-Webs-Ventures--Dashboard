'use client';

import Navbar from '@/components/Navbar';
import MetricCard from '@/components/MetricCard';
import TimeLineSlider from '@/components/TimeLineSlider';

import RevenueTrendChart from '@/components/charts/RevenueChart';
import UserActivityChart from '@/components/charts/UserActivityChart';
import TrafficSourcesChart from '@/components/charts/TrafficSourcePie';
import ConversionBounceChart from '@/components/charts/ConversionRateBar';
import MapDashboard from '@/components/MapDashboard';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';



export default function Home() {
  const MapDashboard = dynamic(() => import('@/components/MapDashboard'), {
  ssr: false,
});
  return (
    <div>
      <Navbar />
      <main className="p-6 space-y-6">
        <TimeLineSlider />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard title="Total Revenue" field="revenue" suffix="$" />
          <MetricCard title="Active Users" field="users" suffix="" />
          <MetricCard title="Sessions" field="sessions" suffix="" />
          <MetricCard title="Conversion Rate" field="conversion" />
          <MetricCard title="Page Views" field="pageViews" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevenueTrendChart />
          <UserActivityChart />
          <TrafficSourcesChart />
          <ConversionBounceChart />
        </div>
        <Sidebar />
        <MapDashboard/>
      </main>
    </div>
  );
}
