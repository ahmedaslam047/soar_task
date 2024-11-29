"use client";

import { useState, useEffect } from "react";
import { SpinnerContainer } from "@/components/ui/spinnerContainer";
import { API_ENDPOINTS } from "@/lib/endpoints";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

type Card = {
  balance: number;
  name: string;
  validity: string;
  number: string;
  type: string;
};

export function CardsList() {
  const [data, setData] = useState<Card[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Card[]>(API_ENDPOINTS.CARD);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching cards")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
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

  const renderCard = (card: Card, type = "other") => {
    const isDark = type === "paypal";
    return (
      <div
        key={card.number}
        className={`h-full w-full overflow-hidden rounded-[20px] p-6 transition-all duration-200 ${
          isDark
            ? "bg-gradient-to-b from-[#2C3A4E] to-[#1C2631] text-white"
            : "border border-[#E4E4E4] bg-white text-[#27364B]"
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-[#718ebf]"
              }`}
            >
              Balance
            </div>
            <div
              className={`mt-1 text-2xl font-semibold ${isDark ? "text-white" : "text-[#343c6a]"}`}
            >
              ${card.balance.toLocaleString()}
            </div>
          </div>
          <Image
            width={35}
            height={35}
            src={`/svgs/chip-${isDark ? "light" : "dark"}.svg`}
            alt="chip-picture"
          />
        </div>
        <div className="mb-6 flex justify-between">
          <div>
            <div
              className={`text-xs font-medium ${
                isDark ? "text-white/60" : "text-[#718ebf]"
              }`}
            >
              CARD HOLDER
            </div>
            <div
              className={`${isDark ? "text-white" : "text-[#343c6a]"} mt-1 font-medium`}
            >
              {card.name}
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-xs font-medium ${
                isDark ? "text-white/60" : "text-[#718ebf]"
              }`}
            >
              VALID THRU
            </div>
            <div
              className={`${isDark ? "text-white" : "text-[#343c6a]"} mt-1 font-medium`}
            >
              {card.validity}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div
            className={`text-base font-medium tracking-[3px] ${isDark ? "text-white" : "text-[#343c6a]"}`}
          >
            {card.number}
          </div>
          <div className="flex -space-x-2">
            <Image
              width={44}
              height={30}
              src={`/svgs/card-ring-${isDark ? "light" : "dark"}.svg`}
              alt="rings"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#27364B]">My Cards</h2>
        <Link
          href="/cards"
          className="text-sm font-medium text-black hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="relative flex h-full overflow-hidden">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">{renderCard(data[0], "paypal")}</div>
          {data[1] && (
            <div className="w-full lg:w-1/2">{renderCard(data[1])}</div>
          )}
        </div>
      </div>
    </div>
  );
}
