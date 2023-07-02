"use client";

import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

export default function SidebarAvatar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
  return (
    <div>
      {!isLoading && !isError ? (
        <Image
          className="bg-blue-200 border-4 rounded-full w-16 aspect-square"
          alt="avatar"
          src={account.avatarImag}
          width={400}
          height={400}
        />
      ) : (
        <div className="bg-blue-200 border-4 rounded-full w-16 aspect-square flex justify-center items-center text-2xl animate-spin">
          <VscLoading />
        </div>
      )}
    </div>
  );
}
