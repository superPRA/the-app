"use client";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAccountCheck() {
  const router = useRouter();
  const { data: account, isLoading, isError } = useGetAccount();
  useEffect(() => {
    const token = typeof localStorage !== "undefined" && localStorage.getItem("token");
    if (!token || (!isLoading && !account) || isError) {
      router.replace("/dashboard/login");
    }
  }, [router, isLoading, account, isError]);
  if (!isLoading) return null;
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10">
      loading...
    </div>
  );
}
