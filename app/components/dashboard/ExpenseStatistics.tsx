'use client'

import { SpinnerContainer } from '@/components/ui/spinnerContainer'
import { useQuery } from '@/hooks/useQuery'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

type ExpenseStats = {
  entertainment: number
  investment: number
  billExpenses: number
  others: number
}

type ExpenseData = {
  name: string
  value: number
  color: string
}

const COLORS: Record<string, string> = {
  entertainment: '#2F3B5C',
  investment: '#2A85FF',
  billExpenses: '#FF6B2C',
  others: '#1A1D1F',
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      <text
        x={x}
        y={y - 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[16px] font-bold"
      >
        {`${value}%`}
      </text>
      <text
        x={x}
        y={y + 15}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[12px]"
      >
        {name}
      </text>
    </g>
  )
}

export function ExpenseStatistics() {
  const {
    data: rawStats,
    loading,
    error,
  } = useQuery<ExpenseStats>({
    url: API_ENDPOINTS.EXPENSE_STATISTICS,
  })

  if (loading) {
    return <SpinnerContainer />
  }

  if (!rawStats) {
    return <div>No data available.</div>
  }

  const data = transformExpenseStats(rawStats)

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-xl font-semibold text-[#1A1D1F]">
        Expense Statistics
      </h2>
      <div className="h-full rounded-[20px] bg-white">
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={150}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={2}
                    stroke="#fff"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function transformExpenseStats(stats: ExpenseStats): ExpenseData[] {
  const mapping: Record<keyof ExpenseStats, string> = {
    entertainment: 'Entertainment',
    investment: 'Investment',
    billExpenses: 'Bill Expense',
    others: 'Others',
  }

  return Object.entries(stats).map(([key, value]) => ({
    name: mapping[key as keyof ExpenseStats],
    value,
    color: COLORS[key as keyof ExpenseStats],
  }))
}
