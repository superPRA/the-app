"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaBriefcase } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { RiHome5Fill } from "react-icons/ri";
import { BsFillGearFill } from "react-icons/bs";
import uuid from "react-uuid";
import Image from "next/image";
import { useGetAccount } from "@/hooks/useGetAccount";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: account, isLoading } = useGetAccount();
  return (
    <>
      <div className="h-screen bg-neutral-800 w-80 p-10 hidden md:block">
        <div className="flex flex-col items-center gap-6 text-3xl font-semibold">
          {!isLoading ? (
            <Image
              className="bg-cyan-600 rounded-full border-2 w-1/3"
              src={account?.avatarImag as string}
              alt="avatar"
              width={1000}
              height={1000}
            />
          ) : (
            <div className="bg-cyan-600 rounded-full border-2 w-1/3 aspect-square"></div>
          )}
          <h1>{account?.username ?? " . . . "}</h1>
        </div>
        <div className="mt-20">
          {navbar.map(({ icon, link, text }) => {
            const href = isLoading
              ? "/dashboard"
              : link === "/portfolio"
              ? link + "/" + account?.username
              : link;
            return (
              <Link
                key={uuid()}
                href={href}
                data-active={pathname === link}
                className={`flex items-center gap-4 px-3 py-4 rounded-lg transition-colors my-2
                        hover:bg-opacity-20 hover:text-cyan-400 hover:bg-cyan-400 
                        data-[active=true]:text-cyan-400 data-[active=true]:bg-opacity-20`}
              >
                <span className="text-3xl">{icon}</span>
                <h2 className="text-xl font-semibold">{text}</h2>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-5 left-0 right-0 md:hidden">
        <div className="w-11/12 bg-neutral-800 h-20 mx-auto rounded-2xl flex items-center justify-around">
          {navbar.map(({ icon, link, text }) => {
            const href = isLoading
              ? "/dashboard"
              : link === "/portfolio"
              ? link + "/" + account?.username
              : link;
            return (
              <Link
                href={href}
                data-active={pathname === link}
                className={`h-12 w-12 flex justify-center items-center text-2xl 
                           data-[active=true]:bg-cyan-600 data-[active=true]:rounded-2xl
                           hover:bg-cyan-600 hover:rounded-2xl
                          `}
                key={uuid()}
              >
                {icon}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

const navbar: {
  link: string;
  text: string;
  icon: any;
}[] = [
  {
    icon: <RiHome5Fill />,
    link: "/dashboard",
    text: "dashboard",
  },
  {
    icon: <FaBriefcase />,
    link: "/portfolio",
    text: "Portfolio",
  },
  {
    icon: <BiSolidUser />,
    link: "/dashboard/login",
    text: "Login",
  },
  {
    icon: <BsFillGearFill />,
    link: "/dashboard/setting",
    text: "Setting",
  },
];
