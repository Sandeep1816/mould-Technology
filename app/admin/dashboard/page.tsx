"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ posts: 0, categories: 0, authors: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [p, c, a] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`),
        ]);
        const [pd, cd, ad] = await Promise.all([p.json(), c.json(), a.json()]);
        setStats({
          posts: pd?.data?.length ?? pd.length ?? 0,
          categories: cd?.data?.length ?? cd.length ?? 0,
          authors: ad?.data?.length ?? ad.length ?? 0,
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Admin Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={stats.posts} />
        <StatCard title="Categories" value={stats.categories} />
        <StatCard title="Authors" value={stats.authors} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-indigo-700">{value}</p>
    </div>
  );
}
