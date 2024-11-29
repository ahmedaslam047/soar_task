"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { SpinnerContainer } from "@/components/ui/spinnerContainer";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface Card {
  number: string;
  balance: number;
  name: string;
  validity: string;
  type: "paypal" | "credit" | "debit";
}

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Card[]>(API_ENDPOINTS.CARD);
        setCards(response.data);
        setError(null);
      } catch (err) {
        setError("Error loading cards. Please try again later.");
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
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (cards.length === 0) {
    return <div className="text-center text-gray-500">No cards found.</div>;
  }

  const renderCard = (card: Card) => {
    const isDark = card.type === "paypal";
    return (
      <div
        key={card.number}
        className={`w-full overflow-hidden rounded-[20px] p-4 sm:p-6 transition-all duration-200 ${
          isDark
            ? "bg-gradient-to-b from-[#2C3A4E] to-[#1C2631] text-white"
            : "border border-[#E4E4E4] bg-white text-[#27364B]"
        }`}
      >
        <div className="mb-4 sm:mb-8 flex items-start justify-between">
          <div>
            <div
              className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-white" : "text-[#718ebf]"
              }`}
            >
              Balance
            </div>
            <div
              className={`mt-1 text-lg sm:text-2xl font-semibold ${
                isDark ? "text-white" : "text-[#343c6a]"
              }`}
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
        <div className="mb-4 sm:mb-6 flex justify-between">
          <div>
            <div
              className={`text-xs font-medium ${
                isDark ? "text-white/60" : "text-[#718ebf]"
              }`}
            >
              CARD HOLDER
            </div>
            <div
              className={`${
                isDark ? "text-white" : "text-[#343c6a]"
              } mt-1 text-xs sm:text-sm font-medium`}
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
              className={`${
                isDark ? "text-white" : "text-[#343c6a]"
              } mt-1 text-xs sm:text-sm font-medium`}
            >
              {card.validity}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div
            className={`text-sm sm:text-base font-medium tracking-[2px] sm:tracking-[3px] ${
              isDark ? "text-white" : "text-[#343c6a]"
            }`}
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
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold text-gray-800">
        My Cards
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.number}
            className="h-auto sm:h-[250px] md:h-[300px] lg:h-[250px]"
          >
            {renderCard(card)}
          </div>
        ))}
      </div>
    </div>
  );
}
