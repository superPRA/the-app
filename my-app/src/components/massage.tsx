"use client";

import { useAppSelector } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";

export default function Massage() {
  const { PUM } = useAppSelector((state) => state.master);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(actions.clearMassage());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [PUM, dispatch]);
  if (!PUM) return null;
  return (
    <div
      data-type={PUM.type}
      className="fixed bottom-10 left-10 right-10 data-[type='error']:bg-red-600 data-[type='success']:bg-green-600 data-[type='normal']:bg-gray-600 h-14 rounded-xl flex gap-4 text-white items-center px-4"
    >
      <button
        onClick={() => dispatch(actions.clearMassage())}
        className="text-gray-500 hover:text-white transition-colors"
      >
        <CiCircleRemove className="text-3xl" />
      </button>
      <h1>{PUM.message}</h1>
    </div>
  );
}
