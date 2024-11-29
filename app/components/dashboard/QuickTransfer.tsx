"use client";

import { useState, useEffect } from "react";
import { SpinnerContainer } from "@/components/ui/spinnerContainer";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import axios from "axios";

type User = {
  name: string;
  role: string;
  image: string;
};

export function QuickTransfer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>(API_ENDPOINTS.QUICK_TRANSFER);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching users")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <SpinnerContainer />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!users || users.length === 0) {
    return null;
  }

  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (users.length - itemsPerPage + 1)
    );
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-[22px] font-semibold text-[#27364B]">
        Quick Transfer
      </h2>
      <div className="flex h-[280px] flex-col justify-between rounded-[20px] bg-white p-8">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `${-currentIndex * 40}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {users.map((user, index) => {
              if (!user) {
                return null;
              }
              return (
                <motion.div
                  key={`quick-${index}`}
                  className="flex-shrink-0 text-center"
                  style={{ width: "40%" }}
                >
                  <div className="mx-auto mb-3 h-[68px] w-[68px] overflow-hidden rounded-full">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={68}
                      height={68}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-1 text-[15px] font-medium text-[#1A1D1F]">
                    {user.name}
                  </div>
                  <div className="text-[13px] text-[#2A85FF]">{user.role}</div>
                </motion.div>
              );
            })}
          </motion.div>
          {users.length > itemsPerPage && (
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center">
              <button
                onClick={nextSlide}
                className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)] transition-colors hover:bg-gray-50"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="#1A1D1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-0 text-[15px] text-[#6F767E]">
            Write Amount
          </span>
          <div className="ml-[110px] flex flex-1 items-center justify-between rounded-xl bg-[#F4F4F4]">
            <span className="pl-4 text-[15px] text-[#1A1D1F]">525.50</span>
            <button className="m-1 flex h-[44px] items-center gap-2 rounded-xl bg-[#1A1D1F] px-5 text-[15px] text-white transition-colors hover:bg-black/90">
              Send
              <Send className="h-4 w-4 -rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
