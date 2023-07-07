"use client";

import UserInfoEditBox from "@/components/setting/UserInfoEditBox";
import { useGetAccount } from "@/hooks/useGetAccount";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import uuid from "react-uuid";

export default function Setting() {
  const { data: account, isLoading, isError,isFetching } = useGetAccount();
  const router = useRouter();
  useEffect(() => {
    const token = typeof localStorage !== "undefined" && localStorage.getItem("token");
    if (!token || (!isLoading && !account) || isError) {
      router.replace("/dashboard/login");
    }
  }, [router, isLoading, account, isError]);

  
 
  
  return (
    <div className="pt-32">
      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10">
          loading...
        </div>
      )}
      <Image
        className="bg-blue-200 border-4 mx-auto rounded-full w-96 aspect-square"
        src={account?.avatarImag || ""}
        alt="avatar"
        width={1000}
        height={1000}
      />
      <h3 className="text-center text-5xl mt-10 font-bold">
        {account?.username || "username"}
      </h3>
      <div className="grid grid-cols-2 gap-x-40 gap-y-20 py-20 px-40">
        {account && <UserInfoEditBox account={account} />}
      </div>
    </div>
  );
}
