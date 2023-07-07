import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
    show: boolean
    onClose: ()=>void
    title?: string
    children?: any
}

export default function Modal({children,onClose,show}: Props) {
    if(!show) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md">
      <div className="bg-black w-full max-w-[900px] border-2 border-neutral-700 mx-auto mt-40">
        <div className="h-16 p-2 border-b-2 border-b-neutral-700 flex justify-between items-center">
            <div className="text-2xl">title</div>
          <button
            onClick={onClose}
            className={`h-12 aspect-square flex justify-center items-center rounded-xl transition-all duration-300 bg-neutral-800
            hover:bg-neutral-700 active:scale-90
            `}
            >
            <AiOutlineClose className="text-3xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
