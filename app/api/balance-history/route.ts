import { NextResponse } from "next/server";
import { monthNames } from "@/lib/mockData";

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET() {
  const min = 100;
  const max = 1000;

  const balanceHistory = monthNames.map((name, index) => ({
    id: index + 1,
    name,
    value: getRandomValue(min, max),
  }));

  const response = NextResponse.json(balanceHistory);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
