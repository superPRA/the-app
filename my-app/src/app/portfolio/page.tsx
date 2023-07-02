"use client";

import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Portfolio() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const {
    data: account,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await axios({
        url: `/api/accounts/loadData?token=${token}`,
        method: "get",
      })
        .then((res) => res.data.account)
        .catch((err) => {
          dispatch(
            actions.setMassage({
              message: err.response.data.err,
              type: "error",
            })
          );
        });
    },
    enabled: !!token,
  });
  useEffect(() => {
    if (!isLoading && account) {
      router.replace("/portfolio/" + account.username);
    }
  }, [account, isLoading, router]);
  return <div>portfolio</div>;
}
