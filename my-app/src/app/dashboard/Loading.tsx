"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Loading() {
  const router = useRouter();
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const {
    data: account,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await axios({
        url: `http://localhost:3000/api/accounts/loadData?token=${token}`,
        method: "get",
      }).then((res) => res.data.account);
    },
    enabled: !!token,
  });
  useEffect(() => {
    if (!token || (!isLoading && !account) || isError) {
      router.replace("/dashboard/login");
    }
  }, [token, router, isLoading, account, isError]);
  if(!isLoading) return null
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10">
      loading...
    </div>
  );
}
