"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

export default function SidebarAvatar() {
    const router = useRouter();
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const { data: account, isLoading, isError } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await axios({
        url: `http://localhost:3000/api/accounts/loadData?token=${token}`,
        method: "get",
      }).then((res) => res.data.account);
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
