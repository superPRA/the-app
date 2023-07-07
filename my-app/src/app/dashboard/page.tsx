"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useGetAccount } from "@/hooks/useGetAccount";
import { BiSearchAlt } from "react-icons/bi";
import { RiFilter3Line } from "react-icons/ri";
import Modal from "@/components/Modal";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
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
      <div className="w-full h-screen overflow-y-auto p-10">
        <div className="flex justify-between items-center">
          <div className="hidden lg:block"></div>
          <label className="w-1/2 min-w-[200px] flex overflow-hidden h-12 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all">
            <BiSearchAlt className="h-12 w-12 p-2" />
            <input
              className="w-full bg-transparent p-2 h-12 outline-none"
              placeholder="seacrh"
            />
          </label>
          <button
            onClick={() => setShowModal(true)}
            className={`h-12 aspect-square flex justify-center items-center rounded-xl transition-all duration-300 bg-neutral-800
                        hover:bg-neutral-700 active:scale-90
                      `}
          >
            <RiFilter3Line className="text-3xl" />
          </button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} title="hi">
        test
      </Modal>
    </div>
  );
}
