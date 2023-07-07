"use client";

import UserInfoEditBox from "@/components/setting/UserInfoEditBox";
import Sidebar from "@/components/sidebar/Sidebar";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import uuid from "react-uuid";

export default function Setting() {
  const router = useRouter();
  const { data, isLoading } = useGetAccount();
  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/dashboard/login");
    }
  }, [isLoading, data, router]);
  
  return (
    <div className="bg-black min-h-screen flex text-white">
      <Sidebar />
      <div className="w-full h-screen overflow-auto p-10">
        <div className="relative isolate">
          <div className="absolute w-full border border-cyan-600 h-[1px] top-1/2 -z-[1]"></div>
          <h1 className="text-center text-3xl w-fit bg-black mx-auto px-2">
            User Info
          </h1>
        </div>
        <UserInfoEditBox />
      </div>
    </div>
  );
}
