"use client";

import { useGetAccount } from "@/hooks/useGetAccount";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Portfolio() {
  const router = useRouter();
  const { data: account, isLoading, isError } = useGetAccount();
  useEffect(() => {
    if (!isLoading && account) {
      router.replace("/portfolio/" + account.username);
    }
  }, [account, isLoading, router]);
  return <div>portfolio</div>;
}
