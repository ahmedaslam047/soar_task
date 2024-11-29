"use client";

import { useState, useEffect } from "react";
import { SpinnerContainer } from "@/components/ui/spinnerContainer";
import { API_ENDPOINTS } from "@/lib/endpoints";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";

type WeeklyActivity = {
  name: string;
  value: number;
}[];

export function WeeklyActivity() {
  const [data, setData] = useState<WeeklyActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeeklyActivity = async () => {
      try {
        setLoading(true);
        const response = await axios.get<WeeklyActivity>(
          API_ENDPOINTS.WEEKLY_ACTIVITY
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching weekly activity")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyActivity();
  }, []);

  if (loading) {
    return <SpinnerContainer />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-xl font-semibold text-[#1A1D1F]">
        Weekly Activity
      </h2>
      <div className="rounded-[20px] bg-white p-6">
        <div className="mb-8 flex items-center justify-end gap-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#2A85FF]" />
            <span className="text-sm text-[#6F767E]">Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#1A1D1F]" />
            <span className="text-sm text-[#6F767E]">Withdraw</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={12}>
              <CartesianGrid
                strokeDasharray="4"
                vertical={false}
                stroke="#E4E4E4"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6F767E", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6F767E", fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
                dx={-10}
              />
              <Bar
                dataKey="withdraw"
                fill="#1A1D1F"
                radius={[20, 20, 20, 20]}
                maxBarSize={15}
              />
              <Bar
                dataKey="deposit"
                fill="#2A85FF"
                radius={[20, 20, 20, 20]}
                maxBarSize={15}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
