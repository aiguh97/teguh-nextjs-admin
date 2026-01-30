import { useState, useEffect } from 'react';
import WithProtected from '@/hoc/withProtected';
import Image from 'next/image';
import LogoDark from '@/assets/logo-dark.svg';
import LogoLight from '@/assets/logo-light.svg';
import { useTheme } from 'next-themes';
import PageHeading from '@/components/common/PageHeading';
import { formatShortTime } from '@/utils/format';
import Link from 'next/link';
import DashboardCard from './DashboardCard';

// Data dummy default
const dummyInitialData = {
    pageviews: { value: 1200, change: 50 },
    visitors: { value: 800, change: 30 },
    visits: { value: 950, change: 25 },
    bounces: { value: 200, change: 10 },
    totaltime: { value: 50000, change: 2000 }, // dalam detik
    activeUser: { x: 15 },
};

const Dashboard = ({ initialData = dummyInitialData }) => {
    const [range, setRange] = useState('24h');
    const [data, setData] = useState(initialData);
    const { theme } = useTheme();

    const now = Date.now();
    const ranges = {
        '24h': { start: now - 24 * 60 * 60 * 1000, end: now },
        '3d': { start: now - 3 * 24 * 60 * 60 * 1000, end: now },
        '7d': { start: now - 7 * 24 * 60 * 60 * 1000, end: now },
        '1m': { start: now - 30 * 24 * 60 * 60 * 1000, end: now },
    };

    // Optional: fetch data dari API internal
    // useEffect(() => {
    //     fetch('/api/dashboard')
    //       .then(res => res.json())
    //       .then(json => setData(json))
    // }, [range]);

    const { start, end } = ranges[range];
    const { pageviews, visitors, visits, bounces, totaltime, activeUser } = data;

    const diffs = {
        pageviews: pageviews.value - pageviews.change,
        visitors: visitors.value - visitors.change,
        visits: visits.value - visits.change,
        bounces: bounces.value - bounces.change,
        totaltime: totaltime.value - totaltime.change,
    };

    const num = Math.min(visitors.value, bounces.value);
    const totalsecond =
        totaltime.value && pageviews.value
            ? totaltime.value / (pageviews.value - bounces.value)
            : 0;

    const changeTotalsecond =
        totaltime.value && pageviews.value
            ? (diffs.totaltime / (diffs.pageviews - diffs.bounces) -
                  totaltime.value / (pageviews.value - bounces.value)) *
              -1 || 0
            : 0;

    const changeBounceRate =
        visitors.value && visitors.change
            ? (num / visitors.value) * 100 -
              (Math.min(diffs.visitors, diffs.bounces) / diffs.visitors) * 100 ||
              0
            : 0;

    return (
        <div>
            <PageHeading
                title="Dashboard"
                description="This is the analytics dashboard (dummy data)."
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        width={16}
                        src={theme === 'dark' ? LogoDark : LogoLight}
                        alt="Dwi-logo"
                    />
                    <Link href="https://teguhdev.com" className="font-semibold">
                        teguhdev.com
                    </Link>
                </div>

                <select
                    id="range-select"
                    className="!p-1 bg-container border border-stroke rounded-md !px-2"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                >
                    <option value="24h">Last 24 Hours</option>
                    <option value="3d">Last 3 Days</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="1m">Last 1 Month</option>
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-4">
                <DashboardCard
                    title="Active Visitor"
                    value={activeUser.x}
                />
                <DashboardCard
                    title="Views"
                    value={pageviews.value}
                    change={pageviews.change}
                    color="green"
                />
                <DashboardCard
                    title="Visitors"
                    value={visitors.value}
                    change={visitors.change}
                    color="green"
                />
                <DashboardCard
                    title="Visits"
                    value={visits.value}
                    change={visits.change}
                    color="green"
                />
                <DashboardCard
                    title="Bounce Rate"
                    value={(bounces.value / visitors.value) * 100}
                    change={`${changeBounceRate.toFixed(0)}%`}
                    valueType="percent"
                    color="red"
                />
                <DashboardCard
                    title="Avg visit time"
                    value={formatShortTime(totalsecond)}
                    change={`${changeTotalsecond.toFixed(0)}s`}
                    color="green"
                />
            </div>
        </div>
    );
};

export default WithProtected(Dashboard);
